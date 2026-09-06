import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "../../lib/auth";
import { apiError, rejectIfCrossSite, unauthorized } from "../../lib/http";
import {
  getUserStream,
  isStream,
  purgeOutOfStreamMarks,
  setUserStream,
} from "../../lib/users";

export const runtime = "nodejs";

const profileSchema = z.object({
  stream: z.string().refine(isStream, "Unknown stream."),
});

export async function GET() {
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }
  return NextResponse.json({ stream: await getUserStream(session.id) });
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

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Unknown stream.", 400, "UNKNOWN_STREAM");
  }
  const stream = await setUserStream(session.id, parsed.data.stream);
  await purgeOutOfStreamMarks(session.id, stream);
  return NextResponse.json({ stream });
}
