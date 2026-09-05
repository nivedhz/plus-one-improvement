import { NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import { apiError, rejectIfCrossSite, unauthorized } from "../../lib/http";
import {
  getUserProgressMap,
  progressInputSchema,
  setChapterProgress,
} from "../../lib/progress";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }
  return NextResponse.json({
    progress: await getUserProgressMap(session.id),
  });
}

export async function PUT(req: Request) {
  const crossSite = rejectIfCrossSite(req);
  if (crossSite) return crossSite;
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid request body.", 400, "BAD_REQUEST");
  }

  const parsed = progressInputSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  try {
    return NextResponse.json(
      await setChapterProgress(session.id, parsed.data),
    );
  } catch (err) {
    // Only the catalog guard maps to 400 — real failures must surface as 500.
    if (err instanceof Error && err.message === "Unknown subject or chapter.") {
      return apiError(err.message, 400, "UNKNOWN_CHAPTER");
    }
    throw err;
  }
}
