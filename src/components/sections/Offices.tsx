import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { mapEmbed, mapLink } from "@/data/contact";
import { headOffice, site } from "@/data/site";

/* One office, because one is where you would actually go. The registered
   address in New Barrackpur holds the paperwork and stays in the footer. */

export default function Offices() {
    const office = headOffice;

    return (
        <section aria-labelledby="offices-heading"
            className="border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="offices-heading" eyebrow="One door in Kolkata"
                    title="Where to find us"
                    lede="Everything to do with buying a flat happens at the New Town office — price sheets, floor plans, the project team and the site-visit calendar. Walk in, or call first and we will keep the drawings out." />

                <div
                    className="grid overflow-hidden border border-slate-900/10 bg-slate-100 lg:grid-cols-2 dark:border-stone-100/10 dark:bg-navy-950">
                    {/* Google's own frame, unfiltered — recolouring the tiles or the
                        logo is against the Maps terms, so the card borders it instead. */}
                    <iframe title={office.mapLabel} src={office.mapEmbed ?? mapEmbed(office.mapQuery)}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        className="aspect-2/1 w-full border-0 border-b border-slate-900/10 lg:aspect-auto lg:min-h-[24rem] lg:border-b-0 lg:border-r dark:border-stone-100/10" />

                    <div className="flex flex-col gap-6 p-8 sm:p-10">
                        <div className="flex flex-col gap-3">
                            <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                {office.label}
                            </p>
                            <address className="font-display text-xl font-light not-italic leading-snug tracking-tight sm:text-2xl">
                                {office.lines.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </address>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                            {office.purpose}
                        </p>

                        <dl className="grid gap-x-6 gap-y-4 border-y border-slate-900/10 py-5 text-sm sm:grid-cols-2 dark:border-stone-100/10">
                            <Row term="Open">{office.hours}</Row>
                            <Row term="Email">
                                <a href={`mailto:${office.email}`}
                                    className="break-words underline-offset-4 hover:text-champagne-500 hover:underline dark:hover:text-champagne-300">
                                    {office.email}
                                </a>
                            </Row>
                        </dl>

                        <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3">
                            <a href={office.mapPin ?? mapLink(office.mapQuery)} target="_blank" rel="noreferrer noopener"
                                className="font-display text-xs uppercase tracking-luxe text-champagne-500 underline-offset-8 hover:underline dark:text-champagne-300">
                                Open in Maps →
                            </a>
                            <a href={`tel:${site.phones[0].tel}`}
                                className="font-display text-xs uppercase tracking-luxe text-slate-500 hover:text-champagne-500 dark:text-stone-100/50 dark:hover:text-champagne-300">
                                Call before you come
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                {term}
            </dt>
            <dd className="font-medium">{children}</dd>
        </div>
    );
}
