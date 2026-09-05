import * as jose from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "improve_session";
const TOKEN_ISSUER = "improve";
const TOKEN_AUDIENCE = "improve-web";

function edgeSecret(): Uint8Array | null {
  const raw = process.env.AUTH_SECRET;
  // Never throw in middleware — a missing secret just means "no valid
  // session", and page-level getSession() (Node.js) reports the real error.
  if (!raw || raw.length < 32) return null;
  return new TextEncoder().encode(raw);
}

// Fast-path redirect only: verifies JWT signature + iss/aud at the Edge.
// The DB tokenVersion (logout revocation) check still lives in
// getSession() inside pages and Route Handlers.
async function hasValidToken(req: NextRequest): Promise<boolean> {
  const secret = edgeSecret();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!secret || !token) return false;
  try {
    await jose.jwtVerify(token, secret, {
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = await hasValidToken(req);

  const isVisitorOnly = pathname === "/" || pathname.startsWith("/auth/");
  if (isVisitorOnly && authed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/subjects") ||
    pathname.startsWith("/calculator");
  if (isProtected && !authed) {
    const login = new URL("/auth/login", req.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/subjects/:path*",
    "/calculator/:path*",
  ],
};
