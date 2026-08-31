/* Every dimension the tower is drawn from, plus the scroll choreography that
   builds it. Nothing else in the hero hard-codes a number: change BUILDING
   here and the geometry, the blueprint, the camera framing and the printed
   elevations all follow. */

/** Architectural units. 1 unit is about 10.5 m, so a 0.38-unit storey reads as 4.00 m. */
export const BUILDING = {
    floors: 42,
    floorHeight: 0.38,
    width: 3.8,
    depth: 2.8,
    /** Perimeter columns: four corners plus four edge centres. */
    columnCount: 8,
    columnSize: 0.26,
    slabThickness: 0.075,
    /** Slabs oversail the columns by this much on each side. */
    slabOversail: 0.09,
    coreWidth: 1.5,
    coreDepth: 1.0,
    /** Foundation sits below grade and rises through it. */
    podiumHeight: 0.62,
    excavationDepth: 1.25,
    crownHeight: 1.35,
};

export const BUILDING_HEIGHT = BUILDING.floors * BUILDING.floorHeight;
export const BUILDING_TOP = BUILDING_HEIGHT + BUILDING.crownHeight;

/** Metres per storey and plinth, used only to print honest elevation figures. */
export const STOREY_METRES = 4.0;
export const PLINTH_METRES = 0.4;
export const TOP_ELEVATION = (BUILDING.floors * STOREY_METRES + PLINTH_METRES).toFixed(2);

/* ── Palette ──────────────────────────────────────────────────────────── */

export const PALETTE = {
    void: 0x071523,
    navy900: 0x0b1f33,
    navy800: 0x0f2439,
    navy700: 0x142c43,
    navy600: 0x1d3a56,
    navy300: 0x8fa4ba,
    champagne100: 0xf3e9d5,
    champagne200: 0xe0cda3,
    champagne300: 0xc8a96b,
    champagne400: 0xab8b4d,
};

/* ── Quality tiers ────────────────────────────────────────────────────────
   Mobile is not the desktop scene scaled down: it drops facade bays, mullion
   density, blueprint chatter and the dust field outright. */

export type Quality = {
    baysFront: number;
    baysSide: number;
    /** Mullions land on every nth bay boundary. */
    mullionStride: number;
    /** Blueprint floor outlines every nth level. */
    blueprintStride: number;
    dust: number;
    maxDpr: number;
};

export const QUALITY: Record<"desktop" | "mobile", Quality> = {
    desktop: { baysFront: 6, baysSide: 4, mullionStride: 2, blueprintStride: 3, dust: 420, maxDpr: 1.75 },
    mobile: { baysFront: 4, baysSide: 3, mullionStride: 3, blueprintStride: 6, dust: 0, maxDpr: 1.4 },
};

/* ── Scroll choreography ──────────────────────────────────────────────────
   The stages the brief calls for. The build fronts below deliberately overlap
   them: a stage boundary is where a phase reads as dominant, not where the
   previous one stops. Without the overlap the sequence snaps from one chapter
   to the next instead of behaving like one continuous pour. */

export const STAGES = [
    { at: 0.0, name: "Blueprint", code: "A-01" },
    { at: 0.15, name: "Foundation", code: "F-02" },
    { at: 0.3, name: "Structural frame", code: "S-04" },
    { at: 0.55, name: "Floor slabs", code: "S-11" },
    { at: 0.72, name: "Facade", code: "E-07" },
    { at: 0.88, name: "Completion", code: "A-99" },
] as const;

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Normalised position of v inside [a, b], clamped. */
export const span = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

/** Smoothstep with a zero second derivative at both ends — no visible kink. */
export const smoother = (t: number) => {
    const x = clamp01(t);
    return x * x * x * (x * (x * 6 - 15) + 10);
};

/** Fronts stay in [0, 1] here. The build shader is what widens them either
    side to clear the reveal band — one place, so the two ends cannot drift. */
const FRONT_OVERSHOOT = 1;

export type BuildFronts = {
    foundation: number;
    columns: number;
    slabs: number;
    core: number;
    mullions: number;
    glass: number;
    crown: number;
    /** World height of the construction sweep plane. */
    sweepY: number;
    blueprintFade: number;
    groundReveal: number;
    lightRig: number;
    litWindows: number;
};

/** Writes into `out` when given one — this runs every frame, and a fresh
    object per frame is litter the render loop does not need to make. */
export function buildFronts(p: number, out?: BuildFronts): BuildFronts {
    const target = out ?? ({} as BuildFronts);

    // Core leads, columns follow, slabs trail by six or seven storeys — the
    // order a tower actually goes up in, and the reason the frame reads as one
    // continuous pour. Running the columns to the crown before the first slab
    // was poured matched the stage table but looked like two separate builds,
    // and left the level readout reporting L04 against a topped-out frame.
    const columns = smoother(span(p, 0.27, 0.64)) * FRONT_OVERSHOOT;
    const slabs = smoother(span(p, 0.3, 0.68)) * FRONT_OVERSHOOT;
    const mullions = smoother(span(p, 0.7, 0.9)) * FRONT_OVERSHOOT;

    // The sweep marks the work face — the lowest front still placing material.
    // Tracking the highest instead would park it on top of a frame that had
    // already topped out while the slabs were only at level six, and the level
    // readout would race ahead of the phase it claims to be reporting.
    let work = -1;
    const working = (f: number) => {
        if (f <= 0.001 || f >= 0.999) return;
        work = work < 0 ? f : Math.min(work, f);
    };
    working(columns);
    working(slabs);
    working(mullions);
    if (work < 0) work = Math.max(columns, slabs, mullions);

    target.foundation = smoother(span(p, 0.12, 0.31)) * FRONT_OVERSHOOT;
    target.columns = columns;
    target.slabs = slabs;
    target.core = smoother(span(p, 0.25, 0.6)) * FRONT_OVERSHOOT;
    target.mullions = mullions;
    target.glass = smoother(span(p, 0.72, 0.93)) * FRONT_OVERSHOOT;
    target.crown = smoother(span(p, 0.86, 1.0)) * FRONT_OVERSHOOT;
    target.sweepY = Math.min(work, 1) * BUILDING_HEIGHT;
    // Never off entirely: the drawing stays faintly under the finished tower.
    target.blueprintFade = 1 - 0.8 * smoother(span(p, 0.42, 0.95));
    target.groundReveal = smoother(span(p, 0.02, 0.22));
    target.lightRig = smoother(span(p, 0.6, 1.0));
    target.litWindows = smoother(span(p, 0.9, 1.0));

    return target;
}

/** Level number shown in the construction readout. */
export const levelAt = (fronts: BuildFronts) =>
    Math.round(clamp01(fronts.sweepY / BUILDING_HEIGHT) * BUILDING.floors);

export function stageAt(p: number) {
    let found: (typeof STAGES)[number] = STAGES[0];
    for (const s of STAGES) if (p >= s.at) found = s;
    return found;
}

/* ── Camera framing ───────────────────────────────────────────────────────
   Keyframes are stored as a polar rig rather than XYZ so the same numbers
   frame correctly at any aspect ratio — the composition offsets below are
   what place the tower off-centre, not the camera position. */

export type CamKey = { orbit: number; dist: number; height: number; targetY: number };

export const CAMERA_KEYS: { at: number; key: CamKey; ease: string }[] = [
    { at: 0.0, key: { orbit: 0.62, dist: 44, height: 11.0, targetY: 8.2 }, ease: "none" },
    { at: 0.45, key: { orbit: 0.5, dist: 42, height: 8.0, targetY: 7.2 }, ease: "power1.inOut" },
    { at: 0.8, key: { orbit: 0.4, dist: 39.5, height: 6.2, targetY: 7.9 }, ease: "power1.inOut" },
    { at: 1.0, key: { orbit: 0.34, dist: 38, height: 4.6, targetY: 8.4 }, ease: "power2.out" },
];

export const FOV = 35;

/** Where the tower should land in the frame, in NDC. Slightly below centre
    on desktop: the site header floats over the top of the stage, and a crown
    tucked behind it is a crown nobody sees. */
export const COMPOSITION = {
    desktop: { ndcX: 0.24, ndcY: -0.02, distScale: 1 },
    // Portrait is not the desktop frame squeezed: the tower moves into the
    // upper half and steps back, because the copy takes the lower half and a
    // 42-storey building shown at desktop scale would run straight through it.
    portrait: { ndcX: 0.05, ndcY: 0.32, distScale: 1.62 },
};

/* ── Technical annotations ────────────────────────────────────────────────
   Anchored in building space and projected to screen each frame. `show` is
   the scroll window each one lives inside. */

const H = BUILDING_HEIGHT;
const halfW = BUILDING.width / 2;
const halfD = BUILDING.depth / 2;

export type LabelSpec = {
    id: string;
    at: [number, number, number];
    /** Pulled in tight on narrow screens, where an anchor out on the site
        boundary projects off the edge of the phone. */
    mobileAt?: [number, number, number];
    title: string;
    /** Narrow screens get this instead, and drop the sub line entirely —
        there is only so much room to the right of a tower on a phone. */
    short?: string;
    sub?: string;
    show: [number, number];
    /** Which way the leader line runs from the anchor. */
    side: "left" | "right";
    /** Kept on narrow screens; the rest are dropped. */
    mobile?: boolean;
};

/* Every anchor is on the tower's right-hand side, and every leader runs
   right. The headline owns the left forty per cent of the frame; a technical
   note projected into it is competing with the brand, which is the one thing
   the hierarchy does not allow. The elevation marks deliberately land on the
   ends of the blueprint's own elevation lines, so the label terminates a line
   the drawing already drew. */
const level = (n: number) => H * (n / BUILDING.floors);

export const LABELS: LabelSpec[] = [
    {
        // Negative window start, so the drawing arrives already annotated
        // rather than waiting for the first scrap of scroll.
        id: "grid",
        at: [halfW + 3.2, 0.02, halfD + 3.1],
        mobileAt: [halfW + 0.3, 0.02, halfD + 0.3],
        title: "Structural grid",
        short: "Grid A-01",
        sub: "A-01",
        show: [-0.05, 0.24],
        side: "right",
        mobile: true,
    },
    {
        id: "north",
        at: [halfW + 2.5, 0.02, -halfD - 3.4],
        title: "North elevation",
        show: [0.04, 0.3],
        side: "right",
    },
    {
        id: "foundation",
        at: [halfW + 1.2, -0.95, -halfD - 0.9],
        mobileAt: [halfW + 0.15, -0.95, -halfD - 0.1],
        title: "Foundation",
        short: "Piling",
        sub: "Bored cast-in-situ piles",
        show: [0.15, 0.42],
        side: "right",
        mobile: true,
    },
    {
        id: "core",
        at: [halfW * 0.2, level(16), -halfD - 0.1],
        title: "Core",
        sub: "C-01",
        show: [0.3, 0.6],
        side: "right",
    },
    { id: "l12", at: [halfW + 2.6, level(12), 0], title: "Level 12", show: [0.34, 0.66], side: "right" },
    {
        id: "l24",
        at: [halfW + 2.6, level(24), 0],
        mobileAt: [halfW + 0.25, level(24), 0],
        title: "Level 24",
        show: [0.46, 0.8],
        side: "right",
        mobile: true,
    },
    {
        id: "facade",
        at: [halfW + 0.3, level(28), halfD * 0.5],
        mobileAt: [halfW + 0.2, level(28), halfD * 0.4],
        title: "Facade",
        short: "Glazing",
        sub: "Unitised glazing",
        show: [0.73, 1.06],
        side: "right",
        mobile: true,
    },
    {
        id: "levels",
        at: [halfW + 0.35, level(34), -halfD * 0.5],
        title: `${BUILDING.floors} levels`,
        show: [0.72, 1.1],
        side: "right",
    },
    {
        id: "elevation",
        at: [halfW + 2.6, level(BUILDING.floors), 0],
        mobileAt: [halfW + 0.25, level(BUILDING.floors), 0],
        title: `Elevation +${TOP_ELEVATION}`,
        short: `+${TOP_ELEVATION} m`,
        show: [0.58, 1.12],
        side: "right",
        mobile: true,
    },
];
