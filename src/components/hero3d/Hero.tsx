"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import HeroFallback from "./HeroFallback";
import ScrollController from "./ScrollController";
import { HOVER_TAG, LabelLayer, type OverlayRefs } from "./TechnicalLabels";
import { BUILDING, QUALITY } from "./config";
import { createHeroState } from "./state";
import "./hero.css";

/* Blueprint → structural frame → completed high-rise.

   The section is one viewport tall and sits on a runway several viewports
   deep; scrolling that runway is what builds the tower. Three.js draws the
   building and nothing else — every word on this page is DOM, set in the
   site's own faces, selectable and readable by a crawler that will never run
   a shader. */

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const METADATA = [
    { value: "10+", label: "Addresses" },
    { value: "130K+", label: "Sq. ft. built" },
    { value: "Kolkata", label: "New Town · Rajarhat" },
];

/** three r160+ is WebGL2-only, so this is the whole test. */
function supportsWebGL() {
    try {
        return !!(window.WebGL2RenderingContext && document.createElement("canvas").getContext("webgl2"));
    } catch {
        return false;
    }
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    const refs: OverlayRefs = {
        labels: useRef<(HTMLDivElement | null)[]>([]),
        level: useRef<HTMLSpanElement>(null),
        stage: useRef<HTMLSpanElement>(null),
        code: useRef<HTMLSpanElement>(null),
        fill: useRef<HTMLSpanElement>(null),
        copy: useRef<HTMLDivElement>(null),
        hoverTag: useRef<HTMLDivElement>(null),
    };

    // Safe in the initialiser: nothing rendered depends on it, so the server
    // and the first client pass still agree.
    const [state] = useState(() =>
        createHeroState(
            typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        ),
    );

    const [mode, setMode] = useState<"checking" | "scene" | "fallback">("checking");
    const [mobile, setMobile] = useState(false);
    const [ready, setReady] = useState(false);
    // Off-screen means no loop at all, not a loop rendering to nothing.
    const [active, setActive] = useState(true);

    const onReady = useCallback(() => setReady(true), []);
    const onLost = useCallback(() => setMode("fallback"), []);

    useEffect(() => {
        setMode(supportsWebGL() ? "scene" : "fallback");

        const narrow = window.matchMedia("(max-width: 767px)");
        const sync = () => setMobile(narrow.matches);
        sync();
        narrow.addEventListener("change", sync);
        return () => narrow.removeEventListener("change", sync);
    }, []);

    /* The site header sits in flow, so the hero would start a header's height
       down the document and the sticky stage would hang that far below the
       fold — taking the bottom rail with it. Pulling the section up by exactly
       that much puts the stage on the viewport, and the header (z-50, already
       translucent) floats over it the way it should. Measured rather than
       hard-coded, because the header's height is its own business. */
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const lift = () => {
            section.style.marginTop = "0px";
            const top = section.getBoundingClientRect().top + window.scrollY;
            section.style.marginTop = `${-top}px`;
        };

        lift();
        window.addEventListener("resize", lift);
        return () => {
            window.removeEventListener("resize", lift);
            section.style.marginTop = "";
        };
    }, []);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
            threshold: 0,
        });
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || state.reducedMotion) return;

        const onMove = (event: PointerEvent) => {
            state.pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
            state.pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
            const tag = refs.hoverTag.current;
            if (tag) tag.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        };

        section.addEventListener("pointermove", onMove, { passive: true });
        return () => section.removeEventListener("pointermove", onMove);
        // refs is rebuilt each render but its members are stable ref objects.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const quality = QUALITY[mobile ? "mobile" : "desktop"];

    return (
        <section
            ref={sectionRef}
            className="hero3d"
            // Nothing to scroll through when the tower cannot be built: the
            // runway collapses and the construction chrome stands down.
            data-static={mode === "fallback" ? "" : undefined}
            aria-labelledby="hero3d-heading">
            <ScrollController state={state} sectionRef={sectionRef} />

            <div ref={stageRef} className="hero3d-stage">
                <div aria-hidden="true" className="hero3d-backdrop" />

                {mode === "scene" ? (
                    <HeroScene
                        state={state}
                        refs={refs}
                        quality={quality}
                        mobile={mobile}
                        active={active}
                        onReady={onReady}
                        onLost={onLost}
                    />
                ) : null}
                {mode === "fallback" ? <HeroFallback /> : null}

                <div aria-hidden="true" className="hero3d-haze" />
                {mode === "scene" ? <LabelLayer refs={refs} mobile={mobile} /> : null}

                <div ref={refs.hoverTag} className="hero3d-hover-tag" aria-hidden="true">
                    <span className="block font-display text-[10px] uppercase tracking-luxe text-champagne-200">
                        {HOVER_TAG.title}
                    </span>
                    <span className="block text-[9px] uppercase tracking-[0.18em] text-navy-300/70">
                        {HOVER_TAG.sub}
                    </span>
                </div>

                {/* ── Copy ─────────────────────────────────────────────────
                    Bottom padding clears the phone-only call bar, which the
                    layout slides up as soon as you are past the first fold —
                    which, on a hero with a three-viewport runway, is almost
                    immediately. */}
                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between pb-[5.25rem] pt-24 sm:pb-10 lg:pt-28">
                    <Container className="flex items-start justify-between gap-6">
                        <p className="flex items-center gap-3 font-display text-[10px] uppercase tracking-luxe text-champagne-300 sm:text-xs">
                            <span aria-hidden="true" className="size-1.5 rotate-45 bg-champagne-300" />
                            High-rise construction
                        </p>
                        <p className="hidden font-display text-[10px] uppercase tracking-luxe text-stone-100/35 sm:block">
                            General arrangement · North elevation
                        </p>
                    </Container>

                    {/* Portrait sends the copy to the foot of its own space,
                        under the tower. Landscape centres it beside one. */}
                    <Container className="flex flex-1 items-end lg:flex-none lg:items-center">
                        <div ref={refs.copy} className="max-w-[38rem] will-change-transform lg:max-w-[42%]">
                            <h1
                                id="hero3d-heading"
                                className="hero3d-mega font-display font-light text-stone-100">
                                Engineering
                                <br />
                                the next
                                <br />
                                <span className="text-champagne-200">skyline.</span>
                            </h1>

                            <p className="mt-7 max-w-sm font-display text-[10px] uppercase leading-relaxed tracking-luxe text-stone-100/45 sm:text-xs">
                                New Town · Rajarhat · Kolkata
                            </p>

                            <Link
                                href="/projects"
                                className="hero3d-cta pointer-events-auto mt-9 text-stone-100 transition-colors duration-300 hover:text-champagne-200">
                                <span className="flex items-center gap-4 font-display text-xs uppercase tracking-luxe">
                                    Explore projects
                                    <span aria-hidden="true">→</span>
                                </span>
                                <span aria-hidden="true" className="hero3d-cta-line" />
                            </Link>
                        </div>
                    </Container>

                    {/* ── Bottom rail ──────────────────────────────────── */}
                    <Container className="flex items-end justify-between gap-5">
                        <div className="hero3d-progressive flex items-end gap-4">
                            <span aria-hidden="true" className="hero3d-scroll-track">
                                <span ref={refs.fill} className="hero3d-scroll-fill" />
                            </span>
                            <span className="pb-0.5 font-display text-[10px] uppercase tracking-luxe text-stone-100/40">
                                Scroll<span className="hidden sm:inline"> to construct</span>
                            </span>
                        </div>

                        <div className="flex items-end gap-8 sm:gap-12">
                            <dl className="hidden gap-8 sm:flex sm:gap-10">
                                {METADATA.map((item) => (
                                    <div key={item.label} className="flex flex-col gap-1">
                                        <dt className="font-display text-lg font-light tracking-tight text-champagne-300">
                                            {item.value}
                                        </dt>
                                        <dd className="font-display text-[9px] uppercase tracking-luxe text-stone-100/40">
                                            {item.label}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            {/* Live construction readout. Written from the render
                                loop, never from React. */}
                            <div
                                aria-hidden="true"
                                className="hero3d-progressive flex flex-col items-end gap-1 border-l border-stone-100/12 pl-6 text-right">
                                <span className="flex items-center gap-2 font-display text-[9px] uppercase tracking-luxe text-stone-100/35">
                                    Phase
                                    <span ref={refs.code} className="text-champagne-300/70">
                                        A-01
                                    </span>
                                </span>
                                <span
                                    ref={refs.stage}
                                    className="font-display text-[11px] uppercase tracking-luxe text-stone-100/70">
                                    Blueprint
                                </span>
                                <span className="font-display text-[9px] uppercase tracking-luxe text-champagne-300/80">
                                    Level <span ref={refs.level}>00</span> / {BUILDING.floors}
                                </span>
                            </div>
                        </div>
                    </Container>
                </div>

                {/* ── Loading ──────────────────────────────────────────── */}
                <div
                    className="hero3d-loading"
                    data-ready={mode === "fallback" || ready ? "" : undefined}
                    aria-hidden="true">
                    <span className="font-display text-[10px] uppercase tracking-luxe text-stone-100/45">
                        Preparing the site
                    </span>
                    <span className="hero3d-loading-bar" />
                </div>
            </div>
        </section>
    );
}
