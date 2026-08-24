type Props = { align?: "left" | "center"; className?: string };

/** Hairline rule broken by a champagne lozenge — the site's section separator. */
export default function Ornament({ align = "left", className = "" }: Props) {
    return (
        <div aria-hidden="true" className={`flex items-center gap-4 ${className}`}>
            {align === "center" ? <span className="h-px flex-1 bg-current opacity-15" /> : null}
            <span className="size-1.5 rotate-45 bg-champagne-300" />
            <span className="size-1 rotate-45 bg-champagne-300/50" />
            <span className="h-px flex-1 bg-current opacity-15" />
        </div>
    );
}
