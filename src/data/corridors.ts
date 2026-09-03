import { plottedProjects, unplottedProjects } from "@/data/locations";
import { datedFact, projects, stageLabel, whereLine } from "@/data/projects";

/* ── Where we build ───────────────────────────────────────────────────────
   This used to be a hand-written list of four "corridors" across Kolkata.
   The record does not support it: every society in projects.ts is in New
   Town, and there are six of them, not ten. What is left is the thing we can
   actually stand behind — the address book itself, one row per project,
   assembled out of the catalogue so it cannot drift away from it again.

   The coordinates behind the map live in locations.ts, which also records how
   precisely each address was placed and where the number came from. */

export const corridorsIntro = {
    eyebrow: "Where we build",
    lines: ["Six addresses,", "one township"],
    body:
        "Every society on this list stands in New Town, Kolkata — nowhere else. Two are " +
        "under construction in Action Area I; four are handed over and lived in, from the " +
        "100-series streets near Axis Mall up to Action Area II, where Eco Park and City " +
        "Centre 2 both sit inside a couple of kilometres.",
};

export type AddressRow = {
    slug: string;
    name: string;
    /** Plot reference, where the address carries one: BB-102, CD-114, CC-59. */
    plot?: string;
    /** The locality line the rest of the site prints under a project name. */
    where: string;
    /** "Handed over 2018", "Possession October 2026" — or the stage on its own. */
    when: string;
    /** Its number in the map's pin sequence, when the address is on the map. */
    pin?: number;
};

/** One row per project, in catalogue order, written out of the record. */
export const addressBook: AddressRow[] = projects.map((project) => {
    const dated = datedFact(project);
    const pin = plottedProjects.findIndex((plotted) => plotted.project.slug === project.slug);

    return {
        slug: project.slug,
        name: project.name,
        plot: project.plot,
        where: whereLine(project),
        when: dated ? `${dated.term} ${dated.value}` : stageLabel[project.stage],
        pin: pin === -1 ? undefined : pin + 1,
    };
});

/** What the frame is showing, and — where some address is still missing — what
    it is not. Counted rather than typed out, so it stays true as addresses
    arrive. */
export const mapLabel = `Map of New Town, Kolkata marking ${plottedProjects.length} project addresses`;

export const mapNote = unplottedProjects.length
    ? `${plottedProjects.length} of the ${addressBook.length} addresses are plotted from their ` +
      `postal address. ${unplottedProjects.map((project) => project.name).join(", ")} ` +
      `${unplottedProjects.length === 1 ? "is" : "are"} not on the map — we do not hold ` +
      `${unplottedProjects.length === 1 ? "its" : "their"} address yet.`
    : `All ${addressBook.length} addresses are plotted from their postal address.`;
