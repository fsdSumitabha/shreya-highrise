/* Shape, parsing and validation for every enquiry the site collects.

   Deliberately free of server-only imports: the server action, the route
   handler and (if it is ever needed) a client-side check can all share this
   file. Delivery lives in `enquiry-email.ts`, which is server-only. */

/** Which desk an enquiry belongs to. Adding a kind here routes it in `enquiry-email.ts`. */
export type EnquiryKind = "sales" | "projects";

export type Enquiry = {
    kind: EnquiryKind;
    name: string;
    phone: string;
    email: string;
    project: string;
    configuration: string;
    budget: string;
    timeline: string;
    purpose: string;
    visitOn: string;
    message: string;
    consent: boolean;
    /** Set at parse time on the server — never trusted from the request body. */
    receivedAt: string;
};

/** Field-keyed messages, so a form can show each one against its own input. */
export type EnquiryErrors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

/** Admin-email row labels. Also the order the rows are printed in. */
export const enquiryLabels: Record<string, string> = {
    project: "Project of interest",
    configuration: "Configuration",
    budget: "Budget",
    timeline: "Possession needed",
    purpose: "Buying to",
    visitOn: "Preferred site visit",
};

/* Values from the form end up in mail headers (subject, Reply-To). A carriage
   return smuggled into one of those is the classic header-injection trick, so
   every single-line value is flattened before it goes anywhere near nodemailer. */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/** Digits only — the form accepts "+91 89103 55765" and similar spacing. */
export const phoneDigits = (phone: string) => phone.replace(/\D/g, "");

/**
 * Normalise an untrusted payload — `FormData` from the enquiry form, or a JSON
 * body posted to the API — into an `Enquiry`. Missing keys become empty strings
 * rather than `undefined`, so the templates never have to guard for both.
 */
export function parseEnquiry(source: FormData | Record<string, unknown>): Enquiry {
    const raw = (key: string): string => {
        const value = source instanceof FormData ? source.get(key) : source[key];
        if (typeof value === "string") return singleLine(value);
        if (typeof value === "number") return String(value);
        return "";
    };

    const consent = source instanceof FormData ? source.get("consent") : source.consent;
    const kind = raw("kind") === "projects" ? "projects" : "sales";

    return {
        kind,
        name: raw("name"),
        phone: raw("phone"),
        email: raw("email").toLowerCase(),
        project: raw("project"),
        configuration: raw("configuration"),
        budget: raw("budget"),
        timeline: raw("timeline"),
        purpose: raw("purpose"),
        visitOn: raw("visitOn"),
        // The only field allowed to keep its line breaks; the templates escape it.
        message: (source instanceof FormData
            ? String(source.get("message") ?? "")
            : String(source.message ?? "")
        ).trim(),
        consent: consent === "yes" || consent === true || consent === "true",
        receivedAt: new Date().toISOString(),
    };
}

/** Empty object means the enquiry is safe to deliver. */
export function validateEnquiry(enquiry: Enquiry): EnquiryErrors {
    const errors: EnquiryErrors = {};

    if (enquiry.name.length < 2) {
        errors.name = "Please tell us your name.";
    }

    const digits = phoneDigits(enquiry.phone);
    if (digits.length < 10 || digits.length > 15) {
        errors.phone = "Please enter a phone number we can reach you on.";
    }

    /* Email is optional, but it becomes the Reply-To header and the address the
       confirmation is sent to, so anything present has to actually parse. */
    if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) {
        errors.email = "That email address does not look right.";
    }

    if (!enquiry.consent) {
        errors.consent = "We need your permission before we can call you.";
    }

    return errors;
}
