"use server";

import { redirect } from "next/navigation";

/**
 * Enquiry form handler.
 *
 * ⚠️ NOT WIRED TO A DESTINATION YET — see CLIENT-DATA.md § "Contact page".
 * The client has not told us where enquiries should land (shared inbox? CRM? WhatsApp
 * for Business?). Until they do, a submission is validated and written to the server
 * log only. Wire this to the real destination before go-live, and delete this notice.
 */
export async function submitEnquiry(formData: FormData) {
    const read = (key: string) => String(formData.get(key) ?? "").trim();

    const enquiry = {
        name: read("name"),
        phone: read("phone"),
        email: read("email"),
        project: read("project"),
        message: read("message"),
        configuration: read("configuration"),
        budget: read("budget"),
        timeline: read("timeline"),
        purpose: read("purpose"),
        visitOn: read("visitOn"),
        consent: formData.get("consent") === "yes",
        receivedAt: new Date().toISOString(),
    };

    const digits = enquiry.phone.replace(/\D/g, "");
    const valid = enquiry.name.length > 1 && digits.length >= 10 && enquiry.consent;

    if (!valid) redirect("/contact/thank-you?status=incomplete");

    // TODO: replace with the real destination (transactional email / CRM webhook).
    console.info("[enquiry]", enquiry);

    redirect("/contact/thank-you");
}
