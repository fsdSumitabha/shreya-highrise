import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "outlineLight" | "ghost";

const base =
    "group/action relative isolate inline-flex items-center justify-center gap-3 font-display text-xs uppercase tracking-luxe transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out";
const variants: Record<Variant, string> = {
    solid: "overflow-hidden bg-champagne-300 px-7 py-4 text-navy-950 hover:-translate-y-0.5 hover:bg-champagne-200 hover:shadow-[0_14px_40px_-12px] hover:shadow-champagne-400/60",
    outline:
        "overflow-hidden border border-current px-7 py-4 text-slate-900 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-slate-100 dark:text-stone-100 dark:hover:bg-stone-100 dark:hover:text-navy-950",
    outlineLight:
        "overflow-hidden border border-current px-7 py-4 text-stone-100 hover:-translate-y-0.5 hover:bg-stone-100 hover:text-navy-950",
    ghost: "text-champagne-400 underline-offset-8 hover:underline dark:text-champagne-300",
};

type Props = {
    href: string;
    variant?: Variant;
    /** Trailing arrow that nudges on hover. On by default for buttons. */
    arrow?: boolean;
    className?: string;
    children: ReactNode;
};

export default function ActionLink({ href, variant = "solid", arrow, className = "", children }: Props) {
    const isButton = variant !== "ghost";
    const showArrow = arrow ?? isButton;
    const cls = `${base} ${variants[variant]} ${className}`;

    const inner = (
        <>
            {/* Light sweeping across the face on hover. */}
            {isButton ? (
                <span aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/action:translate-x-full" />
            ) : null}
            <span>{children}</span>
            {showArrow ? (
                <span aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover/action:translate-x-1">
                    →
                </span>
            ) : null}
        </>
    );

    if (href.startsWith("/") || href.startsWith("#"))
        return (
            <Link href={href} className={cls}>
                {inner}
            </Link>
        );
    return (
        <a href={href} className={cls}>
            {inner}
        </a>
    );
}
