import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { corridors, corridorsIntro } from "@/data/corridors";

export default function Corridors() {
    return (
        <section aria-labelledby="corridors-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-10">
                    <SectionHeading id="corridors-heading" eyebrow="Where we build"
                        lines={["Ten addresses,", "four corridors"]} lede={corridorsIntro.body} />

                    <ul data-stagger="100"
                        className="grid gap-px border border-slate-900/10 bg-slate-900/10 dark:border-stone-100/10 dark:bg-stone-100/10">
                        {corridors.map((corridor) => (
                            <li key={corridor.name} data-reveal="left"
                                className="group relative flex flex-col gap-2 bg-slate-100 p-6 transition-colors duration-500 hover:bg-white dark:bg-navy-950 dark:hover:bg-navy-900/60">
                                {/* Marker rail that fills top-to-bottom on hover. */}
                                <span aria-hidden="true"
                                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-champagne-300 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h3 className="font-display text-2xl font-light tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                                        {corridor.name}
                                    </h3>
                                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                        {corridor.projectCount} · {corridor.since}
                                    </p>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600 transition-transform duration-500 ease-out group-hover:translate-x-2 dark:text-stone-100/65">
                                    {corridor.blurb}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:sticky lg:top-28 lg:self-start">
                    <div data-reveal="zoom" className="group relative">
                        <ImageFrame label="Map of Kolkata marking all seven project locations"
                            ratio="aspect-square" zoom />
                        {/* Location pins, pulsing where the corridors sit. */}
                        {[
                            { top: "28%", left: "62%" },
                            { top: "44%", left: "74%" },
                            { top: "18%", left: "40%" },
                            { top: "72%", left: "52%" },
                        ].map((pin, i) => (
                            <span key={pin.top} aria-hidden="true" style={{ top: pin.top, left: pin.left }}
                                className="absolute flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                                <span className="window-lit absolute size-6 rounded-full bg-champagne-300/25"
                                    style={{ "--lit-duration": `${3 + i * 0.7}s`, "--lit-min": "0.1", "--lit-max": "0.8" } as React.CSSProperties} />
                                <span className="relative size-2 rotate-45 bg-champagne-400 dark:bg-champagne-300" />
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
