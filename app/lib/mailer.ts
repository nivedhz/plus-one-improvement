import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { logger } from "./logger";

// Transactional mail over Gmail SMTP (free, no new sending service).
// Without SMTP_USER/SMTP_PASS the reset link is logged server-side
// instead, so local dev and staging verify end-to-end with no credentials.

export type MailResult =
  { sent: true; mode: "smtp" } | { sent: false; mode: "logged" | "failed" };

export function mailerConfig(): { user: string; pass: string } | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return { user, pass };
}

export function buildResetEmail(
  toEmail: string,
  resetUrl: string,
): { subject: string; text: string; html: string } {
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

function createTransporter(user: string, pass: string): Transporter {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
}

export async function sendPasswordResetEmail(
  toEmail: string,
  resetUrl: string,
  transport?: Transporter,
): Promise<MailResult> {
  const config = mailerConfig();
  if (!config && !transport) {
    // No provider configured — log so dev/staging can still complete the flow.
    logger.info("auth.password_reset.link", { toEmail, resetUrl });
    return { sent: false, mode: "logged" };
  }
  const from = config?.user ?? toEmail;
  const { subject, text, html } = buildResetEmail(toEmail, resetUrl);
  try {
    const sender = transport ?? createTransporter(config!.user, config!.pass);
    await sender.sendMail({ from, to: toEmail, subject, text, html });
    return { sent: true, mode: "smtp" };
  } catch (err) {
    logger.error("auth.password_reset.send_failed", {
      toEmail,
      error: err instanceof Error ? err.message : "unknown",
    });
    return { sent: false, mode: "failed" };
  }
}
