"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { dustFrag, dustVert } from "./shaders/sweep";
import { createStudioEnvironment } from "./environment";
import { BUILDING_TOP, PALETTE, type Quality } from "./config";
import { useHeroState } from "./state";

/* Light, air and reflection.

   The rig starts almost off. Through the blueprint and the frame there is
   barely more than a hemisphere and the work face; the key, the rim and the
   warm plinth wash all come up together over the last third, so "the lighting
   becomes realistic" is something you watch happen rather than a state the
   scene was always in.

   Large parts of the tower stay dark at full progress. That is the point. */

function DustField({ count }: { count: number }) {
    const state = useHeroState();

    const { points, uniforms } = useMemo(() => {
        const span = 30;
        const positions = new Float32Array(count * 3);
        const seeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 46;
            positions[i * 3 + 1] = Math.random() * span;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 46;
            seeds[i] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

        const u = {
            uTime: { value: 0 },
            uSize: { value: 2.4 },
            uOpacity: { value: 0.34 },
            uSpan: { value: span },
            uColor: { value: new THREE.Color(PALETTE.navy300) },
        };

        const mesh = new THREE.Points(
            geometry,
            new THREE.ShaderMaterial({
                uniforms: u,
                vertexShader: dustVert,
                fragmentShader: dustFrag,
                transparent: true,
                depthWrite: false,
            }),
        );
        mesh.frustumCulled = false;
        return { points: mesh, uniforms: u };
    }, [count]);

    useEffect(
        () => () => {
            points.geometry.dispose();
            (points.material as THREE.Material).dispose();
        },
        [points],
    );

    useFrame((_, delta) => {
        if (!state.reducedMotion) uniforms.uTime.value += delta;
    });

    return <primitive object={points} />;
}

export default function Atmosphere({ quality }: { quality: Quality }) {
    const state = useHeroState();
    const gl = useThree((s) => s.gl);
    const scene = useThree((s) => s.scene);
    const invalidate = useThree((s) => s.invalidate);

    const key = useRef<THREE.DirectionalLight>(null);
    const rim = useRef<THREE.DirectionalLight>(null);
    const warm = useRef<THREE.PointLight>(null);
    const hemi = useRef<THREE.HemisphereLight>(null);

    useEffect(() => {
        const env = createStudioEnvironment(gl);
        scene.environment = env.texture;
        scene.environmentIntensity = 0.85;
        // The environment lands an effect after the first render, and a
        // demand-driven loop (reduced motion) would otherwise never redraw.
        invalidate();
        return () => {
            scene.environment = null;
            env.dispose();
        };
    }, [gl, scene, invalidate]);

    useFrame(() => {
        const rig = state.fronts.lightRig;
        if (hemi.current) hemi.current.intensity = 0.42 + rig * 0.2;
        if (key.current) key.current.intensity = 0.85 + rig * 1.15;
        if (rim.current) rim.current.intensity = 0.55 + rig * 0.7;
        if (warm.current) warm.current.intensity = rig * 9;
    });

    return (
        <>
            <fogExp2 attach="fog" args={[PALETTE.void, 0.0125]} />

            <hemisphereLight ref={hemi} args={[PALETTE.navy300, PALETTE.void, 0.3]} />
            <directionalLight ref={key} position={[15, 22, 11]} color={0xdce8f5} intensity={0.5} />
            <directionalLight ref={rim} position={[-17, 9, -13]} color={PALETTE.navy300} intensity={0.45} />
            {/* Warm wash on the plinth. The only champagne light in the scene. */}
            <pointLight
                ref={warm}
                position={[0, 0.8, 5.2]}
                color={PALETTE.champagne300}
                intensity={0}
                distance={17}
                decay={2}
            />
            {/* A cool kicker behind the crown, so the silhouette separates. */}
            <pointLight
                position={[-3, BUILDING_TOP - 1.5, -6]}
                color={PALETTE.navy300}
                intensity={5}
                distance={22}
                decay={2}
            />

            {quality.dust > 0 ? <DustField count={quality.dust} /> : null}
        </>
    );
}
