import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import SplitText from "@/components/motion/SplitText";
import Skyline from "@/components/art/Skyline";
import { site } from "@/data/site";

const marks = [
    { value: "G+4", note: "Co-operative societies" },
    { value: `Est. ${site.founded}`, note: "Ten years building" },
    { value: "10+", note: "Addresses across Kolkata" },
    { value: "120+", note: "Families handed keys" },
];

/* The fold, in two weathers. Light is an overcast midday — pale sky, towers
   receding into haze, ink-on-paper type. Dark is the dusk view it started as.
   The geometry, the parallax and the copy are identical in both; only the
   palette moves, and <Skyline> takes its own colours from the tokens in
   globals.css. */

export default function Hero() {
    return (
        <section aria-labelledby="hero-heading"
            className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-slate-100 text-slate-900 dark:bg-navy-950 dark:text-stone-100">
            {/* Sky. */}
            <div aria-hidden="true"
                className="absolute inset-0 -z-30 bg-[radial-gradient(130%_85%_at_50%_-10%,#cfe0f0_0%,#e4edf6_38%,#f1f5f9_78%)] dark:bg-[radial-gradient(130%_85%_at_50%_-10%,#173d5f_0%,#0d2740_38%,#071523_78%)]" />

            {/* Two slow colour fields, drifting out of step with each other. */}
            <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
                <div className="aurora absolute -left-40 top-[-20%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.30),transparent_65%)] blur-3xl [--aurora-duration:30s] dark:bg-[radial-gradient(circle,rgba(200,169,107,0.20),transparent_65%)]" />
                <div className="aurora absolute -right-52 top-[6%] size-[52rem] rounded-full bg-[radial-gradient(circle,rgba(96,150,205,0.26),transparent_65%)] blur-3xl [--aurora-duration:38s] dark:bg-[radial-gradient(circle,rgba(60,130,190,0.22),transparent_65%)]" />
            </div>

            {/* Skyline, drifting slower than the page. */}
            <div aria-hidden="true" data-parallax="0.18" className="absolute inset-x-0 bottom-[-12%] -z-20 h-[78svh]">
                <Skyline className="size-full" />
            </div>

            {/* Site-plan grid over the lower half. */}
            <div aria-hidden="true"
                className="blueprint-grid absolute inset-x-0 bottom-0 -z-20 h-[60svh] text-slate-900/50 dark:text-stone-100/60" />

            {/* Scrim, so the type always sits on ink. */}
            <div aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-slate-100 via-slate-100/55 to-transparent dark:from-navy-950 dark:via-navy-950/65 dark:to-navy-950/10" />

            {/* Left rail: a bead of light falling down a hairline. */}
            <div aria-hidden="true"
                className="absolute bottom-52 left-6 hidden flex-col items-center gap-4 lg:flex xl:left-8">
                <span className="font-display text-[10px] uppercase tracking-luxe text-slate-500 [writing-mode:vertical-rl] dark:text-stone-100/40">
                    Scroll
                </span>
                <span className="relative block h-24 w-px overflow-hidden bg-slate-900/15 dark:bg-stone-100/15">
                    <span className="cue-bead absolute inset-x-0 top-0 block h-10 bg-linear-to-b from-transparent via-champagne-400 to-transparent dark:via-champagne-300" />
                </span>
            </div>

            <Container className="relative z-10 flex flex-1 flex-col justify-between gap-16 pb-16 pt-32 sm:pb-20">
                {/* Datum line across the top of the fold, so the sky reads as framed
                    rather than merely empty. */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <p data-reveal="left"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        {site.locality}
                    </p>
                    <p data-reveal="right" style={{ "--rv-delay": "120ms" } as React.CSSProperties}
                        className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                        Four addresses open for booking
                    </p>
                </div>

                <div className="flex flex-col gap-9 sm:gap-10">
                    <h1 id="hero-heading"
                        className="font-display text-6xl font-light leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl xl:text-mega">
                        <SplitText delay={180} step={150}
                            lines={["Homes that", <><span className="text-shimmer">rise</span> with the city</>]} />
                    </h1>

                    <div data-reveal="rule" style={{ "--rv-delay": "560ms" } as React.CSSProperties}
                        className="h-px w-full bg-linear-to-r from-champagne-400/80 via-slate-900/20 to-transparent dark:from-champagne-300/70 dark:via-stone-100/20" />

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p data-reveal="up" style={{ "--rv-delay": "640ms" } as React.CSSProperties}
                            className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/75">
                            {site.intro}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span data-reveal="up" style={{ "--rv-delay": "760ms" } as React.CSSProperties}>
                                <ActionLink href="/projects">View live projects</ActionLink>
                            </span>
                            <span data-reveal="up" style={{ "--rv-delay": "860ms" } as React.CSSProperties}>
                                <ActionLink href="/contact" variant="outline">
                                    Book a site visit
                                </ActionLink>
                            </span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Credential strip pinned to the foot of the fold. */}
            <div className="relative z-10 border-t border-slate-900/12 backdrop-blur-sm dark:border-stone-100/12">
                <Container>
                    <ul data-stagger="90"
                        className="grid grid-cols-2 gap-px bg-slate-900/10 sm:grid-cols-4 dark:bg-stone-100/10">
                        {marks.map((mark) => (
                            <li key={mark.value} data-reveal="up"
                                className="flex flex-col gap-1 bg-white/75 px-5 py-6 sm:py-7 dark:bg-navy-950/70">
                                <span className="font-display text-xl font-light tracking-tight text-champagne-500 sm:text-2xl dark:text-champagne-300">
                                    {mark.value}
                                </span>
                                <span className="font-display text-[10px] uppercase tracking-luxe text-slate-500 sm:text-xs dark:text-stone-100/50">
                                    {mark.note}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Container>
            </div>
        </section>
    );
}
