"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sweepFrag, sweepVert } from "./shaders/sweep";
import { BUILDING, PALETTE, clamp01, smoother, span } from "./config";
import { useHeroState } from "./state";

/* The work face — a champagne band riding the highest build front, plus the
   crisp outline of the slab being poured.

   Peak alpha sits in the low tenths on purpose. This is a survey band on a
   working floor, not a scanner: at any strength where it reads as a beam it
   has stopped looking like architecture. */

const SPREAD = 2.6;

export default function ConstructionSweep() {
    const state = useHeroState();
    const group = useRef<THREE.Group>(null);

    const { plane, outline, uniforms } = useMemo(() => {
        const w = BUILDING.width * SPREAD;
        const d = BUILDING.depth * SPREAD;

        const u = {
            uColor: { value: new THREE.Color(PALETTE.champagne300) },
            uOpacity: { value: 0 },
            // Where the slab edge falls inside the oversized plane.
            uFootprint: { value: new THREE.Vector2(1 / SPREAD, 1 / SPREAD) },
        };

        const geometry = new THREE.PlaneGeometry(w, d);
        geometry.rotateX(-Math.PI / 2);
        const planeMesh = new THREE.Mesh(
            geometry,
            new THREE.ShaderMaterial({
                uniforms: u,
                vertexShader: sweepVert,
                fragmentShader: sweepFrag,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            }),
        );

        const halfW = BUILDING.width / 2 + 0.14;
        const halfD = BUILDING.depth / 2 + 0.14;
        const ring = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-halfW, 0, -halfD),
            new THREE.Vector3(halfW, 0, -halfD),
            new THREE.Vector3(halfW, 0, -halfD),
            new THREE.Vector3(halfW, 0, halfD),
            new THREE.Vector3(halfW, 0, halfD),
            new THREE.Vector3(-halfW, 0, halfD),
            new THREE.Vector3(-halfW, 0, halfD),
            new THREE.Vector3(-halfW, 0, -halfD),
        ]);
        const outlineMesh = new THREE.LineSegments(
            ring,
            new THREE.LineBasicMaterial({
                color: PALETTE.champagne200,
                transparent: true,
                opacity: 0,
                depthWrite: false,
            }),
        );

        return { plane: planeMesh, outline: outlineMesh, uniforms: u };
    }, []);

    useEffect(
        () => () => {
            plane.geometry.dispose();
            (plane.material as THREE.Material).dispose();
            outline.geometry.dispose();
            (outline.material as THREE.Material).dispose();
        },
        [plane, outline],
    );

    useFrame(() => {
        const p = state.progress;
        // In as the piles finish, out as the tower tops out.
        const presence =
            clamp01(smoother(span(p, 0.24, 0.36))) * (1 - clamp01(smoother(span(p, 0.86, 0.97))));

        uniforms.uOpacity.value = presence * 0.13;
        (outline.material as THREE.LineBasicMaterial).opacity = presence * 0.45;
        if (group.current) group.current.position.y = state.fronts.sweepY;
    });

    return (
        <group ref={group}>
            <primitive object={plane} />
            <primitive object={outline} />
        </group>
    );
}
