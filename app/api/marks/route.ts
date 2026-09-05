import { NextResponse } from "next/server";
import { getSession } from "../../lib/auth";
import { apiError, rejectIfCrossSite, unauthorized } from "../../lib/http";
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
    return unauthorized();
  }
  const marks = await getUserMarks(session.id);
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
