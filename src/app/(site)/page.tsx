import type { Metadata } from "next";
import HeroReel from "@/components/sections/HeroReel";
import StatsBand from "@/components/sections/StatsBand";
import AboutIntro from "@/components/sections/AboutIntro";
import CooperativeBands from "@/components/sections/CooperativeBands";
import Advantages from "@/components/sections/Advantages";
import Amenities from "@/components/sections/Amenities";
import PaperworkDesk from "@/components/sections/PaperworkDesk";
import Corridors from "@/components/sections/Corridors";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import Assurance from "@/components/sections/Assurance";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "High-Rise Flats in New Town, Rajarhat & Kolkata",
    description:
        "Shreya High Rise develops HIG, MIG and LIG co-operative society housing across Kolkata — RERA-registered 2, 3 and 4 BHK high-rises in New Town, Rajarhat, Madhyamgram and Narendrapur. On-time possession, 1,450 families since 2021.",
    alternates: { canonical: "/" },
};

/* <HeroReel> is the fold built around the plan-to-reality film. The earlier
   fold is untouched at "@/components/sections/Hero" and drops straight back in
   — import it here instead and change the one tag below; it takes the same
   (no) props and the sections under it are unaffected either way. */

export default function HomePage() {
    return (
        <>
            <JsonLd />
            <HeroReel />
            <StatsBand />
            <AboutIntro />
            <FeaturedProjects />
            <CooperativeBands />
            <Advantages />
            <Amenities />
            <PaperworkDesk />
            <Corridors />
            <Journey />
            <Testimonials />
            <Assurance />
            <Faq />
            <CtaBand />
        </>
    );
}
