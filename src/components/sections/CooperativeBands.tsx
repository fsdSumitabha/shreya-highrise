import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import { cooperativeIntro, incomeBands, societySteps, type BandCode, type IncomeBand } from "@/data/cooperative";

/* Co-operative society development, argued with a drawing rather than a claim.

   The sheet at the top is one plate per income band — a flat drawn in plan,
   walls, balcony, door swing and all — and the three are drawn to scale
   *against one another*: each rectangle's area is proportional to the middle of
   its band's carpet range (485, 1,180 and 2,150 sq. ft.), so an HIG footprint
   is genuinely four and a half times an LIG one rather than four and a half
   times as big by eye. Change a carpet range in the data and these want
   revisiting alongside it.

   Reading a card lifts its footprint off the sheet and drops the other two
   back. That link is made in CSS with :has() — see .band-plate in globals.css —
   which keeps the whole section a server component with every band's copy in
   the HTML, and means a browser without :has(), or a touch screen with nothing
   to hover, simply shows all three at rest. */

type Plate = {
    x: number;
    w: number;
    h: number;
    /** Internal walls, as fractions of the plate: [x1, y1, x2, y2]. */
    cuts: [number, number, number, number][];
};

const BASELINE = 320; // the datum every plate is set out from
const DIM_Y = 356; // dimension line, below the datum
const WALL = 5; // wall thickness, drawn as the two lines a plan uses
const BALCONY = 16; // how far the balcony projects past the front wall

const plates: Record<BandCode, Plate> = {
    lig: {
        x: 50, w: 138, h: 112,
        cuts: [[0.58, 0, 0.58, 1], [0.58, 0.55, 1, 0.55]],
    },
    mig: {
        x: 296, w: 216, h: 175,
        cuts: [[0.46, 0, 0.46, 1], [0.46, 0.5, 1, 0.5], [0, 0.62, 0.46, 0.62]],
    },
    hig: {
        x: 620, w: 290, h: 236,
        cuts: [[0.4, 0, 0.4, 1], [0.7, 0, 0.7, 1], [0.4, 0.48, 1, 0.48], [0, 0.58, 0.4, 0.58], [0.7, 0.76, 1, 0.76]],
    },
};

/* The scale rule printed across the top of each card, taken from the same
   geometry as the sheet so the two can never tell different stories. */
const largest = plates.hig.w * plates.hig.h;
const share = (code: BandCode) => `${(((plates[code].w * plates[code].h) / largest) * 100).toFixed(1)}%`;

function Footprint({ band }: { band: IncomeBand }) {
    const plate = plates[band.code];
    const top = BASELINE - plate.h;
    const right = plate.x + plate.w;
    const spine = plate.x + plate.cuts[0][0] * plate.w;
    const swing = Math.min(30, plate.h * 0.26);
    const hinge = BASELINE - WALL - 2;

    return (
        <g data-band-unit={band.code}>
            {/* Champagne flooding the footprint while its card is being read. */}
            <rect className="band-wash" x={plate.x} y={top} width={plate.w} height={plate.h} />

            {/* The wall, drawn the way a plan draws one: two lines with the
                thickness held between them. */}
            <rect x={plate.x} y={top} width={plate.w} height={plate.h}
                fill="none" stroke="currentColor" strokeWidth="1.6" />
            <rect x={plate.x + WALL} y={top + WALL} width={plate.w - WALL * 2} height={plate.h - WALL * 2}
                fill="none" stroke="currentColor" strokeWidth="1.6" />

            {/* Balcony, projecting past the front wall as it does on site. */}
            <rect x={plate.x + plate.w * 0.2} y={top - BALCONY} width={plate.w * 0.6} height={BALCONY}
                fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />

            {plate.cuts.map(([x1, y1, x2, y2]) => (
                <line key={`${x1}-${y1}-${x2}-${y2}`}
                    x1={plate.x + x1 * plate.w} y1={top + y1 * plate.h}
                    x2={plate.x + x2 * plate.w} y2={top + y2 * plate.h}
                    stroke="currentColor" strokeWidth="1" opacity="0.55" />
            ))}

            {/* One door, swung open — the detail that makes it read as a plan
                rather than as three rectangles of different sizes. */}
            <path d={`M ${spine} ${hinge} L ${spine} ${hinge - swing} A ${swing} ${swing} 0 0 0 ${spine - swing} ${hinge}`}
                fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />

            {/* Extension lines dropping to a dimension ticked at 45°, which is
                how a drawing does it — arrowheads are an engineer's habit. */}
            <line x1={plate.x} y1={BASELINE + 6} x2={plate.x} y2={DIM_Y + 8}
                stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
            <line x1={right} y1={BASELINE + 6} x2={right} y2={DIM_Y + 8}
                stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
            <line x1={plate.x} y1={DIM_Y} x2={right} y2={DIM_Y} stroke="currentColor" strokeWidth="1" />
            <line x1={plate.x - 5} y1={DIM_Y + 5} x2={plate.x + 5} y2={DIM_Y - 5}
                stroke="currentColor" strokeWidth="1.2" />
            <line x1={right - 5} y1={DIM_Y + 5} x2={right + 5} y2={DIM_Y - 5}
                stroke="currentColor" strokeWidth="1.2" />

            <text x={plate.x + plate.w / 2} y={top - BALCONY - 15} textAnchor="middle" fill="currentColor"
                className="font-display" fontSize="26" letterSpacing="4">
                {band.short}
            </text>
            <text x={plate.x + plate.w / 2} y={DIM_Y + 27} textAnchor="middle" fill="currentColor"
                className="font-display" fontSize="17" opacity="0.7">
                {band.carpetSqft}
            </text>
        </g>
    );
}

export default function CooperativeBands() {
    return (
        <section aria-labelledby="cooperative-heading"
            className="relative isolate overflow-hidden border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            {/* Setting-out grid, fading off as it rises. Kept at texture strength
                rather than drawing strength — the sheet below is the drawing, and
                two grids arguing is one too many. */}
            <span aria-hidden="true"
                className="blueprint-grid pointer-events-none absolute inset-0 -z-10 text-slate-900/40 [--grid-size:7rem] dark:text-stone-100/35" />

            <Container className="flex flex-col gap-14">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading id="cooperative-heading" eyebrow="Co-operative society development"
                        lines={["HIG, MIG and LIG", "co-operative housing"]} lede={cooperativeIntro.body} />
                    <div data-reveal="right" className="self-start lg:self-auto">
                        <ActionLink href="/projects" variant="outline">
                            All projects
                        </ActionLink>
                    </div>
                </div>

                {/* The sheet and the cards are one control: :has() inside this
                    wrapper is what lets a card light its own footprint. */}
                <div className="band-plate flex flex-col gap-10">
                    <figure data-reveal="up"
                        className="relative isolate border border-slate-900/12 bg-slate-100/70 dark:border-stone-100/12 dark:bg-navy-950/50">
                        <span aria-hidden="true"
                            className="absolute left-3 top-3 size-3 border-l border-t border-champagne-400/60 dark:border-champagne-300/50" />
                        <span aria-hidden="true"
                            className="absolute right-3 top-3 size-3 border-r border-t border-champagne-400/60 dark:border-champagne-300/50" />

                        {/* A technical drawing keeps its proportions rather than
                            reflowing — below a tablet it is swiped, not squashed. */}
                        <div className="overflow-x-auto">
                            <svg viewBox="0 0 960 400" role="img"
                                aria-label="The three carpet-area bands drawn as flat footprints at true relative scale: an MIG home is about two and a half times the carpet of an LIG home, and an HIG home about four and a half times."
                                className="block h-auto w-full min-w-[42rem] text-slate-900/70 dark:text-stone-100/60">
                                <defs>
                                    <pattern id="band-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1"
                                            opacity="0.09" />
                                    </pattern>
                                </defs>
                                <rect width="960" height="400" fill="url(#band-grid)" />

                                {/* The datum the three plates are set out from. It
                                    stays put when one of them lifts off. */}
                                <line x1="40" y1={BASELINE} x2="920" y2={BASELINE}
                                    stroke="currentColor" strokeWidth="1" opacity="0.35" />

                                {incomeBands.map((band) => (
                                    <Footprint key={band.code} band={band} />
                                ))}
                            </svg>
                        </div>

                        <figcaption
                            className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-slate-900/12 px-5 py-3 font-display text-[0.65rem] uppercase tracking-luxe text-slate-500 sm:px-6 dark:border-stone-100/12 dark:text-stone-100/45">
                            <span>Drg. 01 — carpet area comparison</span>
                            {/* Two different notes, because the sheet offers two
                                different things: a pointer can light a plate, a
                                thumb can only travel across to HIG. */}
                            <span className="text-champagne-500 max-lg:hidden dark:text-champagne-300">
                                Read a band below to lift it off the sheet
                            </span>
                            <span className="text-champagne-500 lg:hidden dark:text-champagne-300">
                                Swipe the sheet across →
                            </span>
                            <span>Drawn to scale against one another</span>
                        </figcaption>
                    </figure>

                    <ul data-stagger="120"
                        className="grid gap-px border border-slate-900/10 bg-slate-900/10 md:grid-cols-3 dark:border-stone-100/10 dark:bg-stone-100/10">
                        {incomeBands.map((band) => (
                            <li key={band.code} data-band-card={band.code} data-reveal="up"
                                className="group flex flex-col gap-6 bg-slate-100 p-8 transition-colors duration-500 hover:bg-white sm:p-10 dark:bg-navy-950 dark:hover:bg-navy-900/60">
                                {/* This band's carpet as a share of the largest —
                                    the sheet's own figure, restated as a rule. */}
                                <span aria-hidden="true"
                                    className="relative block h-px w-full bg-slate-900/12 dark:bg-stone-100/15">
                                    <span style={{ width: share(band.code) }}
                                        className="absolute inset-y-0 left-0 bg-champagne-400 transition-transform duration-500 ease-out group-hover:scale-y-[3] dark:bg-champagne-300" />
                                </span>

                                {/* The expansion sits on its own line rather than
                                    beside the chip: tracked-out caps in a third of
                                    a container wrap at "Higher Income Group" and
                                    nowhere else, which would step that one card's
                                    rows out of line with the other two. */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-display text-5xl font-light leading-none tracking-tight transition-colors duration-500 group-hover:text-champagne-500 dark:group-hover:text-champagne-300">
                                            {band.short}
                                        </h3>
                                        <p className="shrink-0 border border-champagne-400/40 px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-luxe text-champagne-500 dark:border-champagne-300/35 dark:text-champagne-300">
                                            {band.typology}
                                        </p>
                                    </div>
                                    <p className="min-h-8 font-display text-xs uppercase leading-4 tracking-luxe text-slate-500 lg:min-h-0 dark:text-stone-100/50">
                                        {band.name}
                                    </p>
                                </div>

                                <dl className="flex flex-col gap-2 border-y border-slate-900/10 py-4 dark:border-stone-100/10">
                                    <div className="flex items-baseline justify-between gap-4">
                                        <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                                            Carpet
                                        </dt>
                                        <dd className="font-display text-sm">{band.carpetSqm}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                                            In sq. ft.
                                        </dt>
                                        <dd className="font-display text-sm">{band.carpetSqft}</dd>
                                    </div>
                                </dl>

                                <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {band.body}
                                </p>

                                <ul className="flex flex-col gap-2.5">
                                    {band.points.map((point) => (
                                        <li key={point}
                                            className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-stone-100/70">
                                            <span aria-hidden="true"
                                                className="mt-1 size-1 shrink-0 rotate-45 bg-champagne-400/60 dark:bg-champagne-300/50" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-2">
                                    <ActionLink href="/contact" variant="ghost" arrow>
                                        Ask about {band.short} homes
                                    </ActionLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <h3 data-reveal="left" className="font-display text-2xl font-light tracking-tight sm:text-3xl">
                            How a society engagement runs
                        </h3>
                        <div data-reveal="right">
                            <ActionLink href="/contact">Talk to us about your society</ActionLink>
                        </div>
                    </div>

                    <ol data-stagger="110" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {societySteps.map((step, index) => (
                            <li key={step.title} data-reveal="up" className="group relative flex flex-col gap-3 pt-6">
                                <span aria-hidden="true"
                                    className="absolute inset-x-0 top-0 h-px bg-slate-900/12 dark:bg-stone-100/15" />
                                <span aria-hidden="true"
                                    className="absolute left-0 top-0 h-px w-8 bg-champagne-400 transition-all duration-700 ease-out group-hover:w-full dark:bg-champagne-300" />
                                <p className="font-display text-xs tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h4 className="font-display text-lg font-medium leading-tight">{step.title}</h4>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </Container>
        </section>
    );
}
