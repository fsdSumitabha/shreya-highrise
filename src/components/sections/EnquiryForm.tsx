import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EnquiryFields from "@/components/sections/EnquiryFields";
import { responsePromise } from "@/data/contact";
import { site } from "@/data/site";

/* The section stays on the server; only <EnquiryFields> ships to the browser,
   because it needs `useActionState` to report a send that did not go through. */

export default function EnquiryForm() {
    return (
        <section
            id="enquiry"
            aria-labelledby="enquiry-heading"
            className="scroll-mt-24 border-y border-slate-900/10 bg-slate-200/60 py-20 text-slate-900 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900 dark:text-stone-100">
            <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-10 lg:col-span-7">
                    <SectionHeading
                        id="enquiry-heading"
                        eyebrow="Send an enquiry"
                        title="Tell us what you are looking for"
                        lede="Two fields are compulsory. Everything else just makes the first call shorter — and lets us send the right price sheet before you spend a Sunday travelling."
                    />

                    <EnquiryFields />
                </div>

                <aside className="flex flex-col gap-8 lg:col-span-5 lg:pl-8">
                    <div className="flex flex-col gap-8 border border-slate-900/12 bg-white p-8 sm:p-10 dark:border-stone-100/15 dark:bg-transparent">
                        <h3 className="font-display text-2xl font-light leading-tight tracking-tight sm:text-3xl">
                            {responsePromise.heading}
                        </h3>
                        <ol className="flex flex-col gap-7">
                            {responsePromise.steps.map((step, index) => (
                                <li key={step.title} className="flex gap-5">
                                    <span
                                        aria-hidden="true"
                                        className="mt-0.5 font-display text-sm tracking-luxe text-champagne-500 dark:text-champagne-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-display text-lg font-medium tracking-tight">
                                            {step.title}
                                        </p>
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                            {step.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="border-t border-slate-900/12 pt-6 text-xs leading-relaxed text-slate-500 dark:border-stone-100/15 dark:text-stone-100/45">
                            {responsePromise.footnote}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 border-l-2 border-champagne-400 pl-6 dark:border-champagne-300">
                        <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                            Would rather just talk?
                        </p>
                        {site.phones.map((phone) => (
                            <a
                                key={phone.tel}
                                href={`tel:${phone.tel}`}
                                className="font-display text-2xl font-light tracking-tight transition-colors hover:text-champagne-500 sm:text-3xl dark:hover:text-champagne-300">
                                {phone.display}
                            </a>
                        ))}
                        <p className="text-sm text-slate-500 dark:text-stone-100/55">{site.hours}</p>
                    </div>
                </aside>
            </Container>
        </section>
    );
}
