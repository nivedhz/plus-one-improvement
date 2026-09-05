import "dotenv/config";
import { defineConfig } from "prisma/config";

// `generate` only parses this URL and never connects, so CI and fresh
// clones without a .env get a well-formed dummy. Any command that truly
// needs the database (db push, migrate) will still fail loudly if the real
// DATABASE_URL is missing.
const databaseUrl =
  process.env.DATABASE_URL || "postgresql://user:pass@localhost:5432/db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
