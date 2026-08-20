import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <figure className="flex h-full flex-col gap-6 border border-slate-900/10 p-8 sm:p-10 dark:border-stone-100/10">
            <p aria-hidden="true" className="font-display text-5xl leading-none text-champagne-300">
                &ldquo;
            </p>
            <blockquote className="font-display text-xl font-light leading-snug tracking-tight sm:text-2xl">
                {testimonial.quote}
            </blockquote>
            <figcaption className="mt-auto border-t border-slate-900/10 pt-5 dark:border-stone-100/10">
                <p className="font-medium">{testimonial.name}</p>
                <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    {testimonial.detail}
                </p>
            </figcaption>
        </figure>
    );
}
