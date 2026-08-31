"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import Facade from "./Facade";
import StructuralFrame from "./StructuralFrame";
import { createGlassMaterial, createStructureMaterial, createTrimMaterial } from "./materials";
import { BUILDING, BUILDING_HEIGHT, BUILDING_TOP, PALETTE, smoother, span, type Quality } from "./config";
import { useHeroState } from "./state";

/* Owns the three building materials and feeds them the construction fronts.

   All of it is one useFrame writing a handful of uniforms. The tower has
   roughly two thousand components; not one of them is touched from
   JavaScript after the meshes are packed. */

export default function Building({ quality }: { quality: Quality }) {
    const state = useHeroState();
    const gl = useThree((s) => s.gl);
    const lightRef = useRef<THREE.Mesh>(null);

    const mats = useMemo(
        () => ({
            structure: createStructureMaterial(),
            trim: createTrimMaterial(),
            glass: createGlassMaterial(),
        }),
        [],
    );

    useEffect(
        () => () => {
            mats.structure.material.dispose();
            mats.trim.material.dispose();
            mats.glass.material.dispose();
        },
        [mats],
    );

    useFrame((_, delta) => {
        const f = state.fronts;
        const p = state.progress;

        // The work-face glow belongs to the build. Once the tower is topped
        // out it retreats to a trace, or the finished building reads as lit
        // from within rather than lit by a rig.
        const gain = 1 - 0.86 * smoother(span(p, 0.84, 1));

        const s = mats.structure.uniforms;
        s.uBuild.value.set(f.foundation, f.columns, f.slabs, f.core);
        s.uSweepY.value = f.sweepY;
        s.uEdgeGain.value = gain;
        s.uHover.value = state.hover;

        const t = mats.trim.uniforms;
        t.uBuild.value.set(f.mullions, f.glass, f.crown, 0);
        t.uSweepY.value = f.sweepY;
        t.uEdgeGain.value = gain * 0.7;
        t.uHover.value = state.hover;

        const g = mats.glass.uniforms;
        g.uBuild.value.set(f.glass, 0, 0, 0);
        g.uSweepY.value = f.sweepY;
        g.uEdgeGain.value = gain * 0.5;
        g.uHover.value = state.hover;
        g.uLit.value = f.litWindows * 0.34;
        if (!state.reducedMotion) g.uTime.value += delta;

        if (lightRef.current) {
            const m = lightRef.current.material as THREE.MeshBasicMaterial;
            const pulse = state.reducedMotion ? 1 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(g.uTime.value * 1.6));
            m.opacity = smoother(span(p, 0.95, 1)) * pulse;
        }
    });

    const onOver = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        // Nothing to hover before there is a tower — the proxy is a plain box
        // and would otherwise report hits on empty air during the blueprint.
        if (state.progress < 0.5 || state.reducedMotion) return;
        state.hoverTarget = 1;
        gl.domElement.style.cursor = "crosshair";
    };

    const onOut = () => {
        state.hoverTarget = 0;
        gl.domElement.style.cursor = "";
    };

    return (
        <group>
            <StructuralFrame material={mats.structure.material} />
            <Facade trimMaterial={mats.trim.material} glassMaterial={mats.glass.material} quality={quality} />

            {/* Aviation light on the mast. Two triangles of pure detail. */}
            <mesh ref={lightRef} position={[0, BUILDING_TOP + 0.04, 0]}>
                <sphereGeometry args={[0.055, 8, 6]} />
                <meshBasicMaterial color={PALETTE.champagne200} transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Invisible hit volume. Raycasting an InstancedMesh would happily
                report the columns the build shader has collapsed to nothing. */}
            <mesh
                position={[0, BUILDING_HEIGHT / 2, 0]}
                onPointerOver={onOver}
                onPointerOut={onOut}
                renderOrder={-1}>
                <boxGeometry args={[BUILDING.width + 0.5, BUILDING_HEIGHT, BUILDING.depth + 0.5]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
            </mesh>
        </group>
    );
}
