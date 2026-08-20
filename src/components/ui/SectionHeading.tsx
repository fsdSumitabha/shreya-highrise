import type { ReactNode } from "react";

type Props = {
    id: string; eyebrow: string; title: ReactNode; lede?: string;
    align?: "left" | "center"; tone?: "light" | "dark"; className?: string;
};

export default function SectionHeading({
    id, eyebrow, title, lede, align = "left", tone = "light", className = "",
}: Props) {
    const alignment = align === "center" ? "items-center text-center" : "items-start";
    const ledeTone = tone === "dark" ? "text-stone-100/70" : "text-slate-600 dark:text-stone-100/70";
    return (
        <div className={`flex max-w-3xl flex-col gap-5 ${alignment} ${align === "center" ? "mx-auto" : ""} ${className}`}>
            <p className="font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                {eyebrow}
            </p>
            <h2 id={id}
                className="font-display text-4xl font-light leading-none tracking-tight sm:text-5xl lg:text-6xl">
                {title}
            </h2>
            {lede ? <p className={`text-base leading-relaxed sm:text-lg ${ledeTone}`}>{lede}</p> : null}
        </div>
    );
}
