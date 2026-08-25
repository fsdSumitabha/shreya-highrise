import ImageFrame from "@/components/ui/ImageFrame";
import { stageLabel, type Project } from "@/data/projects";

const stageTone: Record<Project["stage"], string> = {
    completed: "bg-emerald-700 text-white",
    ongoing: "bg-champagne-300 text-navy-950",
    upcoming: "bg-navy-900 text-stone-100 dark:bg-stone-100 dark:text-navy-950",
};

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article data-spotlight
            className="group relative isolate flex w-full flex-1 flex-col overflow-hidden border border-slate-900/10 bg-white transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-champagne-300 hover:shadow-[0_30px_60px_-30px] hover:shadow-navy-900/40 dark:border-stone-100/10 dark:bg-navy-900/50 dark:hover:border-champagne-300">
            <div className="relative overflow-hidden">
                <ImageFrame label={project.imageLabel} ratio="aspect-4/3" bordered={false} zoom />
                <span
                    className={`absolute left-4 top-4 z-2 px-3 py-1.5 font-display text-xs uppercase tracking-luxe ${stageTone[project.stage]}`}>
                    {stageLabel[project.stage]}
                </span>
                {/* Slides up over the image on hover. */}
                <span aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-2 translate-y-full bg-navy-950/85 px-6 py-3 font-display text-xs uppercase tracking-luxe text-champagne-300 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {project.highlights[0]}
                </span>
            </div>

            <div className="relative z-2 flex flex-1 flex-col gap-5 p-6 sm:p-7">
                <header className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-champagne-500 sm:text-3xl dark:group-hover:text-champagne-300">
                        {project.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-stone-100/65">{project.locality}</p>
                </header>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-900/10 py-4 text-sm dark:border-stone-100/10">
                    <Detail term="Type" value={project.typology} />
                    <Detail term="Carpet" value={project.sizeRange} />
                    <Detail term="From" value={project.priceFrom} />
                    <Detail term="Possession" value={project.possession} />
                </dl>
                <div className="flex flex-col gap-2">
                    <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                        From this address
                    </p>
                    <ul className="flex flex-col gap-1.5">
                        {project.nearby.map((place) => (
                            <li key={place.name} className="flex items-baseline gap-3 text-sm">
                                <span className="text-slate-600 dark:text-stone-100/70">{place.name}</span>
                                <span aria-hidden="true"
                                    className="mb-1 flex-1 border-b border-dotted border-slate-900/20 dark:border-stone-100/20" />
                                <span className="shrink-0 font-medium text-champagne-500 tabular-nums dark:text-champagne-300">
                                    {place.distance}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-auto font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    RERA {project.rera}
                </p>
            </div>
        </article>
    );
}

function Detail({ term, value }: { term: string; value: string }) {
    return (
        <div>
            <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50">
                {term}
            </dt>
            <dd className="mt-1 font-medium">{value}</dd>
        </div>
    );
}
