import { openForSale } from "@/data/projects";
import { site } from "@/data/site";

export type Channel = { label: string; value: string; href: string; note: string; external?: boolean };
export type Department = { name: string; purpose: string; email: string; phone?: string };
export type VisitStep = { title: string; body: string };
export type FieldGroup = { label: string; options: string[] };

/** Google Maps deep link built from an office's `mapQuery`. Replace with a real place link — see CLIENT-DATA. */
export const mapLink = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const contactIntro = {
    eyebrow: "Contact",
    heading: "Come and stand in the building",
    lede: "Renders flatten everything. Floor heights, the light at four in the afternoon, how far the lift bank really is from the door — you learn all of it in twenty minutes on site and none of it from a brochure.",
    marks: ["Open Mon – Sun, 10:00 – 19:00", "Reply within one working day", "No closing script"],
};

export const responsePromise = {
    heading: "What happens after you send this",
    steps: [
        {
            title: "We read it, not a bot",
            body: "Enquiries go to the sales desk directly. Nothing is routed through a call-centre queue.",
        },
        {
            title: "One call, within a working day",
            body: "We ask what you are actually looking for and send only the projects that fit it — with the full cost sheet attached, before you visit.",
        },
        {
            title: "A visit, if you want one",
            body: "A project engineer meets you at the gate. Weekend slots fill first, so pick two times if you can.",
        },
    ] satisfies VisitStep[],
    footnote: "We do not sell, share or resell your number. One follow-up call, and we stop if you tell us to.",
};

export const channels: Channel[] = [
    {
        label: "Call the sales desk",
        value: site.phones[0].display,
        href: `tel:${site.phones[0].tel}`,
        note: "Mon – Sun, 10:00 – 19:00 IST",
    },
    {
        label: "WhatsApp",
        value: site.phones[0].display,
        href: `https://wa.me/${site.phones[0].tel.replace(/\D/g, "")}`,
        note: "Floor plans and price sheets, sent as PDF",
        external: true,
    },
    {
        label: "Email the sales desk",
        value: site.emails.sales,
        href: `mailto:${site.emails.sales}`,
        note: "Answered within one working day",
    },
    {
        label: "Projects & handover",
        value: site.emails.projects,
        href: `mailto:${site.emails.projects}`,
        note: "For existing buyers and residents",
    },
];

export const departments: Department[] = [
    {
        name: "Sales & site visits",
        purpose: "Availability, price sheets, floor plans, booking and home-loan coordination.",
        email: site.emails.sales,
        phone: site.phones[0].display,
    },
    {
        name: "Construction & handover",
        purpose: "Slab progress, snag lists, possession dates and registration for booked buyers.",
        email: site.emails.projects,
        phone: site.phones[1].display,
    },
    {
        name: "Residents & facility",
        purpose: "Estate management, association handover and post-possession service requests.",
        email: site.emails.projects,
    },
    {
        name: "Channel partners",
        purpose: "Broker empanelment, inventory access and commission terms.",
        email: site.emails.sales,
    },
    {
        name: "Vendors & procurement",
        purpose: "Material supply, contractor empanelment and rate submissions.",
        email: site.emails.projects,
    },
    {
        name: "Grievance officer",
        purpose: "Complaints under WBRERA. Acknowledged in writing and answered within 30 days.",
        email: site.emails.projects,
    },
];

export const visitBrief = {
    eyebrow: "Before you come",
    heading: "What a site visit actually looks like",
    lede: "Forty-five minutes, an engineer instead of a closer, and a printed cost sheet in your hand when you leave.",
    steps: [
        {
            title: "Meet at the gate",
            body: "A project engineer walks you through — the person who knows the slab schedule, not a script.",
        },
        {
            title: "Walk the real floor",
            body: "You stand inside an actual unit at your configuration wherever the structure allows it.",
        },
        {
            title: "See the paperwork",
            body: "Sanctioned plan, RERA registration and title report are on the table at the site office.",
        },
        {
            title: "Leave with the numbers",
            body: "Carpet area, floor rise, parking, GST and maintenance on one printed sheet. No revisions later.",
        },
    ] satisfies VisitStep[],
    practical: [
        { term: "How long", detail: "45 – 60 minutes per project" },
        { term: "Bring", detail: "One photo ID for the site entry log" },
        { term: "Wear", detail: "Closed shoes — helmets and vests are provided" },
        { term: "Pickup", detail: "Arranged within Kolkata on request, at no cost" },
        { term: "Best time", detail: "Before noon in summer, any hour October to February" },
        { term: "Children", detail: "Welcome at the site office; not above the podium level" },
    ],
};

export const enquiryFields = {
    projects: {
        label: "Project of interest",
        options: [...openForSale.map((project) => project.name), "Not decided yet"],
    },
    configuration: {
        label: "Configuration",
        options: ["2 BHK", "3 BHK", "4 BHK", "Duplex", "Open to options"],
    },
    budget: {
        label: "Budget",
        options: ["Under ₹50 L", "₹50 L – ₹75 L", "₹75 L – ₹1 Cr", "₹1 Cr – ₹1.5 Cr", "Above ₹1.5 Cr"],
    },
    timeline: {
        label: "Possession needed",
        options: ["Ready to move", "Within 12 months", "In 1 – 2 years", "2 years or more"],
    },
    purpose: {
        label: "Buying to",
        options: ["Live in", "Invest", "Purchase as an NRI"],
    },
} satisfies Record<string, FieldGroup>;

export const contactFaqs = [
    {
        question: "How soon will someone get back to me?",
        answer: "One working day for anything sent through this page, by email or on WhatsApp. Calls placed between 10:00 and 19:00 IST reach the sales desk directly, without a queue.",
    },
    {
        question: "Do I have to visit the site to get a price?",
        answer: "No. Ask and we will email the full cost sheet — carpet area, floor rise, parking, GST and maintenance — before you decide whether a visit is worth your Sunday.",
    },
    {
        question: "Can you arrange pickup for a site visit?",
        answer: "Yes, anywhere inside Kolkata, at no cost and with no obligation. Tell us a pickup address and a time window when you book, and we confirm the car the previous evening.",
    },
    {
        question: "I live outside India. Can we do this over video?",
        answer: "We run site walkthroughs on video call, share slab-wise progress photographs monthly, and can complete registration through a power of attorney. Several of our buyers have never seen the site before handover.",
    },
    {
        question: "I already own a flat in one of your projects. Who do I write to?",
        answer: "Write to the projects desk rather than sales — it reaches the handover and facility team directly, and they hold the snag list, the association records and the service log for your estate.",
    },
];
