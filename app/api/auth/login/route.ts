import { NextResponse } from "next/server";
import {
  createSessionToken,
  loginSchema,
  setSessionCookie,
  verifyPassword,
} from "../../../lib/auth";
import { apiError, rejectIfCrossSite } from "../../../lib/http";
import {
  clientIp,
  isRateLimitEnabled,
  rateLimit,
} from "../../../lib/rate-limit";
import { findUserByEmail, toPublicUser } from "../../../lib/users";

export const runtime = "nodejs";

// 10 attempts per 10 minutes per IP — slows password guessing to a crawl.
const LOGIN_LIMIT = { max: 10, windowMs: 10 * 60 * 1000 };

export async function POST(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  if (isRateLimitEnabled()) {
    const limit = rateLimit(
      `login:${clientIp(req)}`,
      LOGIN_LIMIT.max,
      LOGIN_LIMIT.windowMs,
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

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);

  // Generic message on purpose — don't reveal whether the email exists.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return apiError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
  }

  const publicUser = toPublicUser(user);
  const res = NextResponse.json({ user: publicUser });
  setSessionCookie(
    res,
    await createSessionToken({ ...publicUser, tokenVersion: user.tokenVersion }),
  );
  return res;
}
