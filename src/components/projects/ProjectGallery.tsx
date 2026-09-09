"use client";

import { useCallback, useState } from "react";
import ImageFrame from "@/components/ui/ImageFrame";
import Lightbox, { type Shot } from "@/components/ui/Lightbox";

type Props = {
    image?: string;
    imageLabel: string;
    gallery?: Shot[];
};

/* The picture column of a project page, and the way into the full-size
   viewer. The frames stay a fixed 4:3 so two projects photographed on
   different cameras still lay out the same; the crop that costs is bought
   back by <Lightbox>, which shows the picture whole.

   Where there is no photograph yet this is only <ImageFrame>'s shot brief,
   with nothing to open and no button offering to — the same rule the rest of
   the catalogue follows, where an absent fact is an absent control. */

export default function ProjectGallery({ image, imageLabel, gallery }: Props) {
    const [index, setIndex] = useState<number | null>(null);

    /* The hero first, then the gallery, so the viewer's order is the order on
       the page and the counter reads the way the column does. */
    const shots: Shot[] = [...(image ? [{ src: image, label: imageLabel }] : []), ...(gallery ?? [])];

    const close = useCallback(() => setIndex(null), []);

    if (!shots.length) {
        return (
            <div className="flex flex-col gap-6">
                <div data-reveal="curtain" className="group">
                    <ImageFrame label={imageLabel} ratio="aspect-4/3" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div data-reveal="curtain">
                <Frame shot={shots[0]} onOpen={() => setIndex(0)}
                    sizes="(min-width: 1024px) 640px, 100vw" labelled />
            </div>

            {gallery?.length ? (
                <ul data-stagger="90" className="grid grid-cols-3 gap-3">
                    {gallery.map((shot, i) => (
                        <li key={shot.src} data-reveal="up">
                            <Frame shot={shot} sizes="(min-width: 1024px) 200px, 30vw"
                                onOpen={() => setIndex(i + (image ? 1 : 0))} />
                        </li>
                    ))}
                </ul>
            ) : null}

            <Lightbox shots={shots} index={index} onIndex={setIndex} onClose={close} />
        </div>
    );
}

/* One frame, as a button. The whole picture is the target — which is what
   anyone tries first — and on the lead frame a visible cue says so out loud,
   because a photograph that happens to be clickable is not a promise anyone
   can see. It stays put rather than appearing on hover: half the readers here
   are on a phone and will never produce one. */

function Frame({ shot, sizes, onOpen, labelled = false }: {
    shot: Shot;
    sizes: string;
    onOpen: () => void;
    labelled?: boolean;
}) {
    return (
        <button type="button" onClick={onOpen}
            aria-label={`View full image: ${shot.label}`}
            className="group relative block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-400">
            <ImageFrame src={shot.src} label={shot.label} ratio="aspect-4/3" sizes={sizes} zoom />

            {labelled ? (
                <span aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2.5 bg-navy-950/80 px-4 py-2.5 font-display text-xs uppercase tracking-luxe text-champagne-300 backdrop-blur-sm transition-colors duration-300 group-hover:bg-navy-950">
                    <ExpandMark />
                    View full image
                </span>
            ) : (
                <span aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-2 flex size-8 items-center justify-center bg-navy-950/80 text-champagne-300 backdrop-blur-sm transition-colors duration-300 group-hover:bg-navy-950">
                    <ExpandMark />
                </span>
            )}
        </button>
    );
}

/* Four corners opening outwards — the same drafting tick the frames already
   carry, drawn as a gesture rather than a magnifying glass. */
function ExpandMark() {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="square">
            <path d="M1 5.5V1h4.5M10.5 1H15v4.5M15 10.5V15h-4.5M5.5 15H1v-4.5" />
        </svg>
    );
}
