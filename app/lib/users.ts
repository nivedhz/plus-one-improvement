import type { User } from "@prisma/client";
import { db } from "./db";

// User persistence backed by Postgres via Prisma.
// Same function names as the old dev store, so API routes are unchanged
// apart from awaiting these calls.

export type StoredUser = User;

export async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User> {
  return db.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash: input.passwordHash,
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
