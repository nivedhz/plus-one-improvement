import { NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import {
  computePriorities,
  getUserMarks,
  marksInputSchema,
  saveUserMarks,
} from "../../lib/marks";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const marks = await getUserMarks(session.id);
  return NextResponse.json({ marks, priorities: computePriorities(marks) });
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

  const parsed = marksInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }

  try {
    const priorities = await saveUserMarks(session.id, parsed.data);
    return NextResponse.json({
      marks: parsed.data.marks,
      priorities,
    });
  } catch {
    return NextResponse.json(
      { error: "No known subjects submitted." },
      { status: 400 },
    );
  }
}
