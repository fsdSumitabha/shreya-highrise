"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
    buildInstancedMesh,
    createCore,
    createFloorSlabs,
    createFoundation,
    createStructuralColumns,
} from "./buildingGeometry";

/* Foundation, perimeter columns, floor slabs and core — one InstancedMesh.

   They share a material but not a schedule: each instance's aKind picks which
   component of uBuild drives it, so the piles can still be curing while the
   core climbs and the slabs trail six floors below the columns. Four
   independent construction fronts, one draw call, no per-object JavaScript.

   Unlike the façade, none of this varies by device: six hundred boxes of
   structure cost the same on a phone, and thinning the frame would change the
   building rather than the quality it is drawn at. */

export default function StructuralFrame({ material }: { material: THREE.Material }) {
    const mesh = useMemo(() => {
        const instances = [
            ...createFoundation(),
            ...createStructuralColumns(),
            ...createFloorSlabs(),
            ...createCore(),
        ];
        return buildInstancedMesh(instances, material, { name: "structure" });
    }, [material]);

    useEffect(() => () => mesh.geometry.dispose(), [mesh]);

    return <primitive object={mesh} />;
}
