import type { Faq } from "@/data/faqs";

export default function FaqItem({ faq }: { faq: Faq }) {
    return (
        <details className="group border-b border-slate-900/10 dark:border-stone-100/10">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-light tracking-tight sm:text-2xl">{faq.question}</h3>
                <span aria-hidden="true"
                    className="mt-1 shrink-0 font-display text-2xl leading-none text-champagne-400 transition-transform group-open:rotate-45 dark:text-champagne-300">
                    +
                </span>
            </summary>
            <p className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-stone-100/65">
                {faq.answer}
            </p>
        </details>
    );
}
