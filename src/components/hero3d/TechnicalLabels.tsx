"use client";

import { useMemo, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDING, LABELS, levelAt, smoother, span, stageAt, type LabelSpec } from "./config";
import { useHeroState } from "./state";

/* Annotations that hold their place on the building.

   The text is DOM — three.js should never be asked to set type — but the
   anchors are 3D, projected to screen space every frame and written straight
   to style.transform. No React state, so nine labels tracking a moving camera
   cost nine string writes rather than nine renders.

   The same pass drives the construction readout and the headline's retreat,
   because it is already the one place per frame that knows the progress. */

export type OverlayRefs = {
    labels: RefObject<(HTMLDivElement | null)[]>;
    level: RefObject<HTMLSpanElement | null>;
    stage: RefObject<HTMLSpanElement | null>;
    code: RefObject<HTMLSpanElement | null>;
    fill: RefObject<HTMLSpanElement | null>;
    copy: RefObject<HTMLDivElement | null>;
    hoverTag: RefObject<HTMLDivElement | null>;
};

export function visibleLabels(mobile: boolean): LabelSpec[] {
    return mobile ? LABELS.filter((l) => l.mobile) : LABELS;
}

/** The DOM half: every label is rendered once and then never re-rendered. */
export function LabelLayer({ refs, mobile }: { refs: OverlayRefs; mobile: boolean }) {
    const specs = visibleLabels(mobile);
    return (
        <div className="hero3d-labels" aria-hidden="true">
            {specs.map((spec, i) => (
                <div
                    key={spec.id}
                    ref={(el) => {
                        refs.labels.current[i] = el;
                    }}
                    className="hero3d-label"
                    data-side={spec.side}>
                    <span className="hero3d-label-node" />
                    <span className="hero3d-label-rule" />
                    <span className="hero3d-label-text">
                        <span className="hero3d-label-title">
                            {mobile ? (spec.short ?? spec.title) : spec.title}
                        </span>
                        {spec.sub && !mobile ? <span className="hero3d-label-sub">{spec.sub}</span> : null}
                    </span>
                </div>
            ))}
        </div>
    );
}

/** The scene half: projection, and every other per-frame DOM write. */
export function LabelProjector({ refs, mobile }: { refs: OverlayRefs; mobile: boolean }) {
    const state = useHeroState();
    const camera = useThree((s) => s.camera);
    const size = useThree((s) => s.size);

    const specs = useMemo(() => visibleLabels(mobile), [mobile]);
    const point = useMemo(() => new THREE.Vector3(), []);
    const last = useMemo(() => ({ level: -1, stage: "" }), []);
    // Screen positions of labels already placed this frame, so a later one can
    // stand down rather than print on top of an earlier one. Preallocated:
    // this runs every frame and should not be making garbage.
    const taken = useMemo(
        () => ({ x: new Float32Array(LABELS.length), y: new Float32Array(LABELS.length) }),
        [],
    );

    useFrame(() => {
        const p = state.progress;
        let placed = 0;

        for (let i = 0; i < specs.length; i++) {
            const el = refs.labels.current[i];
            if (!el) continue;
            const [from, to] = specs[i].show;

            const hide = () => {
                if (el.style.opacity !== "0") {
                    el.style.opacity = "0";
                    el.style.visibility = "hidden";
                }
            };

            // Eased in and out at the edges of its own window, so a label
            // never blinks and never competes with the headline. Held back
            // behind the drawing, so nothing is annotated before it exists.
            const visibility =
                Math.min(
                    smoother(span(p, from, from + 0.05)),
                    1 - smoother(span(p, Math.max(to - 0.07, from), to)),
                ) *
                smoother(state.intro) *
                0.92;

            if (visibility <= 0.004) {
                hide();
                continue;
            }

            point.set(...(mobile ? (specs[i].mobileAt ?? specs[i].at) : specs[i].at)).project(camera);
            // Behind the camera, or too near an edge for the text that trails
            // it: leave it hidden rather than pinned to a margin it overruns.
            // A phone has far less room to the right of the tower, hence the
            // tighter horizontal bound.
            if (point.z > 1 || Math.abs(point.x) > (mobile ? 0.32 : 1.15) || Math.abs(point.y) > 1.15) {
                hide();
                continue;
            }

            const x = (point.x * 0.5 + 0.5) * size.width;
            const y = (-point.y * 0.5 + 0.5) * size.height;

            // Anchors are fixed in building space; the camera is not. Two of
            // them will eventually project on top of each other, and the one
            // that got there first keeps the spot.
            let clash = false;
            for (let j = 0; j < placed; j++) {
                if (Math.abs(taken.y[j] - y) < 30 && Math.abs(taken.x[j] - x) < 250) {
                    clash = true;
                    break;
                }
            }
            if (clash) {
                hide();
                continue;
            }
            taken.x[placed] = x;
            taken.y[placed] = y;
            placed += 1;

            el.style.visibility = "visible";
            el.style.opacity = visibility.toFixed(3);
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }

        // Construction readout.
        const level = levelAt(state.fronts);
        if (level !== last.level && refs.level.current) {
            last.level = level;
            refs.level.current.textContent = String(level).padStart(2, "0");
        }
        const stage = stageAt(p);
        if (stage.name !== last.stage) {
            last.stage = stage.name;
            if (refs.stage.current) refs.stage.current.textContent = stage.name;
            if (refs.code.current) refs.code.current.textContent = stage.code;
        }
        if (refs.fill.current) refs.fill.current.style.transform = `scaleY(${p.toFixed(4)})`;

        // The headline gives way once the tower has something to say. With
        // reduced motion there is no scroll to earn that, so it stays put.
        if (refs.copy.current) {
            const retreat = state.reducedMotion ? 0 : smoother(span(p, 0.5, 0.96));
            refs.copy.current.style.opacity = (1 - retreat * 0.72).toFixed(3);
            refs.copy.current.style.transform = `translate3d(0, ${(-retreat * 26).toFixed(1)}px, 0)`;
        }

        if (refs.hoverTag.current) refs.hoverTag.current.style.opacity = state.hover.toFixed(3);
    });

    return null;
}

/** Static copy for the hover annotation — kept here beside the label styles. */
export const HOVER_TAG = {
    title: "Structural frame",
    sub: `${BUILDING.floors} levels · RCC core + perimeter tube`,
};
