import { describe, expect, it } from "vitest";
import { loginSchema, signUpSchema } from "./auth";

const base = {
  name: "Aarav Menon",
  email: "aarav@example.com",
  password: "password123",
};

describe("signUpSchema stream", () => {
  it("defaults to biology when omitted", () => {
    const parsed = signUpSchema.safeParse(base);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.stream).toBe("biology");
  });

  it("accepts an explicit cs stream", () => {
    const parsed = signUpSchema.safeParse({ ...base, stream: "cs" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.stream).toBe("cs");
  });

  it("rejects unknown streams", () => {
    expect(signUpSchema.safeParse({ ...base, stream: "commerce" }).success).toBe(
      false,
    );
  });

  it("still validates name, email, and password", () => {
    expect(
      signUpSchema.safeParse({ ...base, name: "A", stream: "cs" }).success,
    ).toBe(false);
    expect(
      signUpSchema.safeParse({ ...base, email: "nope", stream: "cs" }).success,
    ).toBe(false);
    expect(
      signUpSchema.safeParse({ ...base, password: "short", stream: "cs" })
        .success,
    ).toBe(false);
  });
});

describe("loginSchema", () => {
  it("ignores stream — login never changes it", () => {
    const parsed = loginSchema.safeParse({
      email: "aarav@example.com",
      password: "password123",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect("stream" in parsed.data).toBe(false);
  });
});
