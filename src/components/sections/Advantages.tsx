import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { advantages } from "@/data/advantages";

export default function Advantages() {
    return (
        <section aria-labelledby="advantages-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="advantages-heading" eyebrow="Why buyers choose us"
                    title="Six commitments we put in writing"
                    lede="Buying a flat in Kolkata usually means trusting a promise. We would rather you check the paperwork."/>
                <ul className="grid gap-px border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {advantages.map((item, index) => (
                        <li key={item.title}
                            className="flex flex-col gap-4 bg-slate-100 p-8 sm:p-10 dark:bg-navy-950">
                            <p className="font-display text-xs tracking-luxe text-champagne-400 dark:text-champagne-300">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="font-display text-2xl font-light leading-tight tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {item.body}
                            </p>
                            <p className="mt-auto border-t border-slate-900/10 pt-4 font-display text-xs uppercase tracking-luxe dark:border-stone-100/10">
                                {item.metric}
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
