import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import SplitText from "@/components/motion/SplitText";
import Skyline from "@/components/art/Skyline";
import PlanReel from "@/components/reel/PlanReel";
import { site } from "@/data/site";

const marks = [
    { value: "WBRERA", note: "Registered, every project" },
    { value: `Est. ${site.founded}`, note: "Five years building" },
    { value: "10", note: "Addresses across Kolkata" },
    { value: "1,450", note: "Families handed keys" },
];

/* The fold, built around the film.

   <Hero> is the same fold with a drawn skyline where the film sits, and it is
   still the one in src/components/sections/Hero.tsx — swapping the import in
   src/app/page.tsx puts it back with nothing else to change. Everything the
   two share is deliberate: the same sky in both weathers, the same datum line
   across the top, the same credential strip on the foot, so the page underneath
   never notices which one it is standing on.

   What changes is the middle. The headline gives up the full width and takes
   the left five columns so the drawing has somewhere real to live, and the
   skyline drops to a low band behind the credential strip — one tower drawing
   on a fold is enough, and the film is the better one.

   Everything that moves is in <PlanReel>. This file is static and stays a
   server component. */

export default function HeroReel() {
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

            {/* An architect's plan, pinned to the top-left corner of the fold —
                the sheet the film is about to build from. */}
            <div aria-hidden="true"
                className="plan-plate absolute -left-24 top-10 -z-20 hidden size-[38rem] rotate-180 text-slate-900/12 lg:block dark:text-champagne-300/10" />

            {/* Skyline, kept low and drifting slower than the page. */}
            <div aria-hidden="true" data-parallax="0.12" className="absolute inset-x-0 bottom-[-14%] -z-20 h-[46svh]">
                <Skyline id="skyline-reel" className="size-full" />
            </div>

            {/* Site-plan grid over the lower half. */}
            <div aria-hidden="true"
                className="blueprint-grid absolute inset-x-0 bottom-0 -z-20 h-[52svh] text-slate-900/50 dark:text-stone-100/60" />

            {/* Scrim, so the type always sits on ink. */}
            <div aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-slate-100 via-slate-100/55 to-transparent dark:from-navy-950 dark:via-navy-950/65 dark:to-navy-950/10" />

            <Container className="relative z-10 flex flex-1 flex-col justify-center gap-9 pb-14 pt-20 sm:gap-12 sm:pb-16 sm:pt-28 lg:pt-32">
                {/* Datum line across the top of the fold, so the sky reads as
                    framed rather than merely empty. The right half stands down on
                    phones: it costs two lines there, and those two lines are the
                    difference between the film being on the first screen and not. */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <p data-reveal="left"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        {site.locality}
                    </p>
                    <p data-reveal="right" style={{ "--rv-delay": "120ms" } as React.CSSProperties}
                        className="hidden font-display text-xs uppercase tracking-luxe text-slate-500 sm:block dark:text-stone-100/45">
                        Four addresses open for booking
                    </p>
                </div>

                {/* Two shapes, one DOM order. On a phone this is a column and the
                    film sits where the DOM puts it — straight after the headline,
                    above the paragraph, because a feature film below the fold on
                    the device most of this traffic arrives on is not a feature.
                    From lg every cell is placed by hand instead: headline and
                    paragraph stack down the left five columns and the sheet takes
                    the right seven across both of their rows. */}
                <div className="flex flex-col gap-y-9 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-8">
                    <h1 id="hero-heading"
                        className="font-display text-5xl font-light leading-[0.9] tracking-tight sm:text-7xl lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:text-6xl xl:text-7xl">
                        <SplitText delay={180} step={150}
                            lines={["From the line", <>to the <span className="text-shimmer">keys</span></>]} />
                    </h1>

                    {/* Arrives from the right, and late — the eye should have read
                        the promise before it is shown being kept. */}
                    <div data-reveal="right" style={{ "--rv-delay": "340ms" } as React.CSSProperties}
                        className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
                        <PlanReel />
                    </div>

                    <div className="flex flex-col gap-7 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:gap-8">
                        <div data-reveal="rule" style={{ "--rv-delay": "520ms" } as React.CSSProperties}
                            className="h-px w-full bg-linear-to-r from-champagne-400/80 via-slate-900/20 to-transparent dark:from-champagne-300/70 dark:via-stone-100/20" />

                        <p data-reveal="up" style={{ "--rv-delay": "600ms" } as React.CSSProperties}
                            className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/75">
                            A sanctioned drawing, becoming an address someone lives at. Drawing, foundation,
                            frame, façade, keys — ten seconds beside this, and the same order on every site we
                            run, from New Town to Narendrapur.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <span data-reveal="up" style={{ "--rv-delay": "720ms" } as React.CSSProperties}>
                                <ActionLink href="/projects">View live projects</ActionLink>
                            </span>
                            <span data-reveal="up" style={{ "--rv-delay": "820ms" } as React.CSSProperties}>
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
