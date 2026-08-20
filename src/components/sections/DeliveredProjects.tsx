import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { delivered } from "@/data/projects";

export default function DeliveredProjects() {
    return (
        <section aria-labelledby="delivered-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-12">
                <SectionHeading id="delivered-heading" eyebrow="Recently delivered" title="Handed over, occupied, running"
                    lede="The fastest way to judge a builder is to visit somewhere they finished. Residents at all three of these addresses are happy to be asked." />
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {delivered.map((project) => (
                        <li key={project.slug} className="flex flex-col gap-5">
                            <ImageFrame label={project.imageLabel} ratio="aspect-3/2" />
                            <div className="flex flex-col gap-2">
                                <h3 className="font-display text-2xl font-light tracking-tight">{project.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-stone-100/65">{project.locality}</p>
                                <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    {project.possession} · {project.typology}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
                <ActionLink href="/projects" variant="ghost" className="self-start">
                    See every completed project →
                </ActionLink>
            </Container>
        </section>
    );
}
