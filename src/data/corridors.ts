export type Corridor = { name: string; blurb: string; projectCount: string; since: string };

export const corridorsIntro = {
    heading: "Ten addresses, four corridors",
    body: "We began in New Town and followed the city outward — into Rajarhat, and north along the Jessore Road spine to Madhyamgram, Birati and New Barrackpur. Every site is chosen for what is already built around it: a station, a school, a hospital, a market.",
};

export const corridors: Corridor[] = [
    {
        name: "New Town",
        blurb: "Kolkata's planned township — the metro corridor, Eco Park and the Sector V workforce within one drive. Where the company built its first building, and still its home ground.",
        projectCount: "3 projects",
        since: "Since 2016",
    },
    {
        name: "Rajarhat",
        blurb: "The airport-facing stretch, where land is still large enough for open landscape and low tower density.",
        projectCount: "1 project",
        since: "Since 2021",
    },
    {
        name: "North Kolkata",
        blurb: "Madhyamgram, Birati and New Barrackpur — established neighbourhoods on the Jessore Road spine, where a flat is bought to live in rather than to let.",
        projectCount: "5 projects",
        since: "Since 2021",
    },
    {
        name: "South Kolkata",
        blurb: "Narendrapur and the Sonarpur line, our newest corridor, opening in 2029 with the Meadow Vista launch.",
        projectCount: "1 project",
        since: "From 2029",
    },
];
