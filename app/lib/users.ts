import type { User } from "../../prisma/generated/client";
import { db } from "./db";
import { orphanedSlugs, sanitizeTrio } from "./improvement";
import { getSubject, subjectsForStream } from "./subjects";

// User persistence backed by Postgres via Prisma.
// Same function names as the old dev store, so API routes are unchanged
// apart from awaiting these calls.

export type StoredUser = User;

export async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function revokeUserSessions(userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
}

// New hash plus a tokenVersion bump so every other session dies — the same
// revocation semantics as logout. Returns the updated row for session mint.
export async function setUserPassword(
  userId: string,
  passwordHash: string,
): Promise<User> {
  return db.user.update({
    where: { id: userId },
    data: { passwordHash, tokenVersion: { increment: 1 } },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id } });
}

export const STREAMS = ["cs", "biology"] as const;
export type Stream = (typeof STREAMS)[number];

export function isStream(value: unknown): value is Stream {
  return value === "cs" || value === "biology";
}

export async function getUserStream(userId: string): Promise<Stream> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { stream: true },
  });
  return isStream(user?.stream) ? user.stream : "biology";
}

export async function setUserStream(userId: string, stream: Stream): Promise<Stream> {
  const user = await db.user.update({
    where: { id: userId },
    data: { stream },
    select: { stream: true },
  });
  return isStream(user.stream) ? user.stream : "biology";
}

// Washup: drop saved marks for subjects outside the new stream so stale
// rows can never render as ghost priorities. Chapter progress is kept —
// it is filtered by slug everywhere and restores on switch-back.
export async function purgeOutOfStreamMarks(
  userId: string,
  stream: Stream,
): Promise<number> {
  const slugs = subjectsForStream(stream).map((s) => s.slug);
  const gone = await db.previousMark.deleteMany({
    where: { userId, subject: { notIn: slugs } },
  });
  return gone.count;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  stream?: Stream;
}): Promise<User> {
  return db.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash: input.passwordHash,
      stream: input.stream ?? "biology",
    },
  });
}

export async function getImprovementSubjects(
  userId: string,
  stream: string,
): Promise<string[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { improvementSubjects: true },
  });
  return sanitizeTrio(user?.improvementSubjects ?? [], stream);
}

// Validates against the student's current stream, then replaces the list
// wholesale (empty array clears the choice).
export async function setImprovementSubjects(
  userId: string,
  stream: string,
  slugs: string[],
): Promise<string[]> {
  // sanitizeTrio drops dupes, unknowns, out-of-stream slugs and caps at 3 —
  // so any length mismatch means the input broke one of those rules.
  const clean = sanitizeTrio(slugs, stream);
  if (clean.length !== slugs.length) {
    throw new Error("Choose up to 3 subjects from your own stream.");
  }
  await db.user.update({
    where: { id: userId },
    data: { improvementSubjects: clean },
  });
  return clean;
}

// Display names of stored picks that fell out of the current stream.
// Unknown slugs fall back to the raw slug so nothing renders blank.
export async function getImprovementOrphans(
  userId: string,
  stream: string,
): Promise<string[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { improvementSubjects: true },
  });
  return orphanedSlugs(user?.improvementSubjects ?? [], stream).map(
    (slug) => getSubject(slug)?.name ?? slug,
  );
}

export function toPublicUser(user: User): {
  id: string;
  name: string;
  email: string;
} {
  return { id: user.id, name: user.name, email: user.email };
}
