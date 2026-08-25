import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <figure data-spotlight
            className="group relative isolate flex h-full flex-col gap-6 overflow-hidden border border-slate-900/10 bg-white/60 p-8 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-champagne-300 sm:p-10 dark:border-stone-100/10 dark:bg-navy-900/40">
            <p aria-hidden="true"
                className="font-display text-6xl leading-none text-champagne-300 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                &ldquo;
            </p>
            <blockquote className="relative z-2 font-display text-xl font-light leading-snug tracking-tight sm:text-2xl">
                {testimonial.quote}
            </blockquote>
            <figcaption className="relative z-2 mt-auto pt-5">
                <span aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-slate-900/10 dark:bg-stone-100/10" />
                <span aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-10 bg-champagne-400 transition-all duration-700 ease-out group-hover:w-full dark:bg-champagne-300" />
                <p className="font-medium">{testimonial.name}</p>
                <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    {testimonial.detail}
                </p>
            </figcaption>
        </figure>
    );
}
