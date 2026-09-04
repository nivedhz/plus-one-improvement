import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "../../lib/auth";
import { getUserStream, isStream, setUserStream } from "../../lib/users";

export const runtime = "nodejs";

const profileSchema = z.object({ stream: z.string().refine(isStream, "Unknown stream.") });

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return NextResponse.json({ stream: await getUserStream(session.id) });
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

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Unknown stream." }, { status: 400 });
  }
  return NextResponse.json({ stream: await setUserStream(session.id, parsed.data.stream) });
}
