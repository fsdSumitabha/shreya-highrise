import "server-only";

import { getTransporter, missingMailEnv } from "@/lib/mail-transporter";
import { enquiryLabels, phoneDisplay, phoneTel, type Enquiry, type EnquiryKind } from "@/lib/enquiry";
import { site } from "@/data/site";

export type DeliveryResult =
    { ok: true } | { ok: false; reason: "unconfigured" | "send-failed"; detail: string };

/* Which inbox each kind lands in. Env wins so the client can move a desk without
   a deploy; the addresses in `site.ts` are the fallback because they are already
   the ones printed on the contact page. */
const desk = (kind: EnquiryKind): string => {
    if (kind === "projects") return process.env.EMAIL_TO_PROJECTS?.trim() || site.emails.projects;
    return process.env.EMAIL_TO_SALES?.trim() || site.emails.sales;
};

const deskName = (kind: EnquiryKind) => (kind === "projects" ? "projects desk" : "sales desk");

/* Gmail (and most providers) rewrite or reject a From that is not the account
   that authenticated, so the authenticated user is the only safe default. */
const sender = () => process.env.EMAIL_FROM?.trim() || process.env.SMTP_USER!.trim();

const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stamp = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
    });

const visitDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-IN", { dateStyle: "full", timeZone: "Asia/Kolkata" });
};

/* Tables, inline styles and no flexbox — Outlook still renders neither flex nor
   grid, and a lead that arrives unreadable is a lead lost. */
const row = (label: string, value: string) => `
    <tr>
        <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escape(label)}</td>
        <td style="padding:8px 0;color:#111827;font-size:15px;vertical-align:top;">${value}</td>
    </tr>`;

/** What the desk receives. Every answered field becomes a row; blanks are dropped. */
function deskEmail(enquiry: Enquiry) {
    const detail = Object.entries(enquiryLabels)
        .map(([key, label]) => {
            const value = enquiry[key as keyof Enquiry];
            if (typeof value !== "string" || !value) return "";
            return row(label, escape(key === "visitOn" ? visitDate(value) : value));
        })
        .join("");

    const subject = enquiry.project
        ? `New enquiry — ${enquiry.name} · ${enquiry.project}`
        : `New enquiry — ${enquiry.name}`;

    const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;">
    <tr><td style="padding:28px 32px;border-bottom:2px solid #c8a96b;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#6b7280;">${escape(site.name)} — ${deskName(enquiry.kind)}</p>
        <h1 style="margin:0;font-size:22px;font-weight:600;color:#111827;">New enquiry from ${escape(enquiry.name)}</h1>
    </td></tr>
    <tr><td style="padding:24px 32px 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${row("Phone", `<a href="tel:${escape(phoneTel(enquiry.phone))}" style="color:#111827;font-weight:600;text-decoration:none;">${escape(phoneDisplay(enquiry.phone))}</a>`)}
            ${enquiry.email ? row("Email", `<a href="mailto:${escape(enquiry.email)}" style="color:#8a6d2f;">${escape(enquiry.email)}</a>`) : ""}
            ${detail}
        </table>
    </td></tr>
    ${
        enquiry.message
            ? `<tr><td style="padding:8px 32px 24px;">
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">In their words</p>
        <div style="padding:14px 16px;background:#fafafa;border-left:3px solid #c8a96b;font-size:15px;color:#111827;line-height:1.6;">${escape(enquiry.message).replace(/\n/g, "<br>")}</div>
    </td></tr>`
            : ""
    }
    <tr><td style="padding:18px 32px;background:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;color:#6b7280;">
        Received ${stamp(enquiry.receivedAt)} IST · consent to contact given${enquiry.email ? " · reply to this mail to answer them directly" : ""}
    </td></tr>
</table>
</body></html>`;

    const text = [
        `New enquiry — ${deskName(enquiry.kind)}`,
        "",
        `Name:  ${enquiry.name}`,
        `Phone: ${phoneDisplay(enquiry.phone)}`,
        enquiry.email ? `Email: ${enquiry.email}` : "",
        ...Object.entries(enquiryLabels).map(([key, label]) => {
            const value = enquiry[key as keyof Enquiry];
            return typeof value === "string" && value ? `${label}: ${value}` : "";
        }),
        enquiry.message ? `\nMessage:\n${enquiry.message}` : "",
        "",
        `Received ${stamp(enquiry.receivedAt)} IST`,
    ]
        .filter(Boolean)
        .join("\n");

    return { subject, html, text };
}

/** The acknowledgement the enquirer gets, mirroring the promise made on the page. */
function confirmationEmail(enquiry: Enquiry) {
    const phone = site.phones[0];
    const steps = [
        ["We read it, not a bot", "Your enquiry is with the sales desk directly — not a call-centre queue."],
        [
            "One call, within a working day",
            "We ask what you are actually looking for, then send only the projects that fit it, with the full cost sheet attached.",
        ],
        [
            "A visit, if you want one",
            "A project engineer meets you at the gate. Weekend slots fill first, so pick two times if you can.",
        ],
    ];

    const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;">
    <tr><td style="padding:32px 32px 24px;border-bottom:2px solid #c8a96b;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8a6d2f;">Enquiry received</p>
        <h1 style="margin:0;font-size:26px;font-weight:300;color:#111827;">Thank you — we have it.</h1>
    </td></tr>
    <tr><td style="padding:28px 32px 8px;font-size:15px;line-height:1.65;color:#374151;">
        <p style="margin:0 0 20px;">Hello ${escape(enquiry.name)},</p>
        <p style="margin:0 0 24px;">Your enquiry${enquiry.project ? ` about <strong>${escape(enquiry.project)}</strong>` : ""} has reached our ${deskName(enquiry.kind)}. Here is what happens next.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${steps
                .map(
                    ([title, body], index) => `<tr>
                <td style="padding:0 14px 20px 0;font-size:13px;color:#c8a96b;vertical-align:top;">0${index + 1}</td>
                <td style="padding:0 0 20px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#111827;">${title}</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#6b7280;">${body}</p>
                </td></tr>`,
                )
                .join("")}
        </table>
    </td></tr>
    <tr><td style="padding:8px 32px 28px;font-size:15px;line-height:1.65;color:#374151;">
        <p style="margin:0 0 10px;">Would rather just talk?</p>
        <p style="margin:0 0 6px;"><a href="tel:${escape(phone.tel)}" style="font-size:22px;color:#111827;text-decoration:none;">${escape(phone.display)}</a></p>
        <p style="margin:0;font-size:13px;color:#6b7280;">${escape(site.hours)}</p>
    </td></tr>
    <tr><td style="padding:18px 32px;background:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;line-height:1.6;color:#6b7280;">
        We do not sell, share or resell your number. One follow-up call, and we stop if you tell us to.<br>
        <strong>${escape(site.name)}</strong> · ${escape(site.locality)}
    </td></tr>
</table>
</body></html>`;

    const text = [
        `Hello ${enquiry.name},`,
        "",
        `Your enquiry${enquiry.project ? ` about ${enquiry.project}` : ""} has reached our ${deskName(enquiry.kind)}.`,
        "",
        ...steps.map(([title, body], index) => `0${index + 1}  ${title}\n    ${body}`),
        "",
        `Would rather just talk? ${phone.display} — ${site.hours}`,
        "",
        "We do not sell, share or resell your number. One follow-up call, and we stop if you tell us to.",
        site.name,
    ].join("\n");

    return { subject: `We have your enquiry — ${site.name}`, html, text };
}

/**
 * Send the enquiry to the desk, then acknowledge it to the enquirer.
 *
 * Only the desk mail decides the result. If the acknowledgement bounces the lead
 * has still landed where it needs to, and failing the submission over it would
 * make the visitor send everything twice.
 */
export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
    const missing = missingMailEnv();
    if (missing.length > 0) {
        return { ok: false, reason: "unconfigured", detail: `missing env: ${missing.join(", ")}` };
    }

    const from = `"${site.name}" <${sender()}>`;
    const desk_ = deskEmail(enquiry);

    try {
        await getTransporter().sendMail({
            from,
            to: desk(enquiry.kind),
            // Hitting reply in the inbox answers the buyer, not the SMTP account.
            replyTo: enquiry.email || undefined,
            subject: desk_.subject,
            text: desk_.text,
            html: desk_.html,
        });
    } catch (error) {
        return {
            ok: false,
            reason: "send-failed",
            detail: error instanceof Error ? error.message : String(error),
        };
    }

    if (enquiry.email) {
        const ack = confirmationEmail(enquiry);
        try {
            await getTransporter().sendMail({
                from,
                to: enquiry.email,
                replyTo: desk(enquiry.kind),
                subject: ack.subject,
                text: ack.text,
                html: ack.html,
            });
        } catch (error) {
            console.error("[enquiry] acknowledgement failed, lead is safe at the desk:", error);
        }
    }

    return { ok: true };
}
