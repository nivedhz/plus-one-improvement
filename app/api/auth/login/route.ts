import { NextResponse } from "next/server";
import {
  createSessionToken,
  loginSchema,
  setSessionCookie,
  verifyPassword,
} from "../../../lib/auth";
import { findUserByEmail, toPublicUser } from "../../../lib/users";

export const runtime = "nodejs";

export async function POST(req: Request) {
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
  setSessionCookie(res, await createSessionToken(publicUser));
  return res;
}
