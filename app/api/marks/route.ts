import { NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import { apiError, rejectIfCrossSite, unauthorized } from "../../lib/http";
import {
  computePriorities,
  getUserMarks,
  marksInputSchema,
  saveUserMarks,
} from "../../lib/marks";
import { subjectsForStream } from "../../lib/subjects";
import { getUserStream } from "../../lib/users";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }
  // Stream-filtered: out-of-stream rows (pre-washup leftovers included)
  // can never render as ghost priorities.
  const stream = await getUserStream(session.id);
  const valid = new Set(subjectsForStream(stream).map((s) => s.slug));
  const marks = (await getUserMarks(session.id)).filter((m) => valid.has(m.subject));
  return NextResponse.json({ marks, priorities: computePriorities(marks) });
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

  const parsed = marksInputSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message ?? "Invalid details.",
      400,
      "BAD_REQUEST",
    );
  }

  try {
    const priorities = await saveUserMarks(session.id, parsed.data);
    return NextResponse.json({
      marks: parsed.data.marks,
      priorities,
    });
  } catch {
    return apiError("No known subjects submitted.", 400, "UNKNOWN_SUBJECT");
  }
}
