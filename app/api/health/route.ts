import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Liveness + DB readiness for uptime monitors and deploy checks.
export async function GET() {
  let database: "up" | "down" = "down";
  try {
    await db.$queryRaw`SELECT 1`;
    database = "up";
  } catch {
    database = "down";
  }
  const status = database === "up" ? "ok" : "degraded";
  return NextResponse.json(
    { status, database, time: new Date().toISOString() },
    { status: database === "up" ? 200 : 503 },
  );
}
