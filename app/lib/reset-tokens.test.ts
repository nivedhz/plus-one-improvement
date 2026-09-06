import { describe, expect, it } from "vitest";
import {
  RESET_TOKEN_TTL_MS,
  hashResetToken,
  newResetToken,
  resetExpiry,
} from "./reset-tokens";

describe("reset tokens", () => {
  it("lasts 60 minutes", () => {
    expect(RESET_TOKEN_TTL_MS).toBe(60 * 60 * 1000);
    const now = new Date("2026-09-05T12:00:00Z");
    expect(resetExpiry(now)).toEqual(new Date("2026-09-05T13:00:00Z"));
  });

  it("mints unique URL-safe tokens", () => {
    const a = newResetToken();
    const b = newResetToken();
    expect(a).not.toBe(b);
    expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
    // 32 bytes -> 43 base64url chars, safe inside ?token= links.
    expect(a).toHaveLength(43);
  });

  it("hashes deterministically and opaquely", () => {
    const token = newResetToken();
    expect(hashResetToken(token)).toBe(hashResetToken(token));
    expect(hashResetToken(token)).toHaveLength(64);
    expect(hashResetToken(token)).not.toContain(token.slice(0, 8));
  });
});
