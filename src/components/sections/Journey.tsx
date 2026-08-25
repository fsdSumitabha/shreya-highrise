import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { journey } from "@/data/journey";

export default function Journey() {
    return (
        <section aria-labelledby="journey-heading"
            className="border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="journey-heading" eyebrow="How it works" align="center"
                    lines={["From first call to keys,", "in seven steps"]}
                    lede="No step is hidden and none of them costs extra. Here is exactly what the next few months look like." />

                <ol data-stagger="90" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {journey.map((step, index) => (
                        <li key={step.title} data-reveal="up" className="group relative flex flex-col gap-3 pt-5">
                            {/* The rule draws itself in, left to right, as the row arrives. */}
                            <span aria-hidden="true" data-reveal="rule"
                                className="absolute inset-x-0 top-0 h-0.5 bg-champagne-300 transition-[background-color] duration-500 group-hover:bg-champagne-400" />
                            <p className="font-display text-4xl font-light leading-none text-slate-300 transition-colors duration-500 group-hover:text-champagne-400 dark:text-stone-100/25 dark:group-hover:text-champagne-300">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="font-display text-xl font-medium tracking-tight">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {step.body}
                            </p>
                        </li>
                    ))}

                    {/* Eighth cell squares off the grid and gives the sequence an exit. */}
                    <li data-reveal="up"
                        className="group relative flex flex-col justify-between gap-6 border border-champagne-300/50 bg-champagne-300/10 p-6 transition-colors duration-500 hover:bg-champagne-300/20">
                        <p className="font-display text-xl font-medium leading-tight tracking-tight">
                            Not sure which step you are on?
                        </p>
                        <Link href="/contact"
                            className="font-display text-[10px] uppercase tracking-[0.18em] text-champagne-500 dark:text-champagne-300">
                            Talk to the sales desk
                            <span aria-hidden="true"
                                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </li>
                </ol>
            </Container>
        </section>
    );
}
