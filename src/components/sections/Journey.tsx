import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { journey } from "@/data/journey";

export default function Journey() {
    return (
        <section aria-labelledby="journey-heading"
            className="border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="journey-heading" eyebrow="How it works" align="center"
                    title="From first call to keys, in seven steps"
                    lede="No step is hidden and none of them costs extra. Here is exactly what the next few months look like."/>
                <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {journey.map((step, index) => (
                        <li key={step.title}
                            className="flex flex-col gap-3 border-t-2 border-champagne-300 pt-5">
                            <p className="font-display text-4xl font-light leading-none text-slate-300 dark:text-stone-100/25">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="font-display text-xl font-medium tracking-tight">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}
