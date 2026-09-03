export type Testimonial = { quote: string; name: string; detail: string };

/* All three residents are invented and still need replacing with real,
   permissioned quotes — CLIENT-DATA §8.

   The project names came off the detail lines when the invented catalogue was
   deleted from projects.ts. A made-up quote that names a real building reads
   as a review of that building, which is a worse thing to publish than a
   placeholder, so these say a configuration and a corridor and nothing more
   until real quotes arrive. */

export const testimonials: Testimonial[] = [
    {
        quote: "We were shown the same cost sheet in month one and at registration. After two earlier builders, that alone sold us the flat.",
        name: "Arindam & Rupsha Sen",
        detail: "3 BHK owner, New Town",
    },
    {
        quote: "Possession came six weeks early. The engineer walked our snag list personally and closed every point in a fortnight.",
        name: "Lt. Col. (Retd.) S. Mukherjee",
        detail: "3 BHK owner, New Town",
    },
    {
        quote: "I bought from Dubai and never saw the site until handover. The monthly slab photos and video calls made that possible.",
        name: "Debjani Bhattacharya",
        detail: "2 BHK investor, New Town",
    },
];
