import * as THREE from "three";
import { BUILDING, BUILDING_HEIGHT, type Quality } from "./config";

/* Procedural high-rise.

   Every repeated element is one box. Rather than a mesh per column segment,
   the whole tower is packed into three InstancedMeshes — structure, trim,
   glazing — so a 42-storey building with two thousand components costs three
   draw calls.

   All boxes are axis-aligned and scaled on their own axes. That matters: it
   means three's instanced normal handling stays exact without an
   inverse-transpose, and the reveal in the build shader can scale local
   positions directly without skewing the shading. */

export type Instance = {
    /** Centre of the base face, in building space. */
    pos: [number, number, number];
    size: [number, number, number];
    /** Which build front drives it — indexes uBuild. */
    kind: number;
    /** When it appears within its group, 0 first to 1 last. */
    level: number;
    color: number;
};

const { floors, floorHeight, width, depth, columnSize, slabThickness, slabOversail } = BUILDING;
const halfW = width / 2;
const halfD = depth / 2;
const H = BUILDING_HEIGHT;

/** Deterministic, so the lit-window pattern is the same on every load. */
function mulberry32(seed: number) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/* ── Structure ────────────────────────────────────────────────────────── */

export const KIND = {
    foundation: 0,
    columns: 1,
    slabs: 2,
    core: 3,
    mullions: 0,
    spandrels: 1,
    crown: 2,
} as const;

/** Excavation, pile caps, transfer slab and podium. Sits below grade and
    grows up through it, so the ground opens before anything rises. */
export function createFoundation(): Instance[] {
    const d = BUILDING.excavationDepth;
    const out: Instance[] = [
        {
            pos: [0, -d, 0],
            size: [width * 2.15, 0.4, depth * 2.35],
            kind: KIND.foundation,
            level: 0,
            color: 0x0d2035,
        },
    ];

    // Four pile caps under the corner columns.
    for (const sx of [-1, 1])
        for (const sz of [-1, 1])
            out.push({
                pos: [sx * (halfW - 0.35), -0.95, sz * (halfD - 0.3)],
                size: [1.05, 0.42, 0.95],
                kind: KIND.foundation,
                level: 0.22,
                color: 0x122a41,
            });

    out.push(
        {
            pos: [0, -0.58, 0],
            size: [width * 1.78, 0.3, depth * 1.98],
            kind: KIND.foundation,
            level: 0.45,
            color: 0x102436,
        },
        // Podium — breaks grade at -0.3 and tops out at podiumHeight, with the
        // tower's first storeys standing inside it.
        {
            pos: [0, -0.3, 0],
            size: [width * 1.45, BUILDING.podiumHeight + 0.3, depth * 1.6],
            kind: KIND.foundation,
            level: 0.68,
            color: 0x142c43,
        },
        {
            pos: [0, BUILDING.podiumHeight, 0],
            size: [width * 1.58, 0.08, depth * 1.72],
            kind: KIND.foundation,
            level: 0.86,
            color: 0x1d3a56,
        },
        // Paved apron at grade.
        {
            pos: [0, -0.02, 0],
            size: [width * 2.0, 0.05, depth * 2.2],
            kind: KIND.foundation,
            level: 1,
            color: 0x0e2135,
        },
    );

    return out;
}

/** Perimeter tube: four corners plus the centre of each face, up to
    BUILDING.columnCount. Split per storey so the columns rise with the build
    front rather than scaling into place from nothing. */
export function createStructuralColumns(): Instance[] {
    const inset = columnSize / 2 + 0.06;
    const cx = halfW - inset;
    const cz = halfD - inset;

    const plan: [number, number, number][] = [
        // x, z, section multiplier — corners carry more.
        [-cx, -cz, 1.3],
        [cx, -cz, 1.3],
        [-cx, cz, 1.3],
        [cx, cz, 1.3],
    ];
    if (BUILDING.columnCount >= 6) plan.push([0, -cz, 1], [0, cz, 1]);
    if (BUILDING.columnCount >= 8) plan.push([-cx, 0, 1], [cx, 0, 1]);

    const out: Instance[] = [];
    for (let i = 0; i < floors; i++) {
        const level = i / (floors - 1);
        for (const [x, z, k] of plan) {
            out.push({
                pos: [x, i * floorHeight, z],
                size: [columnSize * k, floorHeight, columnSize * k],
                kind: KIND.columns,
                level,
                color: 0x1d3a56,
            });
        }
    }
    return out;
}

/** One slab, capping storey `i`. Every sixth level oversails further — the
    articulation that stops a 42-storey extrusion reading as a single box. */
export function createFloorSlab(i: number): Instance {
    const outrigger = i % 6 === 5;
    const over = slabOversail * (outrigger ? 1.9 : 1);
    return {
        pos: [0, (i + 1) * floorHeight - slabThickness, 0],
        size: [width + over * 2, slabThickness * (outrigger ? 1.4 : 1), depth + over * 2],
        kind: KIND.slabs,
        level: i / (floors - 1),
        // Barely separated from the typical slab. Any more and the setbacks
        // read as banding rather than as structure.
        color: outrigger ? 0x24425f : 0x1f3b57,
    };
}

export function createFloorSlabs(): Instance[] {
    return Array.from({ length: floors }, (_, i) => createFloorSlab(i));
}

/** Central shear core, per storey. */
export function createCore(): Instance[] {
    return Array.from({ length: floors }, (_, i) => ({
        pos: [0, i * floorHeight, 0] as [number, number, number],
        size: [BUILDING.coreWidth, floorHeight, BUILDING.coreDepth],
        kind: KIND.core,
        level: i / (floors - 1),
        color: 0x0f2739,
    }));
}

/* ── Trim ─────────────────────────────────────────────────────────────── */

/** Vertical fins on the bay lines. Anodised bronze, not gold: high metalness
    against a dark warm grey, so they catch the key light and nothing else. */
export function createMullions(q: Quality): Instance[] {
    const out: Instance[] = [];
    const stride = Math.max(1, q.mullionStride);

    for (let i = 0; i < floors; i++) {
        const level = i / (floors - 1);
        const y = i * floorHeight;

        for (let b = 0; b <= q.baysFront; b += stride) {
            const x = -halfW + (b / q.baysFront) * width;
            for (const sz of [-1, 1])
                out.push({
                    pos: [x, y, sz * (halfD + 0.05)],
                    size: [0.05, floorHeight, 0.13],
                    kind: KIND.mullions,
                    level,
                    color: 0x594f3f,
                });
        }
        for (let b = 0; b <= q.baysSide; b += stride) {
            const z = -halfD + (b / q.baysSide) * depth;
            for (const sx of [-1, 1])
                out.push({
                    pos: [sx * (halfW + 0.05), y, z],
                    size: [0.13, floorHeight, 0.05],
                    kind: KIND.mullions,
                    level,
                    color: 0x594f3f,
                });
        }
    }
    return out;
}

/** The opaque band at every floor line that hides the slab edge. */
export function createSpandrels(): Instance[] {
    const out: Instance[] = [];
    const bandH = floorHeight * 0.18;
    for (let i = 0; i < floors; i++) {
        const level = i / (floors - 1);
        const y = i * floorHeight + floorHeight - bandH;
        for (const sz of [-1, 1])
            out.push({
                pos: [0, y, sz * (halfD + 0.045)],
                size: [width + 0.1, bandH, 0.1],
                kind: KIND.spandrels,
                level,
                color: 0x0d2135,
            });
        for (const sx of [-1, 1])
            out.push({
                pos: [sx * (halfW + 0.045), y, 0],
                size: [0.1, bandH, depth + 0.1],
                kind: KIND.spandrels,
                level,
                color: 0x0d2135,
            });
    }
    return out;
}

/** Parapet, plant enclosure, setback and mast. */
export function createCrown(): Instance[] {
    return [
        { pos: [0, H, 0], size: [width * 1.02, 0.2, depth * 1.02], level: 0, color: 0x1d3a56 },
        { pos: [0, H + 0.2, 0], size: [width * 0.7, 0.42, depth * 0.7], level: 0.3, color: 0x162f47 },
        { pos: [0, H + 0.62, 0], size: [width * 0.42, 0.3, depth * 0.42], level: 0.58, color: 0x1d3a56 },
        { pos: [0, H + 0.92, 0], size: [0.34, 0.1, 0.34], level: 0.78, color: 0x2a4a68 },
        { pos: [0, H + 1.02, 0], size: [0.07, 0.33, 0.07], level: 1, color: 0x8a6f3a },
    ].map((p) => ({ ...p, kind: KIND.crown }) as Instance);
}

/* ── Glazing ──────────────────────────────────────────────────────────── */

/** Occupancy seeds, one per glazed panel. A panel lights when uLit passes its
    seed, so the tower fills with life as a single uniform climbs. */
export function createWindowGrid(count: number): Float32Array {
    const rand = mulberry32(0x5b1e);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) seeds[i] = rand();
    return seeds;
}

export function createFacade(q: Quality): Instance[] {
    const out: Instance[] = [];
    const glassH = floorHeight * 0.78;
    const bayW = width / q.baysFront;
    const bayD = depth / q.baysSide;

    for (let i = 0; i < floors; i++) {
        const level = i / (floors - 1);
        const y = i * floorHeight + floorHeight * 0.05;

        for (let b = 0; b < q.baysFront; b++) {
            const x = -halfW + (b + 0.5) * bayW;
            for (const sz of [-1, 1])
                out.push({
                    pos: [x, y, sz * (halfD + 0.02)],
                    size: [bayW * 0.93, glassH, 0.05],
                    kind: 0,
                    level,
                    color: 0xffffff,
                });
        }
        for (let b = 0; b < q.baysSide; b++) {
            const z = -halfD + (b + 0.5) * bayD;
            for (const sx of [-1, 1])
                out.push({
                    pos: [sx * (halfW + 0.02), y, z],
                    size: [0.05, glassH, bayD * 0.93],
                    kind: 0,
                    level,
                    color: 0xffffff,
                });
        }
    }
    return out;
}

/* ── Packing ──────────────────────────────────────────────────────────── */

/** Unit box with its origin on the base face, so an instance matrix's scale
    grows it upward and the build shader's `transformed.y *= reveal` reads as
    the element rising out of the deck below it. */
function baseAnchoredBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.translate(0, 0.5, 0);
    return geometry;
}

export function buildInstancedMesh(
    list: Instance[],
    material: THREE.Material,
    options: { seeds?: boolean; name?: string } = {},
): THREE.InstancedMesh {
    const geometry = baseAnchoredBox();
    const mesh = new THREE.InstancedMesh(geometry, material, list.length);
    mesh.name = options.name ?? "instances";
    mesh.frustumCulled = false;

    const matrix = new THREE.Matrix4();
    const colour = new THREE.Color();
    const levels = new Float32Array(list.length);
    const kinds = new Float32Array(list.length);

    list.forEach((inst, i) => {
        matrix.makeScale(inst.size[0], inst.size[1], inst.size[2]);
        matrix.setPosition(inst.pos[0], inst.pos[1], inst.pos[2]);
        mesh.setMatrixAt(i, matrix);
        mesh.setColorAt(i, colour.setHex(inst.color));
        levels[i] = inst.level;
        kinds[i] = inst.kind;
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    geometry.setAttribute("aLevel", new THREE.InstancedBufferAttribute(levels, 1));
    geometry.setAttribute("aKind", new THREE.InstancedBufferAttribute(kinds, 1));
    if (options.seeds) {
        geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(createWindowGrid(list.length), 1));
    }

    return mesh;
}
