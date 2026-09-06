import { afterEach, describe, expect, it, vi } from "vitest";
import { buildResetEmail, mailerConfig, sendPasswordResetEmail } from "./mailer";

const OLD_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...OLD_ENV };
});

describe("password reset mail", () => {
  it("builds a 60-minute one-time-use message with the link", () => {
    const url = "http://localhost:3000/auth/reset-password?token=abc";
    const { subject, text, html } = buildResetEmail("t@example.com", url);
    expect(subject).toContain("Reset");
    for (const part of [text, html]) {
      expect(part).toContain(url);
      expect(part).toContain("60 minutes");
    }
  });

  it("reports missing config without credentials", () => {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    expect(mailerConfig()).toBeNull();
  });

  it("logs the link when no provider is configured", async () => {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    const result = await sendPasswordResetEmail(
      "t@example.com",
      "http://localhost:3000/auth/reset-password?token=abc",
    );
    expect(result).toEqual({ sent: false, mode: "logged" });
  });

  it("sends through the transporter when given one", async () => {
    const sendMail = vi.fn(async () => ({}));
    const result = await sendPasswordResetEmail(
      "t@example.com",
      "http://localhost:3000/auth/reset-password?token=abc",
      { sendMail } as never,
    );
    expect(result).toEqual({ sent: true, mode: "smtp" });
    expect(sendMail).toHaveBeenCalledOnce();
    const call = sendMail.mock.calls[0];
    expect(call).toBeDefined();
    const payload = (call as unknown[])[0] as { to: string; subject: string };
    expect(payload.to).toBe("t@example.com");
    expect(payload.subject).toContain("Reset");
  });

  it("never throws when sending fails", async () => {
    const sendMail = vi.fn(async () => {
      throw new Error("smtp down");
    });
    const result = await sendPasswordResetEmail("t@example.com", "http://x/y", {
      sendMail,
    } as never);
    expect(result).toEqual({ sent: false, mode: "failed" });
  });
});
