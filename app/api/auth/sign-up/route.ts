import { NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  signUpSchema,
} from "../../../lib/auth";
import { createUser, findUserByEmail, toPublicUser } from "../../../lib/users";
import { hashPassword } from "../../../lib/auth";

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

  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const user = await createUser({
    name,
    email,
    passwordHash: await hashPassword(password),
  });
  const publicUser = toPublicUser(user);

  const res = NextResponse.json({ user: publicUser }, { status: 201 });
  setSessionCookie(res, await createSessionToken(publicUser));
  return res;
}
