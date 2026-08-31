import * as THREE from "three";

/* The construction shader.

   Every repeated element of the tower — foundation blocks, column segments,
   floor slabs, core walls, mullions, glass — lives in one of three
   InstancedMeshes. Each instance carries two attributes:

     aLevel   when it is due to appear, 0 at the bottom of its group, 1 at the top
     aKind    which build front drives it (0..3, indexing uBuild)

   A build front is a number that walks from 0 past 1 as you scroll. An
   instance emerges when the front passes its own level, so the tower assembles
   from the ground up with no per-object JavaScript at all: the whole sequence
   is four floats on a uniform.

   This is grafted onto MeshStandardMaterial / MeshPhysicalMaterial rather than
   written from scratch, so the finished building still gets real PBR lighting
   and environment reflections. */

export type BuildUniforms = {
    uBuild: { value: THREE.Vector4 };
    uBand: { value: number };
    uSweepY: { value: number };
    uSweepWidth: { value: number };
    uEdge: { value: THREE.Color };
    uEdgeGain: { value: number };
    uGrow: { value: number };
    uHover: { value: number };
};

export type GlassUniforms = BuildUniforms & {
    uLit: { value: number };
    uTime: { value: number };
    uWarm: { value: THREE.Color };
};

export function makeBuildUniforms(edge: number): BuildUniforms {
    return {
        uBuild: { value: new THREE.Vector4(0, 0, 0, 0) },
        uBand: { value: 0.075 },
        uSweepY: { value: 0 },
        uSweepWidth: { value: 0.42 },
        uEdge: { value: new THREE.Color(edge) },
        uEdgeGain: { value: 1 },
        uGrow: { value: 1 },
        uHover: { value: 0 },
    };
}

const VERT_PARS = /* glsl */ `
attribute float aLevel;
attribute float aKind;
uniform vec4 uBuild;
uniform float uBand;
uniform float uGrow;
varying float vReveal;
varying float vWorldY;
`;

const VERT_BODY = /* glsl */ `
float raw = aKind < 0.5 ? uBuild.x
          : aKind < 1.5 ? uBuild.y
          : aKind < 2.5 ? uBuild.z
          : uBuild.w;

// The front runs from just below 0 to just past 1, because the reveal band
// straddles it. Without the headroom at the bottom, anything sitting at
// aLevel 0 — the excavation raft, the first storey, the crown's parapet — is
// already most of the way out at front 0; without the headroom at the top,
// the last storey never finishes.
float front = mix(-uBand, 1.0 + uBand * 0.5, raw);

// Trailing edge is wider than the leading edge, so an element eases out of the
// deck rather than snapping to full height the instant the front clears it.
float reveal = smoothstep(aLevel - uBand, aLevel + uBand * 0.35, front);

// Collapses a not-yet-built instance to a point: no fragments, no depth
// writes, nothing for the transparent pass to sort.
float pop = smoothstep(0.0, 0.05, reveal);
float grow = mix(1.0, reveal, uGrow);

transformed.y *= grow;
transformed.xz *= pop * mix(0.9, 1.0, reveal);

vReveal = reveal;

vec4 buildWorld = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
    buildWorld = instanceMatrix * buildWorld;
#endif
vWorldY = (modelMatrix * buildWorld).y;
`;

const FRAG_PARS = /* glsl */ `
uniform float uSweepY;
uniform float uSweepWidth;
uniform vec3 uEdge;
uniform float uEdgeGain;
uniform float uHover;
varying float vReveal;
varying float vWorldY;
`;

const FRAG_EMISSIVE = /* glsl */ `
// Champagne on the work face, and on anything only part-way out of the deck.
float sweep = 1.0 - smoothstep(0.0, uSweepWidth, abs(vWorldY - uSweepY));
float fresh = vReveal * (1.0 - vReveal) * 4.0;
totalEmissiveRadiance += uEdge * (sweep * 0.36 + fresh * 0.6) * uEdgeGain * vReveal;
`;

/** Occupied flats, once the tower is finished. Deliberately far below bloom. */
const FRAG_WINDOWS = /* glsl */ `
totalEmissiveRadiance += uWarm * vLit * 0.085 * vReveal;
`;

const FRAG_RIM = /* glsl */ `
// Grazing-angle champagne, held back until the pointer is over the tower.
float rimFacing = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
totalEmissiveRadiance += uEdge * pow(rimFacing, 4.0) * uHover * 0.34 * vReveal;
`;

const GLASS_PARS = /* glsl */ `
attribute float aSeed;
uniform float uLit;
uniform float uTime;
varying float vLit;
`;

const GLASS_VERT = /* glsl */ `
// Which panels are occupied, and the slow drift of somebody being home.
float lit = step(aSeed, uLit);
vLit = lit * (0.72 + 0.28 * sin(uTime * (0.24 + aSeed * 0.5) + aSeed * 43.0));
`;

const GLASS_FRAG_PARS = /* glsl */ `
uniform vec3 uWarm;
varying float vLit;
`;

type Options = {
    /** Adds the lit-window and alpha-fade passes. */
    glass?: boolean;
    /** Must be unique per shader variant, or three reuses the wrong program. */
    cacheKey: string;
};

/** Splices the construction logic into a stock lit material, in place. */
export function attachBuildShader(
    material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial,
    uniforms: BuildUniforms | GlassUniforms,
    { glass = false, cacheKey }: Options,
) {
    material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = shader.vertexShader
            .replace("#include <common>", `#include <common>\n${VERT_PARS}${glass ? GLASS_PARS : ""}`)
            .replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>\n${VERT_BODY}${glass ? GLASS_VERT : ""}`,
            );

        shader.fragmentShader = shader.fragmentShader
            .replace("#include <common>", `#include <common>\n${FRAG_PARS}${glass ? GLASS_FRAG_PARS : ""}`)
            .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>\n${FRAG_RIM}`)
            .replace(
                "#include <emissivemap_fragment>",
                `#include <emissivemap_fragment>\n${FRAG_EMISSIVE}${glass ? FRAG_WINDOWS : ""}`,
            );

        if (glass) {
            shader.fragmentShader = shader.fragmentShader.replace(
                "#include <alphamap_fragment>",
                "#include <alphamap_fragment>\ndiffuseColor.a *= smoothstep(0.0, 0.85, vReveal);",
            );
        }
    };

    // Without this three keys the program on the stock source alone and hands
    // two different variants the same compiled shader.
    material.customProgramCacheKey = () => cacheKey;
}
