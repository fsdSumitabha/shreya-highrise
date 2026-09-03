export type Milestone = { year: string; title: string; body: string; tense?: "past" | "future" };
export type Principle = { title: string; body: string };
export type BuildSpec = { system: string; detail: string };
export type Desk = { name: string; owns: string; lead: string };

export const aboutIntro = {
    eyebrow: "About Shreya High Rise",
    heading: "One family, ten addresses, no shortcuts",
    lede: "We are a privately held Kolkata developer. We buy the land, draw the plans, pour the concrete and hand over the keys ourselves — and we have never put this name on a building we did not build.",
    marks: ["Privately held", "Roy family owned", "Co-operative housing", "Kolkata only"],
};

export const story = {
    eyebrow: "How it started",
    heading: "It begins with land, not buildings",
    paragraphs: [
        "The family's first business was land. From 2012 the Roys bought plots along Kolkata's eastern edge and sold them on to developers — no signboard, no company, and no building of their own. What those years bought was judgement: which titles were clean, which mutation would take a year, which stretch of a lane floods in August, and what a plot is actually worth to the person who has to build on it.",
        "In 2016 the work changed sides of the table. Trading as Roy Constructions, the family stopped selling land to builders and started building on it — co-operative society blocks in New Town, four floors over the ground, eight to twelve families to a building. A co-operative is an unforgiving client: the members are the owners, they sit through every meeting, and they live in the result. That is the discipline the company still builds to.",
        "In 2021 the business was registered in West Bengal as Shreya Highrise Private Limited, and the map opened out. New Town remains the home ground, but the name now goes up in Rajarhat and north along the Jessore Road spine — Madhyamgram, Birati and New Barrackpur. The size of the building has not changed with it. We would rather do the same G+4 well in five places than something taller in one.",
        "The company is still private. It is still funded out of what it has already delivered, and it is still run day to day by the three people who started it. Ten addresses, a hundred and twenty-odd families, and not one building carrying this name that we did not build ourselves. That is the whole story. We are not planning a different one.",
    ],
    pullQuote: "We would rather hand over twelve homes we can stand in front of than a hundred we cannot.",
    pullQuoteBy: "The founding principle, unchanged",
    imageOne: "New Town — the first co-operative society block the company completed",
    imageOneFile: "",
    imageTwo: "Directors on site during a slab pour",
    imageTwoFile: "/directors/ranjeet_roy.jpg",
};

export const milestones: Milestone[] = [
    {
        year: "2012",
        title: "Land, and the lessons in it",
        body: "The family business begins on the other side of the table — buying plots on the eastern edge of the city and selling them on to developers. Four years of title checks, mutation and conversion work, all of which the company still does in-house before it markets anything.",
    },
    {
        year: "2016",
        title: "Roy Constructions",
        body: "The first building of our own goes up in New Town: a G+4 co-operative society block, built for the members who would live in it. One township, one crew, and a specification written down rather than agreed on site.",
    },
    {
        year: "2018",
        title: "The first two handovers",
        body: "Mitrae Co-operative and the eight-member MIG society on Street 609 are completed in the same year. The first residents to take keys from us, and the first two buildings we are still called back to.",
    },
    {
        year: "2021",
        title: "Shreya Highrise Private Limited",
        body: "The business is incorporated in West Bengal, and the working area widens past New Town — into Rajarhat, and north to Madhyamgram, Birati and New Barrackpur.",
    },
    {
        year: "2022",
        title: "Chaitali Co-operative, BB-102",
        body: "Eight families take possession on Street No. 152, New Town. The ground floor of that building became our head office, which is still where the project team sits.",
    },
    {
        year: "2023",
        title: "New Manikanchan MIG Society",
        body: "Twelve families in Action Area IIB, a kilometre from Eco Park and two from City Centre II — the largest single society the company had built to that point.",
    },
    {
        year: "2026",
        title: "Two more in Action Area I",
        body: "Co-operative societies under construction on Street 237 and in BA Block, the first of them handing over in October.",
        tense: "future",
    },
];

export const principles: Principle[] = [
    {
        title: "The land is ours before the flat is yours",
        body: "Nothing is marketed until the title is clear, the mutation is complete and the sanctioned plan is in hand. We do not take bookings against land we are still negotiating for.",
    },
    {
        title: "One drawing, one price, one date",
        body: "The layout you are shown at the first meeting is the layout that gets built, at the price on that day's sheet, for possession on the date printed in the agreement.",
    },
    {
        title: "Build for the delta, not the brochure",
        body: "Salt in the air, a water table two metres down, and four months of rain. The specification is written for what Kolkata does to a building over thirty years, not for what photographs well in year one.",
    },
    {
        title: "Nobody else uses this name",
        body: "We have never franchised the brand, sold a development-management licence, or let a third party build under it. If it says Shreya High Rise, we poured it.",
    },
];

export const buildStandard = {
    eyebrow: "The specification",
    heading: "What goes into every building",
    lede: "This sheet does not change from address to address. Finishes and amenity scale differ by project; the structure, the services and the safety systems below do not.",
};

export const buildSpecs: BuildSpec[] = [
    { system: "Structure", detail: "RCC framed, Seismic Zone III, IS 456:2000 — M30 to columns and shear walls" },
    { system: "Foundation", detail: "Bored cast-in-situ piles, sized from site-specific SPT bore data" },
    { system: "Masonry", detail: "200 mm AAC block externally, 100 mm internally, mesh-bound at every junction" },
    { system: "Facade", detail: "Textured exterior emulsion over primer and base coat, seven-year system warranty" },
    { system: "Waterproofing", detail: "Crystalline slurry with brickbat coba to terraces, sunk slabs and planters" },
    { system: "Openings", detail: "Anodised aluminium sliders with 5 mm glazing; seasoned hardwood door frames" },
    { system: "Electrical", detail: "FR-grade copper in concealed conduit, modular switchgear, 100% DG backup" },
    { system: "Plumbing", detail: "Concealed CPVC supply and UPVC waste, chrome-finish CP fittings" },
    { system: "Lifts", detail: "Gearless machine-room-less, 1.5 m/s, automatic rescue device on every car" },
    { system: "Fire safety", detail: "NBC 2016 — wet riser, sprinklers and addressable detection above 15 m" },
    { system: "Water & waste", detail: "Rainwater harvesting, sewage treatment plant, organic waste converter" },
    { system: "Handover", detail: "Occupancy certificate before keys; snag list closed and signed in writing" },
];

export const desks: Desk[] = [
    {
        name: "Land & title",
        owns: "Acquisition, mutation, conversion, and the title report that goes to every buyer's advocate.",
        lead: "Ranjeet Roy",
    },
    {
        name: "Design & drawings",
        owns: "Masterplan, unit layouts, Vaastu review, and the sanctioned set filed with the municipality.",
        lead: "Sampa Roy",
    },
    {
        name: "Structure & engineering",
        owns: "Soil investigation, pile design, slab-wise checks, and the third-party audit trail.",
        lead: "Partha Roy Chowdhury",
    },
    {
        name: "Procurement",
        owns: "Cement, steel and fittings bought by brand and grade, held against the specification sheet.",
        lead: "Partha Roy Chowdhury",
    },
    {
        name: "Sales & finance",
        owns: "One price sheet, live inventory, and the loan file walked through to final disbursement.",
        lead: "Ranjeet Roy",
    },
    {
        name: "Handover & facility",
        owns: "Snag lists, occupancy certificate, key handover, and 24 months of estate management.",
        lead: "Sampa Roy",
    },
];
