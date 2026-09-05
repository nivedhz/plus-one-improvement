import { NextResponse } from "next/server";
import { z } from "zod";
import { findUserByEmail } from "../../../lib/users";
import { apiError, rejectIfCrossSite } from "../../../lib/http";
import { sendPasswordResetEmail } from "../../../lib/mailer";
import { logger } from "../../../lib/logger";
import {
  clientIp,
  isRateLimitEnabled,
  rateLimit,
} from "../../../lib/rate-limit";
import { issueResetToken } from "../../../lib/reset-tokens";

export const runtime = "nodejs";

// Tight limit: each hit can spend a real email, and the endpoint must not
// become an account-enumeration oracle.
const FORGOT_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

const forgotSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .transform((v) => v.trim().toLowerCase()),
});

function appUrl(req: Request): string {
  const env = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (env) return env;
  return new URL(req.url).origin;
}

export async function POST(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  if (isRateLimitEnabled()) {
    const limit = rateLimit(
      `forgot:${clientIp(req)}`,
      FORGOT_LIMIT.max,
      FORGOT_LIMIT.windowMs,
    );
    if (!limit.ok) {
      return apiError("Too many attempts. Please try again later.", 429, "RATE_LIMITED", {
        headers: { "Retry-After": String(limit.retryAfterSec) },
      });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid request body.", 400, "BAD_REQUEST");
  }

  const parsed = forgotSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  // Enumeration-safe: identical response whether or not the email exists.
  // Mail failures are logged server-side and never surface to the client.
  const user = await findUserByEmail(parsed.data.email);
  if (user) {
    try {
      const { token } = await issueResetToken(user.id);
      const resetUrl = `${appUrl(req)}/auth/reset-password?token=${token}`;
      await sendPasswordResetEmail(user.email, resetUrl);
    } catch (err) {
      logger.error("auth.password_reset.issue_failed", {
        error: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, a reset link is on its way.",
  });
}
