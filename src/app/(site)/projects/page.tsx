import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StatsBand from "@/components/sections/StatsBand";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import DeliveredProjects from "@/components/sections/DeliveredProjects";
import Corridors from "@/components/sections/Corridors";
import Amenities from "@/components/sections/Amenities";
import Advantages from "@/components/sections/Advantages";
import CooperativeBands from "@/components/sections/CooperativeBands";
import Assurance from "@/components/sections/Assurance";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { projectsIntro } from "@/data/projects";
import { site } from "@/data/site";

const description =
    "Every Shreya High Rise address in one place — four projects open for sale in New Town, Rajarhat and Narendrapur, and three handed over across North Kolkata and New Town. Carpet areas, prices and possession dates published up front.";

export const metadata: Metadata = {
    title: "Our Projects — New Town, Rajarhat & Kolkata High-Rises",
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
            <PageHero crumb="Projects" eyebrow={projectsIntro.eyebrow} heading={projectsIntro.heading}
                lede={projectsIntro.lede} marks={projectsIntro.marks} />
            <StatsBand />
            <FeaturedProjects linkToAll={false} />
            <DeliveredProjects linkToAll={false} />
            <Corridors />
            <CooperativeBands />
            <Amenities />
            <Advantages />
            <Assurance />
            <Faq />
            <CtaBand />
        </>
    );
}
