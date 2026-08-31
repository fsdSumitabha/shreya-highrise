"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { contactFrag, contactVert, groundFrag, groundVert } from "./shaders/ground";
import { foggedUniforms } from "./materials";
import { BUILDING, PALETTE, clamp01, smoother, span } from "./config";
import { useHeroState } from "./state";

/* The site: a survey grid resolved in a fragment shader on one plane, and a
   soft pool of shadow under the tower.

   The shadow is painted, not cast. A real shadow map would need the build
   shader duplicated into a custom depth material — otherwise every column the
   scroll has not reached yet throws a shadow across the plot — for an effect
   this reads at a fraction of the cost. */

const GROUND_SIZE = 170;

export function createGroundPlane() {
    const geometry = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, 1, 1);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
}

export default function GroundGrid() {
    const state = useHeroState();

    const grid = useMemo(() => {
        const uniforms = foggedUniforms({
            uNavy: { value: new THREE.Color(PALETTE.navy600).multiplyScalar(2.6) },
            uChampagne: { value: new THREE.Color(PALETTE.champagne300) },
            uReveal: { value: 0 },
            uSiteRadius: { value: BUILDING.width * 2.6 },
        });
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: groundVert,
            fragmentShader: groundFrag,
            transparent: true,
            depthWrite: false,
            fog: true,
        });
        const mesh = new THREE.Mesh(createGroundPlane(), material);
        mesh.frustumCulled = false;
        mesh.renderOrder = -2;
        return { mesh, uniforms };
    }, []);

    const contact = useMemo(() => {
        const uniforms = { uColor: { value: new THREE.Color(0x02070d) }, uOpacity: { value: 0 } };
        const geometry = new THREE.PlaneGeometry(BUILDING.width * 5.2, BUILDING.depth * 5.6);
        geometry.rotateX(-Math.PI / 2);
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: contactVert,
            fragmentShader: contactFrag,
            transparent: true,
            depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.012;
        mesh.renderOrder = -1;
        return { mesh, uniforms };
    }, []);

    useEffect(
        () => () => {
            grid.mesh.geometry.dispose();
            (grid.mesh.material as THREE.Material).dispose();
            contact.mesh.geometry.dispose();
            (contact.mesh.material as THREE.Material).dispose();
        },
        [grid, contact],
    );

    useFrame(() => {
        grid.uniforms.uReveal.value = state.fronts.groundReveal;
        // The shadow deepens as there is more building to cast it.
        contact.uniforms.uOpacity.value = clamp01(smoother(span(state.progress, 0.2, 0.8))) * 0.55;
    });

    return (
        <>
            <primitive object={grid.mesh} />
            <primitive object={contact.mesh} />
        </>
    );
}
