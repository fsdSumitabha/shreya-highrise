import type { NearbyPlace } from "@/data/projects";

/* Landmarks and how far they are, set as a table of contents: name on the
   left, distance on the right, a dotted leader running between them so the
   eye can cross the gap. Renders nothing at all when the client has not told
   us what is around an address yet. */

type Props = { places: NearbyPlace[]; title?: string; className?: string };

export default function NearbyList({ places, title = "From this address", className = "" }: Props) {
    if (!places.length) return null;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {title ? (
                <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    {title}
                </p>
            ) : null}
            <ul className="flex flex-col gap-1.5">
                {places.map((place) => (
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
    );
}
