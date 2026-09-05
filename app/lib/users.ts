import type { User } from "../../prisma/generated/client";
import { db } from "./db";

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

export function toPublicUser(user: User): {
  id: string;
  name: string;
  email: string;
} {
  return { id: user.id, name: user.name, email: user.email };
}
