import { Prisma } from "../../../../prisma/generated/client";
import { NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  signUpSchema,
} from "../../../lib/auth";
import { createUser, findUserByEmail, toPublicUser } from "../../../lib/users";
import { hashPassword } from "../../../lib/auth";
import { apiError, rejectIfCrossSite } from "../../../lib/http";
import {
  clientIp,
  isRateLimitEnabled,
  rateLimit,
} from "../../../lib/rate-limit";

export const runtime = "nodejs";

// 5 new accounts per hour per IP — blocks mass fake-account creation.
const SIGNUP_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

export async function POST(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  if (isRateLimitEnabled()) {
    const limit = rateLimit(
      `signup:${clientIp(req)}`,
      SIGNUP_LIMIT.max,
      SIGNUP_LIMIT.windowMs,
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

  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  const { name, email, password, stream } = parsed.data;

  if (await findUserByEmail(email)) {
    return apiError(
      "An account with this email already exists.",
      409,
      "EMAIL_TAKEN",
    );
  }

  // The exists-check above can race with a parallel sign-up, so treat a
  // unique-constraint violation as a conflict too.
  let user;
  try {
    user = await createUser({
      name,
      email,
      passwordHash: await hashPassword(password),
      stream,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return apiError(
        "An account with this email already exists.",
        409,
        "EMAIL_TAKEN",
      );
    }
    throw err;
  }
  const publicUser = toPublicUser(user);

  const res = NextResponse.json({ user: publicUser }, { status: 201 });
  setSessionCookie(
    res,
    await createSessionToken({ ...publicUser, tokenVersion: user.tokenVersion }),
  );
  return res;
}
