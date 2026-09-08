import Container from "@/components/ui/Container";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/data/stats";

/* The track record, as a solid band of one brand colour or the other: brass
   in light, navy in dark, white type on both.

   The gold is champagne-500 rather than the brighter 300/400 because the
   type here has to survive at 12px — white clears 4.76:1 on this one and
   only 2.1:1 / 3.2:1 on the lighter two, which would leave the note and the
   label unreadable. The sheen below puts the light back without lifting the
   ground the type sits on. */

export default function StatsBand() {
    return (
        <section aria-label="Company track record"
            className="relative isolate overflow-hidden border-y border-transparent bg-champagne-500 text-white dark:border-stone-100/10 dark:bg-navy-900">
            {/* Light catching the top-left corner of the plate. */}
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_140%_at_15%_-30%,rgba(255,255,255,0.20),transparent_62%)] dark:hidden" />
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent dark:via-champagne-300" />
            <Container>
                {/* Two up on a phone rather than four stacked rows: the band
                   stays one screenful instead of scrolling past the fold, and
                   the figures read as a set the way they do on the desktop. */}
                <dl data-stagger="110" className="grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={stat.label} data-reveal="up"
                            className={`group relative flex min-w-0 flex-col gap-1.5 py-8 sm:gap-2 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                                i % 2 === 0 ? "max-lg:pl-0" : "max-lg:pr-0"
                            }`}>
                            {/* Hairline that brightens as the eye lands on it —
                               down the gutter between the two columns, and
                               between all four once they sit in a row. */}
                            <span aria-hidden="true"
                                className={`absolute inset-y-6 left-0 w-px origin-top scale-y-100 bg-white/25 transition-colors duration-500 group-hover:bg-white sm:inset-y-8 dark:bg-stone-100/10 dark:group-hover:bg-champagne-300 ${
                                    i === 0 ? "hidden" : i % 2 === 0 ? "max-lg:hidden" : ""
                                }`} />
                            {/* Rule closing the first row off from the second. */}
                            {i >= 2 && (
                                <span aria-hidden="true"
                                    className="absolute inset-x-0 top-0 h-px bg-white/25 lg:hidden dark:bg-stone-100/10" />
                            )}
                            <dd className="font-display text-4xl font-semibold leading-none tracking-tight tabular-nums transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-5xl lg:text-6xl">
                                <CountUp to={stat.to} suffix={stat.suffix} decimals={stat.decimals}
                                    duration={1400 + i * 180} />
                            </dd>
                            <dt className="text-pretty text-sm font-semibold sm:text-base">{stat.label}</dt>
                            {/* Luxe tracking costs a quarter of an em per letter;
                               at two columns wide that is a note broken over
                               three lines, so it eases off until sm. */}
                            <p className="font-display text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white sm:text-xs sm:tracking-luxe dark:text-stone-100/55">
                                {stat.note}
                            </p>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
