import LogoMark from "@/components/brand/LogoMark";

export default function BrandMark({ tone = "auto", size = "sm" }: { tone?: "auto" | "dark"; size?: "sm" | "lg" }) {
    const primary = tone === "dark" ? "text-stone-100" : "text-slate-900 dark:text-stone-100";
    const secondary = tone === "dark" ? "text-stone-100/60" : "text-slate-500 dark:text-stone-100/60";
    const markSize = size === "lg" ? "h-16" : "h-10 sm:h-11";
    const nameSize = size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl";
    return (
        <span className="flex items-center gap-3">
            <LogoMark className={`${markSize} w-auto shrink-0 text-navy-900 dark:text-champagne-300`} />
            <span className="flex flex-col leading-none">
                <span className={`font-display font-semibold tracking-tight ${nameSize} ${primary}`}>
                    Shreya <span className="text-champagne-400 dark:text-champagne-300">High Rise</span>
                </span>
                <span className={`mt-1.5 font-display text-[10px] uppercase tracking-luxe sm:text-xs ${secondary}`}>
                    Building across Kolkata
                </span>
            </span>
        </span>
    );
}
