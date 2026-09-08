"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { intakeEnquiry } from "@/lib/enquiry-intake";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import type { EnquiryErrors } from "@/lib/enquiry";

export type EnquiryFormState = {
    status: "idle" | "invalid" | "error";
    /** Shown as a banner above the form. */
    message?: string;
    /** Per-field messages, rendered against their own inputs. */
    errors?: EnquiryErrors;
    /* React clears an uncontrolled form once its action resolves, so anything the
       visitor typed has to be handed back for `defaultValue` — losing a filled-in
       form to a failed send would be worse than the failure. */
    values?: Record<string, string>;
};

const keep = (formData: FormData): Record<string, string> => {
    const values: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
        if (typeof value === "string") values[key] = value;
    }
    return values;
};

/**
 * Enquiry form handler, shaped for `useActionState`.
 *
 * Only a delivered enquiry redirects to the thank-you page. A validation problem
 * or a failed send comes back as state so the form can say so — silently thanking
 * someone for a lead that never arrived is the one outcome worth ruling out.
 */
export async function submitEnquiry(
    _previous: EnquiryFormState,
    formData: FormData,
): Promise<EnquiryFormState> {
    const limit = rateLimit(clientKey(await headers()));
    if (!limit.allowed) {
        return {
            status: "error",
            message: "That is a few enquiries in a short while. Give it a few minutes, or just call us.",
            values: keep(formData),
        };
    }

    const result = await intakeEnquiry(formData);

    if (result.status === "invalid") {
        return {
            status: "invalid",
            message: "Almost — a couple of things need fixing.",
            errors: result.errors,
            values: keep(formData),
        };
    }

    if (result.status === "failed") {
        return {
            status: "error",
            message:
                result.reason === "unconfigured"
                    ? "Our mail service is not reachable right now, so this did not send. Please call or WhatsApp us — the number is just below."
                    : "Something went wrong sending this and it did not reach us. Please try again, or call the sales desk directly.",
            values: keep(formData),
        };
    }

    // Outside any try/catch — `redirect` works by throwing.
    redirect("/contact/thank-you");
}
