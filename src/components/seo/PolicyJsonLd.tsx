import { policyMeta } from "@/data/privacy";
import { site } from "@/data/site";

/* Structured data for the privacy policy.

   Two graphs, both plain schema.org: the page itself — so a crawler gets the
   publisher, the language and, above all, `dateModified`, which is the field
   that matters on a legal notice — and the breadcrumb, which matches the
   visible trail in <PageHero> rather than inventing a second hierarchy.

   No PrivacyPolicy type is used: schema.org has none, and inventing one puts
   an unrecognised @type in front of a validator for no gain. */

const url = `${site.url}/privacy`;

const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: `${policyMeta.heading} — ${site.name}`,
    description: policyMeta.lede,
    inLanguage: "en-IN",
    datePublished: policyMeta.effective,
    dateModified: policyMeta.updated,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    publisher: {
        "@type": "Organization",
        name: site.legalName,
        identifier: site.cin,
        url: site.url,
        email: site.emails.projects,
        logo: `${site.url}/shreya_logo.png`,
    },
    about: {
        "@type": "Thing",
        name: "Personal data protection",
        description:
            "How Shreya Highrise Private Limited collects, uses, shares and retains personal data under the Digital Personal Data Protection Act, 2023.",
    },
};

const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: policyMeta.crumb, item: url },
    ],
};

export default function PolicyJsonLd() {
    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        </>
    );
}
