import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { advantages } from "@/data/advantages";

export default function Advantages() {
    return (
        <section aria-labelledby="advantages-heading"
            className="relative isolate overflow-hidden py-20 sm:py-28">
            {/* A working floor plan pinned to the top-right corner, running off
                both edges the way a sheet does when it is bigger than the desk. */}
            <span aria-hidden="true"
                className="plan-plate pointer-events-none absolute -right-20 -top-24 -z-10 aspect-1008/1043 w-[min(46rem,120vw)] text-navy-900/22 sm:-right-14 dark:text-champagne-200/26" />

            <Container className="flex flex-col gap-14">
                <SectionHeading id="advantages-heading" eyebrow="Why buyers choose us"
                    lines={["Six commitments", "we put in writing"]}
                    lede="Buying a flat in Kolkata usually means trusting a promise. We would rather you check the paperwork." />

                <ul data-stagger="90"
                    className="grid gap-px border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {advantages.map((item, index) => (
                        <li key={item.title} data-reveal="up" data-spotlight
                            className="group relative isolate flex flex-col gap-4 overflow-hidden bg-slate-100 p-8 transition-colors duration-500 sm:p-10 dark:bg-navy-950">
                            {/* Ink flooding up from the foot of the tile. */}
                            <span aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -z-10 translate-y-full bg-linear-to-t from-champagne-300/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-y-0" />

                            <p className="font-display text-xs tracking-luxe text-champagne-400 transition-colors dark:text-champagne-300">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="font-display text-2xl font-light leading-tight tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {item.body}
                            </p>
                            <p className="relative mt-auto pt-4 font-display text-xs uppercase tracking-luxe">
                                <span aria-hidden="true"
                                    className="absolute left-0 top-0 h-px w-full bg-slate-900/10 dark:bg-stone-100/10" />
                                <span aria-hidden="true"
                                    className="absolute left-0 top-0 h-px w-10 bg-champagne-400 transition-all duration-700 ease-out group-hover:w-full dark:bg-champagne-300" />
                                <span className="relative">{item.metric}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
