import { NextResponse } from "next/server";

export type ApiErrorBody = { error: string; code?: string };

// Standard error envelope: { error, code }. `code` is a stable machine
// key (e.g. UNAUTHORIZED) so clients can branch without parsing copy.
export function apiError(
  message: string,
  status: number,
  code?: string,
  init?: { headers?: Record<string, string> },
): NextResponse {
  return NextResponse.json(
    { error: message, ...(code ? { code } : {}) },
    { status, headers: init?.headers },
  );
}

export const unauthorized = () =>
  apiError("Not signed in.", 401, "UNAUTHORIZED");

export const badRequest = (message = "Invalid request body.") =>
  apiError(message, 400, "BAD_REQUEST");

function hostOf(req: Request): string {
  return (
    req.headers.get("x-forwarded-host") ??
    req.headers.get("host") ??
    ""
  ).toLowerCase();
}

// Same-origin guard for state-changing routes. Browsers send Origin on
// POST/PUT/DELETE; curl/native clients send none (allowed). Rejects only
// an explicit cross-site Origin/Referer in production.
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const candidate = origin ?? referer;
  if (!candidate) return true;
  try {
    const url = new URL(candidate, "http://localhost");
    const candidateHost = url.host.toLowerCase();
    const host = hostOf(req);
    if (!host) return true;
    return candidateHost === host;
  } catch {
    return false;
  }
}

// Returns a 403 response when the request is cross-site, else null.
// Skipped outside production so localhost previews and curl stay usable.
export function rejectIfCrossSite(req: Request): NextResponse | null {
  if (process.env.NODE_ENV !== "production") return null;
  if (isSameOrigin(req)) return null;
  return apiError("Cross-site request rejected.", 403, "FORBIDDEN_ORIGIN");
}
