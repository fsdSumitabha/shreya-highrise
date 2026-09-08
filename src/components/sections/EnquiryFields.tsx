"use client";

import { useActionState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/(site)/contact/actions";
import { normalizePhone } from "@/lib/enquiry";
import { enquiryFields } from "@/data/contact";
import { site } from "@/data/site";

/* The form is a Client Component purely so a failed send can say so. Everything
   around it — the heading, the promise panel — stays on the server.

   The initial state lives here rather than beside the action: a "use server"
   module may only export async functions, so a plain object there is a trap. */

const idle: EnquiryFormState = { status: "idle" };

/* Keep the phone box to ten bare digits as it is typed, so a stray space or a
   letter can never reach the server in the first place. `normalizePhone` is the
   same function the server validates with — importing it here rather than
   rewriting the rule is the point of keeping `lib/enquiry.ts` server-free. It
   also means pasting "+91 98300 12345" lands correctly instead of being
   truncated to the first ten characters. */
const sanitizePhone = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const cleaned = normalizePhone(input.value).slice(0, 10);
    if (cleaned === input.value) return;

    // Put the caret back where the typing was, counted in digits.
    const caret = input.selectionStart ?? input.value.length;
    const digitsBefore = input.value.slice(0, caret).replace(/\D/g, "").length;
    input.value = cleaned;
    const next = Math.min(digitsBefore, cleaned.length);
    input.setSelectionRange(next, next);
};

const control =
    "w-full border border-slate-900/20 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500 dark:border-stone-100/20 dark:bg-navy-950/50 dark:text-stone-100 dark:placeholder:text-stone-100/30 dark:focus:border-champagne-300 dark:focus:ring-champagne-300";
const invalidControl = "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400";
const labelText = "font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/55";

export default function EnquiryFields() {
    const [state, formAction, pending] = useActionState(submitEnquiry, idle);
    const alertRef = useRef<HTMLDivElement>(null);

    const errors = state.errors ?? {};
    const was = (key: string) => state.values?.[key] ?? "";

    /* Move the reader to the message rather than leaving them to notice it. The
       banner takes focus so a screen reader announces it and the page scrolls. */
    useEffect(() => {
        if (state.status !== "idle") alertRef.current?.focus();
    }, [state]);

    // Reopen the optional block when something in it survived a failed submit.
    const detailFilled = ["configuration", "budget", "timeline", "purpose", "visitOn"].some((key) =>
        was(key),
    );

    return (
        <form action={formAction} noValidate className="flex flex-col gap-7">
            {state.status !== "idle" ? (
                <div
                    ref={alertRef}
                    tabIndex={-1}
                    role="alert"
                    aria-live="assertive"
                    className="flex flex-col gap-3 border border-red-500/40 bg-red-50 p-5 outline-none dark:border-red-400/40 dark:bg-red-950/25">
                    <p className="font-display text-xs uppercase tracking-luxe text-red-700 dark:text-red-300">
                        {state.status === "invalid" ? "Not sent yet" : "This did not send"}
                    </p>
                    <p className="text-sm leading-relaxed text-red-900 dark:text-red-100/85">
                        {state.message}
                    </p>
                    {state.status === "error" ? (
                        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                            {site.phones.map((phone) => (
                                <a
                                    key={phone.tel}
                                    href={`tel:${phone.tel}`}
                                    className="font-display tracking-tight text-red-900 underline underline-offset-4 dark:text-red-100">
                                    {phone.display}
                                </a>
                            ))}
                            <a
                                href={`mailto:${site.emails.sales}`}
                                className="text-red-900/80 underline underline-offset-4 dark:text-red-100/75">
                                {site.emails.sales}
                            </a>
                        </p>
                    ) : null}
                </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
                <Field htmlFor="name" label="Your name" required error={errors.name}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        defaultValue={was("name")}
                        placeholder="Full name"
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`${control} ${errors.name ? invalidControl : ""}`}
                    />
                </Field>
                <Field htmlFor="phone" label="Phone" hint="10 digits" required error={errors.phone}>
                    <div className="flex items-stretch">
                        <span
                            id="phone-prefix"
                            className={`inline-flex items-center border border-r-0 bg-slate-100 px-4 text-base text-slate-500 dark:bg-navy-950/80 dark:text-stone-100/55 ${
                                errors.phone
                                    ? "border-red-500 dark:border-red-400"
                                    : "border-slate-900/20 dark:border-stone-100/20"
                            }`}>
                            +91
                        </span>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[2-9][0-9]{9}"
                            // The country code has its own box, so only the national number is wanted.
                            autoComplete="tel-national"
                            defaultValue={was("phone")}
                            placeholder="00000 00000"
                            onInput={sanitizePhone}
                            aria-invalid={errors.phone ? true : undefined}
                            aria-describedby={`phone-prefix${errors.phone ? " phone-error" : ""}`}
                            className={`${control} flex-1 ${errors.phone ? invalidControl : ""}`}
                        />
                    </div>
                </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field htmlFor="email" label="Email" hint="Optional" error={errors.email}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={was("email")}
                        placeholder="you@example.com"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`${control} ${errors.email ? invalidControl : ""}`}
                    />
                </Field>
                <Field htmlFor="project" label={enquiryFields.projects.label}>
                    <Select
                        id="project"
                        name="project"
                        options={enquiryFields.projects.options}
                        value={was("project")}
                    />
                </Field>
            </div>

            <Field htmlFor="message" label="Anything else we should know" hint="Optional">
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={was("message")}
                    placeholder="Floor preference, a date that suits you, a question about the paperwork…"
                    className={`${control} resize-y`}
                />
            </Field>

            <details
                open={detailFilled}
                className="group border border-slate-900/15 bg-white dark:border-stone-100/15 dark:bg-transparent">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-xs uppercase tracking-luxe text-slate-600 transition-colors hover:text-champagne-500 dark:text-stone-100/70 dark:hover:text-champagne-300 [&::-webkit-details-marker]:hidden">
                    Add detail — it makes the first call shorter
                    <span
                        aria-hidden="true"
                        className="font-display text-xl leading-none text-champagne-500 transition-transform group-open:rotate-45 dark:text-champagne-300">
                        +
                    </span>
                </summary>
                <div className="grid gap-6 border-t border-slate-900/15 p-5 sm:grid-cols-2 sm:p-6 dark:border-stone-100/15">
                    <Field htmlFor="configuration" label={enquiryFields.configuration.label}>
                        <Select
                            id="configuration"
                            name="configuration"
                            options={enquiryFields.configuration.options}
                            value={was("configuration")}
                        />
                    </Field>
                    <Field htmlFor="budget" label={enquiryFields.budget.label}>
                        <Select
                            id="budget"
                            name="budget"
                            options={enquiryFields.budget.options}
                            value={was("budget")}
                        />
                    </Field>
                    <Field htmlFor="timeline" label={enquiryFields.timeline.label}>
                        <Select
                            id="timeline"
                            name="timeline"
                            options={enquiryFields.timeline.options}
                            value={was("timeline")}
                        />
                    </Field>
                    <Field htmlFor="purpose" label={enquiryFields.purpose.label}>
                        <Select
                            id="purpose"
                            name="purpose"
                            options={enquiryFields.purpose.options}
                            value={was("purpose")}
                        />
                    </Field>
                    <Field htmlFor="visitOn" label="Preferred site-visit date" hint="Optional">
                        <input
                            id="visitOn"
                            name="visitOn"
                            type="date"
                            defaultValue={was("visitOn")}
                            className={control}
                        />
                    </Field>
                </div>
            </details>

            <div className="flex flex-col gap-2.5 border-t border-slate-900/15 pt-7 dark:border-stone-100/15">
                <label
                    htmlFor="consent"
                    className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                    <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        value="yes"
                        required
                        defaultChecked={was("consent") === "yes"}
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-1 size-4 shrink-0 accent-champagne-400 dark:accent-champagne-300"
                    />
                    <span>
                        I would like {site.name} to contact me about this enquiry by phone, WhatsApp or email.
                        My details will not be sold or passed to a third party.
                    </span>
                </label>
                {errors.consent ? <ErrorText id="consent-error">{errors.consent}</ErrorText> : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center justify-center gap-2 bg-champagne-300 px-9 py-4 font-display text-xs uppercase tracking-luxe text-navy-950 transition-colors hover:bg-champagne-200 disabled:cursor-not-allowed disabled:opacity-60">
                    {pending ? "Sending…" : "Send enquiry"}
                </button>
                <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                    {pending ? "One moment" : `Or call ${site.phones[0].display}`}
                </p>
            </div>
        </form>
    );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
    return (
        <p id={id} className="text-sm text-red-600 dark:text-red-400">
            {children}
        </p>
    );
}

function Field({
    htmlFor,
    label,
    hint,
    required,
    error,
    children,
}: {
    htmlFor: string;
    label: string;
    hint?: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2.5">
            <label htmlFor={htmlFor} className={`flex items-baseline gap-2 ${labelText}`}>
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-champagne-500 dark:text-champagne-300">
                        *
                    </span>
                ) : null}
                {hint ? (
                    <span className="normal-case tracking-normal text-slate-400 dark:text-stone-100/35">
                        — {hint}
                    </span>
                ) : null}
            </label>
            {children}
            {error ? <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText> : null}
        </div>
    );
}

function Select({
    id,
    name,
    options,
    value,
}: {
    id: string;
    name: string;
    options: string[];
    value: string;
}) {
    return (
        <select id={id} name={name} defaultValue={options.includes(value) ? value : ""} className={control}>
            <option value="">Select one</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
