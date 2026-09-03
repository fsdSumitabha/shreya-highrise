import Container from "@/components/ui/Container";
import ImageFrame from "@/components/ui/ImageFrame";
import SpecGrid from "@/components/ui/SpecGrid";
import StageBadge from "@/components/ui/StageBadge";
import ActionLink from "@/components/ui/ActionLink";
import { scheduleFacts, type Project } from "@/data/projects";

/* The top of a project page: the building on the left, the schedule on the
   right. Photograph where we have one and a shot brief where we do not — the
   <ImageFrame> swap is the whole difference, so a project page never waits on
   photography to be worth reading.

   The right-hand column is assembled entirely out of what the project
   carries. The gallery, the paragraph, the price table and the brochure
   button each disappear when their field is empty, and the schedule under
   them is however many rows the client has actually answered. */

export default function ProjectOverview({ project }: { project: Project }) {
    const facts = scheduleFacts(project);
    /* One configuration is already said by "Starting at" in the schedule. The
       table earns its place only when there is more than one price to set
       against another. */
    const prices = project.prices && project.prices.length > 1 ? project.prices : null;

    return (
        <section aria-labelledby="overview-heading" className="py-16 sm:py-24">
            <h2 id="overview-heading" className="sr-only">
                {project.name} at a glance
            </h2>
            <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div className="flex flex-col gap-6">
                    <div data-reveal="curtain" className="group">
                        <ImageFrame src={project.image} label={project.imageLabel} ratio="aspect-4/3"
                            sizes="(min-width: 1024px) 640px, 100vw" zoom />
                    </div>

                    {project.gallery?.length ? (
                        <ul data-stagger="90" className="grid grid-cols-3 gap-3">
                            {project.gallery.map((shot) => (
                                <li key={shot.src} data-reveal="up" className="group">
                                    <ImageFrame src={shot.src} label={shot.label} ratio="aspect-4/3"
                                        sizes="(min-width: 1024px) 200px, 30vw" zoom />
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                <div className="flex flex-col gap-8">
                    <div data-reveal="up" className="flex flex-wrap items-center gap-3">
                        <StageBadge stage={project.stage} />
                        {project.plot ? (
                            <span className="border border-slate-900/15 px-3 py-1.5 font-display text-xs uppercase tracking-luxe text-slate-600 dark:border-stone-100/15 dark:text-stone-100/65">
                                Plot {project.plot}
                            </span>
                        ) : null}
                    </div>

                    {project.address ? (
                        <p data-reveal="up"
                            className="border-l border-champagne-400/50 pl-5 text-base leading-relaxed text-slate-700 dark:border-champagne-300/40 dark:text-stone-100/75">
                            {project.address}
                        </p>
                    ) : null}

                    {project.about ? (
                        <p data-reveal="up" className="leading-relaxed text-slate-600 dark:text-stone-100/70">
                            {project.about}
                        </p>
                    ) : null}

                    <div data-reveal="up">
                        <SpecGrid facts={facts} columns={2} ruled />
                    </div>

                    {prices ? (
                        <div data-reveal="up" className="flex flex-col gap-3">
                            <h3 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                Price on request, from
                            </h3>
                            <ul className="flex flex-col divide-y divide-slate-900/10 border-y border-slate-900/10 dark:divide-stone-100/10 dark:border-stone-100/10">
                                {prices.map((band) => (
                                    <li key={band.config}
                                        className="flex items-baseline justify-between gap-4 py-3">
                                        <span className="font-display text-lg font-light tracking-tight">
                                            {band.config}
                                        </span>
                                        <span className="font-medium tabular-nums text-champagne-500 dark:text-champagne-300">
                                            {band.from}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-stone-100/50">
                                Indicative starting prices. The full cost sheet — area, floor rise, parking, GST and
                                maintenance — is sent before any visit.
                            </p>
                        </div>
                    ) : null}

                    {project.brochure ? (
                        <div data-reveal="up">
                            <ActionLink href={project.brochure} variant="outline">
                                Download the brochure
                            </ActionLink>
                        </div>
                    ) : null}
                </div>
            </Container>
        </section>
    );
}
