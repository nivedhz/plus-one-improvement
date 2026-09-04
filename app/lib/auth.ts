import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "./db";

export const SESSION_COOKIE = "improve_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Bind tokens to this app so a token minted elsewhere is never accepted.
const TOKEN_ISSUER = "improve";
const TOKEN_AUDIENCE = "improve-web";

const DEV_SECRET = "dev-only-secret-change-me-in-production";

function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET ?? DEV_SECRET;
  if (raw.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters long.");
  }
  return new TextEncoder().encode(raw);
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

export async function createSessionToken(
  user: PublicUser & { tokenVersion: number },
): Promise<string> {
  return new jose.SignJWT({
    name: user.name,
    email: user.email,
    tokenVersion: user.tokenVersion,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export function setSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Lax blocks cross-site POST forgery while keeping top-level
    // navigation (e.g. coming back from a link) signed in.
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
    const { payload } = await jose.jwtVerify(token, getSecret(), {
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.tokenVersion !== "number"
    ) {
      return null;
    }
    // A logout bumps tokenVersion, so stolen or old tokens stop working
    // even before they expire.
    const user = await db.user.findUnique({ where: { id: payload.sub } });
    if (!user || user.tokenVersion !== payload.tokenVersion) return null;
    return { id: user.id, email: user.email, name: user.name };
  } catch {
    return null;
  }
}
