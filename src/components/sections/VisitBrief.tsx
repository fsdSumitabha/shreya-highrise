import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import Ornament from "@/components/ui/Ornament";
import { visitBrief } from "@/data/contact";

export default function VisitBrief() {
    return (
        <section aria-labelledby="visit-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading id="visit-heading" eyebrow={visitBrief.eyebrow}
                        title={visitBrief.heading} lede={visitBrief.lede} />
                    <ActionLink href="#enquiry" variant="outline" className="self-start lg:self-auto">
                        Book a visit
                    </ActionLink>
                </div>

                <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {visitBrief.steps.map((step, index) => (
                        <li key={step.title} className="flex flex-col gap-4 border-t-2 border-champagne-300 pt-5">
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

                <Ornament align="center" className="text-slate-900 dark:text-stone-100" />

                <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visitBrief.practical.map((item) => (
                        <div key={item.term} className="flex flex-col gap-1.5 border-l border-slate-900/15 pl-5 dark:border-stone-100/15">
                            <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                                {item.term}
                            </dt>
                            <dd className="font-display text-lg font-light tracking-tight sm:text-xl">
                                {item.detail}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
