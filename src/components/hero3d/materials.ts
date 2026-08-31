import * as THREE from "three";
import { PALETTE } from "./config";
import {
    attachBuildShader,
    makeBuildUniforms,
    type BuildUniforms,
    type GlassUniforms,
} from "./shaders/build";

/* The three material states the brief asks for, each wired to the
   construction shader. Colour lives on the instances rather than the
   material — with material.color left white, an instance's colour arrives as
   an exact linear multiplier, so the palette survives untouched. */

export function createStructureMaterial() {
    const uniforms = makeBuildUniforms(PALETTE.champagne300);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.62,
        roughness: 0.38,
        envMapIntensity: 0.62,
    });
    attachBuildShader(material, uniforms, { cacheKey: "hero-structure" });
    return { material, uniforms };
}

/** Mullions, spandrels, crown. Anodised bronze — high metalness over a
    desaturated warm grey, so it catches the key light without going gold. */
export function createTrimMaterial() {
    const uniforms = makeBuildUniforms(PALETTE.champagne200);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.05,
    });
    attachBuildShader(material, uniforms, { cacheKey: "hero-trim" });
    return { material, uniforms };
}

export function createGlassMaterial() {
    const uniforms: GlassUniforms = {
        ...makeBuildUniforms(PALETTE.champagne300),
        uLit: { value: 0 },
        uTime: { value: 0 },
        uWarm: { value: new THREE.Color(PALETTE.champagne200) },
    };
    uniforms.uGrow.value = 0.8;

    const material = new THREE.MeshPhysicalMaterial({
        color: PALETTE.navy900,
        metalness: 0.4,
        roughness: 0.16,
        clearcoat: 0.55,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.35,
        transparent: true,
        opacity: 0.88,
        // Deliberately 0, not the 0.05 the spec suggests. Any transmission
        // above zero puts three into a full transmission pass — the whole
        // scene re-rendered to a target every frame — which is most of a
        // frame budget for an effect invisible at 5%. The depth comes from
        // clearcoat and the environment instead.
        transmission: 0,
        // Panels keep writing depth: at 0.88 the curtain wall reads as solid,
        // and a single instanced draw call cannot sort its own instances.
        depthWrite: true,
    });
    attachBuildShader(material, uniforms, { glass: true, cacheKey: "hero-glass" });
    return { material, uniforms };
}

export type BuildingMaterials = {
    structure: { material: THREE.MeshStandardMaterial; uniforms: BuildUniforms };
    trim: { material: THREE.MeshStandardMaterial; uniforms: BuildUniforms };
    glass: { material: THREE.MeshPhysicalMaterial; uniforms: GlassUniforms };
};

/** Merges three's fog uniforms into a custom shader's set. The clone means
    callers must read values back off the returned object, not the input. */
export function foggedUniforms<T extends Record<string, THREE.IUniform>>(uniforms: T): T {
    return THREE.UniformsUtils.merge([THREE.UniformsLib.fog, uniforms]) as T;
}
