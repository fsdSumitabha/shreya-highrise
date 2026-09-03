import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import NearbyList from "@/components/ui/NearbyList";
import { bandOf, type Project } from "@/data/projects";

/* What comes with the flat, and what is around it.

   Three blocks, none of them guaranteed: the standard the client quotes on
   this society, the landmarks they have measured, and — where we know which
   income band the society was developed for — the bracket itself, read out of
   cooperative.ts rather than restated here so the carpet-area figures on a
   project page and on the home page can never drift apart.

   The whole section stands down when a project carries none of the three. */

export default function ProjectSurroundings({ project }: { project: Project }) {
    const band = bandOf(project);
    if (!project.highlights.length && !project.nearby.length && !band) return null;

    return (
        <section aria-labelledby="surroundings-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
                <div className="flex flex-col gap-10">
                    <SectionHeading id="surroundings-heading" eyebrow="At this address"
                        lines={["What comes", "with the flat"]} />

                    {project.highlights.length ? (
                        <ul data-stagger="90" className="flex flex-col gap-px">
                            {project.highlights.map((point) => (
                                <li key={point} data-reveal="left"
                                    className="group flex items-baseline gap-4 border-b border-slate-900/10 py-4 dark:border-stone-100/10">
                                    <span aria-hidden="true"
                                        className="size-1.5 shrink-0 rotate-45 bg-champagne-400 transition-transform duration-500 ease-out group-hover:rotate-[135deg] dark:bg-champagne-300" />
                                    <span className="leading-relaxed text-slate-700 dark:text-stone-100/75">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                <div className="flex flex-col gap-10 lg:pt-4">
                    {project.nearby.length ? (
                        <div data-reveal="up"
                            className="border border-slate-900/10 bg-white p-6 sm:p-8 dark:border-stone-100/10 dark:bg-navy-900/50">
                            <NearbyList places={project.nearby} title="How far, from the gate" />
                        </div>
                    ) : null}

                    {band ? (
                        <div data-reveal="up" className="flex flex-col gap-4">
                            <h3 className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                                Developed as {band.short} — {band.name}
                            </h3>
                            <p className="leading-relaxed text-slate-600 dark:text-stone-100/70">{band.body}</p>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-900/10 pt-4 text-sm dark:border-stone-100/10">
                                <div>
                                    <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50">
                                        Carpet bracket
                                    </dt>
                                    <dd className="mt-1 font-medium">{band.carpetSqft}</dd>
                                </div>
                                <div>
                                    <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50">
                                        Typical formats
                                    </dt>
                                    <dd className="mt-1 font-medium">{band.typology}</dd>
                                </div>
                            </dl>
                        </div>
                    ) : null}
                </div>
            </Container>
        </section>
    );
}
