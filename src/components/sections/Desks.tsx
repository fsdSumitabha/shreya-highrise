import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { desks } from "@/data/about";

export default function Desks() {
    return (
        <section aria-labelledby="desks-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="desks-heading" eyebrow="How the work is divided"
                    title="Six desks, all of them in-house"
                    lede="A building fails at the joins between people, not in the middle of anyone's job. So every discipline below sits inside the company and reports to a director by name — none of it is outsourced to a management contractor." />
                <ul className="grid gap-px border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {desks.map((desk) => (
                        <li key={desk.name}
                            className="flex flex-col gap-4 bg-slate-100 p-8 sm:p-9 dark:bg-navy-950">
                            <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                                {desk.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {desk.owns}
                            </p>
                            <p className="mt-auto flex items-center gap-3 border-t border-slate-900/10 pt-4 font-display text-xs uppercase tracking-luxe text-slate-500 dark:border-stone-100/10 dark:text-stone-100/50">
                                <span aria-hidden="true" className="size-1 rotate-45 bg-champagne-300" />
                                {desk.lead}
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
