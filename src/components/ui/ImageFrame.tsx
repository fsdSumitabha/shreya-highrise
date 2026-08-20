type Props = { label: string; ratio?: string; tone?: "light" | "dark"; bordered?: boolean; className?: string };

const tones = {
    light: "border-slate-900/25 bg-slate-200/70 text-slate-500 dark:border-stone-100/25 dark:bg-navy-900 dark:text-stone-100/45",
    dark: "border-stone-100/25 bg-navy-900 text-stone-100/45",
};

export default function ImageFrame({
    label, ratio = "aspect-4/3", tone = "light", bordered = true, className = "",
}: Props) {
    const frame = bordered ? "border-2 border-dashed" : "";
    return (
        <div role="img" aria-label={`Placeholder image: ${label}`}
            className={`flex items-center justify-center p-6 ${frame} ${tones[tone]} ${ratio} ${className}`}>
            <span className="text-center font-display text-xs uppercase tracking-luxe">{label}</span>
        </div>
    );
}
