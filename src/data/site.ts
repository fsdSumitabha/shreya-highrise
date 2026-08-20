export type NavItem = { label: string; href: string };
export type Office = {
    label: string;
    lines: string[];
    email: string;
    mapQuery: string;
};
export type Phone = { display: string; tel: string };

export const site = {
    name: "Shreya High Rise",
    legalName: "Shreya Highrise Private Limited",
    url: "https://shreyahighrise.in",
    locality: "Kolkata · New Town · Rajarhat · Madhyamgram",
    tagline: "Homes that rise with the city",
    intro: "A Kolkata developer of RERA-registered high-rise residences — ten addresses across New Town, Rajarhat, and the north and south of the city, delivered on time and priced in the open.",
    founded: 2006,
    gstin: "19ABGCS5087H1ZU",
    phones: [
        { display: "+91 89103 55765", tel: "+918910355765" },
        { display: "+91 98366 49276", tel: "+919836649276" },
    ] satisfies Phone[],
    emails: {
        sales: "shreyahighrise@gmail.com",
        projects: "royconstruction@gmail.com",
    },
    hours: "Site office open Mon–Sun, 10:00 – 19:00 IST",
};

export const nav: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];

export const offices: Office[] = [
    {
        label: "Registered Office",
        lines: [
            "Spriha Apartment, Flat No. 01, Ground Floor",
            "97 Rabindra Sarani, New Barrackpur",
            "Kolkata 700 131, West Bengal",
        ],
        email: site.emails.sales,
        mapQuery: "97 Rabindra Sarani, New Barrackpur, Kolkata 700131",
    },
    {
        label: "Head Office",
        lines: [
            "Chaitali Co-operative Housing Society Ltd.",
            "BB-102, Ground Floor, Street No. 152, New Town",
            "Kolkata 700 156, West Bengal",
        ],
        email: site.emails.projects,
        mapQuery: "BB-102 Street No. 152, New Town, Kolkata 700156",
    },
];

export const leadership = [
    {
        name: "Ranjeet Roy",
        role: "Managing Director",
        focus: "Land acquisition & project finance",
    },
    {
        name: "Sampa Roy",
        role: "Managing Director",
        focus: "Design, interiors & customer experience",
    },
    {
        name: "Partha Roy Chowdhury",
        role: "Managing Director",
        focus: "Construction, quality & handover",
    },
];

export const socials: NavItem[] = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
];
