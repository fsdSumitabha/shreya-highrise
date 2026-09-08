export type NavItem = { label: string; href: string };
export type Office = {
    label: string;
    lines: string[];
    email: string;
    mapQuery: string;
    /** A confirmed Google place link, when we have one. Overrides the address search. */
    mapPin?: string;
    /** A confirmed "Share → Embed a map" URL. Overrides the address-built embed. */
    mapEmbed?: string;
    purpose: string;
    hours: string;
    mapLabel: string;
};
export type Phone = { display: string; tel: string };

export const site = {
    name: "Shreya High Rise",
    legalName: "Shreya Highrise Private Limited",
    cin: "U70109WB2021PTC246677",
    url: "https://shreyahighrise.com",
    locality: "Kolkata · New Town · Rajarhat · Madhyamgram",
    tagline: "Homes that rise with the city",
    intro: "A Kolkata developer of co-operative society homes — ten addresses across New Town, Rajarhat and the north of the city, delivered on time and priced in the open.",
    founded: 2016,
    gstin: "19ABGCS5087H1ZU",
    phones: [
        { display: "+91 89103 55765", tel: "+918910355765" },
        { display: "+91 98366 49276", tel: "+919836649276" },
    ] satisfies Phone[],
    emails: {
        sales: "shreyahighrise@gmail.com",
        projects: "royconstruction@gmail.com",
    },
    hours: "Site office open Mon–Sat, 10:00 – 19:00 IST",
};

export const nav: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];

/* Legal pages. Deliberately not in `nav` — the header and the mobile menu both
   render that list, and neither is where a privacy policy belongs. These sit in
   the footer's bottom bar, on every page, which is where a reader looks for
   them and where Meta and Google look for them when they review an ad account. */
export const legalNav: NavItem[] = [{ label: "Privacy Policy", href: "/privacy" }];

/** The exact pin the client gave for the New Town office. */
const headOfficePin = "22.5891026,88.4528644";

export const registeredOffice: Office = {
    label: "Registered Office",
    lines: [
        "Spriha Apartment, Flat No. 01, Ground Floor",
        "97 Rabindra Sarani, New Barrackpur",
        "Kolkata 700 131, West Bengal",
    ],
    email: site.emails.sales,
    mapQuery: "97 Rabindra Sarani, New Barrackpur, Kolkata 700131",
    purpose: "Company records, agreements and registration paperwork. The address the company is registered at, and the base for everything we build north of the airport.",
    hours: "Mon – Sat, 11:00 – 18:00",
    mapLabel: "Map — New Barrackpur registered office",
};

/* The office buyers actually visit, and the only one shown on the contact page —
   the registered address still appears in the footer and in the JSON-LD. */
export const headOffice: Office = {
    label: "Head Office",
    lines: [
        "Chaitali Co-operative Housing Society Ltd.",
        "BB-102, Ground Floor, Street No. 152, New Town",
        "Kolkata 700 156, West Bengal",
    ],
    email: site.emails.projects,
    mapQuery: "BB-102 Street No. 152, New Town, Kolkata 700156",
    mapPin: `https://www.google.com/maps/search/?api=1&query=${headOfficePin}`,
    mapEmbed: `https://maps.google.com/maps?q=${headOfficePin}&z=17&output=embed`,
    purpose: "Sales, site-visit coordination and the project team. Come here for price sheets, floor plans and anything to do with a flat you have booked.",
    hours: "Mon – Sat, 10:00 – 19:00",
    mapLabel: "Map — New Town head office",
};

export const offices: Office[] = [registeredOffice, headOffice];

export type Leader = {
    name: string;
    role: string;
    focus: string;
    since: string;
    bio: string;
    portrait: string;
    image: string;
};

export const leadership: Leader[] = [
    {
        name: "Ranjeet Roy",
        role: "Managing Director",
        focus: "Land acquisition & project finance",
        since: "Founder, 2012",
        bio: "Bought and sold the plots the company started out trading in, and has negotiated every acquisition since. Sets the price sheet, approves each cost revision before it reaches a buyer, and is the reason the company has never taken construction finance against a project it had not already sold out of its own books.",
        portrait: "Ranjeet Roy — portrait",
        image: "/directors/ranjeet_roy.jpg",
    },
    {
        name: "Sampa Roy",
        role: "Managing Director",
        focus: "Design, interiors & customer experience",
        since: "Founder, 2012",
        bio: "Runs the drawing desk and the handover desk — the two ends of the same conversation. Reviews every unit layout for light, cross-ventilation and Vaastu before it is sanctioned, and personally signs off the snag list on each flat before the keys are released.",
        portrait: "Sampa Roy — portrait",
        image: "/directors/sampa_roy.jpg",
    },
    {
        name: "Partha Roy Chowdhury",
        role: "Managing Director",
        focus: "Construction, quality & handover",
        since: "Director since 2021",
        bio: "Holds the specification. Approves the pile design, walks each slab before the pour, and keeps procurement tied to brand and grade rather than to the lowest quotation. The delay-compensation clause in our agreement exists because he was willing to stand behind it.",
        portrait: "Partha Roy Chowdhury — portrait",
        image: "/directors/partha_roychowdhury.jpg",
    },
];

export const socials: NavItem[] = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
];
