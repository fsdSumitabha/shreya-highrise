import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ProjectOverview from "@/components/projects/ProjectOverview";
import ProjectPlan from "@/components/projects/ProjectPlan";
import ProjectSurroundings from "@/components/projects/ProjectSurroundings";
import ProjectEnquiry from "@/components/projects/ProjectEnquiry";
import MoreProjects from "@/components/projects/MoreProjects";
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import { heroLede, heroMarks, metaDescription, projectBySlug, projects, stageLabel, whereLine } from "@/data/projects";
import { site } from "@/data/site";

/* ── /projects/[slug] ─────────────────────────────────────────────────────
   One page per address, keyed on the slug of the project's own name.

   The whole page is assembled from src/data/projects.ts and nothing else:
   the masthead writes itself out of the record, the sanctioned-plan section
   appears only for projects whose drawings we hold, and every block inside
   the other sections stands down when its field is empty. Filling a field in
   the data module is therefore the entire job of publishing it — this file
   never has to be opened to add a fact to a project.

   `dynamicParams = false` because the catalogue is finite and known at build
   time: a slug that is not a project is a 404, not a page waiting to be
   rendered. */

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
    const { slug } = await params;
    const project = projectBySlug(slug);
    if (!project) return {};

    const description = metaDescription(project);
    const url = `/projects/${project.slug}`;

    return {
        title: `${project.name} — ${whereLine(project)}`,
        description,
        alternates: { canonical: url },
        openGraph: { type: "website", url, title: `${project.name} — ${site.name}`, description },
    };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
    const { slug } = await params;
    const project = projectBySlug(slug);
    if (!project) notFound();

    return (
        <>
            <ProjectJsonLd project={project} />
            <PageHero crumb={project.name} trail={[{ label: "Projects", href: "/projects" }]}
                eyebrow={`${stageLabel[project.stage]} · ${project.corridor}`} heading={project.name}
                lede={heroLede(project)} marks={heroMarks(project)} />
            <ProjectOverview project={project} />
            {project.plan ? <ProjectPlan plan={project.plan} /> : null}
            <ProjectSurroundings project={project} />
            <ProjectEnquiry project={project} />
            <MoreProjects slug={project.slug} />
        </>
    );
}
