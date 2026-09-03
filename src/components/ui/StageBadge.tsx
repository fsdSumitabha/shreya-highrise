import { stageLabel, type Stage } from "@/data/projects";

const tone: Record<Stage, string> = {
    completed: "bg-emerald-700 text-white",
    ongoing: "bg-champagne-300 text-navy-950",
    upcoming: "bg-navy-900 text-stone-100 dark:bg-stone-100 dark:text-navy-950",
};

/** Where a project has got to, as a solid chip. Same three tones wherever it
    appears — on a card image, in a hero, above a plan sheet. */
export default function StageBadge({ stage, className = "" }: { stage: Stage; className?: string }) {
    return (
        <span
            className={`inline-block px-3 py-1.5 font-display text-xs uppercase tracking-luxe ${tone[stage]} ${className}`}>
            {stageLabel[stage]}
        </span>
    );
}
