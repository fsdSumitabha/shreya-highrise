import Container from "@/components/ui/Container";

/* ── Where an enquiry actually goes ───────────────────────────────────────
   The one diagram on the page, and the one fact most privacy policies bury:
   this site has no lead database. The form composes an email and sends it to
   our own inbox, so there is no store on the web server to breach.

   Drawn in HTML rather than as one wide SVG, so it stacks to a vertical rule
   on a phone and runs horizontally on a desktop without a second asset or a
   sideways scroll. The glyphs are inline line-art in currentColor — they take
   the theme with them, and cost no request. Nothing moves. */

type Step = { title: string; body: string; glyph: React.ReactNode };

const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

const steps: Step[] = [
    {
        title: "You send the form",
        body: "A name, a number, and whatever you chose to tell us. Nothing is collected before you press send.",
        glyph: (
            <>
                <path {...stroke} d="M3 5.5h13M3 10h13M3 14.5h8" />
                <path {...stroke} d="m15.5 18.5 6-6 2.5 2.5-6 6-3 .5z" />
            </>
        ),
    },
    {
        title: "It travels encrypted",
        body: "Over HTTPS, so nothing between your browser and our server can read it in passing.",
        glyph: (
            <>
                <rect {...stroke} x="4" y="10.5" width="16" height="11.5" rx="1" />
                <path {...stroke} d="M7.75 10.5V7a4.25 4.25 0 0 1 8.5 0v3.5" />
                <path {...stroke} d="M12 15v2.75" />
            </>
        ),
    },
    {
        title: "Our server writes an email",
        body: "It is composed and sent on. No database, no CRM, no analytics store — nothing is kept here once it has gone.",
        glyph: (
            <>
                <rect {...stroke} x="2.5" y="4" width="19" height="6.5" rx="1" />
                <rect {...stroke} x="2.5" y="13.5" width="19" height="6.5" rx="1" />
                <path {...stroke} d="M6 7.25h.01M6 16.75h.01" />
                <path {...stroke} d="M10 7.25h7M10 16.75h7" />
            </>
        ),
    },
    {
        title: "It lands in our inbox",
        body: "Delivered over an encrypted, authenticated connection to the sales desk. A person reads it and calls you.",
        glyph: (
            <>
                <rect {...stroke} x="2.5" y="5" width="19" height="14" rx="1" />
                <path {...stroke} d="m2.5 6.5 9.5 7 9.5-7" />
            </>
        ),
    },
];

export default function DataJourney() {
    return (
        <section aria-labelledby="journey-heading"
            className="grain relative isolate overflow-hidden border-y border-slate-900/10 bg-white py-16 sm:py-20 dark:border-stone-100/10 dark:bg-navy-900/30">
            <div aria-hidden="true"
                className="blueprint-grid pointer-events-none absolute inset-0 -z-10 text-slate-900/50 [--grid-size:3.5rem] dark:text-stone-100/45" />

            <Container className="flex flex-col gap-10">
                <div className="flex max-w-2xl flex-col gap-3">
                    <p className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        The short answer
                    </p>
                    <h2 id="journey-heading"
                        className="font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
                        Where an enquiry actually goes
                    </h2>
                    <p className="text-[0.9375rem] leading-relaxed text-slate-600 dark:text-stone-100/70">
                        Four steps, and the list ends there. There is no lead database on this website — which
                        is the strongest privacy guarantee we can give you, because a store that does not
                        exist cannot be breached, sold or leaked.
                    </p>
                </div>

                <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={step.title}
                            className="relative flex gap-5 border-l border-slate-900/12 py-5 pl-5 lg:flex-col lg:gap-4 lg:border-l-0 lg:border-t lg:py-0 lg:pl-0 lg:pr-8 lg:pt-6 dark:border-stone-100/12">
                            {/* The node on the rule — the site's champagne lozenge. */}
                            <span aria-hidden="true"
                                className="absolute left-0 top-7 size-1.5 -translate-x-1/2 rotate-45 bg-champagne-400 lg:left-0 lg:top-0 lg:-translate-y-1/2 lg:translate-x-0 dark:bg-champagne-300" />

                            <span aria-hidden="true"
                                className="mt-0.5 shrink-0 text-champagne-500 dark:text-champagne-300">
                                <svg viewBox="0 0 24 24" className="size-7">
                                    {step.glyph}
                                </svg>
                            </span>

                            <div className="flex flex-col gap-2">
                                <h3 className="flex items-baseline gap-2.5 font-display text-base font-light tracking-tight">
                                    <span aria-hidden="true"
                                        className="font-display text-[0.65rem] tabular-nums text-slate-400 dark:text-stone-100/35">
                                        0{i + 1}
                                    </span>
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {step.body}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                <p className="max-w-3xl border-t border-slate-900/10 pt-6 text-sm leading-relaxed text-slate-500 dark:border-stone-100/10 dark:text-stone-100/50">
                    The one thing not on that line is your IP address, which the server counts for ten
                    minutes to stop the form being used to mail strangers, holds only in memory, and never
                    attaches to your enquiry.
                </p>
            </Container>
        </section>
    );
}
