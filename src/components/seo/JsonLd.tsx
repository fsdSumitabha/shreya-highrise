import { offices, site } from "@/data/site";
import { faqs } from "@/data/faqs";

const organization = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    legalName: site.legalName,
    identifier: site.cin,
    url: site.url,
    foundingDate: String(site.founded),
    description: site.intro,
    email: site.emails.sales,
    telephone: site.phones.map((phone) => phone.tel),
    logo: `${site.url}/shreya_logo.png`,
    image: `${site.url}/shreya_logo.png`,
    areaServed: { "@type": "City", name: "Kolkata" },
    address: offices.map((office) => ({
        "@type": "PostalAddress",
        streetAddress: office.lines.slice(0, -1).join(", "),
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
    })),
};

const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
};

export default function JsonLd() {
    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization), }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
        </>
    );
}
