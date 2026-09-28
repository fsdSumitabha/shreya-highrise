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

/** A sales flag shown beside the stage badge. Set by hand per project. */
export type Tag = "booking-open" | "premium";

export type NearbyPlace = { name: string; distance: string };

/** One configuration and what it starts at, as the client quotes it. */
export type PriceBand = { config: string; from: string };

/** A row of the tenement schedule printed on a typical-floor drawing. */
export type UnitRow = { unit: string; tenement: string; superBuiltUp: string };

/** A row of the ground-floor area schedule — the non-residential spaces. */
export type SpaceRow = { space: string; builtUp: string; superBuiltUp: string };

/** A scan of a drawing sheet. The dimensions travel with the source because
    the architect issues these both portrait and landscape, so nothing
    downstream may assume a ratio, and `alt` is required rather than optional:
    a drawing is the one thing on this site that must not be published to only
    half its readers. */
export type SheetImage = { src: string; width: number; height: number; alt: string };

/** A drawing sheet under public/projects/plans/. `file` is a raw path — the
    component that renders it runs encodeURI, so the spaces in the filenames
    the architect supplied are left exactly as they arrived. `image` is the
    same sheet as a scan, where we have one; a sheet without it stays a link
    and nothing more. */
export type PlanSheet = { label: string; file: string; image?: SheetImage };

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
    /** Whether these sheets are the sanctioned set. True for most of the
        catalogue, and the default. A set whose title block does not say so
        sets this false, and the two sections that show drawings then call
        them the architect's rather than borrowing a word the paperwork has
        not earned — see `planWording`. */
    sanctioned?: boolean;
    drawingNo?: string;
    /** The address exactly as it is written on the drawing's title block. */
    plotAddress?: string;
    plotSize?: string;
    /** Ground coverage, where the sheet prints it. */
    groundCoverage?: string;
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
    /** Sales flags, shown on the card and the project page. */
    tags?: Tag[];
    corridor: string;
    imageLabel: string;
    /** Co-operative income band — keys into `incomeBands` in cooperative.ts. */
    band?: BandCode;
    /** What kind of building this is, for the assembled hero line. Almost
        everything here is a co-operative society block, which is the default;
        anything else — an individual plot, say — names itself. */
    buildingType?: string;
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
    /** The price of the whole building, where it is sold as one. */
    buildingPrice?: string;
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
    lede: "Seven addresses across New Town — three under construction and open for booking, four handed over and lived in. Mostly co-operative society blocks, and one house on a private plot. Configuration, area, price and possession are published here before you ever pick up the phone.",
    marks: ["7 addresses on record", "3 open for booking", "New Town", "Kolkata only"],
};

export const featuredIntro = {
    eyebrow: "Open for sale",
    lines: ["Under construction,", "open for booking"],
    lede: "Two co-operative society blocks in Action Area I and a house on a private plot off Street No. 68. Area, price and possession are on the card; the drawings are on the project page.",
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

export const tagLabel: Record<Tag, string> = {
    "booking-open": "Booking open",
    premium: "Premium",
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
        name: "LIG Co-operative Society",
        stage: "ongoing",
        tags: ["booking-open"],
        band: "lig",
        plot: "CD-114",
        locality: "CD Block, Action Area I, New Town",
        address: "CD 114, Street Number 266, CD Block, Action Area I, New Town, Kolkata 700 163, West Bengal",
        corridor: "New Town",
        typology: "2 BHK",
        sizeRange: "750 sq. ft. onwards",
        areaBasis: "Super built-up",
        priceFrom: "₹45 L",
        prices: [
            { config: "2 BHK", from: "₹45 L" }
        ],
        floors: "G+4",
        highlights: societyStandard,
        nearby: [
            {
                name: "Nazrul Tirtha Metro Station",
                distance: "1.0 km"
            },
            {
                name: "Biswa Bangla Gate ",
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
        image: "/projects/plans/cd_114/project_elevation.jpg",
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
                        {
                            label: "Ground floor plan",
                            file: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN.pdf",
                            image: {
                                src: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Sanctioned ground floor plan, Option A: eight car bays and a shop along the 12 m street frontage, office and guard's room off the lift lobby, and an underground water reservoir, rainwater tank and garden strip across the rear boundary.",
                            },
                        },
                        {
                            label: "1st to 4th floor plan",
                            file: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN.pdf",
                            image: {
                                src: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Sanctioned 1st to 4th floor plan, Option A: three flats set around a central stair and lift lobby, each drawn with two bedrooms, a drawing room, kitchen-cum-dining, toilet and a 900 mm balcony.",
                            },
                        },
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
                        {
                            label: "Ground floor plan",
                            file: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN-1.pdf",
                            image: {
                                src: "/projects/plans/cd_114/05-0266_CD114_GR FL PLAN-1.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Sanctioned ground floor plan, Option B: five car bays and a longer shop frontage to the street, a smaller office beside the guard's room at the lift lobby, with the underground water reservoir and rainwater tank along the rear boundary.",
                            },
                        },
                        {
                            label: "1st to 4th floor plan",
                            file: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN-1.pdf",
                            image: {
                                src: "/projects/plans/cd_114/05-0266_CD114_TYP FL PLAN-1.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Sanctioned 1st to 4th floor plan, Option B: Flats A and B mirrored across a shared drawing-room wall at the front of the plot, Flat C to the rear beside the stair and lift core.",
                            },
                        },
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
        locality: "CC Plot No 59 | Street No. 237, Action Area I, New Town",
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
        imageLabel: "Architect's render of a G+4 co-operative society block in New Town — side elevation from the street, balconies stacked beside the stair core",
        image: "/projects/cc_59/lig-co-operative-housing-society.jpg",
    },
    {
        slug: "pre-hold-individual-plot",
        name: "Pre Hold Individual Plot",
        stage: "ongoing",
        tags: ["booking-open", "premium"],
        /* Not a co-operative. One four-bedroom home to a floor on a private
           plot, so it carries no income band and says what it is instead. */
        buildingType: "residence on an individual plot",
        plot: "Plot 111",
        locality: "AA Block, Street No. 68, New Town",
        address: "AA Block, Plot 111, Street No. 68, New Town, Kolkata 700 156, West Bengal",
        corridor: "New Town",
        typology: "4 BHK",
        sizeRange: "1,800 sq. ft.",
        areaBasis: "Super built-up",
        priceFrom: "₹1.6 Cr",
        buildingPrice: "₹7 Cr",
        prices: [{ config: "4 BHK", from: "₹1.6 Cr" }],
        // A date still in the future is a possession date, not a handover —
        // `datedFact` labels it from the stage, and the rest of the catalogue
        // writes months out in full.
        possession: "December 2026",
        floors: "G+4",
        /* WITHHELD — the intake sheet records `totalFlats: "148"` and
           `families: "148"`. The architect's own drawing for this address puts
           one 4 BHK home on each of four floors, on a plot of about 2,150 sq.
           ft. with 1,382 sq. ft. of ground coverage, so 148 is not a number
           this building can hold. Publishing it would also put more families
           in one house than the site claims across the whole practice.
           Left out until the client corrects it — see CLIENT-DATA.md §2. */
        highlights: [
            "200 sq. ft. commercial space at ₹20,000 per sq. ft.",
            ...societyStandard,
        ],
        nearby: [
            { name: "Biswa Bangla Gate", distance: "500 m" },
            { name: "Axis Mall", distance: "500 m" },
            { name: "City Centre 2", distance: "1 km" },
        ],
        imageLabel: "Architect's render of the G+4 residence at AA Block, Street No. 68 — street corner elevation, four floors of balconies beside a slatted stair screen, with the shop shutter and entrance gate at ground level",
        image: "/projects/aa_68/left_side_view.jpg",
        gallery: [
            {
                src: "/projects/aa_68/right_side_view.jpg",
                label: "Architect's render of the same building from the opposite corner — timber and stone cladding across the projecting bay, and the covered parking behind the gate",
                // Reads as an exterior brief until a site photograph exists.
            },
        ],
        plan: {
            /* The title block on these sheets says "plan of residence", not
               "proposed" or "sanctioned" as CD-114's does, so the two sections
               that show them do not claim otherwise. */
            sanctioned: false,
            title: "G+4 residence at Premises No. 02-068",
            drawingNo: "02-0068",
            plotAddress: "Premises No. 02-068, Street No. 0068, New Town, Kolkata",
            plotSize: "10.245 m × 19.532 m — 33′-7″ × 64′-1″",
            groundCoverage: "128.375 sq. m. — 1,382 sq. ft.",
            scale: "1 : 100",
            stack: "Ground floor + four residential floors",
            unitsPerFloor: "One four-bedroom home per floor, 1st to 4th",
            lift: "Lift well 1300 × 1600 mm, off a common lobby",
            unitPlan: [
                "Four bedrooms, the largest 13′-2″ × 9′-10″",
                "Living-cum-dining, 14′-1″ × 15′-10″",
                "Kitchen, 11′-6″ × 6′-10″",
                "Three toilets",
                "Loft off the inner lobby",
                "Balcony, 10′-6″ × 3′-2″",
            ],
            services: [
                "Four car parking bays, drawn in off the street frontage",
                "Shop of 8′-5″ × 24′-11″ beside the parking",
                "Electrical equipment room at ground level",
                "Two further bedrooms and a toilet on the ground floor",
                "Underground water reservoir and planted rear yard",
            ],
            options: [
                {
                    /* The architect issued one layout for this address, so
                       this name is never shown — a set of one has nothing to
                       tell itself apart from. It stays as the grouping key
                       the sheets hang off. */
                    name: "As drawn",
                    parking: "4 car parking bays at ground level",
                    /* Two floors, each drawn twice: once coloured for a reader
                       and once in line work. The pairs are kept adjacent so
                       each floor's two versions sit side by side. */
                    sheets: [
                        {
                            label: "Ground floor plan — colour render",
                            file: "/projects/plans/0068/ground_floor_plan_colour_render.pdf",
                            image: {
                                src: "/projects/plans/0068/ground_floor_plan_colour_render.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Ground floor plan in colour: four car bays drawn with cars along the Street No. 68 frontage, a long shop and electrical equipment room to one side, two bedrooms with toilets behind the stair and lift lobby, and an underground water reservoir under planting across the rear yard.",
                            },
                        },
                        {
                            label: "Ground floor plan — line drawing",
                            file: "/projects/plans/0068/ground_floor_plan_line_drawing.pdf",
                            image: {
                                src: "/projects/plans/0068/ground_floor_plan_line_drawing.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "The same ground floor plan in line work, without colour: four parking bays off the street, shop and electrical equipment room alongside, two bedrooms and toilets behind the stair and lift lobby, and the underground water reservoir across the rear yard. Dimensions are written against every room.",
                            },
                        },
                        {
                            label: "1st to 4th floor plan — colour render",
                            file: "/projects/plans/0068/typical_floor_plan_op_2_colour_render.pdf",
                            image: {
                                src: "/projects/plans/0068/typical_floor_plan_op_2_colour_render.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "Typical floor plan in colour, one home to the floor: four bedrooms at the corners, a living-cum-dining room running the depth of the plan with the kitchen off it, three toilets, a loft over the inner lobby and a balcony at the street end.",
                            },
                        },
                        {
                            label: "1st to 4th floor plan — line drawing",
                            file: "/projects/plans/0068/typical_floor_plan_op_2_line_drawing.pdf",
                            image: {
                                src: "/projects/plans/0068/typical_floor_plan_op_2_line_drawing.jpg",
                                width: 1684,
                                height: 2382,
                                alt: "The same typical floor plan in line work, marked OP-2 on the sheet: four bedrooms, living-cum-dining with the kitchen off it, three toilets, a loft and a balcony, with dimensions written against every room.",
                            },
                        },
                    ],
                },
            ],
            caveat: "The sheets print no tenement schedule, so no unit areas are quoted here — the 1,800 sq. ft. above is the client's figure, not the drawing's. Three plot references are in circulation for this address: the drawing's title block says Premises No. 02-068, the society paperwork says Plot 111, and the architect's renders are captioned AA-110. All three are printed as received rather than reconciled.",
        },
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
        imageLabel: "Chaitali Co-operative Housing Society from Street No. 152 — four floors of grilled windows and shallow balconies on a banded cream facade, a rainwater downpipe running the height of it, and the company signboard at ground level",
        image: "/projects/bb_102/street_elevation.jpg",
        gallery: [
            {
                src: "/projects/bb_102/street_corner_from_gate.jpg",
                label: "The same building seen along the street — its full height above the boundary wall and entrance gate, with the neighbouring plot and trees to the left",
            },
        ],
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
        imageLabel: "New Manikanchan MIG Society — the completed G+4 block from the road, stilt parking below and open ground alongside",
        image: "/projects/manikanchan/street_elevation.png",
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
        imageLabel: "Mitrae Co-operative — the completed G+4 block at dusk, lit windows above stilt parking",
        image: "/projects/mitrae_co-operative/street_elevation_dusk.png",
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

/** One drawing to hang on the wall: the scan, plus the option it belongs to
    and the PDF it was taken from. */
export type SheetPlate = { option: string; label: string; file: string; image: SheetImage };

/* Every sheet of a plan we hold a scan of, flattened across the options and
   tagged with the option it came from. Sheets we only have a PDF for drop out
   here rather than in the component, so "do we have drawings to show?" is one
   `.length` at the call site — and a project whose scans have not arrived
   simply renders no gallery. */
export function planSheetImages(plan: SanctionedPlan): SheetPlate[] {
    return plan.options.flatMap((option) =>
        option.sheets.flatMap((sheet) =>
            sheet.image
                ? [{ option: option.name, label: sheet.label, file: sheet.file, image: sheet.image }]
                : [],
        ),
    );
}

/* What to call a set of drawings. Two sections show them — the schedules in
   <ProjectPlan> and the sheets in <ProjectPlanSheets> — and both have to
   agree, so the wording is decided here once rather than written twice.

   The distinction is worth the field. "Sanctioned" says an authority approved
   this drawing, which is a claim about a document, not a style of words; a
   set whose title block does not make that claim must not have it made on
   its behalf by a heading. */
export function planWording(plan: SanctionedPlan) {
    const sanctioned = plan.sanctioned ?? true;

    /* An option name is only information when there is a second option to
       tell it apart from. Where the architect issued one layout, the name is
       an unanswered question on the page — "Option 2 of what?" — so a set of
       one is presented as the drawings, unlabelled, and nothing above them
       refers to options either. */
    const solo = plan.options.length === 1;

    return {
        solo,
        eyebrow: sanctioned ? "From the sanctioned drawing" : "From the architect's drawing",
        sheets: sanctioned ? "The sanctioned drawings" : "The architect's drawings",
        reproduced: sanctioned ? "reproduced as sanctioned" : "reproduced as issued",
        linked: solo ? "linked below" : "linked under each option",
    };
}

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
    const type = project.buildingType ?? "co-operative society block";
    const block = project.floors ? `A ${project.floors} ${type}` : `A ${type}`;
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
        project.buildingPrice && { term: "Building price", value: project.buildingPrice },
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
        project.buildingPrice && { term: "Building price", value: project.buildingPrice },
        datedFact(project),
        project.floors && { term: "Floors", value: project.floors },
        project.families && { term: "Families", value: project.families },
    ]
        .filter((fact) => !!fact)
        .slice(0, 4);
}
