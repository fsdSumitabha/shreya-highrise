"use client";

import { useEffect } from "react";

/* One listener hub for every scroll-driven effect on the site.

   Nothing here is required for the page to be readable: the CSS that hides a
   [data-reveal] element only applies once this component has stamped
   data-motion="on" onto <html>. No JS, or reduced motion, and the page simply
   renders finished.

   Opt-in attributes, all read from the DOM rather than passed as props, so
   server components can use them without becoming client components:

     data-reveal="up|fade|left|right|rise|zoom|curtain|rule|mask"
     data-reveal-repeat   re-arms every time the element leaves the viewport
     data-stagger="80"    delays each child of this element by n ms in turn
     data-parallax="0.15" lag factor while scrolling; higher drifts further
     data-spotlight       tracks the pointer into --mx / --my
*/

const STAGGER_STEP = 80;
const PARALLAX_LAG = 0.15;

export default function MotionRoot() {
    useEffect(() => {
        const root = document.documentElement;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        root.dataset.motion = "on";

        let parallax: HTMLElement[] = [];
        // getBoundingClientRect reports the *transformed* box, so the offset we
        // already applied has to come back out before measuring — otherwise each
        // frame feeds on the last one and the element drifts off screen.
        const applied = new WeakMap<HTMLElement, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.dataset.shown = "";
                        if (el.dataset.revealRepeat === undefined) observer.unobserve(el);
                    } else if (el.dataset.revealRepeat !== undefined) {
                        delete el.dataset.shown;
                    }
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        );

        /* Walks the tree for opt-ins. Runs once now and again whenever a route
           change swaps the contents of <main> under us. */
        const scan = () => {
            for (const group of document.querySelectorAll<HTMLElement>("[data-stagger]")) {
                const step = Number(group.dataset.stagger) || STAGGER_STEP;
                Array.from(group.children).forEach((child, i) => {
                    (child as HTMLElement).style.setProperty("--rv-delay", `${i * step}ms`);
                });
            }
            for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
                if (el.dataset.shown === undefined) observer.observe(el);
            }
            parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
        };

        scan();

        let queued = false;
        const measure = () => {
            queued = false;
            const y = window.scrollY;
            const runway = root.scrollHeight - window.innerHeight;
            root.style.setProperty("--scroll-progress", runway > 0 ? String(Math.min(1, y / runway)) : "0");
            if (y > 24) root.dataset.scrolled = "";
            else delete root.dataset.scrolled;
            // Past the fold — the point where the floating chrome earns its place.
            if (y > window.innerHeight * 0.85) root.dataset.deep = "";
            else delete root.dataset.deep;

            const vh = window.innerHeight;
            for (const el of parallax) {
                const box = el.getBoundingClientRect();
                if (box.bottom < -vh || box.top > vh * 2) continue;
                const lag = Number(el.dataset.parallax) || PARALLAX_LAG;
                const rest = box.top - (applied.get(el) ?? 0);
                const fromCentre = rest + box.height / 2 - vh / 2;
                const offset = -fromCentre * lag;
                applied.set(el, offset);
                el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
            }
        };

        const onScroll = () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(measure);
        };

        const onPointerMove = (event: PointerEvent) => {
            const target = event.target as Element | null;
            const el = target?.closest<HTMLElement>("[data-spotlight]");
            if (!el) return;
            const box = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${(((event.clientX - box.left) / box.width) * 100).toFixed(1)}%`);
            el.style.setProperty("--my", `${(((event.clientY - box.top) / box.height) * 100).toFixed(1)}%`);
        };

        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        document.addEventListener("pointermove", onPointerMove, { passive: true });

        // Route changes swap the DOM under a layout-level component. Coalesce
        // the rescan into one frame so a burst of insertions costs one pass.
        let rescan = 0;
        const mutations = new MutationObserver(() => {
            cancelAnimationFrame(rescan);
            rescan = requestAnimationFrame(() => {
                scan();
                measure();
            });
        });
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
            cancelAnimationFrame(rescan);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            document.removeEventListener("pointermove", onPointerMove);
            delete root.dataset.motion;
        };
    }, []);

    return null;
}
