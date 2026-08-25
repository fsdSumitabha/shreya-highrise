import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ProjectCard from "@/components/ui/ProjectCard";
import { openForSale } from "@/data/projects";

export default function FeaturedProjects() {
    return (
        <section aria-labelledby="projects-heading"
            className="relative border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading id="projects-heading" eyebrow="Open for sale"
                        lines={["Launching &", "under construction"]}
                        lede="Four addresses you can book into today, from Rajarhat to Narendrapur. Every carpet area, price and RERA number is published before you visit." />
                    <div data-reveal="right" className="self-start lg:self-auto">
                        <ActionLink href="/projects" variant="outline">
                            All projects
                        </ActionLink>
                    </div>
                </div>
                <div data-stagger="110" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {openForSale.map((project) => (
                        <div key={project.slug} data-reveal="up" className="flex">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
