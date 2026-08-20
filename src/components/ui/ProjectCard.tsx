import ImageFrame from "@/components/ui/ImageFrame";
import { stageLabel, type Project } from "@/data/projects";

const stageTone: Record<Project["stage"], string> = {
    completed: "bg-emerald-700 text-white",
    ongoing: "bg-champagne-300 text-navy-950",
    upcoming: "bg-navy-900 text-stone-100 dark:bg-stone-100 dark:text-navy-950",
};

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article className="group flex flex-col border border-slate-900/10 bg-white transition-colors hover:border-champagne-300 dark:border-stone-100/10 dark:bg-navy-900/50 dark:hover:border-champagne-300">
            <div className="relative">
                <ImageFrame label={project.imageLabel} ratio="aspect-4/3" />
                <span
                    className={`absolute left-4 top-4 px-3 py-1.5 font-display text-xs uppercase tracking-luxe ${stageTone[project.stage]}`}>
                    {stageLabel[project.stage]}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                <header className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-light tracking-tight sm:text-3xl">{project.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-stone-100/65">{project.locality}</p>
                </header>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-900/10 py-4 text-sm dark:border-stone-100/10">
                    <Detail term="Configuration" value={project.typology} />
                    <Detail term="Carpet range" value={project.sizeRange} />
                    <Detail term="Starting at" value={project.priceFrom} />
                    <Detail term="Possession" value={project.possession} />
                </dl>
                <div className="flex flex-col gap-2">
                    <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                        From this address
                    </p>
                    <ul className="flex flex-col gap-1.5">
                        {project.nearby.map((place) => (
                            <li key={place.name} className="flex items-baseline justify-between gap-3 text-sm">
                                <span className="text-slate-600 dark:text-stone-100/70">{place.name}</span>
                                <span className="shrink-0 font-medium text-champagne-500 dark:text-champagne-300">
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
            <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                {term}
            </dt>
            <dd className="mt-1 font-medium">{value}</dd>
        </div>
    );
}
