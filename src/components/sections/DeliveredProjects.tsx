import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { delivered } from "@/data/projects";

export default function DeliveredProjects() {
    return (
        <section aria-labelledby="delivered-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-12">
                <SectionHeading id="delivered-heading" eyebrow="Recently delivered"
                    lines={["Handed over,", "occupied, running"]}
                    lede="The fastest way to judge a builder is to visit somewhere they finished. Residents at all three of these addresses are happy to be asked." />

                <ul data-stagger="130" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {delivered.map((project) => (
                        <li key={project.slug} data-reveal="up" className="group flex flex-col gap-5">
                            <div className="relative overflow-hidden">
                                <ImageFrame label={project.imageLabel} ratio="aspect-3/2" zoom />
                                {/* Ink wash rising over the image as the pointer lands. */}
                                <span aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <span
                                    className="absolute bottom-4 left-4 translate-y-3 font-display text-xs uppercase tracking-luxe text-champagne-300 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                    {project.corridor} corridor
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-champagne-500 dark:group-hover:text-champagne-300">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-stone-100/65">{project.locality}</p>
                                <span aria-hidden="true"
                                    className="h-px w-8 bg-champagne-400/70 transition-all duration-500 ease-out group-hover:w-20 dark:bg-champagne-300/70" />
                                <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    {project.possession} · {project.typology}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div data-reveal="up">
                    <ActionLink href="/projects" variant="ghost" arrow className="self-start">
                        See every completed project
                    </ActionLink>
                </div>
            </Container>
        </section>
    );
}
