export type Milestone = { year: string; title: string; body: string; tense?: "past" | "future" };
export type Principle = { title: string; body: string };
export type BuildSpec = { system: string; detail: string };
export type Desk = { name: string; owns: string; lead: string };

export const aboutIntro = {
    eyebrow: "About Shreya High Rise",
    heading: "One family, ten addresses, no shortcuts",
    lede: "We are a privately held Kolkata developer. We buy the land, draw the plans, pour the concrete and hand over the keys ourselves — and we have never put this name on a building we did not build.",
    marks: ["Privately held", "Roy family owned", "WBRERA registered", "Kolkata only"],
};

export const story = {
    eyebrow: "How it started",
    heading: "It begins on a road we already lived on",
    paragraphs: [
        "Shreya High Rise starts the way most Kolkata builders do — with a single plot and a family name. The Roys bought a strip of land on Rabindra Sarani in New Barrackpur: a road they had lived on, in a neighbourhood where they knew which stretch floods in August and which one stays dry. The building that went up there still carries the company's registered office on its ground floor.",
        "For the first years the work was deliberately small. Four floors, sixteen families, a contractor's crew, and three people doing everything else between them. What changed was never the ambition — it was the method. The company stopped quoting prices that could be revised later, started printing a delay clause into its own agreements, and hired an engineer whose entire job was to say no to the site.",
        "The high-rise came after that. Piled foundations, gearless lifts, a fire system signed off to the National Building Code — none of it is remarkable elsewhere in India, and all of it was a decision here. Ten addresses now carry the name: north along the Jessore Road spine where we started, east into Rajarhat and New Town, and by the end of this decade, south towards Narendrapur.",
        "The company is still private. It is still funded out of projects it has already delivered, and it is still run day to day by the three people who signed for that first plot. That is the whole story. We are not planning a different one.",
    ],
    pullQuote: "We would rather hand over sixty homes we can stand in front of than six hundred we cannot.",
    pullQuoteBy: "The founding principle, unchanged",
    imageOne: "Rabindra Sarani — the first building the company completed",
    imageTwo: "Directors on site during a slab pour",
};

export const milestones: Milestone[] = [
    {
        year: "2021",
        title: "The company is registered",
        body: "Shreya Highrise Private Limited is incorporated in West Bengal and buys a strip of land on Rabindra Sarani, New Barrackpur. Everything since has been funded out of what came before it.",
    },
    {
        year: "2022",
        title: "The delivery promise",
        body: "A dated possession clause and a delay-compensation term go into the standard agreement. Shreya Greens is handed over the same year — ninety-six homes in Madhyamgram, transferred to a resident association after two years of estate support.",
    },
    {
        year: "2023",
        title: "Into high-rise",
        body: "First piled foundation, first gearless lift bank, and the first project engineered to the delta's soil profile rather than a generic Zone III template.",
    },
    {
        year: "2024",
        title: "Verdant Court receives its OC",
        body: "One hundred and forty-eight families take possession in Action Area I — the first New Town address, and the move from neighbourhood developer to a company building on the city's planned edge.",
    },
    {
        year: "2025",
        title: "Skyline One",
        body: "Twin G+22 towers in Action Area II — the tallest the company has built, and the first with a sky lounge.",
    },
    {
        year: "2029",
        title: "South of the bypass",
        body: "Meadow Vista opens the Narendrapur corridor, the fourth part of Kolkata this company will have built in.",
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
