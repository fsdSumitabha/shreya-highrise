"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
    buildInstancedMesh,
    createCrown,
    createFacade,
    createMullions,
    createSpandrels,
} from "./buildingGeometry";
import type { Quality } from "./config";

/* The skin. Two meshes:

   trim   mullions, spandrel bands and the crown — anodised bronze, opaque,
          and on its own schedule so the fins arrive a beat before the glass
   glass  one unitised panel per bay per storey, carrying an occupancy seed
          so the tower can fill with light at the very end

   The glass keeps writing depth. A single instanced draw call cannot sort its
   own instances, and at 0.88 opacity a curtain wall that occludes what is
   behind it looks far more correct than one that stacks alpha eight panels
   deep across the plan. */

export default function Facade({
    trimMaterial,
    glassMaterial,
    quality,
}: {
    trimMaterial: THREE.Material;
    glassMaterial: THREE.Material;
    quality: Quality;
}) {
    const trim = useMemo(
        () =>
            buildInstancedMesh(
                [...createMullions(quality), ...createSpandrels(), ...createCrown()],
                trimMaterial,
                { name: "trim" },
            ),
        [trimMaterial, quality],
    );

    const glass = useMemo(
        () => buildInstancedMesh(createFacade(quality), glassMaterial, { seeds: true, name: "glass" }),
        [glassMaterial, quality],
    );

    useEffect(
        () => () => {
            trim.geometry.dispose();
            glass.geometry.dispose();
        },
        [trim, glass],
    );

    return (
        <>
            <primitive object={trim} />
            <primitive object={glass} />
        </>
    );
}
