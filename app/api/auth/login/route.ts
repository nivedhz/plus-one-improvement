import { NextResponse } from "next/server";
import {
  createSessionToken,
  loginSchema,
  setSessionCookie,
  verifyPassword,
} from "../../../lib/auth";
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
  if (isRateLimitEnabled()) {
    const limit = rateLimit(
      `login:${clientIp(req)}`,
      LOGIN_LIMIT.max,
      LOGIN_LIMIT.windowMs,
    );
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSec) },
        },
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);

  // Generic message on purpose — don't reveal whether the email exists.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const publicUser = toPublicUser(user);
  const res = NextResponse.json({ user: publicUser });
  setSessionCookie(
    res,
    await createSessionToken({ ...publicUser, tokenVersion: user.tokenVersion }),
  );
  return res;
}
