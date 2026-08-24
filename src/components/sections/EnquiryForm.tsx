import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { submitEnquiry } from "@/app/contact/actions";
import { enquiryFields, responsePromise } from "@/data/contact";
import { site } from "@/data/site";

const control =
    "w-full border border-stone-100/20 bg-navy-950/50 px-4 py-3.5 text-base text-stone-100 outline-none transition-colors [color-scheme:dark] placeholder:text-stone-100/30 focus:border-champagne-300 focus:ring-1 focus:ring-champagne-300";
const labelText = "font-display text-xs uppercase tracking-luxe text-stone-100/55";

export default function EnquiryForm() {
    return (
        <section id="enquiry" aria-labelledby="enquiry-heading"
            className="scroll-mt-24 bg-navy-900 py-20 text-stone-100 sm:py-28">
            <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-10 lg:col-span-7">
                    <SectionHeading id="enquiry-heading" tone="dark" eyebrow="Send an enquiry"
                        title="Tell us what you are looking for"
                        lede="Two fields are compulsory. Everything else just makes the first call shorter — and lets us send the right price sheet before you spend a Sunday travelling." />

                    <form action={submitEnquiry} className="flex flex-col gap-7">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Field htmlFor="name" label="Your name" required>
                                <input id="name" name="name" type="text" required minLength={2}
                                    autoComplete="name" placeholder="Full name" className={control} />
                            </Field>
                            <Field htmlFor="phone" label="Phone" required>
                                <input id="phone" name="phone" type="tel" required inputMode="tel"
                                    minLength={10} maxLength={18} autoComplete="tel"
                                    placeholder="+91 00000 00000" className={control} />
                            </Field>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <Field htmlFor="email" label="Email" hint="Optional">
                                <input id="email" name="email" type="email" autoComplete="email"
                                    placeholder="you@example.com" className={control} />
                            </Field>
                            <Field htmlFor="project" label={enquiryFields.projects.label}>
                                <Select id="project" name="project" options={enquiryFields.projects.options} />
                            </Field>
                        </div>

                        <Field htmlFor="message" label="Anything else we should know" hint="Optional">
                            <textarea id="message" name="message" rows={4}
                                placeholder="Floor preference, a date that suits you, a question about the paperwork…"
                                className={`${control} resize-y`} />
                        </Field>

                        <details className="group border border-stone-100/15">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-xs uppercase tracking-luxe text-stone-100/70 transition-colors hover:text-champagne-300 [&::-webkit-details-marker]:hidden">
                                Add detail — it makes the first call shorter
                                <span aria-hidden="true"
                                    className="font-display text-xl leading-none text-champagne-300 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <div className="grid gap-6 border-t border-stone-100/15 p-5 sm:grid-cols-2 sm:p-6">
                                <Field htmlFor="configuration" label={enquiryFields.configuration.label}>
                                    <Select id="configuration" name="configuration"
                                        options={enquiryFields.configuration.options} />
                                </Field>
                                <Field htmlFor="budget" label={enquiryFields.budget.label}>
                                    <Select id="budget" name="budget" options={enquiryFields.budget.options} />
                                </Field>
                                <Field htmlFor="timeline" label={enquiryFields.timeline.label}>
                                    <Select id="timeline" name="timeline" options={enquiryFields.timeline.options} />
                                </Field>
                                <Field htmlFor="purpose" label={enquiryFields.purpose.label}>
                                    <Select id="purpose" name="purpose" options={enquiryFields.purpose.options} />
                                </Field>
                                <Field htmlFor="visitOn" label="Preferred site-visit date" hint="Optional">
                                    <input id="visitOn" name="visitOn" type="date" className={control} />
                                </Field>
                            </div>
                        </details>

                        <label htmlFor="consent"
                            className="flex cursor-pointer items-start gap-3.5 border-t border-stone-100/15 pt-7 text-sm leading-relaxed text-stone-100/65">
                            <input id="consent" name="consent" type="checkbox" value="yes" required
                                className="mt-1 size-4 shrink-0 accent-champagne-300 [color-scheme:dark]" />
                            <span>
                                I would like {site.name} to contact me about this enquiry by phone, WhatsApp or
                                email. My details will not be sold or passed to a third party.
                            </span>
                        </label>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <button type="submit"
                                className="inline-flex items-center justify-center gap-2 bg-champagne-300 px-9 py-4 font-display text-xs uppercase tracking-luxe text-navy-950 transition-colors hover:bg-champagne-200">
                                Send enquiry
                            </button>
                            <p className="font-display text-xs uppercase tracking-luxe text-stone-100/45">
                                Or call {site.phones[0].display}
                            </p>
                        </div>
                    </form>
                </div>

                <aside className="flex flex-col gap-8 lg:col-span-5 lg:pl-8">
                    <div className="flex flex-col gap-8 border border-stone-100/15 p-8 sm:p-10">
                        <h3 className="font-display text-2xl font-light leading-tight tracking-tight sm:text-3xl">
                            {responsePromise.heading}
                        </h3>
                        <ol className="flex flex-col gap-7">
                            {responsePromise.steps.map((step, index) => (
                                <li key={step.title} className="flex gap-5">
                                    <span aria-hidden="true"
                                        className="mt-0.5 font-display text-sm tracking-luxe text-champagne-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-display text-lg font-medium tracking-tight">
                                            {step.title}
                                        </p>
                                        <p className="text-sm leading-relaxed text-stone-100/65">{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="border-t border-stone-100/15 pt-6 text-xs leading-relaxed text-stone-100/45">
                            {responsePromise.footnote}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 border-l-2 border-champagne-300 pl-6">
                        <p className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                            Would rather just talk?
                        </p>
                        {site.phones.map((phone) => (
                            <a key={phone.tel} href={`tel:${phone.tel}`}
                                className="font-display text-2xl font-light tracking-tight transition-colors hover:text-champagne-300 sm:text-3xl">
                                {phone.display}
                            </a>
                        ))}
                        <p className="text-sm text-stone-100/55">{site.hours}</p>
                    </div>
                </aside>
            </Container>
        </section>
    );
}

function Field({
    htmlFor, label, hint, required, children,
}: {
    htmlFor: string; label: string; hint?: string; required?: boolean; children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2.5">
            <label htmlFor={htmlFor} className={`flex items-baseline gap-2 ${labelText}`}>
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-champagne-300">
                        *
                    </span>
                ) : null}
                {hint ? <span className="text-stone-100/35 normal-case tracking-normal">— {hint}</span> : null}
            </label>
            {children}
        </div>
    );
}

function Select({ id, name, options }: { id: string; name: string; options: string[] }) {
    return (
        <select id={id} name={name} defaultValue="" className={control}>
            <option value="">Select one</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
