import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { milestones } from "@/data/about";

export default function Milestones() {
    return (
        <section aria-labelledby="milestones-heading"
            className="border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="milestones-heading" eyebrow="The record"
                    title={<>From {milestones[0].year} to the next handover</>}
                    lede="Every line below is either a building that exists or a decision that changed how the next one was built. Nothing here is a plan we abandoned." />

                <ol className="flex flex-col">
                    {milestones.map((milestone, index) => {
                        const future = milestone.tense === "future";
                        const last = index === milestones.length - 1;
                        return (
                            <li key={milestone.year}
                                className="group grid gap-x-10 sm:grid-cols-[6.5rem_1fr] lg:grid-cols-[11rem_1fr]">
                                <p
                                    className={`font-display text-3xl font-light leading-none tracking-tight sm:pt-px sm:text-4xl lg:text-5xl ${
                                        future
                                            ? "text-slate-400 dark:text-stone-100/35"
                                            : "text-champagne-500 dark:text-champagne-300"
                                    }`}>
                                    {milestone.year}
                                </p>
                                <div
                                    className={`relative mt-3 flex flex-col gap-2.5 pl-8 sm:mt-0 ${
                                        last ? "pb-0" : "pb-11"
                                    } ${
                                        future
                                            ? "border-l border-dashed border-slate-900/25 dark:border-stone-100/25"
                                            : "border-l border-slate-900/15 dark:border-stone-100/15"
                                    }`}>
                                    <span aria-hidden="true"
                                        className={`absolute -left-1 top-2.5 size-2 rotate-45 ${
                                            future
                                                ? "border border-champagne-400 bg-white dark:bg-navy-900"
                                                : "bg-champagne-300"
                                        }`} />
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                        <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                                            {milestone.title}
                                        </h3>
                                        {future ? (
                                            <span className="border border-champagne-400/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                                Planned
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-stone-100/65">
                                        {milestone.body}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
}
