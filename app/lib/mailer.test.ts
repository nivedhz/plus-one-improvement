import { afterEach, describe, expect, it, vi } from "vitest";
import { passwordResetEmail, sendPasswordResetEmail } from "./mailer";

const OLD_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...OLD_ENV };
  vi.unstubAllGlobals();
});

describe("password reset mail", () => {
  it("builds a 60-minute one-time-use message with the link", () => {
    const url = "http://localhost:3000/auth/reset-password?token=abc";
    const { subject, text, html } = passwordResetEmail("t@example.com", url);
    expect(subject).toContain("Reset");
    for (const part of [text, html]) {
      expect(part).toContain(url);
      expect(part).toContain("60 minutes");
    }
  });

  it("logs the link when no provider is configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESET_FROM_EMAIL;
    const result = await sendPasswordResetEmail(
      "t@example.com",
      "http://localhost:3000/auth/reset-password?token=abc",
    );
    expect(result).toEqual({ sent: false, mode: "logged" });
  });

  it("calls Resend when configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESET_FROM_EMAIL = "improve@example.com";
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendPasswordResetEmail(
      "t@example.com",
      "http://localhost:3000/auth/reset-password?token=abc",
    );
    expect(result).toEqual({ sent: true, mode: "resend" });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      url: string,
      init: RequestInit,
    ];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer re_test",
    );
  });

  it("never throws when Resend fails", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESET_FROM_EMAIL = "improve@example.com";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 500 })),
    );
    const result = await sendPasswordResetEmail("t@example.com", "http://x/y");
    expect(result).toEqual({ sent: false, mode: "failed" });
  });
});
