import Link from "next/link";
import ImageFrame from "@/components/ui/ImageFrame";
import NearbyList from "@/components/ui/NearbyList";
import SpecGrid from "@/components/ui/SpecGrid";
import StageBadge from "@/components/ui/StageBadge";
import { cardFacts, whereLine, type Project } from "@/data/projects";

/* One address, as a card, and the way through to its own page.

   Everything under the name is drawn from whatever the project actually
   carries: `cardFacts` hands back only the facts on file, the nearby list
   renders nothing when no landmarks have been given, and the hover caption
   falls back to the plot reference when a project has no highlights yet. A
   half-answered project therefore reads as a shorter card, never as a card
   full of dashes. */

export default function ProjectCard({ project }: { project: Project }) {
    const caption = project.highlights[0] ?? project.plot ?? project.corridor;

    return (
        <Link href={`/projects/${project.slug}`} data-spotlight
            className="group relative isolate flex w-full flex-1 flex-col overflow-hidden border border-slate-900/10 bg-white transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-champagne-300 hover:shadow-[0_30px_60px_-30px] hover:shadow-navy-900/40 dark:border-stone-100/10 dark:bg-navy-900/50 dark:hover:border-champagne-300">
            <div className="relative overflow-hidden">
                <ImageFrame src={project.image} label={project.imageLabel} ratio="aspect-4/3" bordered={false}
                    sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw" zoom />
                <StageBadge stage={project.stage} className="absolute left-4 top-4 z-2" />
                {/* Slides up over the image on hover. */}
                <span aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-2 translate-y-full bg-navy-950/85 px-6 py-3 font-display text-xs uppercase tracking-luxe text-champagne-300 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {caption}
                </span>
            </div>

            <div className="relative z-2 flex flex-1 flex-col gap-5 p-6 sm:p-7">
                <header className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-champagne-500 sm:text-3xl dark:group-hover:text-champagne-300">
                        {project.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-stone-100/65">{whereLine(project)}</p>
                </header>

                <SpecGrid facts={cardFacts(project)} ruled />

                <div className="mt-auto flex flex-col gap-4">
                    <NearbyList places={project.nearby} />
                    <span aria-hidden="true"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        View project
                        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
