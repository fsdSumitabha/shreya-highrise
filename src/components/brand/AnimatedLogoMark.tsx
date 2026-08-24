"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LOGO_FILLS, LOGO_INK_DRY, LOGO_STROKES, LOGO_VIEWBOX } from "@/components/brand/logoArt";

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
};

type Phase = "static" | "armed" | "drawing";

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
}: Props) {
    const ref = useRef<SVGSVGElement>(null);
    // Server and first client paint render "static": the plain finished logo.
    // Without JS, or with reduced motion, that is where it stays.
    const [phase, setPhase] = useState<Phase>("static");

    useBeforePaint(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setPhase(playOnView ? "armed" : "drawing");
    }, [playOnView]);

    useEffect(() => {
        if (phase === "static" || !playOnView) return;
        const svg = ref.current;
        if (!svg) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPhase("drawing");
                    if (!replay) observer.disconnect();
                } else if (replay) {
                    // Dropping back to "armed" tears the animations off the
                    // elements, so re-entering starts a fresh draw.
                    setPhase("armed");
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(svg);
        return () => observer.disconnect();
    }, [phase, playOnView, replay]);

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
                    "--logo-dry": LOGO_INK_DRY,
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
