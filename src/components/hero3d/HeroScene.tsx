"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import Atmosphere from "./Atmosphere";
import Blueprint from "./Blueprint";
import Building from "./Building";
import CameraRig from "./CameraRig";
import ConstructionSweep from "./ConstructionSweep";
import GroundGrid from "./GroundGrid";
import { LabelProjector, type OverlayRefs } from "./TechnicalLabels";
import { FOV, buildFronts, type Quality } from "./config";
import { HeroStateProvider, useHeroState, type HeroState } from "./state";

/* The scene. Everything below this point is refs and uniforms.

   The one thing worth reading twice is the driver: it is the only place the
   scroll position is turned into build fronts, and it runs at priority -10 so
   every consumer downstream is reading the same frame's numbers. A negative
   priority sorts first without taking the render loop away from R3F — only a
   positive one does that. */

/** How long the drawing takes to ink itself in on load. */
const INK_SECONDS = 2.1;

function SceneDriver() {
    const state = useHeroState();

    useFrame((_, delta) => {
        buildFronts(state.progress, state.fronts);
        state.intro = state.reducedMotion ? 1 : Math.min(state.intro + delta / INK_SECONDS, 1);

        // Frame-rate independent damping. The snap on the first frame stops
        // the scene easing in from a pointer of (0, 0) it never had.
        const settle = state.instant ? 1 : 1 - Math.exp(-6 * delta);
        state.pointer.x += (state.pointerTarget.x - state.pointer.x) * settle;
        state.pointer.y += (state.pointerTarget.y - state.pointer.y) * settle;

        const hover = state.instant ? 1 : 1 - Math.exp(-5 * delta);
        state.hover += (state.hoverTarget - state.hover) * hover;

        state.instant = false;
    }, -10);

    return null;
}

/** Drops resolution rather than frames on a device that cannot keep up. */
function QualityGovernor({ max }: { max: number }) {
    const setDpr = useThree((s) => s.setDpr);
    return (
        <PerformanceMonitor
            flipflops={3}
            onChange={({ factor }) => setDpr(Number((0.85 + factor * (max - 0.85)).toFixed(2)))}
            onFallback={() => setDpr(1)}
        />
    );
}

function ReadySignal({ onReady }: { onReady: () => void }) {
    const invalidate = useThree((s) => s.invalidate);

    useEffect(() => {
        // Two frames: one for the shaders to compile, one for them to land.
        invalidate();
        let second = 0;
        const first = requestAnimationFrame(() => {
            second = requestAnimationFrame(() => {
                invalidate();
                onReady();
            });
        });
        return () => {
            cancelAnimationFrame(first);
            cancelAnimationFrame(second);
        };
    }, [invalidate, onReady]);

    return null;
}

export default function HeroScene({
    state,
    refs,
    quality,
    mobile,
    active,
    onReady,
    onLost,
}: {
    state: HeroState;
    refs: OverlayRefs;
    quality: Quality;
    mobile: boolean;
    /** False once the hero has scrolled away — the loop stops entirely. */
    active: boolean;
    onReady: () => void;
    onLost: () => void;
}) {
    const initialCamera = useMemo(
        () => ({ fov: FOV, near: 0.5, far: 240, position: [12, 11, 40] as [number, number, number] }),
        [],
    );

    return (
        <Canvas
            className="hero3d-canvas"
            // R3F stamps position:relative on its wrapper inline, which beats
            // any stylesheet — without this the canvas sits in flow and pushes
            // the copy out of the clipped stage.
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            dpr={[1, quality.maxDpr]}
            frameloop={state.reducedMotion ? "demand" : active ? "always" : "never"}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={initialCamera}
            onCreated={({ gl }) => {
                gl.setClearAlpha(0);
                gl.domElement.addEventListener("webglcontextlost", onLost, { once: true });
            }}>
            <HeroStateProvider value={state}>
                <SceneDriver />
                <CameraRig />
                <Atmosphere quality={quality} />
                <GroundGrid />
                <Blueprint quality={quality} />
                <Building quality={quality} />
                <ConstructionSweep />
                <LabelProjector refs={refs} mobile={mobile} />
                <QualityGovernor max={quality.maxDpr} />
                <ReadySignal onReady={onReady} />
            </HeroStateProvider>
        </Canvas>
    );
}
