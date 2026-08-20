import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import AboutIntro from "@/components/sections/AboutIntro";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Advantages from "@/components/sections/Advantages";
import Amenities from "@/components/sections/Amenities";
import Corridors from "@/components/sections/Corridors";
import DeliveredProjects from "@/components/sections/DeliveredProjects";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import Assurance from "@/components/sections/Assurance";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "High-Rise Flats in New Town, Rajarhat & Kolkata",
    description:
        "Shreya High Rise builds RERA-registered 2, 3 and 4 BHK high-rise apartments at ten addresses across Kolkata — New Town, Rajarhat, Madhyamgram and Narendrapur. Transparent pricing, on-time possession, 1,450 families since 2006.",
    alternates: { canonical: "/" },
};

export default function HomePage() {
    return (
        <>
            <JsonLd />
            <Hero />
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
