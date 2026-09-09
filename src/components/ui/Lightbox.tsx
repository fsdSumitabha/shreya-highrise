"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

export type Shot = { src: string; label: string };

type Props = {
    shots: Shot[];
    /** Which shot is on show, or null when the viewer is shut. */
    index: number | null;
    onIndex: (index: number) => void;
    onClose: () => void;
};

/* ── The full-size viewer ─────────────────────────────────────────────────
   Photographs reach us at whatever size the client's phone or the
   architect's camera produced, and the frames on a project page are a fixed
   4:3 so the layout holds. That crop is the reason this exists: the page
   keeps its tidy frame, and anyone who wants the whole picture opens it here,
   uncropped, at the size of their screen.

   Built on <dialog>.showModal() rather than a div with a high z-index, and
   the reason is this site specifically: a sticky header, a floating WhatsApp
   button and a mobile call bar all float above the page already. A modal
   dialog renders in the browser's top layer, which is above every one of them
   no matter what any z-index says. It also brings focus trapping, Esc, an
   inert page underneath and ::backdrop with it — all of it the platform's
   implementation rather than ours.

   Everything that shuts the viewer goes through `requestClose`, which asks
   history to go back; the popstate that follows is what actually clears the
   index. One way in, one way out — and it means Android's back gesture, which
   is how a phone closes anything covering the screen, closes this instead of
   leaving the project page. */

export default function Lightbox({ shots, index, onIndex, onClose }: Props) {
    const ref = useRef<HTMLDialogElement>(null);
    const open = index !== null;
    const shot = index === null ? undefined : shots[index];
    const many = shots.length > 1;

    /* Back out through the history entry that opening pushed, so the popstate
       handler below is the single thing that closes. Without an entry to
       spend — a viewer opened before the effect ran, say — close directly. */
    const requestClose = useCallback(() => {
        if (window.history.state?.lightbox) window.history.back();
        else onClose();
    }, [onClose]);

    // Drive the element from state rather than the other way round.
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    /* showModal() makes the page inert but does not stop it scrolling behind
       the backdrop, which on a phone is what turns a lightbox into a mess. */
    useEffect(() => {
        if (!open) return;
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = "hidden";

        return () => {
            root.style.overflow = previous;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        window.history.pushState({ ...window.history.state, lightbox: true }, "");
        const onPop = () => onClose();
        window.addEventListener("popstate", onPop);

        return () => window.removeEventListener("popstate", onPop);
    }, [open, onClose]);

    // Arrow keys, once there is more than one thing to arrow between.
    useEffect(() => {
        if (index === null || !many) return;
        const at = index;
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            const step = event.key === "ArrowRight" ? 1 : -1;
            onIndex((at + step + shots.length) % shots.length);
        };

        window.addEventListener("keydown", onKey);

        return () => window.removeEventListener("keydown", onKey);
    }, [index, many, onIndex, shots.length]);

    /* A horizontal drag past a thumb's width, which is how a phone expects to
       move between pictures. Read off pointer events so it costs no library
       and behaves the same under a mouse. */
    const swipeFrom = useRef<{ x: number; y: number } | null>(null);
    const onPointerDown = (event: React.PointerEvent) => {
        swipeFrom.current = { x: event.clientX, y: event.clientY };
    };
    const onPointerUp = (event: React.PointerEvent) => {
        const from = swipeFrom.current;
        swipeFrom.current = null;
        if (!from || index === null || !many) return;

        const dx = event.clientX - from.x;
        // Ignore anything more vertical than horizontal — that is a scroll.
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(event.clientY - from.y)) return;
        onIndex((index + (dx < 0 ? 1 : -1) + shots.length) % shots.length);
    };

    return (
        <dialog ref={ref} aria-label="Image viewer"
            onClose={requestClose}
            onClick={(event) => {
                /* Anything that is not the picture itself or a control is the
                   dark around it, and clicking that dismisses. Note this
                   cannot be `event.target === dialog`: the dialog is filled by
                   a layout child, so it is never itself the target. The
                   letterbox beside an image that does not fill its box is a
                   miss on the <img>, which is exactly what we want it to be. */
                if (!(event.target as HTMLElement).closest("button, [data-keep]")) requestClose();
            }}
            /* Near-solid rather than a light scrim: the page behind is mostly
               white, and at anything under about 95% it reads through the
               backdrop as smears of bright content beside the photograph. */
            className="h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-navy-950/96 backdrop:backdrop-blur-md">
            {shot && index !== null ? (
                <div className="relative flex h-full w-full flex-col">
                    <header className="flex items-start justify-between gap-4 p-4 sm:p-6">
                        <p className="flex items-baseline gap-3 pt-2 font-display text-xs uppercase tracking-luxe text-champagne-300">
                            {many ? (
                                <span className="tabular-nums text-stone-100/50">
                                    {index + 1} / {shots.length}
                                </span>
                            ) : null}
                            <span className="sr-only">Viewing</span>
                        </p>

                        <button type="button" onClick={requestClose} autoFocus
                            className="flex items-center gap-3 border border-stone-100/25 px-4 py-2.5 font-display text-xs uppercase tracking-luxe text-stone-100 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300">
                            Close
                            <span aria-hidden="true" className="text-base leading-none">
                                ×
                            </span>
                        </button>
                    </header>

                    <figure onPointerDown={onPointerDown} onPointerUp={onPointerUp}
                        className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="relative min-h-0 w-full flex-1">
                            {/* Uncropped, whatever shape the picture turned out
                                to be — the entire point of the viewer. */}
                            <Image key={shot.src} src={shot.src} alt={shot.label} fill sizes="100vw" data-keep
                                className="object-contain" />
                        </div>
                        <figcaption data-keep className="max-w-3xl text-center text-sm leading-relaxed text-stone-100/70">
                            {shot.label}
                        </figcaption>
                    </figure>

                    {many ? (
                        <>
                            <Step side="left" onClick={() => onIndex((index - 1 + shots.length) % shots.length)} />
                            <Step side="right" onClick={() => onIndex((index + 1) % shots.length)} />
                        </>
                    ) : null}
                </div>
            ) : null}
        </dialog>
    );
}

function Step({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
    const at = side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5";

    return (
        <button type="button" onClick={onClick}
            aria-label={side === "left" ? "Previous image" : "Next image"}
            className={`absolute top-1/2 ${at} flex size-11 -translate-y-1/2 items-center justify-center border border-stone-100/25 bg-navy-950/60 text-lg text-stone-100 backdrop-blur-sm transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300`}>
            <span aria-hidden="true">{side === "left" ? "←" : "→"}</span>
        </button>
    );
}
