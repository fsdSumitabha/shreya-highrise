import { sections } from "@/data/privacy";

/* The contents rail. Sticky on desktop, a plain list on mobile — position:
   sticky needs no JS, no observer and no scroll listener, so the rail costs
   the page nothing and works with scripting off. The numbering is real <ol>
   numbering carried in the markup, so "§11" in the prose and "11" here
   always agree. */

export default function PolicyContents() {
    return (
        <nav aria-labelledby="contents-heading"
            className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start xl:col-span-3">
            <h2 id="contents-heading"
                className="flex items-center gap-3 border-b border-slate-900/10 pb-4 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:border-stone-100/10 dark:text-champagne-300">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                Contents
            </h2>

            <ol className="mt-5 flex flex-col gap-px lg:max-h-[62vh] lg:overflow-y-auto">
                {sections.map((section, i) => (
                    <li key={section.id}>
                        <a href={`#${section.id}`}
                            className="group flex items-baseline gap-3 py-1.5 text-sm text-slate-600 transition-colors hover:text-champagne-500 dark:text-stone-100/65 dark:hover:text-champagne-300">
                            <span aria-hidden="true"
                                className="w-5 shrink-0 text-right font-display text-[0.65rem] tabular-nums text-slate-400 transition-colors group-hover:text-champagne-500 dark:text-stone-100/35 dark:group-hover:text-champagne-300">
                                {i + 1}
                            </span>
                            {section.short}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
