import { createHash, randomBytes } from "node:crypto";
import { db } from "./db";

// Node-only module (node:crypto + Prisma): import from Route Handlers and
// server components, never from Edge proxy or client islands.
//
// Shape mirrors the pre-existing `password_reset_tokens` table (no purpose
// or usedAt columns): consuming a token deletes its row, so single-use is
// structural — a consumed token simply no longer exists.

export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 60 minutes

// 32 random bytes as base64url — unguessable and URL-safe for ?token= links.
export function newResetToken(): string {
  return randomBytes(32).toString("base64url");
}

// SHA-256 hex of the opaque token. Stored in the DB so a leak of the
// table alone can never redeem a reset.
export function hashResetToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function resetExpiry(now = new Date()): Date {
  return new Date(now.getTime() + RESET_TOKEN_TTL_MS);
}

// Issues a fresh token, deleting any earlier ones for this user so only
// the newest link ever works.
export async function issueResetToken(
  userId: string,
  now = new Date(),
): Promise<{ token: string; expiresAt: Date }> {
  const token = newResetToken();
  const expiresAt = new Date(now.getTime() + RESET_TOKEN_TTL_MS);
  await db.$transaction([
    db.passwordResetToken.deleteMany({ where: { userId } }),
    db.passwordResetToken.create({
      data: { userId, tokenHash: hashResetToken(token), expiresAt },
    }),
  ]);
  return { token, expiresAt };
}

// Consumes a token by deleting its row and returns the owner. Unknown and
// expired tokens are indistinguishable (both return null) so callers can't
// leak which failure occurred. A parallel race loses the delete and reads
// as consumed.
export async function consumeResetToken(
  token: string,
): Promise<{ userId: string } | null> {
  const tokenHash = hashResetToken(token);
  const row = await db.passwordResetToken.findUnique({
    where: { tokenHash },
    select: { id: true, userId: true, expiresAt: true },
  });
  if (!row || row.expiresAt <= new Date()) return null;
  const gone = await db.passwordResetToken.deleteMany({
    where: { id: row.id },
  });
  if (gone.count === 0) return null;
  return { userId: row.userId };
}
