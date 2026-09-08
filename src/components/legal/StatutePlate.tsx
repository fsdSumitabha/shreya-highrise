import { statutes } from "@/data/privacy";

/* The statutes §16 is written against, set as a drawing rather than a list —
   a ruled plate with each Act on its own line, the way a schedule is printed
   at the back of an agreement. Static: a hairline grid and a champagne rule,
   no motion. */

export default function StatutePlate() {
    return (
        <div className="relative isolate overflow-hidden border border-slate-900/12 bg-white dark:border-stone-100/12 dark:bg-navy-900/40">
            <div aria-hidden="true"
                className="blueprint-grid pointer-events-none absolute inset-0 -z-10 text-slate-900/45 [--grid-size:2.75rem] dark:text-stone-100/40" />

            <ol className="divide-y divide-slate-900/10 dark:divide-stone-100/10">
                {statutes.map((statute, i) => (
                    <li key={statute.act} className="flex gap-4 px-5 py-5 sm:gap-6 sm:px-7">
                        <span aria-hidden="true"
                            className="shrink-0 pt-1 font-display text-[0.65rem] tabular-nums text-champagne-500 dark:text-champagne-300">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1.5">
                            <h3 className="font-display text-base font-light leading-snug tracking-tight">
                                {statute.act}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {statute.note}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
