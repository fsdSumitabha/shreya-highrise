/* Fades in once the reader is past the fold. A plain anchor, so it works
   before hydration and keeps keyboard focus behaviour for free. */
export default function BackToTop() {
    return (
        <a href="#main" aria-label="Back to top"
            className="group fixed bottom-8 right-8 z-50 hidden size-12 translate-y-3 items-center justify-center border border-slate-900/15 bg-slate-100/85 opacity-0 backdrop-blur-md transition-[opacity,transform,background-color,border-color] duration-500 ease-out hover:border-champagne-300 hover:bg-champagne-300 hover:text-navy-950 lg:flex [html[data-deep]_&]:translate-y-0 [html[data-deep]_&]:opacity-100 dark:border-stone-100/15 dark:bg-navy-900/85">
            <span aria-hidden="true"
                className="font-display text-lg leading-none transition-transform duration-300 group-hover:-translate-y-0.5">
                ↑
            </span>
        </a>
    );
}
