/* The plan-to-reality film, and the five stages it runs through.

   public/plan_to_reality_.mp4 is ten seconds of a sanctioned 2D drawing being
   built into a finished tower. <PlanReel> narrates it: as the clip plays, the
   stage below whose window contains the playhead lights up and its note is
   read out under the frame, so a reader who cannot see the film — or has
   asked for no motion — still gets the whole sequence in words.

   `at` is a fraction of the clip's own duration rather than a second count,
   so re-cutting or re-encoding the film does not silently desynchronise the
   captions; only a change to the *order* of what happens on screen does.

   The notes are not written for this component. Each one is the promise made
   elsewhere on the site for that stage — see advantages.ts and journey.ts —
   said back in the tense of a building going up. */

export type ReelPhase = {
    /** Drawing-sheet numbering, shown when the label will not fit. */
    code: string;
    label: string;
    /** What is actually happening on site while the film is here. */
    note: string;
    /** Where the stage starts, as a fraction of the clip's duration. */
    at: number;
};

export const reel = {
    src: "/plan_to_reality_.mp4",
    /** Drawing-sheet metadata for the title block, in draughtsman's shorthand. */
    sheet: { number: "SHR-001", scale: "N.T.S.", revision: "A" },
    /** Stands in for the film wherever it cannot be watched. */
    description:
        "A two-dimensional architectural floor plan is drawn out flat, tilts up off the sheet, and is built through foundation, RCC frame and façade into a finished, fully rendered residential building on a landscaped street.",
};

export const reelPhases: ReelPhase[] = [
    {
        code: "01",
        label: "Drawing",
        at: 0,
        note: "Every unit laid out for light, cross-ventilation and Vaastu, then sanctioned before a single flat is quoted.",
    },
    {
        code: "02",
        label: "Foundation",
        at: 0.18,
        note: "Pile foundations designed against the soil profile the plot actually has, to Seismic Zone III and IS 456.",
    },
    {
        code: "03",
        label: "Frame",
        at: 0.38,
        note: "The RCC frame, slab by slab, with a third-party structural audit before each pour and a photo log you can read from anywhere.",
    },
    {
        code: "04",
        label: "Façade",
        at: 0.6,
        note: "Façade, services and finishes bought to a written brand and grade — never to the lowest quotation on the table.",
    },
    {
        code: "05",
        label: "Handover",
        at: 0.82,
        note: "Snag-list walkthrough, fittings demo, registration, keys — then twenty-four months of our facility team on the estate.",
    },
];
