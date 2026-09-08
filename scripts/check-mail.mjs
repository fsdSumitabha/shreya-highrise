/* `npm run mail:check` — ask the SMTP server whether it accepts the credentials
   in .env.local, without sending anything or submitting a form.
   Never prints SMTP_PASS; only its length and shape. */

import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const envFile = [".env.local", ".env"].find((f) => fs.existsSync(f));
if (!envFile) {
    console.error("No .env.local found. Copy .env.example to .env.local first.");
    process.exit(1);
}

for (const line of fs.readFileSync(path.resolve(envFile), "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !line.trimStart().startsWith("#")) {
        process.env[match[1]] ??= match[2].replace(/^["']|["']$/g, "");
    }
}

const missing = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k]?.trim());
if (missing.length) {
    console.error(`Missing in ${envFile}: ${missing.join(", ")}`);
    process.exit(1);
}

const port = Number(process.env.SMTP_PORT);
const pass = process.env.SMTP_PASS;
const stripped = pass.replace(/\s/g, "");

console.log(`${envFile}`);
console.log(`  host  ${process.env.SMTP_HOST}:${port}  (secure: ${port === 465})`);
console.log(`  user  ${process.env.SMTP_USER}`);
console.log(`  pass  ${stripped.length} characters`);

if (/gmail|google/.test(process.env.SMTP_HOST ?? "") && stripped.length !== 16) {
    console.log(
        `\n  ⚠ A Gmail App Password is exactly 16 characters — this one is ${stripped.length}.` +
            `\n    Create one at https://myaccount.google.com/apppasswords (2-Step Verification must be on).` +
            `\n    A normal account password will always be rejected.`,
    );
}

try {
    await nodemailer
        .createTransport({
            host: process.env.SMTP_HOST,
            port,
            secure: port === 465,
            auth: { user: process.env.SMTP_USER, pass },
        })
        .verify();
    console.log("\n✓ SMTP accepted the credentials. The enquiry form can send.");
} catch (error) {
    console.log(`\n✗ SMTP rejected the connection — ${error.code ?? "error"} ${error.responseCode ?? ""}`);
    console.log(`  ${error.message}`);
    process.exitCode = 1;
}
