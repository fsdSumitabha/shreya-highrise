import { projects, type Project } from "@/data/projects";

/* ── Where the addresses actually are ─────────────────────────────────────
   One coordinate per project, worked out from the postal address the client
   gave us (`address` in projects.ts, taken down in temp-projects.json) and
   nothing else. Same rule as the rest of the data: no fact is invented. A
   plot we cannot place is absent from this map rather than approximated onto
   it — `Mitrae Co-operative` has no address on file, so it has no pin.

   New Town's street numbers are only patchily present in OpenStreetMap, and
   the numbering snakes rather than running in a straight line, so a street
   that is not mapped cannot be interpolated from its neighbours' numbers.
   Every entry therefore carries the `precision` it was actually established
   at, and the `source` it came from, so a better number can replace it later
   without anybody having to re-derive this work. Coordinates are WGS 84. */

/** How closely a coordinate resolves the plot.
    - `street`  — the street itself is mapped; the point is on it.
    - `series`  — the street is not mapped, but the numbering series it belongs
                  to is, and the point is the middle of that series.
    - `locality`— only the Action Area is established; the point is its centre. */
export type Precision = "street" | "series" | "locality";

export type Located = {
    lat: number;
    lng: number;
    precision: Precision;
    /** Short plot reference, printed beside the pin. Lifted off the address. */
    label: string;
    /** Where the number came from, so it can be checked or corrected. */
    source: string;
};

export const projectCoordinates: Record<string, Located> = {
    "lig-co-operative-housing-society": {
        lat: 22.574552,
        lng: 88.461365,
        precision: "street",
        label: "CC-59",
        source:
            "Midpoint of OSM-mapped Street 236 (22.574659, 88.460709) and Street 238 " +
            "(22.574445, 88.462021), which bracket Street No. 237. Cross-checks against " +
            "the society's own note that Biswa Bangla Gate is 1.2 km away — this point " +
            "computes to 1.19 km straight-line.",
    },
    "lig-co-operative": {
        lat: 22.580704,
        lng: 88.462379,
        precision: "locality",
        label: "CD-114",
        source:
            "OSM place=suburb node for Action Area I. Deliberately no finer: the society " +
            "gives Street No. 114 and the sanctioned drawing's title block gives Street " +
            "No. 266 (see the caveat on this project in projects.ts), and neither street " +
            "is mapped, so there is nothing to choose between them on.",
    },
    "chaitali-co-operative-housing-society": {
        lat: 22.581018,
        lng: 88.458811,
        precision: "series",
        label: "BB-102",
        source:
            "Middle of New Town's 100-series streets, the series Street No. 152 belongs " +
            "to: OSM Street 104 (22.582535, 88.457701) and Axis Mall, addressed CF Block, " +
            "Street Number 106, Action Area I (22.579502, 88.459921).",
    },
    "new-manikanchan-mig-society": {
        lat: 22.608868,
        lng: 88.468232,
        precision: "locality",
        label: "Plot 1196",
        source:
            "Trilaterated from the society's own nearby distances — Eco Park 1 km, City " +
            "Centre 2 2 km, six-lane highway 100 m — against OSM Eco Park (22.602977, " +
            "88.469195) and City Centre 2 (22.621025, 88.453378). All three land on this " +
            "node of the Major Arterial Road inside Action Area II: 0.66 km, 2.04 km, 0 m.",
    },
    "8-member-mig-society": {
        lat: 22.612907,
        lng: 88.466553,
        precision: "locality",
        label: "St. 609",
        source:
            "OSM place=suburb node for Action Area II, which is as far as the address " +
            "resolves — Street No. 609 is not mapped, and this society's nearby list is " +
            "a copy of New Manikanchan's, so it cannot be trilaterated separately.",
    },
};

/* ── The map frame ────────────────────────────────────────────────────────
   The square the pins are laid over. Padded well clear of the outermost
   plots, and sized so a degree of latitude and a degree of longitude cover
   the same distance on screen: 0.056° of latitude is ~6.20 km, and 0.060° of
   longitude at this latitude is ~6.17 km. Everything is therefore in true
   relative position — north-south spread down the New Town spine, which is
   what the six addresses actually look like on the ground. Replace the
   placeholder frame with a real map rendered to exactly these bounds and the
   pins will already be in the right places. */
export const mapBounds = { south: 22.566, north: 22.622, west: 88.4335, east: 88.4935 };

export type FramePosition = { top: string; left: string };

/** A coordinate as a percentage offset inside the square frame. */
export function framePosition({ lat, lng }: { lat: number; lng: number }): FramePosition {
    const left = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const top = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;

    return { top: `${top.toFixed(2)}%`, left: `${left.toFixed(2)}%` };
}

export type PlottedProject = { project: Project; at: Located; position: FramePosition };

/** Every project we can put on the map, in catalogue order. A project with no
    coordinate simply is not here. */
export const plottedProjects: PlottedProject[] = projects.flatMap((project) => {
    const at = projectCoordinates[project.slug];

    return at ? [{ project, at, position: framePosition(at) }] : [];
});

/** Projects whose address we do not hold well enough to plot — the honest
    counterpart to `plottedProjects`, so the map can say what it is missing. */
export const unplottedProjects = projects.filter((project) => !projectCoordinates[project.slug]);
