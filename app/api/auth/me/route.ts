import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { apiError } from "../../../lib/http";

export const runtime = "nodejs";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return apiError("Not signed in.", 401, "UNAUTHORIZED");
  }
  return NextResponse.json({ user });
}
