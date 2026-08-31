"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAMERA_KEYS } from "./config";
import type { HeroState } from "./state";

/* Scroll to construction.

   One paused GSAP timeline holds the whole choreography — a linear progress
   track plus the camera keyframes with their own easings — and ScrollTrigger
   scrubs it. Scrub is the only smoothing in the chain: the scene reads
   state.progress raw, so the building, the camera and the readout can never
   drift out of step with each other.

   Nothing here renders, and nothing here calls setState. */

export default function ScrollController({
    state,
    sectionRef,
}: {
    state: HeroState;
    sectionRef: RefObject<HTMLElement | null>;
}) {
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.registerPlugin(ScrollTrigger);

        const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        timeline.to(state, { progress: 1, duration: 1 }, 0);

        let at = 0;
        for (let i = 1; i < CAMERA_KEYS.length; i++) {
            const frame = CAMERA_KEYS[i];
            timeline.to(state.cam, { ...frame.key, duration: frame.at - at, ease: frame.ease }, at);
            at = frame.at;
        }

        // Reduced motion gets the finished building, not a stalled site.
        if (state.reducedMotion) {
            timeline.progress(1, true);
            return () => {
                timeline.kill();
            };
        }

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            animation: timeline,
            invalidateOnRefresh: true,
        });

        // Fonts and the sticky rail settle a frame or two after mount; without
        // this the trigger can measure the section before it has its height.
        const settle = requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            cancelAnimationFrame(settle);
            trigger.kill();
            timeline.kill();
        };
    }, [state, sectionRef]);

    return null;
}
