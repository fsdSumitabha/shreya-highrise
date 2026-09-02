type Props = {
    label: string;
    ratio?: string;
    bordered?: boolean;
    /** Slow push-in while the surrounding `group` is hovered. */
    zoom?: boolean;
    className?: string;
};

/* Stand-in for photography that is not shot yet — but built to look composed
   rather than empty: a graded panel, a surveyor's grid, corner ticks and the
   brief for whoever takes the picture. */

const panel = "from-slate-200 via-slate-100 to-slate-300 dark:from-navy-800 dark:via-navy-900 dark:to-navy-950";
const edge = "border-slate-900/20 dark:border-stone-100/20";
const text = "text-slate-500 dark:text-stone-100/45";
const tick = "bg-champagne-400/70 dark:bg-champagne-300/60";

export default function ImageFrame({
    label, ratio = "aspect-4/3", bordered = true, zoom = false, className = "",
}: Props) {
    const corner = `absolute size-3 border-champagne-400/60 dark:border-champagne-300/50`;
    return (
        <div role="img" aria-label={`Placeholder image: ${label}`}
            className={`relative isolate flex items-center justify-center overflow-hidden ${bordered ? `border ${edge}` : ""} ${ratio} ${className}`}>
            <div aria-hidden="true"
                className={`absolute inset-0 -z-10 bg-linear-to-br ${panel} ${zoom ? "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" : ""}`}>
                <div className="blueprint-grid absolute inset-0 opacity-70 [--grid-size:3rem]" />
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(200,169,107,0.18),transparent_60%)]" />
            </div>

            <span aria-hidden="true" className={`${corner} left-3 top-3 border-l border-t`} />
            <span aria-hidden="true" className={`${corner} right-3 top-3 border-r border-t`} />
            <span aria-hidden="true" className={`${corner} bottom-3 left-3 border-b border-l`} />
            <span aria-hidden="true" className={`${corner} bottom-3 right-3 border-b border-r`} />

            <span className={`flex max-w-[85%] flex-col items-center gap-3 text-center ${text}`}>
                <span aria-hidden="true" className={`h-px w-8 ${tick}`} />
                <span className="font-display text-xs uppercase tracking-luxe">{label}</span>
            </span>
        </div>
    );
}
