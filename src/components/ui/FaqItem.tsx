import type { Faq } from "@/data/faqs";

export default function FaqItem({ faq }: { faq: Faq }) {
    return (
        <details className="group border-b border-slate-900/10 dark:border-stone-100/10">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors duration-300 hover:text-champagne-500 dark:hover:text-champagne-300 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-light tracking-tight sm:text-2xl">{faq.question}</h3>
                <span aria-hidden="true"
                    className="mt-1 flex size-7 shrink-0 items-center justify-center border border-slate-900/15 font-display text-xl leading-none text-champagne-400 transition-[transform,background-color,border-color,color] duration-300 group-hover:border-champagne-300 group-open:rotate-45 group-open:bg-champagne-300 group-open:text-navy-950 dark:border-stone-100/15 dark:text-champagne-300">
                    +
                </span>
            </summary>
            <p className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-stone-100/65">
                {faq.answer}
            </p>
        </details>
    );
}
