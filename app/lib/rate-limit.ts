// Tiny in-memory rate limiter for auth endpoints (brute-force protection).
// Single-process only — replace with Redis/Upstash when running more than
// one server instance.

// The limiter only runs in production. Development stays unlimited so local
// testing (where every client shares one localhost IP) never gets locked out.
export function isRateLimitEnabled(): boolean {
  return process.env.NODE_ENV === "production";
}

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

export function rateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= maxAttempts) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  entry.count += 1;
  return { ok: true };
}

// Best-effort client IP for logging/bucketing behind proxies.
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
