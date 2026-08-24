import { LOGO_PATH, LOGO_VIEWBOX } from "@/components/brand/logoArt";

type Props = { className?: string; title?: string };

export default function LogoMark({ className = "", title = "Shreya High Rise" }: Props) {
    return (
        <svg
            viewBox={LOGO_VIEWBOX}
            role="img"
            aria-label={title}
            className={className}
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd">
            <path d={LOGO_PATH} />
        </svg>
    );
}
