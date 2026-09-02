import type { Metadata } from "next";
import HeroReel from "@/components/sections/HeroReel";
import StatsBand from "@/components/sections/StatsBand";
import AboutIntro from "@/components/sections/AboutIntro";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import DeliveredProjects from "@/components/sections/DeliveredProjects";
import Advantages from "@/components/sections/Advantages";
import Amenities from "@/components/sections/Amenities";
import Corridors from "@/components/sections/Corridors";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import Assurance from "@/components/sections/Assurance";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

/* Home, with the WebGL hero.

   A parallel route so the live home page at / is untouched: the two can be
   opened side by side, and when the hero is signed off it moves across by
   swapping one import in src/app/page.tsx. Everything below the fold is the
   same section stack, so the scroll out of the tower is the real thing. */

export const metadata: Metadata = {
    title: "Engineering the next skyline — WebGL hero preview",
    description:
        "Preview build of the Shreya High Rise home page with a scroll-driven Three.js hero: architectural blueprint to structural frame to completed high-rise.",
    // A second copy of the home page has no business in an index.
    robots: { index: false, follow: false },
};

export default function HomeV2Page() {
    return (
        <>
            <HeroReel />
            <StatsBand />
            <AboutIntro />
            <FeaturedProjects />
            <DeliveredProjects />
            <Advantages />
            <Amenities />
            <Corridors />
            <Journey />
            <Testimonials />
            <Assurance />
            <Faq />
            <CtaBand />
        </>
    );
}
