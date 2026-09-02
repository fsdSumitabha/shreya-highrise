"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { nav, site } from "@/data/site";

/* The menu drops out of the real header and covers the rest of the viewport.
   The header itself stays put and keeps its own chrome — the panel is a sheet
   hung underneath it, not a replacement screen, so the top of the page never
   flickers or shifts as it opens.

   Kept cheap on purpose. backdrop-filter is the expensive part of a glass
   panel: the browser re-blurs everything behind it on every composited frame,
   so there is exactly ONE blurred layer here. The pills are plain translucent
   fills over it — a second backdrop-filter each would multiply the work for a
   effect nobody can see through a panel that is already frosted.

   It is portalled to the body because Header is sticky with a z-index, which
   opens a stacking context: a panel rendered inside it could never rise above
   the fixed, same-layer chrome that comes later in the document. */

const ITEM_STEP = 40;

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [top, setTop] = useState(0);
    const pathname = usePathname();
    const openerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setMounted(true), []);

    // A tapped link navigates client-side; without this the sheet would sit
    // open over the page it just took you to.
    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        if (!open) return;
        const { documentElement: root, body } = document;

        // Measured, not hard-coded: the bar is shorter once the page has been
        // scrolled. Read before the lock goes on, and it holds while open.
        const header = document.getElementById("site-header");
        setTop(header ? Math.round(header.getBoundingClientRect().bottom) : 0);

        const previous = [root.style.overflow, body.style.overflow];
        root.style.overflow = "hidden";
        body.style.overflow = "hidden";
        // Two jobs. <MobileCallBar> is fixed to the foot of the screen and
        // would show through the glass, right where the sheet puts its own
        // call button — it hides. And <Header> pins itself: locking the
        // scrollport above resolves its position:sticky back to the static
        // position, which would park the bar 1400px up the document.
        root.dataset.menu = "";

        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                openerRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);

        return () => {
            root.style.overflow = previous[0];
            body.style.overflow = previous[1];
            delete root.dataset.menu;
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const sheet = (
        <div id="mobile-menu" style={{ top }}
            className={`fixed inset-x-0 bottom-0 z-100 flex flex-col transition-[opacity,visibility] duration-150 ease-out lg:hidden ${
                open ? "visible opacity-100" : "invisible opacity-0"
            }`}>
            {/* The one blurred layer, with the champagne bloom baked into the
                same paint rather than stacked as another element. */}
            <div aria-hidden="true"
                className="absolute inset-0 -z-10 bg-white/75 bg-[radial-gradient(90%_55%_at_50%_115%,rgba(200,169,107,0.28),transparent_70%)] shadow-[0_16px_40px_-16px_rgba(7,21,35,0.45)] backdrop-blur-lg dark:bg-navy-950/80" />

            <Container className="flex flex-1 flex-col justify-center overflow-y-auto overscroll-contain py-8">
                <nav aria-label="Mobile" className="flex flex-col gap-3">
                    {nav.map((item, i) => {
                        const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}
                                style={{ transitionDelay: open ? `${i * ITEM_STEP}ms` : "0ms" }}
                                className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 font-display text-lg uppercase tracking-luxe shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-[opacity,transform] duration-300 ease-out active:scale-[0.98] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${
                                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                                } ${
                                    current
                                        ? "border-champagne-400/70 bg-champagne-300/30 text-champagne-500 dark:border-champagne-300/40 dark:bg-champagne-300/15 dark:text-champagne-300"
                                        : "border-white/70 bg-white/70 dark:border-white/12 dark:bg-white/8"
                                }`}>
                                {item.label}
                                {current ? (
                                    <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-current" />
                                ) : (
                                    <span aria-hidden="true" className="text-champagne-500 dark:text-champagne-300">
                                        →
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </Container>

            <Container className="flex flex-col gap-5 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-2">
                <div style={{ transitionDelay: open ? `${nav.length * ITEM_STEP}ms` : "0ms" }}
                    className={`flex flex-col gap-3 transition-[opacity,transform] duration-300 ease-out ${
                        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}>
                    <a href={`tel:${site.phones[0].tel}`}
                        className="rounded-2xl bg-champagne-300 px-6 py-4 text-center font-display text-sm uppercase tracking-luxe text-navy-950 shadow-[0_10px_30px_-12px] shadow-champagne-400/70 transition-transform duration-200 active:scale-[0.98]">
                        Call {site.phones[0].display}
                    </a>
                    <p className="text-center font-display text-[0.65rem] uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                        {site.hours}
                    </p>
                </div>

                {/* Last thing on the sheet, and meant to be skipped over. */}
                <div className="flex justify-center border-t border-slate-900/10 pt-4 dark:border-stone-100/10">
                    <ThemeToggle variant="quiet" />
                </div>
            </Container>
        </div>
    );

    return (
        <>
            <button ref={openerRef} type="button" onClick={() => setOpen((v) => !v)}
                aria-expanded={open} aria-controls="mobile-menu"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                className="flex size-11 cursor-pointer items-center justify-center border border-slate-900/20 transition-colors duration-300 hover:border-champagne-500/60 lg:hidden dark:border-stone-100/20 dark:hover:border-champagne-300/60">
                <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
                    <span
                        className={`block h-px bg-current transition-transform duration-200 ease-out ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                    <span
                        className={`block h-px bg-current transition-opacity duration-200 ease-out ${open ? "opacity-0" : ""}`} />
                    <span
                        className={`block h-px bg-current transition-transform duration-200 ease-out ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
            </button>
            {mounted ? createPortal(sheet, document.body) : null}
        </>
    );
}
