import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { amenityGroups } from "@/data/amenities";

export default function Amenities() {
    return (
        <section aria-labelledby="amenities-heading"
            className="grain relative isolate overflow-hidden border-y border-slate-900/10 bg-white py-20 text-slate-900 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900 dark:text-stone-100">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="aurora absolute -left-32 top-1/4 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_65%)] blur-3xl [--aurora-duration:34s] dark:bg-[radial-gradient(circle,rgba(200,169,107,0.16),transparent_65%)]" />
                <div className="aurora absolute -right-40 bottom-0 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(96,150,205,0.20),transparent_65%)] blur-3xl [--aurora-duration:42s] dark:bg-[radial-gradient(circle,rgba(60,130,190,0.16),transparent_65%)]" />
            </div>

            <Container className="flex flex-col gap-14">
                <SectionHeading id="amenities-heading" eyebrow="In every project"
                    lines={["The amenity set", "we build to"]}
                    lede="Scale changes from address to address, but the checklist does not. We build what residents actually book — a clubhouse that fills on weekends, a gym that opens at five, and services still running long after handover." />

                <div data-parallax="0.05">
                    <div data-reveal="curtain" className="group">
                        <ImageFrame label="Clubhouse and rooftop deck — Riverstone Heights"
                            ratio="aspect-21/9" zoom />
                    </div>
                </div>

                <div data-stagger="120" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {amenityGroups.map((group) => (
                        <div key={group.group} data-reveal="up" className="group relative flex flex-col gap-4 pt-6">
                            <span aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-px bg-slate-900/12 dark:bg-stone-100/15" />
                            <span aria-hidden="true"
                                className="absolute left-0 top-0 h-px w-8 bg-champagne-400 transition-all duration-700 ease-out group-hover:w-full dark:bg-champagne-300" />
                            <h3 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                {group.group}
                            </h3>
                            <ul className="flex flex-col gap-2.5">
                                {group.items.map((item) => (
                                    <li key={item}
                                        className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-600 transition-colors duration-300 hover:text-slate-900 dark:text-stone-100/75 dark:hover:text-stone-100">
                                        <span aria-hidden="true"
                                            className="mt-1 size-1 shrink-0 rotate-45 bg-champagne-400/60 dark:bg-champagne-300/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
