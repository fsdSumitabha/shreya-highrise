"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_COLOR, THEME_KEY, type Theme } from "@/components/layout/theme";

/* The site's only theme control. <html data-theme> is the single source of
   truth — the boot script sets it before paint, this reads it back rather
   than keeping a second copy in React state, which is what lets the switch
   hydrate already in the right position instead of flicking across after.

   Subscribing to the attribute itself also keeps two open tabs in step: a
   flip in one writes localStorage, the storage event lands here, and the
   attribute changes in the other. */

const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    const onStorage = (event: StorageEvent) => {
        if (event.key !== THEME_KEY) return;
        apply(event.newValue === "dark" ? "dark" : "light");
    };
    window.addEventListener("storage", onStorage);

    return () => {
        observer.disconnect();
        window.removeEventListener("storage", onStorage);
    };
};

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const readOnServer = (): Theme => DEFAULT_THEME;

/* Two shells for the one control: `bar` for the nav bar, `glass` for the
   full-screen mobile sheet. Variants rather than a className override, because
   Tailwind utilities all carry the same specificity — a passed-in border- or
   padding- class would win or lose on stylesheet order, not on the order it
   was written in.

   `bar` is sized by height rather than padding so it tracks the phone button
   beside it, shrinking with the rest of the bar once the page is scrolled.
   `quiet` is the bare switch, for the foot of the mobile sheet where it sits
   well below the links and the call button in priority. */
type Variant = "bar" | "quiet";

const shells: Record<Variant, string> = {
    bar: "h-12 border-slate-900/15 px-4 transition-[height,border-color] duration-500 ease-out hover:border-champagne-500/60 [html[data-scrolled]_&]:h-10 dark:border-stone-100/15 dark:hover:border-champagne-300/60",
    quiet: "rounded-full p-2 opacity-60 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100",
};

function apply(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

export default function ThemeToggle({
    variant = "bar", className = "",
}: { variant?: Variant; className?: string }) {
    const theme = useSyncExternalStore(subscribe, read, readOnServer);
    const next: Theme = theme === "dark" ? "light" : "dark";

    const toggle = useCallback(() => {
        const value: Theme = read() === "dark" ? "light" : "dark";
        apply(value);
        try {
            localStorage.setItem(THEME_KEY, value);
        } catch {
            // Storage blocked — the flip still holds for this page view.
        }
    }, []);

    return (
        <button type="button" onClick={toggle} role="switch" aria-checked={theme === "dark"}
            aria-label={`Switch to ${next} theme`}
            className={`group inline-flex shrink-0 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-500 dark:focus-visible:outline-champagne-300 ${shells[variant]} ${className}`}>
            <span aria-hidden="true"
                className="relative flex h-5 w-9 shrink-0 items-center rounded-full bg-slate-900/15 transition-colors duration-300 group-hover:bg-slate-900/25 dark:bg-stone-100/15 dark:group-hover:bg-stone-100/25">
                <span
                    className="absolute left-0.5 grid size-4 place-items-center rounded-full bg-champagne-400 text-white transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-aria-checked:translate-x-4 dark:bg-champagne-300 dark:text-navy-950">
                    <Glyph theme={theme} />
                </span>
            </span>

        </button>
    );
}

/* Sun and moon, drawn at 16px on the switch thumb. */
function Glyph({ theme }: { theme: Theme }) {
    return theme === "dark" ? (
        <svg viewBox="0 0 16 16" className="size-2.5" fill="currentColor" aria-hidden="true">
            <path d="M13.4 10.2A5.6 5.6 0 0 1 6 2.7a5.7 5.7 0 1 0 7.4 7.5Z" />
        </svg>
    ) : (
        <svg viewBox="0 0 16 16" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" aria-hidden="true">
            <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />
            <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M13 3l-1.1 1.1M4.1 11.9 3 13" />
        </svg>
    );
}
