import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "../../lib/auth";
import { apiError, rejectIfCrossSite, unauthorized } from "../../lib/http";
import { MAX_IMPROVEMENT_SUBJECTS } from "../../lib/improvement";
import {
  getImprovementSubjects,
  getUserStream,
  setImprovementSubjects,
} from "../../lib/users";

export const runtime = "nodejs";

const improvementInputSchema = z.object({
  subjects: z.array(z.string().min(1)).max(MAX_IMPROVEMENT_SUBJECTS),
});

export async function GET() {
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }
  const stream = await getUserStream(session.id);
  return NextResponse.json({
    subjects: await getImprovementSubjects(session.id, stream),
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

  const parsed = improvementInputSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Choose up to 3 subjects to improve.", 400, "TOO_MANY_SUBJECTS");
  }

  const stream = await getUserStream(session.id);
  try {
    const subjects = await setImprovementSubjects(
      session.id,
      stream,
      parsed.data.subjects,
    );
    return NextResponse.json({ subjects });
  } catch {
    return apiError(
      "Choose up to 3 subjects from your own stream.",
      400,
      "UNKNOWN_SUBJECT",
    );
  }
}
