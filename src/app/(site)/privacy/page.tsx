import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PolicySummary from "@/components/legal/PolicySummary";
import DataJourney from "@/components/legal/DataJourney";
import PolicyContents from "@/components/legal/PolicyContents";
import PolicyBlock from "@/components/legal/PolicyBlock";
import StatutePlate from "@/components/legal/StatutePlate";
import GrievanceCard from "@/components/legal/GrievanceCard";
import PolicyJsonLd from "@/components/seo/PolicyJsonLd";
import { policyMeta, sections } from "@/data/privacy";
import { site } from "@/data/site";

/* ── /privacy ─────────────────────────────────────────────────────────────
   A server component from top to bottom. Nothing on this route is a client
   component, nothing fetches, and nothing but the shared page masthead uses
   the site's reveal attributes — so the entire policy is present in the HTML
   of the first response, which is what both a crawler and a regulator want
   from a legal notice.

   The contents rail sticks with CSS, the anchors are real fragment links, and
   the section numbering in the markup is the same numbering the prose refers
   to as "§11". */

const description =
    "How Shreya Highrise Private Limited collects, uses, shares and retains your personal data — written to the Digital Personal Data Protection Act, 2023, the IT Act and the SPDI Rules. What the enquiry form collects, our use of Meta and Google advertising tools, retention periods, your rights, and the Grievance Officer to contact.";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description,
    alternates: { canonical: "/privacy" },
    openGraph: {
        type: "website",
        url: "/privacy",
        title: `Privacy Policy — ${site.name}`,
        description,
    },
    robots: { index: true, follow: true },
};

export default function PrivacyPage() {
    return (
        <>
            <PolicyJsonLd />

            <PageHero crumb={policyMeta.crumb} eyebrow={policyMeta.eyebrow} heading={policyMeta.heading}
                lede={policyMeta.lede} marks={policyMeta.marks} />

            <PolicySummary />
            <DataJourney />

            <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
                <PolicyContents />

                <article className="flex flex-col gap-16 lg:col-span-8 xl:col-span-9">
                    {sections.map((section, i) => (
                        /* scroll-mt clears the sticky header when a contents
                           link jumps here. */
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}
                            className="flex scroll-mt-28 flex-col gap-6">
                            <header className="flex flex-col gap-4 border-t border-slate-900/12 pt-6 dark:border-stone-100/12">
                                <p className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                                    Section {i + 1}
                                </p>
                                <h2 id={`${section.id}-heading`}
                                    className="font-display text-2xl font-light leading-tight tracking-tight sm:text-3xl">
                                    {section.title}
                                </h2>
                                {section.lede ? (
                                    <p className="max-w-2xl border-l border-champagne-400/50 pl-5 text-[0.9375rem] leading-relaxed text-slate-600 dark:border-champagne-300/40 dark:text-stone-100/70">
                                        {section.lede}
                                    </p>
                                ) : null}
                            </header>

                            {section.blocks.map((block, b) => (
                                <PolicyBlock key={b} block={block} />
                            ))}

                            {/* Two sections carry a drawing instead of prose. */}
                            {section.id === "laws" ? <StatutePlate /> : null}
                            {section.id === "grievance" ? <GrievanceCard /> : null}
                        </section>
                    ))}

                    <p className="border-t border-slate-900/12 pt-6 text-sm leading-relaxed text-slate-500 dark:border-stone-100/12 dark:text-stone-100/45">
                        This policy is published by {site.legalName} (CIN {site.cin}) and is version{" "}
                        {policyMeta.version}, in force from{" "}
                        <time dateTime={policyMeta.effective}>
                            {new Date(`${policyMeta.effective}T00:00:00Z`).toLocaleDateString("en-IN", {
                                day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
                            })}
                        </time>
                        . It replaces any earlier privacy statement published on this website.
                    </p>
                </article>
            </Container>
        </>
    );
}
