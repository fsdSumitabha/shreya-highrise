import Container from "@/components/ui/Container";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/data/stats";

export default function StatsBand() {
    return (
        <section aria-label="Company track record"
            className="relative overflow-hidden border-y border-slate-900/10 bg-white dark:border-stone-100/10 dark:bg-navy-900/40">
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-champagne-300 to-transparent" />
            <Container>
                <dl data-stagger="110" className="grid sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={stat.label} data-reveal="up"
                            className="group relative flex flex-col gap-2 py-10 sm:py-14 lg:py-16 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                            {/* Hairline that grows to full height as the eye lands on it. */}
                            <span aria-hidden="true"
                                className={`absolute inset-y-8 left-0 w-px origin-top scale-y-100 bg-slate-900/10 transition-colors duration-500 group-hover:bg-champagne-300 dark:bg-stone-100/10 ${i === 0 ? "lg:hidden" : "max-lg:hidden"}`} />
                            <dd className="font-display text-5xl font-light leading-none tracking-tight text-champagne-400 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-6xl dark:text-champagne-300">
                                <CountUp to={stat.to} suffix={stat.suffix} decimals={stat.decimals}
                                    duration={1400 + i * 180} />
                            </dd>
                            <dt className="text-base font-medium">{stat.label}</dt>
                            <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                                {stat.note}
                            </p>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
