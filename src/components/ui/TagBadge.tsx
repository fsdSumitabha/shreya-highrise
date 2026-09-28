import { tagLabel, type Tag } from "@/data/projects";

const tone: Record<Tag, string> = {
    "booking-open": "bg-white text-navy-950 ring-1 ring-inset ring-slate-900/15",
    premium: "bg-navy-950 text-champagne-300 ring-1 ring-inset ring-champagne-300/60",
};

/** A sales flag, drawn to sit beside <StageBadge> at the same size. */
export default function TagBadge({ tag, className = "" }: { tag: Tag; className?: string }) {
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 font-display text-xs uppercase tracking-luxe ${tone[tag]} ${className}`}>
            {tag === "booking-open" ? (
                <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-600" />
            ) : null}
            {tagLabel[tag]}
        </span>
    );
}
