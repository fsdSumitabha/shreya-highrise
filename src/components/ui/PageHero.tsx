import { Fragment } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimatedLogoMark from "@/components/brand/AnimatedLogoMark";
import LogoMark from "@/components/brand/LogoMark";
import SplitText from "@/components/motion/SplitText";

type Props = {
    eyebrow: string;
    heading: string;
    lede: string;
    marks?: string[];
    crumb: string;
    /** Steps between Home and `crumb` — a project sits under /projects. */
    trail?: { label: string; href: string }[];
    /** Lay the monogram down live, with a pen, instead of printing it flat. */
    drawMark?: boolean;
};

/* The masthead every inner page opens on.

   One idea, carried by four layers: the section is a drafting sheet and the
   monogram is the drawing on it. A hairline grid rules the paper, a warm
   field sits under the mark so the gold has somewhere to land, the mark
   itself bleeds off the top-right corner, and a scrim runs the paper back to
   solid across the left two thirds — so the heading is always on plain white
   or plain navy, whatever the mark is doing behind it.

   With `drawMark`, the monogram is traced by a champagne pen led by a bead of
   light (see .hero-mark in globals.css), settles into the flat watermark it
   would otherwise have been, rests there, and is redrawn — on a loop that
   stops itself whenever the hero is scrolled off screen. That resting state
   is what renders without JS and under reduced motion, where the mark is
   printed once and never moves, so nothing on the page waits for a drawing. */

const MARK_CLASS =
    "hero-mark absolute -top-16 right-[-44%] h-[135%] w-auto text-slate-900/[0.07] " +
    "sm:right-[-22%] sm:h-[150%] lg:-top-24 lg:right-[-4%] lg:h-[165%] xl:right-[1%] " +
    "dark:text-stone-100/[0.07]";

export default function PageHero({ eyebrow, heading, lede, marks, crumb, trail = [], drawMark = false }: Props) {
    return (
        <section aria-labelledby="page-heading"
            className="grain relative isolate overflow-hidden bg-white text-slate-900 dark:bg-navy-950 dark:text-stone-100">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {/* Ruled paper, fading out as it rises. */}
                <div
                    className="blueprint-grid absolute inset-0 text-slate-900/65 [--grid-size:4.5rem] dark:text-stone-100/60" />

                {/* One slow field of warmth, sitting under the mark. */}
                <div
                    className="aurora absolute -right-32 -top-64 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.20),transparent_65%)] blur-3xl [--aurora-duration:32s] dark:bg-[radial-gradient(circle,rgba(200,169,107,0.16),transparent_65%)]" />

                {drawMark ? (
                    <AnimatedLogoMark className={MARK_CLASS} duration={3.2} delay={0.35} strokeWidth={1.75}
                        playOnView={false} loop hold={5} nib />
                ) : (
                    <LogoMark className={MARK_CLASS} />
                )}

                {/* Solid paper under the type, clear paper under the mark. */}
                <div
                    className="absolute inset-0 bg-linear-to-r from-white from-15% via-white/85 via-55% to-transparent to-95% dark:from-navy-950 dark:via-navy-950/85" />

                {/* The sheet's bottom edge, ruled in from the left. */}
                <div data-reveal="rule" style={{ "--rv-delay": "900ms" } as React.CSSProperties}
                    className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-champagne-400/60 to-transparent dark:via-champagne-300/50" />
            </div>

            <Container className="relative z-10 flex flex-col gap-7 pb-16 pt-14 sm:gap-9 sm:pb-24 sm:pt-20">
                <nav aria-label="Breadcrumb" data-reveal="left"
                    className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                    {[{ label: "Home", href: "/" }, ...trail].map((step) => (
                        <Fragment key={step.href}>
                            <Link href={step.href}
                                className="transition-colors hover:text-champagne-500 dark:hover:text-champagne-300">
                                {step.label}
                            </Link>
                            <span aria-hidden="true" className="text-champagne-400/70 dark:text-champagne-300/60">
                                /
                            </span>
                        </Fragment>
                    ))}
                    <span className="text-slate-700 dark:text-stone-100/75">{crumb}</span>
                </nav>

                <div className="flex flex-col gap-6">
                    <p data-reveal="left" style={{ "--rv-delay": "120ms" } as React.CSSProperties}
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        {eyebrow}
                    </p>
                    <h1 id="page-heading"
                        className="max-w-5xl font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                        <SplitText lines={[heading]} delay={220} />
                    </h1>
                </div>

                <p data-reveal="up" style={{ "--rv-delay": "620ms" } as React.CSSProperties}
                    className="max-w-2xl border-l border-champagne-400/50 pl-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:border-champagne-300/40 dark:text-stone-100/70">
                    {lede}
                </p>

                {marks?.length ? (
                    <ul className="flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-900/10 pt-7 dark:border-stone-100/10">
                        {marks.map((mark, i) => (
                            <li key={mark} data-reveal="up"
                                style={{ "--rv-delay": `${760 + i * 90}ms` } as React.CSSProperties}
                                className="flex items-center gap-2.5 font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                                <span aria-hidden="true"
                                    className="size-1 rotate-45 bg-champagne-400/80 dark:bg-champagne-300/70" />
                                {mark}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </Container>
        </section>
    );
}
