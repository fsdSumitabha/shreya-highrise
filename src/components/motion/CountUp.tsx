"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
    to: number;
    suffix?: string;
    decimals?: number;
    /** Length of the count, in milliseconds. */
    duration?: number;
    className?: string;
};

// The reset to zero has to land before the browser paints, or the final
// figure flashes for a frame first.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/* Counts up to a figure the first time it scrolls into view.

   Server-rendered at the final value, so the real number is in the HTML for
   crawlers and for anyone without JS — the count is only ever a decoration
   laid over a figure that is already correct. */
export default function CountUp({ to, suffix = "", decimals = 0, duration = 1600, className = "" }: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(to);
    const [armed, setArmed] = useState(false);

    useBeforePaint(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setShown(0);
        setArmed(true);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!armed || !el) return;

        let frame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const progress = Math.min(1, (now - start) / duration);
                    setShown(to * easeOut(progress));
                    if (progress < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [armed, to, duration]);

    const text = shown.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span ref={ref} className={className}>
            <span className="tabular-nums">{text}</span>
            {suffix}
        </span>
    );
}
