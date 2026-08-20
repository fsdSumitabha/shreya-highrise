export type AmenityGroup = { group: string; items: string[] };

export const amenityGroups: AmenityGroup[] = [
    {
        group: "Leisure",
        items: [
            "Rooftop infinity deck",
            "Air-conditioned clubhouse",
            "Banquet & community hall",
            "Indoor games lounge",
            "Amphitheatre lawn",
            "Café courtyard",
        ],
    },
    {
        group: "Wellness",
        items: [
            "Equipped gymnasium",
            "Yoga & meditation pavilion",
            "Swimming pool with deck",
            "Jogging & reflexology track",
            "Senior citizens' court",
            "Kids' play zone",
        ],
    },
    {
        group: "Essentials",
        items: [
            "24×7 CCTV & manned security",
            "100% power backup",
            "High-speed lifts with ARD",
            "Piped gas connection",
            "EV charging bays",
            "Fire-fighting to NBC norms",
        ],
    },
    {
        group: "Sustainability",
        items: [
            "Rainwater harvesting",
            "Sewage treatment plant",
            "Solar-lit common areas",
            "Organic waste converter",
            "Native-species landscaping",
            "Low-flow water fittings",
        ],
    },
];
