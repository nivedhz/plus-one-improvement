import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { z } from "zod";

export const SESSION_COOKIE = "improve_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const DEV_SECRET = "dev-only-secret-change-me-in-production";

function getSecret(): Uint8Array {
  if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production.");
  }
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? DEV_SECRET);
}

const emailField = z
  .email("Please enter a valid email address.")
  .transform((v) => v.trim().toLowerCase());

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(60, "Name is too long."),
  email: emailField,
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Please enter your password."),
});

export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: PublicUser): Promise<string> {
  return new jose.SignJWT({ name: user.name, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export function setSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}

export async function getSession(): Promise<PublicUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}
