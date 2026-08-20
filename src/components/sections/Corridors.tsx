import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { corridors, corridorsIntro } from "@/data/corridors";

export default function Corridors() {
    return (
        <section aria-labelledby="corridors-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-10">
                    <SectionHeading id="corridors-heading" eyebrow="Where we build" title={corridorsIntro.heading}
                        lede={corridorsIntro.body} />
                    <ul className="grid gap-px border border-slate-900/10 bg-slate-900/10 dark:border-stone-100/10 dark:bg-stone-100/10">
                        {corridors.map((corridor) => (
                            <li key={corridor.name} className="flex flex-col gap-2 bg-slate-100 p-6 dark:bg-navy-950">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h3 className="font-display text-2xl font-light tracking-tight">{corridor.name}</h3>
                                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                        {corridor.projectCount} · {corridor.since}
                                    </p>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {corridor.blurb}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <ImageFrame label="Map of Kolkata marking all seven project locations" ratio="aspect-square"
                    className="lg:sticky lg:top-28" />
            </Container>
        </section>
    );
}
