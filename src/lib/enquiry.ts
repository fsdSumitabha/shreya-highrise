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

/* Phone numbers are stored as the bare 10 national digits. The form supplies a
   fixed +91 and accepts nothing else, but the API door is open to anyone, so a
   pasted "+91 98300 12345", "09830012345" or "919830012345" all normalise to the
   same thing rather than being rejected on formatting alone.

   Shared with the browser on purpose — this file has no server-only imports, so
   the input sanitiser and the server agree on what a number is by construction. */
export function normalizePhone(input: string): string {
    const digits = input.replace(/\D/g, "");
    // Only strip a prefix when the remainder is exactly a national number:
    // "9198300123" is itself a valid 10-digit number and must survive intact.
    if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
    return digits;
}

/** "9830012345" → "+91 98300 12345". Anything unexpected is returned untouched. */
export const phoneDisplay = (digits: string) =>
    /^\d{10}$/.test(digits) ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : digits;

/** The `tel:` form — no spaces, country code included. */
export const phoneTel = (digits: string) => (/^\d{10}$/.test(digits) ? `+91${digits}` : digits);

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
        phone: normalizePhone(raw("phone")),
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

    /* `phone` arrives already normalised to bare digits, so the only things left
       to judge are length and plausibility. The messages name the actual problem —
       "invalid phone number" tells someone who mistyped one digit nothing.

       The first digit may be 2–9: 6–9 are mobile series, 2–5 are landline STD
       codes. Only 0 and 1 are impossible, and rejecting a landline outright would
       turn a real buyer away. */
    const phone = enquiry.phone;
    if (!phone) {
        errors.phone = "Please add a phone number we can reach you on.";
    } else if (phone.length !== 10) {
        errors.phone =
            phone.length < 10
                ? `An Indian number is 10 digits — that is ${phone.length}.`
                : `An Indian number is 10 digits — that is ${phone.length}. Leave out the +91.`;
    } else if (/^[01]/.test(phone)) {
        errors.phone = "An Indian number does not start with a 0 or a 1.";
    } else if (/^(\d)\1{9}$/.test(phone)) {
        errors.phone = "That does not look like a real number.";
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
