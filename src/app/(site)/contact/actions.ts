"use server";

import { redirect } from "next/navigation";

export async function submitEnquiry(formData: FormData) {
    const read = (key: string) => String(formData.get(key) ?? "").trim();

    const name = read("name");
    const phone = read("phone");
    const email = read("email");
    const consent = formData.get("consent") === "yes";

    const digits = phone.replace(/\D/g, "");
    const valid = name.length > 1 && digits.length >= 10 && consent;

    if (!valid) {
        redirect("/contact/thank-you?status=incomplete");
    }

    const enquiryData = {
        name,
        phone,
        email: email || undefined,
        project: read("project") || undefined,
        message: read("message") || undefined,
        configuration: read("configuration") || undefined,
        budget: read("budget") || undefined,
        timeline: read("timeline") || undefined,
        purpose: read("purpose") || undefined,
        visitOn: read("visitOn") || undefined,
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/contact/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enquiryData),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("[Enquiry Submission Error]", error);
        }
    } catch (error) {
        console.error("[Enquiry API Error]", error);
    }

    redirect("/contact/thank-you");
}
