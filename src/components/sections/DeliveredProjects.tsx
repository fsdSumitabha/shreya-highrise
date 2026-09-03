import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { gridCols } from "@/components/ui/gridCols";
import { delivered, deliveredIntro, whereLine } from "@/data/projects";

/* `linkToAll` matches <FeaturedProjects>: the footer link is a way through to
   the full list, so it comes off wherever the full list already is.

   Deliberately not <ProjectCard>. A finished building is judged on the thing
   itself, so these are photograph-first and carry only what closes the
   question — where it is, when it was handed over, and what is in it. The
   footnote line assembles from whichever of those three the client has
   given us, and disappears entirely if none of them are on file. */

export default function DeliveredProjects({ linkToAll = true }: { linkToAll?: boolean }) {
    if (!delivered.length) return null;

    return (
        <section aria-labelledby="delivered-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-12">
                <SectionHeading id="delivered-heading" eyebrow={deliveredIntro.eyebrow}
                    lines={deliveredIntro.lines} lede={deliveredIntro.lede} />

                <ul data-stagger="130" className={`grid gap-8 ${gridCols(delivered.length)}`}>
                    {delivered.map((project) => {
                        const footnote = [
                            project.handedOver && `Handed over ${project.handedOver}`,
                            project.typology,
                            project.families && `${project.families} families`,
                        ].filter(Boolean);

                        return (
                            <li key={project.slug} data-reveal="up">
                                <Link href={`/projects/${project.slug}`} className="group flex flex-col gap-5">
                                    <div className="relative overflow-hidden">
                                        <ImageFrame src={project.image} label={project.imageLabel} ratio="aspect-3/2"
                                            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw" zoom />
                                        {/* Ink wash rising over the image as the pointer lands. */}
                                        <span aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        <span
                                            className="absolute bottom-4 left-4 translate-y-3 font-display text-xs uppercase tracking-luxe text-champagne-300 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                            {project.plot ?? `${project.corridor} corridor`}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-champagne-500 dark:group-hover:text-champagne-300">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-stone-100/65">
                                            {whereLine(project)}
                                        </p>
                                        <span aria-hidden="true"
                                            className="h-px w-8 bg-champagne-400/70 transition-all duration-500 ease-out group-hover:w-20 dark:bg-champagne-300/70" />
                                        {footnote.length ? (
                                            <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                                {footnote.join(" · ")}
                                            </p>
                                        ) : null}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {linkToAll ? (
                    <div data-reveal="up">
                        <ActionLink href="/projects" variant="ghost" arrow className="self-start">
                            See every completed project
                        </ActionLink>
                    </div>
                ) : null}
            </Container>
        </section>
    );
}
