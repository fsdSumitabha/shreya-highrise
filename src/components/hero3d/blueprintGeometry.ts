import * as THREE from "three";
import { BUILDING, BUILDING_HEIGHT, BUILDING_TOP, type Quality } from "./config";

/* The drawing.

   Everything a set of general-arrangement drawings would carry — site
   boundary, footprint, structural grid with its bubbles, core outline,
   plumb guides, floor outlines, elevation markers, a dimension run — emitted
   into one interleaved LineSegments buffer.

   Height drives the ink order, so the drawing lays itself down from the site
   plan upward. On a vertical segment the level attribute differs at each end,
   and the varying interpolates: the line draws itself. */

const { width, depth, coreWidth, coreDepth, floors, floorHeight } = BUILDING;
const halfW = width / 2;
const halfD = depth / 2;

const SITE_W = width * 3.2;
const SITE_D = depth * 3.4;

const LOW = -1.5;
const HIGH = BUILDING_TOP + 1.6;
/** Normalised ink order for a given height. */
const lv = (y: number) => (y - LOW) / (HIGH - LOW);

const CHAMPAGNE = 1;
const NAVY = 0;

type Vec3 = [number, number, number];

class Draft {
    readonly positions: number[] = [];
    readonly levels: number[] = [];
    readonly tones: number[] = [];
    readonly weights: number[] = [];

    /** One segment. `level` defaults to each end's own height. */
    line(a: Vec3, b: Vec3, tone: number, weight: number, level?: [number, number]) {
        this.positions.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        this.levels.push(level ? level[0] : lv(a[1]), level ? level[1] : lv(b[1]));
        this.tones.push(tone, tone);
        this.weights.push(weight, weight);
    }

    /** Rectangle in plan, at a fixed height. */
    plan(w: number, d: number, y: number, tone: number, weight: number, level?: number) {
        const l = level === undefined ? undefined : ([level, level] as [number, number]);
        const x = w / 2;
        const z = d / 2;
        this.line([-x, y, -z], [x, y, -z], tone, weight, l);
        this.line([x, y, -z], [x, y, z], tone, weight, l);
        this.line([x, y, z], [-x, y, z], tone, weight, l);
        this.line([-x, y, z], [-x, y, -z], tone, weight, l);
    }

    /** Surveyor's crosshair. */
    cross(x: number, y: number, z: number, r: number, tone: number, weight: number, level?: number) {
        const l = level === undefined ? undefined : ([level, level] as [number, number]);
        this.line([x - r, y, z], [x + r, y, z], tone, weight, l);
        this.line([x, y, z - r], [x, y, z + r], tone, weight, l);
    }
}

export function createBlueprintGeometry(q: Quality): THREE.BufferGeometry {
    const d = new Draft();

    /* Site plan. Laid down first, in order, so the drawing reads as a hand
       working outward from the boundary to the structure. */
    d.plan(SITE_W, SITE_D, 0.004, CHAMPAGNE, 0.4, 0.004);
    for (const sx of [-1, 1])
        for (const sz of [-1, 1]) {
            d.cross(sx * (SITE_W / 2), 0.004, sz * (SITE_D / 2), 0.34, CHAMPAGNE, 0.55, 0.014);
            // Setback dimension ticks along the boundary.
            d.line(
                [sx * (SITE_W / 2), 0.004, sz * (SITE_D / 2 - 0.9)],
                [sx * (SITE_W / 2 - 0.55), 0.004, sz * (SITE_D / 2 - 0.9)],
                NAVY,
                0.4,
                [0.02, 0.02],
            );
        }

    d.plan(width * 1.45, depth * 1.6, 0.006, NAVY, 0.42, 0.03);
    d.plan(width, depth, 0.008, CHAMPAGNE, 0.85, 0.04);
    d.plan(coreWidth, coreDepth, 0.01, CHAMPAGNE, 0.6, 0.055);
    // Core hatching.
    d.line(
        [-coreWidth / 2, 0.01, -coreDepth / 2],
        [coreWidth / 2, 0.01, coreDepth / 2],
        NAVY,
        0.4,
        [0.06, 0.06],
    );
    d.line(
        [coreWidth / 2, 0.01, -coreDepth / 2],
        [-coreWidth / 2, 0.01, coreDepth / 2],
        NAVY,
        0.4,
        [0.06, 0.06],
    );

    /* Structural grid, running past the footprint to its bubbles. */
    const inset = BUILDING.columnSize / 2 + 0.06;
    const gridX = [-(halfW - inset), 0, halfW - inset];
    const gridZ = [-(halfD - inset), 0, halfD - inset];
    const run = 1.15;

    for (const x of gridX) {
        d.line([x, 0.006, -halfD - run], [x, 0.006, halfD + run], NAVY, 0.35, [0.05, 0.05]);
        for (const sz of [-1, 1]) d.cross(x, 0.006, sz * (halfD + run), 0.14, CHAMPAGNE, 0.6, 0.062);
    }
    for (const z of gridZ) {
        d.line([-halfW - run, 0.006, z], [halfW + run, 0.006, z], NAVY, 0.35, [0.05, 0.05]);
        for (const sx of [-1, 1]) d.cross(sx * (halfW + run), 0.006, z, 0.14, CHAMPAGNE, 0.6, 0.062);
    }

    /* Plumb guides. Each carries its own height at both ends, so it inks
       upward as the drawing climbs. */
    const guideTop = BUILDING_TOP + 1.4;
    for (const x of [-halfW, halfW])
        for (const z of [-halfD, halfD]) d.line([x, 0, z], [x, guideTop, z], NAVY, 0.34);
    for (const x of [-halfW, halfW]) d.line([x, 0, 0], [x, BUILDING_HEIGHT, 0], NAVY, 0.2);
    for (const z of [-halfD, halfD]) d.line([0, 0, z], [0, BUILDING_HEIGHT, z], NAVY, 0.2);

    /* Floor outlines. Every twelfth level is promoted to a typical-floor
       marker, which is what stops the stack reading as wallpaper. */
    for (let i = q.blueprintStride; i <= floors; i += q.blueprintStride) {
        const y = i * floorHeight;
        const typical = i % 12 === 0;
        d.plan(
            width + (typical ? 0.5 : 0.18),
            depth + (typical ? 0.5 : 0.18),
            y,
            typical ? CHAMPAGNE : NAVY,
            typical ? 0.55 : 0.24,
        );
    }

    /* Elevation markers — the anchors the screen-space labels hang from. */
    for (const level of [12, 24, 36, floors]) {
        const y = level * floorHeight;
        d.line([halfW + 0.15, y, 0], [halfW + 2.5, y, 0], CHAMPAGNE, 0.6);
        d.line([halfW + 2.5, y - 0.16, 0], [halfW + 2.5, y + 0.16, 0], CHAMPAGNE, 0.7);
    }

    /* Dimension run, full height, on the drawing's left. */
    const dimX = -halfW - 1.9;
    d.line([dimX, 0, 0], [dimX, BUILDING_HEIGHT, 0], CHAMPAGNE, 0.5);
    for (const y of [0, BUILDING_HEIGHT]) {
        d.line([dimX - 0.18, y - 0.18, 0], [dimX + 0.18, y + 0.18, 0], CHAMPAGNE, 0.75);
        d.line([-halfW - 0.1, y, 0], [dimX - 0.4, y, 0], NAVY, 0.3);
    }

    /* Grade datum, and the crown's dashed plumb line. */
    d.line([-SITE_W / 2, 0, -halfD - 2.1], [SITE_W / 2, 0, -halfD - 2.1], CHAMPAGNE, 0.4, [0.045, 0.045]);
    for (let i = 0; i < 9; i++) {
        const y0 = BUILDING_HEIGHT + i * 0.3;
        d.line([0, y0, 0], [0, y0 + 0.16, 0], CHAMPAGNE, 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(d.positions, 3));
    geometry.setAttribute("aLevel", new THREE.Float32BufferAttribute(d.levels, 1));
    geometry.setAttribute("aTone", new THREE.Float32BufferAttribute(d.tones, 1));
    geometry.setAttribute("aWeight", new THREE.Float32BufferAttribute(d.weights, 1));
    return geometry;
}
