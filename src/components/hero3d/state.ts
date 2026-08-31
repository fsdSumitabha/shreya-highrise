"use client";

import { createContext, useContext } from "react";
import { buildFronts, CAMERA_KEYS, type BuildFronts, type CamKey } from "./config";

/* One mutable object shared by the scroll controller, the scene and the DOM
   overlay. Nothing here ever goes through React state: the construction runs
   at 60 fps and a setState per frame would re-render the whole hero.

   The provider lives *inside* <Canvas>, because react-three-fiber renders into
   its own reconciler root and does not inherit context from the DOM tree. */

export type HeroState = {
    /** Scroll position of the hero, 0 to 1. Written by the GSAP timeline,
        which already carries the scrub smoothing — nothing damps it again. */
    progress: number;
    /** Camera rig, tweened through CAMERA_KEYS by the same timeline. */
    cam: CamKey;
    /** Derived build fronts, recomputed once per frame from `progress`. */
    fronts: BuildFronts;
    /** 0 to 1 as the drawing inks itself in on load. Not scroll-driven — the
        hero at rest should already be a finished drawing. */
    intro: number;
    /** Pointer in NDC, damped. Drives the parallax. */
    pointer: { x: number; y: number };
    /** Pointer target, written by the move listener. */
    pointerTarget: { x: number; y: number };
    /** 0 to 1, rises while the tower is hovered. */
    hover: number;
    hoverTarget: number;
    reducedMotion: boolean;
    /** Snap rather than damp — set for the first frame, and for reduced motion. */
    instant: boolean;
};

export function createHeroState(reducedMotion: boolean): HeroState {
    const p = reducedMotion ? 1 : 0;
    const seed = reducedMotion ? CAMERA_KEYS[CAMERA_KEYS.length - 1].key : CAMERA_KEYS[0].key;
    return {
        progress: p,
        cam: { ...seed },
        fronts: buildFronts(p),
        intro: reducedMotion ? 1 : 0,
        pointer: { x: 0, y: 0 },
        pointerTarget: { x: 0, y: 0 },
        hover: 0,
        hoverTarget: 0,
        reducedMotion,
        instant: true,
    };
}

const HeroStateContext = createContext<HeroState | null>(null);

export const HeroStateProvider = HeroStateContext.Provider;

export function useHeroState(): HeroState {
    const state = useContext(HeroStateContext);
    if (!state) throw new Error("useHeroState must be used inside the hero scene");
    return state;
}
