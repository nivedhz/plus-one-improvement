import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  getSession,
} from "../../../lib/auth";
import { rejectIfCrossSite } from "../../../lib/http";
import { revokeUserSessions } from "../../../lib/users";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  // Revoke server-side so the token can't be replayed after logout.
  const session = await getSession();
  if (session) {
    await revokeUserSessions(session.id);
  }
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
