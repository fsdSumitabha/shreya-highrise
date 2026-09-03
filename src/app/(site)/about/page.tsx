import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StatsBand from "@/components/sections/StatsBand";
import AboutStory from "@/components/sections/AboutStory";
import Milestones from "@/components/sections/Milestones";
import Principles from "@/components/sections/Principles";
import Leadership from "@/components/sections/Leadership";
import Corridors from "@/components/sections/Corridors";
import BuildStandard from "@/components/sections/BuildStandard";
import Desks from "@/components/sections/Desks";
import CtaBand from "@/components/sections/CtaBand";
import { aboutIntro } from "@/data/about";
import { site } from "@/data/site";

const description =
    "Shreya High Rise is a privately held, family-run Kolkata developer building co-operative society homes since 2016 — New Town, Rajarhat, Madhyamgram, Birati and New Barrackpur. Our history, our directors, and the specification we build every project to.";

export const metadata: Metadata = {
    title: "About Us — Our Story, Directors & Build Standard",
    description,
    alternates: { canonical: "/about" },
    openGraph: {
        type: "website",
        url: "/about",
        title: `About ${site.name} — ${aboutIntro.heading}`,
        description,
    },
};

export default function AboutPage() {
    return (
        <>
            <PageHero drawMark crumb="About Us" eyebrow={aboutIntro.eyebrow} heading={aboutIntro.heading}
                lede={aboutIntro.lede} marks={aboutIntro.marks} />
            <StatsBand />
            <AboutStory />
            <Milestones />
            <Principles />
            <Leadership />
            <Corridors />
            <BuildStandard />
            <Desks />
            <CtaBand />
        </>
    );
}
