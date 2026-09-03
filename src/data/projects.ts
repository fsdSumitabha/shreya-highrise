export type Stage = "upcoming" | "ongoing" | "completed";
export type NearbyPlace = { name: string; distance: string };
export type Project = {
    slug: string;
    name: string;
    stage: Stage;
    locality: string;
    corridor: string;
    typology: string;
    sizeRange: string;
    priceFrom: string;
    possession: string;
    highlights: string[];
    nearby: NearbyPlace[];
    imageLabel: string;
};

export const projectsIntro = {
    eyebrow: "Our projects",
    heading: "Every address we have built, and are building",
    lede: "Seven addresses across four Kolkata corridors — four you can book into today, three already handed over and lived in. Carpet area, price and possession date are published here before you ever pick up the phone.",
    marks: ["7 addresses", "4 corridors", "120+ families", "Kolkata only"],
};

export const stageLabel: Record<Stage, string> = {
    upcoming: "New launch",
    ongoing: "Under construction",
    completed: "Ready to move",
};

export const projects: Project[] = [
    {
        slug: "skyline-one",
        name: "Skyline One",
        stage: "upcoming",
        locality: "Action Area II, New Town",
        corridor: "New Town",
        typology: "3 & 4 BHK",
        sizeRange: "1,340 – 2,180 sq. ft.",
        priceFrom: "₹94 L",
        possession: "Dec 2028",
        highlights: ["G+22 twin towers", "Sky lounge on level 21", "Eco Park facing units"],
        nearby: [
            { name: "Eco Park Gate 1", distance: "1.8 km" },
            { name: "New Town Metro", distance: "900 m" },
            { name: "Tata Medical Centre", distance: "3.1 km" },
        ],
        imageLabel: "Skyline One — tower elevation",
    },
    {
        slug: "aurum-residences",
        name: "Aurum Residences",
        stage: "ongoing",
        locality: "Chowmatha, Rajarhat",
        corridor: "Rajarhat",
        typology: "2 & 3 BHK",
        sizeRange: "890 – 1,510 sq. ft.",
        priceFrom: "₹62 L",
        possession: "Mar 2027",
        highlights: ["70% open landscape", "Double-height lobby", "EV-ready basement"],
        nearby: [
            { name: "Rajarhat Chowmatha bus terminus", distance: "700 m" },
            { name: "NSCBI Airport", distance: "9 km" },
            { name: "Aliah University", distance: "4.2 km" },
        ],
        imageLabel: "Aurum Residences — landscaped court",
    },
    {
        slug: "riverstone-heights",
        name: "Riverstone Heights",
        stage: "ongoing",
        locality: "New Town Bypass Connector",
        corridor: "New Town",
        typology: "3 BHK & duplex",
        sizeRange: "1,480 – 2,640 sq. ft.",
        priceFrom: "₹1.18 Cr",
        possession: "Sep 2027",
        highlights: ["Only 4 homes per floor", "Private terrace duplexes", "Rooftop infinity deck"],
        nearby: [
            { name: "Biswa Bangla Convention Centre", distance: "2.2 km" },
            { name: "Axis Mall", distance: "3.4 km" },
            { name: "Sector V, Salt Lake", distance: "8 km" },
        ],
        imageLabel: "Riverstone Heights — rooftop deck",
    },
    {
        slug: "meadow-vista",
        name: "Meadow Vista",
        stage: "upcoming",
        locality: "Sonarpur Station Road, Narendrapur",
        corridor: "South Kolkata",
        typology: "2 & 3 BHK",
        sizeRange: "780 – 1,290 sq. ft.",
        priceFrom: "₹48 L",
        possession: "Jun 2029",
        highlights: ["First south-Kolkata address", "Podium-level garden", "Station at walking distance"],
        nearby: [
            { name: "Narendrapur Station", distance: "1.1 km" },
            { name: "Ramakrishna Mission", distance: "2.0 km" },
            { name: "EM Bypass junction", distance: "6.5 km" },
        ],
        imageLabel: "Meadow Vista — podium garden",
    },
    {
        slug: "verdant-court",
        name: "Verdant Court",
        stage: "completed",
        locality: "Action Area I, New Town",
        corridor: "New Town",
        typology: "2 & 3 BHK",
        sizeRange: "820 – 1,395 sq. ft.",
        priceFrom: "Sold out",
        possession: "Handed over 2024",
        highlights: ["OC received", "148 families resident", "Metro corridor at 600 m"],
        nearby: [
            { name: "New Town Metro", distance: "600 m" },
            { name: "DPS Megacity", distance: "2.9 km" },
            { name: "City Centre II", distance: "2.4 km" },
        ],
        imageLabel: "Verdant Court — clubhouse deck",
    },
    {
        slug: "shreya-greens",
        name: "Shreya Greens",
        stage: "completed",
        locality: "Sodepur Road, Madhyamgram",
        corridor: "North Kolkata",
        typology: "2 & 3 BHK",
        sizeRange: "745 – 1,180 sq. ft.",
        priceFrom: "Sold out",
        possession: "Handed over 2022",
        highlights: ["Two towers, 96 homes", "Association-run since 2024", "Chowmatha at 1.5 km"],
        nearby: [
            { name: "Madhyamgram Chowmatha", distance: "1.5 km" },
            { name: "Madhyamgram Station", distance: "2.3 km" },
            { name: "Jessore Road", distance: "800 m" },
        ],
        imageLabel: "Shreya Greens — entrance plaza",
    },
    {
        slug: "spriha-heights",
        name: "Spriha Heights",
        stage: "completed",
        locality: "Rabindra Sarani, New Barrackpur",
        corridor: "North Kolkata",
        typology: "2 & 3 BHK",
        sizeRange: "690 – 1,120 sq. ft.",
        priceFrom: "Sold out",
        possession: "Handed over 2019",
        highlights: ["Where the company began", "64 homes across 2 blocks", "Fully occupied"],
        nearby: [
            { name: "New Barrackpur Bazaar", distance: "600 m" },
            { name: "Barasat–Barrackpur Road", distance: "450 m" },
            { name: "New Barrackpur Station", distance: "1.9 km" },
        ],
        imageLabel: "Spriha Heights — street elevation",
    },
];

export const openForSale = projects.filter((project) => project.stage !== "completed");
export const delivered = projects.filter((project) => project.stage === "completed");
