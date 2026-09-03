import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import { otherProjects, stageLabel, whereLine } from "@/data/projects";

/* The rest of the catalogue at the foot of a project page — a list rather
   than a second wall of cards, because by this point the reader has already
   seen a card and is looking for the next address, not another sales pitch.
   Still under construction sorts first: those are the ones that can still be
   booked. */

export default function MoreProjects({ slug }: { slug: string }) {
    const rest = otherProjects(slug);
    if (!rest.length) return null;

    return (
        <section aria-labelledby="more-heading"
            className="border-t border-slate-900/10 py-20 sm:py-28 dark:border-stone-100/10">
            <Container className="flex flex-col gap-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading id="more-heading" eyebrow="Elsewhere in the city"
                        lines={["The other", "addresses"]} />
                    <div data-reveal="right" className="self-start lg:self-auto">
                        <ActionLink href="/projects" variant="outline">
                            All projects
                        </ActionLink>
                    </div>
                </div>

                <ul data-stagger="80"
                    className="grid gap-px border border-slate-900/10 bg-slate-900/10 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {rest.map((project) => (
                        <li key={project.slug} data-reveal="left">
                            <Link href={`/projects/${project.slug}`}
                                className="group relative flex flex-col gap-2 bg-slate-100 p-6 transition-colors duration-500 hover:bg-white sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 dark:bg-navy-950 dark:hover:bg-navy-900/60">
                                {/* Marker rail that fills top-to-bottom on hover. */}
                                <span aria-hidden="true"
                                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-champagne-300 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                                <span className="flex flex-col gap-1 transition-transform duration-500 ease-out group-hover:translate-x-2">
                                    <span className="font-display text-2xl font-light tracking-tight">
                                        {project.name}
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-stone-100/65">
                                        {whereLine(project)}
                                    </span>
                                </span>
                                <span className="flex shrink-0 items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    {stageLabel[project.stage]}
                                    <span aria-hidden="true"
                                        className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
