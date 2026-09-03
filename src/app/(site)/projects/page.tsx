import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StatsBand from "@/components/sections/StatsBand";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import DeliveredProjects from "@/components/sections/DeliveredProjects";
import Advantages from "@/components/sections/Advantages";
import Assurance from "@/components/sections/Assurance";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { projectsIntro } from "@/data/projects";
import { site } from "@/data/site";

const description =
    "Every Shreya High Rise address in one place — two co-operative society blocks under construction in Action Area I, New Town, and four handed over across New Town. Areas, prices, possession dates and sanctioned plans published up front.";

export const metadata: Metadata = {
    title: "Our Projects — Co-operative Society Homes in New Town, Kolkata",
    description,
    alternates: { canonical: "/projects" },
    openGraph: {
        type: "website",
        url: "/projects",
        title: `Projects — ${site.name}`,
        description,
    },
};

/* The projects index.

   Deliberately assembled out of sections that already exist elsewhere rather
   than a bespoke listing: the two project sections carry the whole catalogue
   between them — <FeaturedProjects> renders `openForSale`, <DeliveredProjects>
   renders `delivered`, and the two filters partition `projects`, so nothing
   is dropped and nothing is shown twice. Both are told `linkToAll={false}`,
   since their "all projects" links point at this page.

   What follows the catalogue is the answer to the question a buyer asks next
   — where the addresses sit, what is built into every one of them, and on
   what terms — so the corridors, amenity set and commitments run underneath
   in that order. */

export default function ProjectsPage() {
    return (
        <>
            <PageHero drawMark crumb="Projects" eyebrow={projectsIntro.eyebrow} heading={projectsIntro.heading}
                lede={projectsIntro.lede} marks={projectsIntro.marks} />
            <StatsBand />
            <FeaturedProjects linkToAll={false} />
            <DeliveredProjects linkToAll={false} />
            <Advantages />
            <Assurance />
            <Faq />
            <CtaBand />
        </>
    );
}
