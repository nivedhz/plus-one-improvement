import { z } from "zod";

// Central env validation. Called lazily so `next dev` without a real
// DATABASE_URL still boots pages that don't touch the DB, while auth
// fails fast with a clear message instead of minting weak tokens.
const DEV_AUTH_SECRET = "dev-only-secret-change-me-in-production-0123456789";

const envSchema = z.object({
  AUTH_SECRET: z.string().optional(),
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().or(z.literal("").optional()),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  // Optional: without these, reset links are logged server-side (dev) or
  // fail closed with a server log (production). Resend free tier ($0)
  // covers this flow.
  RESEND_API_KEY: z.string().min(1).optional(),
  RESET_FROM_EMAIL: z.string().email().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

export function getEnv(): AppEnv {
  return envSchema.parse(process.env);
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

// AUTH_SECRET must be 32+ chars in production. In development a clearly
// labelled fallback is allowed so local boot never needs a secret; any
// token minted with it is worthless outside localhost.
export function getAuthSecret(): string {
  const raw = process.env.AUTH_SECRET;
  if (!raw) {
    if (isProduction()) {
      throw new Error("AUTH_SECRET must be set to a 32+ character string.");
    }
    console.warn("[auth] AUTH_SECRET unset — using dev-only fallback.");
    return DEV_AUTH_SECRET;
  }
  if (raw.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters long.");
  }
  return raw;
}

export function getAuthSecretBytes(): Uint8Array {
  return new TextEncoder().encode(getAuthSecret());
}
