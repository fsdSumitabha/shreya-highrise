"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createBlueprintGeometry } from "./blueprintGeometry";
import { blueprintFrag, blueprintVert } from "./shaders/blueprint";
import { foggedUniforms } from "./materials";
import { PALETTE, smoother, type Quality } from "./config";
import { useHeroState } from "./state";

/* The CAD layer. One LineSegments, one draw call, a few hundred segments.

   The ink-on runs on state.intro — a mount timer — rather than on scroll.
   Tied to scroll it made the opening frame nearly empty: the visitor arrives
   at a blank site and has to scroll before anything is drawn. On a timer the
   drawing lands itself over the first couple of seconds, so the hero at rest
   is a finished architectural drawing and scrolling is what *builds* from it.

   uFade then pulls the drawing back as the solid tower takes over — back,
   never off. A finished building still standing inside a trace of its own
   drawing is the whole idea. */

export default function Blueprint({ quality }: { quality: Quality }) {
    const state = useHeroState();

    const { lines, uniforms } = useMemo(() => {
        const geometry = createBlueprintGeometry(quality);
        const u = foggedUniforms({
            uNavy: { value: new THREE.Color(PALETTE.navy600).multiplyScalar(2.4) },
            uChampagne: { value: new THREE.Color(PALETTE.champagne300) },
            uDraw: { value: 0 },
            uFade: { value: 1 },
            uOpacity: { value: 0.95 },
        });
        const material = new THREE.ShaderMaterial({
            uniforms: u,
            vertexShader: blueprintVert,
            fragmentShader: blueprintFrag,
            transparent: true,
            depthWrite: false,
            fog: true,
        });
        return { lines: new THREE.LineSegments(geometry, material), uniforms: u };
    }, [quality]);

    useEffect(() => {
        lines.frustumCulled = false;
        return () => {
            lines.geometry.dispose();
            (lines.material as THREE.Material).dispose();
        };
    }, [lines]);

    useFrame(() => {
        // Headroom past 1 so the topmost plumb guides finish inking rather
        // than stopping a hair short of their own ends.
        uniforms.uDraw.value = smoother(state.intro) * 1.2;
        uniforms.uFade.value = state.fronts.blueprintFade;
    });

    return <primitive object={lines} />;
}
