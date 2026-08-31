"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { COMPOSITION, FOV } from "./config";
import { useHeroState } from "./state";

/* Camera.

   Keyframes are polar — orbit, distance, height, target height — and GSAP
   tweens them along the scroll timeline. Storing a rig rather than XYZ means
   the same four numbers frame correctly at any aspect ratio.

   The tower is put off-centre by *rotating* the camera, not by moving the
   building or the look-at point. A yaw of a few degrees slides the subject
   across the frame while leaving the perspective, the horizon and the
   vanishing points exactly where an architectural elevation would want them.
   Because the offset is derived from the aspect ratio, the same composition
   holds from an ultrawide monitor to a phone with no breakpoints. */

export default function CameraRig() {
    const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
    const size = useThree((s) => s.size);
    const state = useHeroState();
    const target = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        const aspect = size.width / Math.max(size.height, 1);
        const composition = aspect < 1 ? COMPOSITION.portrait : COMPOSITION.desktop;

        const { orbit, dist, height, targetY } = state.cam;
        const radius = dist * composition.distScale;

        camera.position.set(Math.sin(orbit) * radius, height, Math.cos(orbit) * radius);
        target.set(0, targetY, 0);
        camera.lookAt(target);

        const half = Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
        camera.rotateY(Math.atan(composition.ndcX * aspect * half));
        camera.rotateX(-Math.atan(composition.ndcY * half));

        // Parallax. Small enough that you feel it before you see it.
        if (!state.reducedMotion) {
            camera.rotateY(state.pointer.x * 0.03);
            camera.rotateX(state.pointer.y * 0.015);
        }
    });

    return null;
}
