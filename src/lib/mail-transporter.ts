import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

export function missingMailEnv(): string[] {
  return REQUIRED.filter((key) => !process.env[key]?.trim());
}

export function getTransporter(): Transporter {
  const missing = missingMailEnv();
  if (missing.length > 0) {
    throw new Error(`Mail is not configured — missing env: ${missing.join(", ")}`);
  }

  if (!cached) {
    const port = Number(process.env.SMTP_PORT);
    cached = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return cached;
}
