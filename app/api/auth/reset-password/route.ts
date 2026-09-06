import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, hashPassword, setSessionCookie } from "../../../lib/auth";
import { apiError, rejectIfCrossSite } from "../../../lib/http";
import { clientIp, isRateLimitEnabled, rateLimit } from "../../../lib/rate-limit";
import { consumeResetToken } from "../../../lib/reset-tokens";
import { findUserById, setUserPassword, toPublicUser } from "../../../lib/users";

export const runtime = "nodejs";

// Same budget as login: slows token-guessing to a crawl.
const RESET_LIMIT = { max: 10, windowMs: 10 * 60 * 1000 };

const resetSchema = z.object({
  token: z.string().min(1, "This link is invalid or has expired."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function POST(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  if (isRateLimitEnabled()) {
    const limit = rateLimit(
      `reset:${clientIp(req)}`,
      RESET_LIMIT.max,
      RESET_LIMIT.windowMs,
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

  const parsed = resetSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  // Unknown, expired, and already-used tokens share one response — and a
  // user deleted between issue and consume looks the same too.
  const claim = await consumeResetToken(parsed.data.token);
  const user = claim ? await findUserById(claim.userId) : null;
  if (!claim || !user) {
    return apiError(
      "This link is invalid or has expired. Request a new one to try again.",
      400,
      "INVALID_OR_EXPIRED_TOKEN",
    );
  }

  const updated = await setUserPassword(
    user.id,
    await hashPassword(parsed.data.password),
  );
  const publicUser = toPublicUser(updated);

  // Auto-login on this device; every other session died with the bump.
  const res = NextResponse.json({ user: publicUser });
  setSessionCookie(
    res,
    await createSessionToken({ ...publicUser, tokenVersion: updated.tokenVersion }),
  );
  return res;
}
