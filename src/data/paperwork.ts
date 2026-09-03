/* The documentation desk — the second thing the company sells.

   Shreya High Rise clears title, mutation and society paperwork on its own
   projects; this is that same desk offered as a service. The four headings are
   the client's own division of the work (property, co-operative,
   non-co-operative, land), kept in that order because it is the order they
   describe it in. The bodies name the actual offices and documents a Kolkata
   file passes through — NKDA in New Town, BL&LRO in Rajarhat — which is what
   someone searching for this is searching for. */

export type PaperworkService = {
    title: string;
    /** The rubber stamp that lands on the card — the outcome of the work. */
    stamp: string;
    body: string;
};

export const paperworkIntro = {
    lede: "Property, co-operative and non-co-operative — and any kind of land work at New Town and Rajarhat. The desk that clears title on our own projects will take your file through the same offices.",
};

export const paperworkServices: PaperworkService[] = [
    {
        title: "Property",
        stamp: "Registered",
        body: "Deed drafting and registration, mutation, tax receipts and encumbrance certificate — the whole chain of title on a flat or a plot.",
    },
    {
        title: "Co-operative",
        stamp: "Transferred",
        body: "Share certificate transfer, society NOC, membership and registration work for co-operative housing societies.",
    },
    {
        title: "Non-co-operative",
        stamp: "Cleared",
        body: "Freehold and private holdings: direct transfer, amalgamation and conversion, with no society standing in between.",
    },
    {
        title: "Land work",
        stamp: "Mutated",
        body: "NKDA and BL&LRO filings, parcha and khatian correction, mutation and conversion across New Town and Rajarhat.",
    },
];
