import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactChannels from "@/components/sections/ContactChannels";
import EnquiryForm from "@/components/sections/EnquiryForm";
import VisitBrief from "@/components/sections/VisitBrief";
import Offices from "@/components/sections/Offices";
import ContactFaq from "@/components/sections/ContactFaq";
import Departments from "@/components/sections/Departments";
import { contactIntro } from "@/data/contact";
import { site } from "@/data/site";

const description =
    "Call, WhatsApp or email Shreya High Rise, or book a site visit at any project in New Town, Rajarhat, Madhyamgram or Narendrapur. Two offices in Kolkata, open seven days a week, with a reply inside one working day.";

export const metadata: Metadata = {
    title: "Contact Us — Book a Site Visit in Kolkata",
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
        type: "website",
        url: "/contact",
        title: `Contact ${site.name} — ${contactIntro.heading}`,
        description,
    },
};

export default function ContactPage() {
    return (
        <>
            <PageHero crumb="Contact Us" eyebrow={contactIntro.eyebrow} heading={contactIntro.heading}
                lede={contactIntro.lede} marks={contactIntro.marks} />
            <ContactChannels />
            <EnquiryForm />
            <VisitBrief />
            <Offices />
            <ContactFaq />
            <Departments />
        </>
    );
}
