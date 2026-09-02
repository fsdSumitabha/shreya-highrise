import type { ReactNode } from "react";
import SplitText from "@/components/motion/SplitText";

type Props = {
    id: string;
    eyebrow: string;
    /** Plain heading. Ignored when `lines` is given. */
    title?: ReactNode;
    /** Heading split into masked lines that climb in one after another. */
    lines?: (string | ReactNode)[];
    lede?: string;
    align?: "left" | "center";
    className?: string;
};

export default function SectionHeading({
    id, eyebrow, title, lines, lede, align = "left", className = "",
}: Props) {
    const centred = align === "center";
    const heading = "font-display text-4xl font-light leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl";

    return (
        <div
            className={`flex max-w-3xl flex-col gap-5 ${centred ? "mx-auto items-center text-center" : "items-start"} ${className}`}>
            <p data-reveal={centred ? "up" : "left"}
                className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                {eyebrow}
            </p>

            <h2 id={id} className={heading}>
                {lines ? (
                    <SplitText lines={lines} delay={40} />
                ) : (
                    <span data-reveal="up" className="block"
                        style={{ "--rv-delay": "60ms" } as React.CSSProperties}>
                        {title}
                    </span>
                )}
            </h2>

            {lede ? (
                <p data-reveal="up" style={{ "--rv-delay": "180ms" } as React.CSSProperties}
                    className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/70">
                    {lede}
                </p>
            ) : null}
        </div>
    );
}
