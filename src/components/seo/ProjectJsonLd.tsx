import { site } from "@/data/site";
import { metaDescription, type Project } from "@/data/projects";

/* Structured data for one address. Deliberately thin: only fields the client
   has actually given us are emitted, because a search engine quoting a number
   we invented is worse than it quoting nothing. Sits beside the site-wide
   organisation graph in <JsonLd>, which every page already carries. */

export default function ProjectJsonLd({ project }: { project: Project }) {
    const graph = {
        "@context": "https://schema.org",
        "@type": "ApartmentComplex",
        name: project.name,
        description: metaDescription(project),
        url: `${site.url}/projects/${project.slug}`,
        ...(project.address && {
            address: {
                "@type": "PostalAddress",
                streetAddress: project.address,
                addressLocality: "Kolkata",
                addressRegion: "West Bengal",
                addressCountry: "IN",
            },
        }),
        ...(project.totalFlats && { numberOfAccommodationUnits: project.totalFlats }),
        provider: {
            "@type": "RealEstateAgent",
            name: site.legalName,
            url: site.url,
        },
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
