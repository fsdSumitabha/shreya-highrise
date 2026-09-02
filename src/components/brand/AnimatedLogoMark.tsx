"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    LOGO_FILLS,
    LOGO_INK_DRY,
    LOGO_INK_LIFT,
    LOGO_STROKES,
    LOGO_VIEWBOX,
} from "@/components/brand/logoArt";

type Props = {
    className?: string;
    title?: string;
    /** Length of the draw phase in seconds. Everything else is timed off this. */
    duration?: number;
    /** Pause before the first line, in seconds. */
    delay?: number;
    /** Pen weight in CSS pixels — held constant at any rendered size. */
    strokeWidth?: number;
    /** Hold until the mark is scrolled into view. Off means draw on mount. */
    playOnView?: boolean;
    /** Redraw every time the mark re-enters the viewport. */
    replay?: boolean;
    /** Show the point of light that leads the pen along each contour. */
    nib?: boolean;
    /** Keep going: rest on the finished mark, clear it, draw it again. */
    loop?: boolean;
    /** Seconds the finished mark rests before it clears. Looping marks only. */
    hold?: number;
};

type Phase = "static" | "armed" | "drawing" | "clearing";

/** Seconds the finished mark takes to dissolve before the pen starts again. */
const CLEAR = 0.9;

// State has to be set before the browser paints, or the finished mark flashes
// for a frame before the animation resets it.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function AnimatedLogoMark({
    className = "",
    title = "Shreya High Rise",
    duration = 2.6,
    delay = 0,
    strokeWidth = 1.5,
    playOnView = true,
    replay = false,
    nib = false,
    loop = false,
    hold = 4,
}: Props) {
    const ref = useRef<SVGSVGElement>(null);
    // Server and first client paint render "static": the plain finished logo.
    // Without JS, or with reduced motion, that is where it stays.
    const [phase, setPhase] = useState<Phase>("static");
    const [onScreen, setOnScreen] = useState(false);

    // A mark that waits for the viewport and one that keeps redrawing both
    // need to know where they are on the page. A mark that draws once on
    // mount and then stops has nothing to learn from it.
    const gated = playOnView || loop;

    useBeforePaint(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setPhase(gated ? "armed" : "drawing");
    }, [gated]);

    const watching = phase !== "static" && gated;

    useEffect(() => {
        if (!watching) return;
        const svg = ref.current;
        if (!svg) return;

        const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
            threshold: 0.3,
        });
        observer.observe(svg);
        return () => observer.disconnect();
    }, [watching]);

    /* The cycle. A one-shot mark stops at "drawing" and holds the finished
       state there, which is where the animations' own fill mode leaves it. A
       looping one rests on that, clears the sheet, and starts the pen again —
       and because each leg is timed off the same knobs the draw itself uses,
       retiming the sequence retimes the loop with it.

       Dropping back to "armed" tears the animations off the elements, so the
       next pass is a fresh draw rather than a resumed one. */
    useEffect(() => {
        if (phase === "static") return;

        if (gated && !onScreen) {
            // Only a mark that is going to draw again is worth tearing down.
            // One that has finished for good keeps what it has on the page.
            if (replay || loop) setPhase("armed");
            return;
        }

        if (phase === "armed") {
            setPhase("drawing");
            return;
        }

        if (!loop) return;

        const drawing = phase === "drawing";
        const leg = drawing ? delay + duration * (LOGO_INK_DRY + LOGO_INK_LIFT) + hold : CLEAR;
        const timer = setTimeout(() => setPhase(drawing ? "clearing" : "drawing"), leg * 1000);
        return () => clearTimeout(timer);
    }, [phase, gated, onScreen, replay, loop, delay, duration, hold]);

    return (
        <svg
            ref={ref}
            viewBox={LOGO_VIEWBOX}
            role="img"
            aria-label={title}
            data-logo={phase}
            className={`logo-draw ${className}`}
            style={
                {
                    "--logo-duration": `${duration}s`,
                    "--logo-delay": `${delay}s`,
                    "--logo-clear": `${CLEAR}s`,
                    "--logo-dry": LOGO_INK_DRY,
                    "--logo-lift": LOGO_INK_LIFT,
                    strokeWidth,
                } as React.CSSProperties
            }>
            {LOGO_FILLS.map((fill, i) => (
                <path
                    key={`fill-${i}`}
                    data-ink="fill"
                    d={fill.d}
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    style={{ "--seg-start": fill.start } as React.CSSProperties}
                />
            ))}

            {LOGO_STROKES.map((stroke, i) => (
                <path
                    key={`line-${i}`}
                    data-ink="line"
                    d={stroke.d}
                    pathLength={1}
                    style={
                        {
                            "--seg-start": stroke.start,
                            "--seg-duration": stroke.duration,
                        } as React.CSSProperties
                    }
                />
            ))}

            {nib &&
                LOGO_STROKES.map((stroke, i) => (
                    <circle
                        key={`nib-${i}`}
                        data-ink="nib"
                        r={7}
                        style={
                            {
                                offsetPath: `path("${stroke.d}")`,
                                offsetRotate: "0deg",
                                "--seg-start": stroke.start,
                                "--seg-duration": stroke.duration,
                            } as React.CSSProperties
                        }
                    />
                ))}
        </svg>
    );
}
