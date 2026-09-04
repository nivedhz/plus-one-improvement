import { NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import {
  getUserProgressMap,
  progressInputSchema,
  setChapterProgress,
} from "../../lib/progress";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return NextResponse.json({
    progress: await getUserProgressMap(session.id),
  });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = progressInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(
      await setChapterProgress(session.id, parsed.data),
    );
  } catch (err) {
    // Only the catalog guard maps to 400 — real failures must surface as 500.
    if (err instanceof Error && err.message === "Unknown subject or chapter.") {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
