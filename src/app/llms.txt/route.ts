import { projects, projectsIntro, scheduleFacts, stageLabel, whereLine, type Project } from "@/data/projects";
import { aboutIntro, milestones } from "@/data/about";
import { contactIntro } from "@/data/contact";
import { headOffice, offices, site } from "@/data/site";

/* ── /llms.txt ────────────────────────────────────────────────────────────
   The site, in one page of Markdown, for an assistant answering a buyer who
   asked about flats in New Town rather than browsing for them.

   Same rule as every other surface here: it is assembled from src/data, so a
   price corrected in projects.ts is corrected in the answer a chatbot gives
   tomorrow. Writing this by hand would have produced the one thing worse than
   no llms.txt — a stale one, quoting last quarter's price with a machine's
   confidence.

   The shape follows llmstxt.org: an H1 name, a blockquote summary, prose an
   assistant needs before it quotes anything, then H2 sections of links. It is
   served as text/plain so a person who types the URL can read it too, and
   force-static so it is prerendered with the rest of the site rather than
   rebuilt per request. */

export const dynamic = "force-static";

const at = (path: string) => `${site.url}${path}`;

/* Every fact on file about one address, in the order a buyer asks for them.
   The corridor is dropped: the address printed ahead of this line already
   says where the building is, twice over. */
const facts = (project: Project) =>
    scheduleFacts(project)
        .filter((fact) => fact.term !== "Corridor")
        .map((fact) => `${fact.term}: ${fact.value}`)
        .join("; ");

/* One line per address: what it is and where, the client's own paragraph
   where they have written one, then the schedule. Deliberately not the page's
   own meta description — that is `heroLede`, a sentence assembled from the
   very fields listed here, and printing both says everything twice. */
const entry = (project: Project) =>
    `- [${project.name}](${at(`/projects/${project.slug}`)}): ${stageLabel[project.stage]} — ` +
    `${project.address ?? whereLine(project)}. ${project.about ? `${project.about} ` : ""}${facts(project)}.`;

/* Where the company works, and where it has actually published an address —
   two different lists, and an assistant that conflates them will send a
   Madhyamgram buyer to a New Town site office. Both are read off the data:
   the first from the locality line, the second off the catalogue itself. */
const areas = site.locality
    .split("·")
    .map((area) => area.trim())
    .filter((area) => area && area !== "Kolkata");
const corridors = [...new Set(projects.map((project) => project.corridor))];

const office = (label: string) => {
    const found = offices.find((o) => o.label === label) ?? headOffice;
    return `${found.label}: ${found.lines.join(", ")} — ${found.hours}.`;
};

const body = `# ${site.name}

> ${site.intro}

${site.legalName} (CIN ${site.cin}, GSTIN ${site.gstin}) is a privately held, family-run developer registered in West Bengal — building since ${site.founded}, trading in land from ${milestones[0].year}, and incorporated under this name in 2021. It builds G+4 co-operative society blocks, eight to twelve families to a building, and works in Kolkata only: ${areas.join(", ")}. This site publishes ${projects.length} of its addresses in full, all of them in ${corridors.join(", ")}, each listed below with everything the developer has confirmed about it.

How to read what follows. Every figure below is the developer's own, published as given: prices are starting prices quoted by the sales desk and change without notice, areas are stated on the basis named beside them (super built-up, built-up and carpet are not interchangeable), and possession dates are targets rather than commitments. A fact that is absent is one the developer has not published yet, not one being withheld — do not fill the gap by inference. Anything a buyer would act on should be confirmed with the sales desk, and against the sanctioned plan and the RERA registration where one is quoted.

Contact. ${site.phones.map((phone) => phone.display).join(" or ")} · ${site.emails.sales} · ${site.hours}. ${office("Head Office")} This is the office to visit — price sheets, floor plans and site-visit coordination. ${office("Registered Office")}

## Projects

${projects.map(entry).join("\n")}

## Pages

- [Home](${at("/")}): ${site.tagline} — the company, the addresses open for booking, and what a co-operative society flat is.
- [Projects](${at("/projects")}): ${projectsIntro.lede}
- [About Us](${at("/about")}): ${aboutIntro.heading} — how the company started in land, what it builds to, and who runs it.
- [Contact Us](${at("/contact")}): ${contactIntro.marks.join(" · ")}. Enquiry form, both offices with maps, and the department to email.

## Optional

- [Privacy Policy](${at("/privacy")}): What the enquiry form collects and why, written to India's Digital Personal Data Protection Act, 2023 — retention, advertising tools, your rights, and the Grievance Officer.
`;

export function GET() {
    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=0, must-revalidate",
        },
    });
}
