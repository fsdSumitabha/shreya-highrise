import { incomeBands, type BandCode } from "@/data/cooperative";

/* ── The project catalogue ────────────────────────────────────────────────
   Promoted by hand out of src/data/temp-projects.json, which is where the
   client's own answers are taken down (see /internal/projects). This module
   is the single source of truth for anything the public site renders about a
   project — the cards, the index, the detail pages and the enquiry-form
   dropdown all read from here.

   Almost every field is optional on purpose. The client answers in
   instalments: an address today, a price sheet next week, a brochure after
   that. Every consumer below and in src/components/projects/ renders only
   what is present and drops the rest silently, so filling in a field here is
   the entire job of making it appear on the site — no component has to be
   opened to publish a new fact.

   Nothing here is invented. A fact the client has not given us is absent,
   not guessed. */

export type Stage = "upcoming" | "ongoing" | "completed";

export type NearbyPlace = { name: string; distance: string };

/** One configuration and what it starts at, as the client quotes it. */
export type PriceBand = { config: string; from: string };

/** A row of the tenement schedule printed on a typical-floor drawing. */
export type UnitRow = { unit: string; tenement: string; superBuiltUp: string };

/** A row of the ground-floor area schedule — the non-residential spaces. */
export type SpaceRow = { space: string; builtUp: string; superBuiltUp: string };

/** A drawing sheet under public/projects/plans/. `file` is a raw path — the
    component that renders it runs encodeURI, so the spaces in the filenames
    the architect supplied are left exactly as they arrived. */
export type PlanSheet = { label: string; file: string };

/** One sanctioned layout of the same building. Where the architect has issued
    alternatives, each is an option here rather than a separate project. */
export type PlanOption = {
    name: string;
    note?: string;
    units?: UnitRow[];
    parking?: string;
    spaces?: SpaceRow[];
    sheets: PlanSheet[];
};

/** What the sanctioned drawings say, kept apart from what the client says.
    The title block is quoted, not paraphrased. */
export type SanctionedPlan = {
    title: string;
    drawingNo?: string;
    /** The address exactly as it is written on the drawing's title block. */
    plotAddress?: string;
    plotSize?: string;
    roadWidth?: string;
    scale?: string;
    stack?: string;
    unitsPerFloor?: string;
    lift?: string;
    /** Rooms drawn into every flat on the typical-floor sheet. */
    unitPlan?: string[];
    /** What the ground floor carries besides parking and the shop units. */
    services?: string[];
    options: PlanOption[];
    /** Anything about the drawings a reader has to know to read them right. */
    caveat?: string;
};

export type Project = {
    slug: string;
    name: string;
    stage: Stage;
    corridor: string;
    imageLabel: string;
    /** Co-operative income band — keys into `incomeBands` in cooperative.ts. */
    band?: BandCode;
    /** Plot reference off the front of the address: BB-102, CD-114, CC-59. */
    plot?: string;
    /** Short form, for cards and the hero line. */
    locality?: string;
    /** The full postal address, as the client gave it. */
    address?: string;
    typology?: string;
    sizeRange?: string;
    /** What `sizeRange` is measured on — carpet, super built-up, built-up. */
    areaBasis?: string;
    priceFrom?: string;
    prices?: PriceBand[];
    possession?: string;
    handedOver?: string;
    totalFlats?: string;
    families?: string;
    floors?: string;
    rera?: string;
    highlights: string[];
    nearby: NearbyPlace[];
    /** A paragraph about the address, once the client writes one. */
    about?: string;
    /** Real photography from public/. Until it exists the frame is a brief. */
    image?: string;
    gallery?: { src: string; label: string }[];
    brochure?: string;
    plan?: SanctionedPlan;
};

export const projectsIntro = {
    eyebrow: "Our projects",
    heading: "Every address we have built, and are building",
    lede: "Co-operative society blocks across New Town — two under construction and open for booking, four handed over and lived in. Configuration, area, price and possession are published here before you ever pick up the phone.",
    marks: ["6 addresses on record", "New Town", "G+4 co-operative blocks", "Kolkata only"],
};

export const featuredIntro = {
    eyebrow: "Open for sale",
    lines: ["Under construction,", "open for booking"],
    lede: "Two co-operative society blocks in Action Area I, New Town. Area, price and possession are on the card; the sanctioned plan is on the project page.",
};

export const deliveredIntro = {
    eyebrow: "Recently delivered",
    lines: ["Handed over,", "occupied, running"],
    lede: "The fastest way to judge a builder is to visit somewhere they finished. Residents at these addresses are happy to be asked.",
};

export const stageLabel: Record<Stage, string> = {
    upcoming: "New launch",
    ongoing: "Under construction",
    completed: "Ready to move",
};

/* The set the client quotes on every one of their societies. Held once
   rather than copied into six projects, so correcting it corrects it
   everywhere — a project that differs simply carries its own list. */
const societyStandard = [
    "CCTV surveillance & 24/7 security",
    "24-hour power backup",
    "Dedicated parking — one space per flat",
    "Landscaped garden / green space",
    "Security room",
];

export const projects: Project[] = [
    {
        slug: "lig-co-operative",
        name: "LIG Co-operative",
        stage: "ongoing",
        band: "lig",
        plot: "CD-114",
        locality: "BA Block, Action Area I, New Town",
        address: "CD, Street Number 114, BA Block, Action Area I, New Town, Kolkata 700 163, West Bengal",
        corridor: "New Town",
        typology: "2 & 4 BHK",
        sizeRange: "750 sq. ft. onwards",
        areaBasis: "Super built-up",
        priceFrom: "₹45 L",
        prices: [
            { config: "2 BHK", from: "₹45 L" },
            /* ⚠ VERIFY BEFORE GO-LIVE — ₹7 Cr is what the intake sheet records,
               but it sits beside a ₹45 L 2 BHK in the same G+4 block. Almost
               certainly ₹70 L mistyped. Left exactly as captured rather than
               corrected on a guess; see CLIENT-DATA.md §2. */
            { config: "4 BHK", from: "₹7 Cr" },
        ],
        floors: "G+4",
        highlights: societyStandard,
        nearby: [
            {
                name: "Nazrul Tirtha Metro Station",
                distance: "1.0 km"
            },
            {
                name: "Biswa Bangla Gate (Hanging Restaurant / Narkelbagan)",
                distance: "1.3 km"
            },
            {
                name: "Axis Mall",
                distance: "1.6 km"
            },
            {
                name: "Eco Park",
                distance: "2.9 km"
            },
            {
                name: "City Centre 2",
                distance: "6.3 km"
            }
        ],
        imageLabel: "LIG Co-operative, CD-114 — street elevation under construction",
        plan: {
            title: "Proposed G+4 residential building",
            drawingNo: "05-0266",
            plotAddress: "CD-114, Street No. 266, New Town, Kolkata 700 156",
            plotSize: "21.60 m × 12.50 m — 70′-10″ × 41′-0″",
            roadWidth: "Street No. 266, 12 m wide",
            scale: "1 : 100",
            stack: "Ground floor + four residential floors",
            unitsPerFloor: "Three flats per floor, 1st to 4th — twelve homes in all",
            lift: "Lift well 1350 × 1550 mm, off a common lobby",
            unitPlan: [
                "Two bedrooms",
                "Drawing room",
                "Kitchen-cum-dining",
                "Toilet and separate W.C.",
                "900 mm balcony",
                "Loft over the bedroom lobby",
            ],
            services: [
                "Underground water reservoir along the rear boundary",
                "Rainwater harvesting tank",
                "Guard's room and site office at entrance level",
                "One staircase and lift core serving both lobbies",
                "Garden strip to the rear of the plot",
            ],
            options: [
                {
                    name: "Option A",
                    note: "Eight car bays, the larger office and the smaller shop.",
                    parking: "8 car parking bays at ground level",
                    units: [
                        { unit: "Flat A", tenement: "536 sq. ft.", superBuiltUp: "670 sq. ft." },
                        { unit: "Flat B", tenement: "536 sq. ft.", superBuiltUp: "670 sq. ft." },
                        { unit: "Flat C", tenement: "537 sq. ft.", superBuiltUp: "671 sq. ft." },
                    ],
                    spaces: [
                        { space: "Shop", builtUp: "189 sq. ft.", superBuiltUp: "236 sq. ft." },
                        { space: "Office", builtUp: "324 sq. ft.", superBuiltUp: "405 sq. ft." },
                    ],
                    sheets: [
                        { label: "Ground floor plan", file: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN.pdf" },
                        { label: "1st to 4th floor plan", file: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN.pdf" },
                    ],
                },
                {
                    name: "Option B",
                    note: "Five car bays and a longer shop frontage, against a wider Flat C.",
                    parking: "5 car parking bays at ground level",
                    units: [
                        { unit: "Flat A", tenement: "542 sq. ft.", superBuiltUp: "678 sq. ft." },
                        { unit: "Flat B", tenement: "532 sq. ft.", superBuiltUp: "665 sq. ft." },
                        { unit: "Flat C", tenement: "580 sq. ft.", superBuiltUp: "725 sq. ft." },
                    ],
                    spaces: [
                        { space: "Shop", builtUp: "286 sq. ft.", superBuiltUp: "357 sq. ft." },
                        { space: "Office", builtUp: "119 sq. ft.", superBuiltUp: "149 sq. ft." },
                    ],
                    sheets: [
                        { label: "Ground floor plan", file: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN-1.pdf" },
                        { label: "1st to 4th floor plan", file: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN-1.pdf" },
                    ],
                },
            ],
            caveat: "Areas are read off the architect's sanctioned sheets and follow the final approved drawing. The title block gives the address as Street No. 266; the society's own paperwork gives Street No. 114 — both are printed here rather than reconciled.",
        },
    },
    {
        slug: "lig-co-operative-housing-society",
        name: "LIG Co-operative Housing Society",
        stage: "ongoing",
        band: "lig",
        plot: "CC-59",
        locality: "Street No. 237, Action Area I, New Town",
        address: "CC-59, Street No. 237, Action Area I, New Town, Kolkata 700 156, West Bengal",
        corridor: "New Town",
        typology: "2 BHK",
        sizeRange: "850 sq. ft. onwards",
        areaBasis: "Super built-up",
        priceFrom: "₹55 L",
        prices: [{ config: "2 BHK", from: "₹55 L" }],
        possession: "October 2026",
        totalFlats: "8",
        families: "8",
        floors: "G+4",
        highlights: societyStandard,
        nearby: [
            { name: "Biswa Bangla Gate", distance: "1.2 km" },
            { name: "Axis Mall", distance: "1.5 km" },
            { name: "Eco Park", distance: "2.8 km" },
            { name: "City Centre 2", distance: "6.2 km" },
        ],
        imageLabel: "LIG Co-operative Housing Society, CC-59 — street elevation",
    },
    {
        slug: "chaitali-co-operative-housing-society",
        name: "Chaitali Co-operative Housing Society",
        stage: "completed",
        band: "mig",
        plot: "BB-102",
        locality: "Street No. 152, New Town",
        address: "BB-102, Ground Floor, Street No. 152, New Town, Kolkata 700 156, West Bengal",
        corridor: "New Town",
        possession: "2022",
        handedOver: "2022",
        totalFlats: "8",
        families: "8",
        floors: "G+4",
        highlights: societyStandard,
        nearby: [],
        about: "Our head office sits on the ground floor of this building. Price sheets, floor plans and anything to do with a booked flat are handled from here, which makes it the easiest address on this list to come and see for yourself.",
        imageLabel: "Chaitali Co-operative Housing Society — entrance elevation",
    },
    {
        slug: "new-manikanchan-mig-society",
        name: "New Manikanchan MIG Society",
        stage: "completed",
        band: "mig",
        plot: "Plot 1196",
        locality: "Street No. 570, Action Area IIB, New Town",
        address: "Plot 1196, Street No. 570, Action Area IIB, New Town, Kolkata 700 156, West Bengal",
        corridor: "New Town",
        typology: "2 BHK",
        sizeRange: "800 sq. ft.",
        priceFrom: "₹36 L",
        prices: [{ config: "2 BHK", from: "₹36 L" }],
        handedOver: "December 2023",
        families: "12",
        floors: "G+4",
        highlights: societyStandard,
        nearby: [
            { name: "Six-lane highway", distance: "100 m" },
            { name: "Eco Park", distance: "1 km" },
            { name: "City Centre 2", distance: "2 km" },
        ],
        imageLabel: "New Manikanchan MIG Society — street elevation",
    },
    {
        slug: "8-member-mig-society",
        name: "8 Member MIG Society",
        stage: "completed",
        band: "mig",
        locality: "Street No. 609, Action Area II, New Town",
        address: "Street No. 609, Action Area II, New Town, Kolkata 700 156, West Bengal",
        corridor: "New Town",
        typology: "3 BHK",
        sizeRange: "1,250 sq. ft.",
        areaBasis: "Super built-up",
        handedOver: "2018",
        totalFlats: "8",
        families: "8",
        floors: "G+4",
        highlights: societyStandard,
        nearby: [
            { name: "Six-lane highway", distance: "100 m" },
            { name: "Eco Park", distance: "1 km" },
            { name: "City Centre 2", distance: "2 km" },
        ],
        imageLabel: "8 Member MIG Society — street elevation",
    },
    {
        slug: "mitrae-co-operative",
        name: "Mitrae Co-operative",
        stage: "completed",
        corridor: "New Town",
        // The intake sheet records 2018 as possession, not handover. Read as
        // the same fact for a finished society — see `datedFact`.
        possession: "2018",
        floors: "G+4",
        highlights: societyStandard,
        nearby: [],
        imageLabel: "Mitrae Co-operative — street elevation",
    },
];

export const openForSale = projects.filter((project) => project.stage !== "completed");
export const delivered = projects.filter((project) => project.stage === "completed");

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

/** The rest of the catalogue, still-building first — what a detail page
    offers a reader next. */
export const otherProjects = (slug: string) =>
    projects
        .filter((project) => project.slug !== slug)
        .sort((a, b) => Number(a.stage === "completed") - Number(b.stage === "completed"));

/** The line a card puts under the name when there is no locality on file. */
export const whereLine = (project: Project) => project.locality ?? `${project.corridor}, Kolkata`;

/** The area basis, as a column heading. Nothing on file gets a neutral term
    rather than an assumption about which measure the client quoted. */
export const areaTerm = (project: Project) => project.areaBasis ?? "Area";

/** The income band a society is developed for, as the band file names it. */
export const bandOf = (project: Project) => incomeBands.find((band) => band.code === project.band);

/* One dated row, not two. The intake sheet records the same year under
   `possession` for one society and `handedOver` for another — see the note in
   CLIENT-DATA §6 — so for a finished building the two fields are read as the
   same fact and only the stage decides what to call it. */
export function datedFact(project: Project) {
    const value =
        project.stage === "completed"
            ? (project.handedOver ?? project.possession)
            : (project.possession ?? project.handedOver);
    if (!value) return undefined;

    return { term: project.stage === "completed" ? "Handed over" : "Possession", value };
}

/* The masthead of a project page, written out of the record rather than by
   hand. Six addresses is six paragraphs nobody has written yet, and a page
   that waits for copy is a page that never ships — so the lede is assembled
   from the fields we hold and says only what they say. Where the client has
   written an `about` paragraph it runs further down the page, in the column
   that has room for it, and is what search results quote. */
export function heroLede(project: Project): string {
    const block = project.floors
        ? `A ${project.floors} co-operative society block`
        : "A co-operative society block";
    const where = project.locality ? `at ${project.locality}` : `in ${project.corridor}, Kolkata`;
    const dated = datedFact(project);
    const when = dated
        ? `${dated.term.toLowerCase()} ${dated.value}`
        : project.stage === "completed"
          ? undefined
          : "under construction";

    const tail = [project.typology && `${project.typology} homes`, when].filter(Boolean).join(", ");

    return tail
        ? `${block} ${where}. ${tail.charAt(0).toUpperCase()}${tail.slice(1)}.`
        : `${block} ${where}.`;
}

/** What a search result and the structured data quote — the client's own
    paragraph where there is one, and the assembled line where there is not. */
export const metaDescription = (project: Project) => project.about ?? heroLede(project);

/** The hairline facts that run under a project's masthead. */
export const heroMarks = (project: Project): string[] =>
    [
        project.plot,
        project.floors,
        project.totalFlats && `${project.totalFlats} homes`,
        project.sizeRange && `${areaTerm(project)} ${project.sizeRange}`,
        project.priceFrom && `From ${project.priceFrom}`,
    ].filter((mark): mark is string => !!mark);

/* Everything on file about one address, in the order a buyer asks for it —
   what it is, how big, what it costs, when it is ready, and how it is put
   together. Same rule as `cardFacts`: a fact we do not hold is not a row.
   Adding a field to `Project` and listing it here is all it takes for it to
   appear on the project page. */
export function scheduleFacts(project: Project): { term: string; value: string }[] {
    const band = bandOf(project);

    return [
        project.typology && { term: "Configuration", value: project.typology },
        project.sizeRange && { term: areaTerm(project), value: project.sizeRange },
        project.priceFrom && { term: "Starting at", value: project.priceFrom },
        datedFact(project),
        project.floors && { term: "Structure", value: project.floors },
        project.totalFlats && { term: "Homes", value: project.totalFlats },
        project.families && { term: "Families", value: project.families },
        band && { term: "Society band", value: `${band.short} — ${band.name}` },
        { term: "Corridor", value: project.corridor },
        project.rera && { term: "RERA", value: project.rera },
    ].filter((fact) => !!fact);
}

/* The four facts a card has room for, in the order a buyer reads them.
   Anything the client has not answered takes up no slot, so a thin project
   renders a short list rather than a grid of dashes. */
export function cardFacts(project: Project) {
    return [
        project.typology && { term: "Type", value: project.typology },
        project.sizeRange && { term: areaTerm(project), value: project.sizeRange },
        project.priceFrom && { term: "From", value: project.priceFrom },
        datedFact(project),
        project.floors && { term: "Floors", value: project.floors },
        project.families && { term: "Families", value: project.families },
    ]
        .filter((fact) => !!fact)
        .slice(0, 4);
}
