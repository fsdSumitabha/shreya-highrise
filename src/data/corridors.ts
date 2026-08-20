export type Corridor = { name: string; blurb: string; projectCount: string; since: string };

export const corridorsIntro = {
    heading: "Ten addresses, four corridors",
    body: "We began in New Barrackpur and followed the city outward — north along Jessore Road, east into Rajarhat and New Town, and now south towards Narendrapur. Every site is chosen for what is already built around it: a station, a school, a hospital, a market.",
};

export const corridors: Corridor[] = [
    {
        name: "New Town",
        blurb: "Kolkata's planned township — the metro corridor, Eco Park and the Sector V workforce within one drive.",
        projectCount: "3 projects",
        since: "Since 2021",
    },
    {
        name: "Rajarhat",
        blurb: "The airport-facing stretch, where land is still large enough for open landscape and low tower density.",
        projectCount: "1 project",
        since: "Since 2024",
    },
    {
        name: "North Kolkata",
        blurb: "New Barrackpur and Madhyamgram — established neighbourhoods on the Jessore Road spine where we started out.",
        projectCount: "5 projects",
        since: "Since 2006",
    },
    {
        name: "South Kolkata",
        blurb: "Narendrapur and the Sonarpur line, our newest corridor, opening in 2029 with the Meadow Vista launch.",
        projectCount: "1 project",
        since: "From 2029",
    },
];
