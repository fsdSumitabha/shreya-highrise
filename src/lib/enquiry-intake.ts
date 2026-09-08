import "server-only";

import { parseEnquiry, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { deliverEnquiry } from "@/lib/enquiry-email";

export type IntakeResult =
    | { status: "ok"; enquiry: Enquiry }
    | { status: "invalid"; errors: EnquiryErrors }
    | { status: "failed"; reason: "unconfigured" | "send-failed" };

/**
 * The one path an enquiry takes into the business, whichever door it came
 * through — the form's server action or a POST to `/api/enquiry`. Keeping both
 * on this function is what stops the two from validating differently.
 */
export async function intakeEnquiry(source: FormData | Record<string, unknown>): Promise<IntakeResult> {
    const enquiry = parseEnquiry(source);

    const errors = validateEnquiry(enquiry);
    if (Object.keys(errors).length > 0) return { status: "invalid", errors };

    const delivery = await deliverEnquiry(enquiry);

    if (!delivery.ok) {
        /* A lead that reached us and then evaporated because SMTP was down is the
           worst outcome here — it is money, and the visitor believes we have it.
           Log the whole thing so it can be recovered from the server log, and let
           the caller tell them plainly that it did not go through. */
        console.error(
            `[enquiry] DELIVERY FAILED (${delivery.reason}: ${delivery.detail}) — lead follows:`,
            JSON.stringify(enquiry),
        );
        return { status: "failed", reason: delivery.reason };
    }

    return { status: "ok", enquiry };
}
