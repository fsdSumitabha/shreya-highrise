import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "outlineLight" | "ghost";

const base =
    "inline-flex items-center justify-center gap-2 font-display text-xs uppercase tracking-luxe transition-colors";
const variants: Record<Variant, string> = {
    solid: "bg-champagne-300 px-6 py-3.5 text-navy-950 hover:bg-champagne-200",
    outline:
        "border border-current px-6 py-3.5 text-slate-900 hover:bg-slate-900 hover:text-slate-100 dark:text-stone-100 dark:hover:bg-stone-100 dark:hover:text-navy-950",
    outlineLight: "border border-current px-6 py-3.5 text-stone-100 hover:bg-stone-100 hover:text-navy-950",
    ghost: "text-champagne-400 underline-offset-8 hover:underline dark:text-champagne-300",
};

type Props = { href: string; variant?: Variant; className?: string; children: ReactNode };

export default function ActionLink({ href, variant = "solid", className = "", children }: Props) {
    const cls = `${base} ${variants[variant]} ${className}`;
    if (href.startsWith("/") || href.startsWith("#"))
        return (
            <Link href={href} className={cls}>
                {children}
            </Link>
        );
    return (
        <a href={href} className={cls}>
            {children}
        </a>
    );
}
