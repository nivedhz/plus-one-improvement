import { logger } from "./logger";

// Transactional mail with zero dependencies (plain fetch to Resend).
// Free tier ($0, 3k/mo, 100/day) covers a reset flow at this scale.
// Without RESEND_API_KEY the link is logged server-side instead, so local
// dev and staging verify end-to-end with no credentials at all.

export type MailResult =
  | { sent: true; mode: "resend" }
  | { sent: false; mode: "logged" | "failed" };

function mailConfig(): { apiKey: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESET_FROM_EMAIL;
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

export function passwordResetEmail(toEmail: string, resetUrl: string): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = "Reset your improve. password";
  const text = [
    "Someone requested a password reset for your improve. account.",
    "",
    `Reset it here (valid for 60 minutes, one-time use): ${resetUrl}`,
    "",
    "If that wasn't you, ignore this email — your password stays as it is.",
  ].join("\n");
  const html = [
    `<p>Someone requested a password reset for your improve. account.</p>`,
    `<p><a href="${resetUrl}">Reset your password</a> (valid for 60 minutes, one-time use).</p>`,
    `<p>If that wasn't you, ignore this email — your password stays as it is.</p>`,
  ].join("");
  return { subject, text, html };
}

export async function sendPasswordResetEmail(
  toEmail: string,
  resetUrl: string,
): Promise<MailResult> {
  const config = mailConfig();
  if (!config) {
    // No provider configured — log so dev/staging can still complete the flow.
    logger.info("auth.password_reset.link", { toEmail, resetUrl });
    return { sent: false, mode: "logged" };
  }
  const { subject, text, html } = passwordResetEmail(toEmail, resetUrl);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: config.from, to: [toEmail], subject, text, html }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      logger.error("auth.password_reset.send_failed", {
        toEmail,
        status: res.status,
        detail: detail.slice(0, 200),
      });
      return { sent: false, mode: "failed" };
    }
    return { sent: true, mode: "resend" };
  } catch (err) {
    logger.error("auth.password_reset.send_error", {
      toEmail,
      error: err instanceof Error ? err.message : "unknown",
    });
    return { sent: false, mode: "failed" };
  }
}
