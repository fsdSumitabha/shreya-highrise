import type { ReactNode } from "react";

type Props = {
    /** Each string is one line; a line break is rendered between them. */
    lines: (string | ReactNode)[];
    /** Milliseconds between one line starting and the next. */
    step?: number;
    /** Delay before the first line, in milliseconds. */
    delay?: number;
};

/* Headline type that climbs out from behind a mask, one line at a time.

   Stays a server component: the masking is pure CSS keyed off data-reveal
   ="mask", which <MotionRoot> only arms once it knows motion is welcome.
   Until then — and forever, without JS — this renders as plain text. */
export default function SplitText({ lines, step = 130, delay = 120 }: Props) {
    return (
        <>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                    <span
                        data-reveal="mask"
                        className="block"
                        style={{ "--rv-delay": `${delay + i * step}ms` } as React.CSSProperties}>
                        <span>{line}</span>
                    </span>
                </span>
            ))}
        </>
    );
}
