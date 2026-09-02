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
                <dl data-stagger="110" className="grid sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={stat.label} data-reveal="up"
                            className="group relative flex flex-col gap-2 py-10 sm:py-14 lg:py-16 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                            {/* Hairline that brightens as the eye lands on it. */}
                            <span aria-hidden="true"
                                className={`absolute inset-y-8 left-0 w-px origin-top scale-y-100 bg-white/25 transition-colors duration-500 group-hover:bg-white dark:bg-stone-100/10 dark:group-hover:bg-champagne-300 ${i === 0 ? "lg:hidden" : "max-lg:hidden"}`} />
                            <dd className="font-display text-5xl font-semibold leading-none tracking-tight transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-6xl">
                                <CountUp to={stat.to} suffix={stat.suffix} decimals={stat.decimals}
                                    duration={1400 + i * 180} />
                            </dd>
                            <dt className="text-base font-semibold">{stat.label}</dt>
                            <p className="font-display text-xs uppercase tracking-luxe text-white dark:text-stone-100/55">
                                {stat.note}
                            </p>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
