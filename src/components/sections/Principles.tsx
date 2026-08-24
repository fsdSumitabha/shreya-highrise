import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { principles } from "@/data/about";

export default function Principles() {
    return (
        <section aria-labelledby="principles-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="principles-heading" eyebrow="What we hold to" align="center"
                    title="Four rules we have never broken"
                    lede="Not marketing lines. These are the four decisions that determine whether we take a piece of land at all." />
                <ul className="grid gap-px border border-slate-900/10 bg-slate-900/10 lg:grid-cols-2 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {principles.map((principle, index) => (
                        <li key={principle.title}
                            className="relative flex flex-col gap-5 bg-slate-100 p-9 sm:p-12 dark:bg-navy-950">
                            <span aria-hidden="true"
                                className="absolute right-8 top-8 font-display text-7xl font-light leading-none text-slate-900/5 sm:text-8xl dark:text-stone-100/5">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span aria-hidden="true" className="h-px w-12 bg-champagne-300" />
                            <h3 className="max-w-sm font-display text-2xl font-light leading-tight tracking-tight sm:text-3xl">
                                {principle.title}
                            </h3>
                            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base dark:text-stone-100/65">
                                {principle.body}
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
