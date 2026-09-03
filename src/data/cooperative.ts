/* Co-operative society development — the income bands we build to.

   HIG / MIG / LIG are not our labels. They are the carpet-area brackets that
   co-operative allotment rules, state housing schemes and society resolutions
   are already written in, which is why the figures below are given in square
   metres first and square feet second: the rule is written in one unit and
   read by buyers in the other. Keep both in step if either is edited. */

export type BandCode = "lig" | "mig" | "hig";

export type IncomeBand = {
    code: BandCode;
    /** The abbreviation as it appears on a society's own paperwork. */
    short: string;
    name: string;
    /** Carpet area — the unit the bracket is defined in. */
    carpetSqm: string;
    /** The same bracket in the unit buyers ask for it in. */
    carpetSqft: string;
    typology: string;
    body: string;
    points: string[];
};

export const cooperativeIntro = {
    body: "Most developers pick one income bracket and stay inside it. We develop for co-operative housing societies across all three — Higher, Middle and Lower Income Group — and the specification does not thin out as the carpet area does. Same piling, same grade of concrete, same handover file.",
};

export const incomeBands: IncomeBand[] = [
    {
        code: "lig",
        short: "LIG",
        name: "Lower Income Group",
        carpetSqm: "30 – 60 sq. m.",
        carpetSqft: "325 – 645 sq. ft.",
        typology: "1 & 2 BHK",
        body: "The band most societies begin with, and the one we refuse to treat as a lesser building. Compact plans that still carry a separate kitchen, a full-length balcony and cross-ventilation in every room — the three things a small flat cannot afford to lose.",
        points: [
            "Planned inside the 60 sq. m. carpet ceiling that allotment rules are written to",
            "Lift, generator backup and fire system to the same code as every other band",
            "Two-wheeler bays and shared open parking drawn in from the first sheet",
        ],
    },
    {
        code: "mig",
        short: "MIG",
        name: "Middle Income Group",
        carpetSqm: "60 – 160 sq. m.",
        carpetSqft: "645 – 1,720 sq. ft.",
        typology: "2 & 3 BHK",
        body: "Where most of our built area sits. Two- and three-bedroom plans hung off a shared core, so a society can put MIG-I and MIG-II in one block and still hand every member the same lobby, the same lift and the same finish schedule.",
        points: [
            "MIG-I to 110 sq. m. and MIG-II to 160 sq. m., both off one staircase core",
            "One covered car park per flat, with EV conduit run to the bay",
            "Clubhouse, gym and community hall sized against the full member roll",
        ],
    },
    {
        code: "hig",
        short: "HIG",
        name: "Higher Income Group",
        carpetSqm: "160 sq. m. and above",
        carpetSqft: "1,720 sq. ft. and above",
        typology: "3, 4 BHK & duplex",
        body: "Four homes to a floor at most, private lift lobbies where the plot allows, and duplexes that open onto their own terrace. This is the band a society reaches for when a prime plot has to pay for its own redevelopment.",
        points: [
            "Four homes per floor, two passenger lifts and a service lift",
            "Duplex and private-terrace formats on the upper plates",
            "A sale component priced to fund the members' own re-housing",
        ],
    },
];

export type SocietyStep = { title: string; body: string };

/* The order a co-operative engagement actually runs in — written for the
   secretary of a managing committee, who is the person searching for this. */
export const societySteps: SocietyStep[] = [
    {
        title: "Committee resolution",
        body: "Your managing committee passes the resolution and hands over the parcha, mutation records and the current member roll. Nothing begins before that file is complete.",
    },
    {
        title: "Feasibility & member survey",
        body: "We measure the plot, test the achievable FAR against the sanctioned use, and ask every member what they need to be re-housed into.",
    },
    {
        title: "Development agreement",
        body: "Areas, timelines, re-housing terms, the sale component and the delay clause — registered in writing before a single wall comes down.",
    },
    {
        title: "Sanction, build, allot",
        body: "Sanctioned by the local authority, built to the schedule in the agreement, and allotted back to members with the completion file in hand.",
    },
];
