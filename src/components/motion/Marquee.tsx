type Props = {
    items: string[];
    /** Seconds for one full pass. Longer reads calmer. */
    duration?: number;
    className?: string;
    itemClassName?: string;
};

/* An endless horizontal ribbon. The list is rendered twice — once for real,
   once hidden from assistive tech — so the translate can loop at exactly -50%
   with no visible seam. Hovering the strip pauses it. */
export default function Marquee({ items, duration = 45, className = "", itemClassName = "" }: Props) {
    const mark = <span aria-hidden="true" className="size-1.5 rotate-45 bg-champagne-300/70" />;
    const run = (hidden: boolean) => (
        <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
                <li key={item} className={`flex items-center gap-10 pr-10 ${itemClassName}`}>
                    <span>{item}</span>
                    {mark}
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={`marquee-viewport overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] ${className}`}>
            <div className="marquee" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
                {run(false)}
                {run(true)}
            </div>
        </div>
    );
}
