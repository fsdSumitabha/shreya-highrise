"use client";

import { useEffect, useRef, useState } from "react";
import { reel, reelPhases } from "@/data/reel";

/* The plan-to-reality film, presented as a drawing on a board.

   The clip is ten seconds of a 2D plan being built into a tower, and the whole
   point of this component is to stop it being *only* ten seconds of pretty
   footage. Three things run off the playhead:

     · --reel, a 0→1 fraction written onto the sheet each frame. Two overlays
       read it in CSS — a duotone veil and the draughtsman's grid — so the frame
       opens as a cold blueprint and warms into colour as the building arrives,
       and the grid lifts off the sheet as the drawing becomes real. Written
       through the DOM rather than through state: a re-render at 60fps to move
       an opacity would be absurd.
     · the stage strip below the frame, which lights the stage the playhead is
       in and prints what is happening on site while the film is there. This is
       the part that turns footage into an argument.
     · the timecode in the rail, written the same way, for the same reason.

   Everything the film says is also said in text, in order, in the strip — so
   the sequence survives a reader who cannot see it, a clip that fails to load,
   and a reader who has asked for no motion.

   Three obligations the browser will not meet on its own:
     · autoplay can be refused — iOS low-power mode, and every desktop policy
       for anything unmuted. play() is called explicitly so a refusal is caught
       and answered with a play control rather than a dead rectangle;
     · WCAG 2.2.2 — anything moving for more than five seconds needs a pause.
       The rail carries a real one, and it is the same control;
     · reduced motion gets the last frame of the film as a still — the finished
       building, which is the frame worth keeping — and the strip fully lit,
       with playback one deliberate press away. */

const phaseAt = (progress: number) => {
    let i = 0;
    while (i + 1 < reelPhases.length && progress >= reelPhases[i + 1].at) i += 1;
    return i;
};

const timecode = (seconds: number, total: number) =>
    `${seconds.toFixed(1).padStart(4, "0")} / ${total.toFixed(1)} s`;

export default function PlanReel({ className = "" }: { className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const clockRef = useRef<HTMLSpanElement>(null);
    /* What the reader last asked for. The viewport observer below may pause the
       film to save a battery it is not being watched on; it must not undo a
       deliberate press of the pause button when the fold scrolls back. */
    const wantedRef = useRef(true);
    const phaseRef = useRef(0);

    const [phase, setPhase] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [quiet, setQuiet] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const sheet = sheetRef.current;
        if (!video || !sheet) return;

        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setQuiet(still);
        wantedRef.current = !still;

        let raf = 0;

        const sync = () => {
            const total = video.duration;
            if (!Number.isFinite(total) || total <= 0) return;
            const progress = Math.min(1, video.currentTime / total);
            sheet.style.setProperty("--reel", progress.toFixed(4));
            if (clockRef.current) clockRef.current.textContent = timecode(video.currentTime, total);
            const next = phaseAt(progress);
            if (next !== phaseRef.current) {
                phaseRef.current = next;
                setPhase(next);
            }
        };

        const tick = () => {
            sync();
            raf = requestAnimationFrame(tick);
        };

        const onPlay = () => {
            setPlaying(true);
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(tick);
        };

        const onPause = () => {
            setPlaying(false);
            cancelAnimationFrame(raf);
            // One last read, so a pause lands the overlays on the frame shown.
            sync();
        };

        video.addEventListener("play", onPlay);
        video.addEventListener("pause", onPause);
        video.addEventListener("loadedmetadata", sync);
        // Covers the two cases the rAF loop cannot: a seek while paused, and the
        // frames between metadata arriving and the first play.
        video.addEventListener("timeupdate", sync);
        video.addEventListener("seeked", sync);

        if (still) {
            // Park on the finished building rather than on a blank sheet. The
            // seek is what forces a frame to decode; a video that has never
            // played paints nothing at all.
            video.loop = false;
            video.pause();
            const settle = () => {
                video.currentTime = Math.max(0, video.duration - 0.05);
            };
            if (video.readyState >= HTMLMediaElement.HAVE_METADATA) settle();
            else video.addEventListener("loadedmetadata", settle, { once: true });
        } else {
            void video.play().catch(() => setPlaying(false));
        }

        /* Nothing is gained by decoding video that has scrolled away. */
        const watcher = new IntersectionObserver(
            ([entry]) => {
                if (!wantedRef.current) return;
                if (entry.isIntersecting) void video.play().catch(() => setPlaying(false));
                else video.pause();
            },
            { threshold: 0.15 },
        );
        watcher.observe(video);

        return () => {
            cancelAnimationFrame(raf);
            watcher.disconnect();
            video.removeEventListener("play", onPlay);
            video.removeEventListener("pause", onPause);
            video.removeEventListener("loadedmetadata", sync);
            video.removeEventListener("timeupdate", sync);
            video.removeEventListener("seeked", sync);
        };
    }, []);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            wantedRef.current = true;
            // A reader who asked for less motion and then pressed play gets the
            // film once, not on a loop.
            if (!quiet) video.loop = true;
            void video.play().catch(() => setPlaying(false));
        } else {
            wantedRef.current = false;
            video.pause();
        }
    };

    const seek = (index: number) => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration)) return;
        video.currentTime = reelPhases[index].at * video.duration + 0.05;
        phaseRef.current = index;
        setPhase(index);
    };

    const corner = "absolute size-4 border-champagne-300/70";

    return (
        <figure className={`relative m-0 ${className}`}>
            {/* The board under the sheet: one hairline, offset, the way a drawing
                sits on the one beneath it. */}
            <span aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 border border-champagne-400/30 dark:border-champagne-300/25" />

            {/* Navy in both weathers, and deliberately so. The film is a white
                sheet under a white sky for eight of its ten seconds; on the pale
                fold it belongs to, a pale card would have left the drawing with
                nothing to sit against. Dark, it reads as a presentation board on
                a wall, and it is the one place on the light page where the
                champagne annotations get to be bright. */}
            <div className="relative flex flex-col border border-navy-950/15 bg-navy-950/92 backdrop-blur-sm dark:border-stone-100/12">
                {/* Rail. Sheet name on the left, running time and the pause on the
                    right — the header of a drawing, doing a player's job. */}
                <div className="flex items-center justify-between gap-4 border-b border-stone-100/10 px-4 py-2.5">
                    <p className="flex items-center gap-2.5 font-display text-[10px] uppercase tracking-luxe text-stone-100/50">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-champagne-300" />
                        Plan <span aria-hidden="true" className="text-champagne-300">→</span> reality
                    </p>
                    <div className="flex items-center gap-3">
                        {/* The placeholder is the real running time of the clip in
                            public/, so the rail is never blank or wrong-looking
                            before hydration; JS then reads it off the file. */}
                        <span ref={clockRef} aria-hidden="true"
                            className="font-display text-[10px] uppercase tabular-nums tracking-luxe text-stone-100/35">
                            00.0 / 10.0 s
                        </span>
                        <button type="button" onClick={toggle}
                            aria-label={playing ? "Pause the film" : "Play the film"}
                            className="flex size-7 items-center justify-center border border-stone-100/15 text-stone-100/60 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300">
                            <svg viewBox="0 0 12 12" aria-hidden="true" className="size-2.5 fill-current">
                                {playing ? (
                                    <path d="M1 0h3.2v12H1zM7.8 0H11v12H7.8z" />
                                ) : (
                                    <path d="M1.5 0.4 11 6l-9.5 5.6z" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* The sheet. --reel is written here each frame; every overlay
                    below reads it and nothing else. */}
                <div ref={sheetRef} className="reel-sheet relative isolate aspect-16/9 overflow-hidden">
                    {/* What shows before the first frame decodes: a blank
                        blueprint, which is where the film starts anyway. */}
                    <div aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-br from-navy-800 via-navy-900 to-navy-950" />

                    <video ref={videoRef} src={reel.src} muted loop playsInline autoPlay
                        preload="metadata" aria-label={reel.description}
                        className="absolute inset-0 size-full object-cover" />

                    {/* Cyanotype, lifting. Takes hue and saturation from this blue
                        and luminance from the film, so the drawing stays a drawing
                        and only its colour is borrowed. Gone before the clip ends,
                        so the finished building is seen as it really is.

                        This is the whole treatment. An earlier pass ruled the
                        frame with a drawing grid as well — until the footage made
                        the point that the plan arrives already dimensioned and
                        gridded, and a second grid over the first is not
                        draughtsmanship, it is noise. */}
                    <span aria-hidden="true" className="reel-veil pointer-events-none absolute inset-0" />

                    {/* And the other half of the same move: warmth arriving as the
                        blue leaves, so the render lands in late light rather than
                        merely losing its tint. */}
                    <span aria-hidden="true" className="reel-warm pointer-events-none absolute inset-0" />

                    {/* A laser level crossing the frame, on its own slow clock —
                        the only thing here still moving when the film is paused. */}
                    <span aria-hidden="true" className="reel-sweep pointer-events-none absolute inset-0" />

                    {/* Corner ticks, as on every other frame on the site. */}
                    <span aria-hidden="true" className={`${corner} left-3 top-3 border-l border-t`} />
                    <span aria-hidden="true" className={`${corner} right-3 top-3 border-r border-t`} />
                    <span aria-hidden="true" className={`${corner} bottom-3 left-3 border-b border-l`} />
                    <span aria-hidden="true" className={`${corner} bottom-3 right-3 border-b border-r`} />

                    {/* Title block, bottom right, where a title block goes. */}
                    <div aria-hidden="true"
                        className="absolute bottom-3 right-3 hidden grid-cols-[auto_auto] gap-x-5 gap-y-1 border border-white/20 bg-navy-950/55 px-3.5 py-2.5 font-display text-[9px] uppercase tracking-luxe text-stone-100/55 backdrop-blur-sm sm:grid">
                        <span>Sheet</span>
                        <span className="text-right text-champagne-200">{reel.sheet.number}</span>
                        <span>Scale</span>
                        <span className="text-right text-stone-100/80">{reel.sheet.scale}</span>
                        <span>Rev</span>
                        <span className="text-right text-stone-100/80">{reel.sheet.revision}</span>
                    </div>

                    {/* Shown only when the film is not running — a refused autoplay,
                        a reader who paused, or one who asked for no motion. */}
                    {playing ? null : (
                        <button type="button" onClick={toggle} aria-label="Play the film"
                            className="group/start absolute inset-0 flex items-center justify-center bg-navy-950/25 transition-colors duration-500 hover:bg-navy-950/10">
                            <span className="flex size-16 items-center justify-center border border-champagne-200/70 bg-navy-950/40 text-champagne-100 transition-transform duration-500 ease-out group-hover/start:scale-110">
                                <svg viewBox="0 0 12 12" aria-hidden="true" className="size-4 translate-x-px fill-current">
                                    <path d="M1.5 0.4 11 6l-9.5 5.6z" />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>

                {/* The stage strip: the film, said in words, in order. Each stage is
                    a real control — pressing one takes the film to it. */}
                <div className="flex flex-col gap-3 px-4 pb-4 pt-3.5">
                    <ul className="flex items-center justify-between gap-1">
                        {reelPhases.map((stage, i) => {
                            const reached = i <= phase;
                            return (
                                <li key={stage.code}>
                                    <button type="button" onClick={() => seek(i)}
                                        aria-current={i === phase ? "step" : undefined}
                                        aria-label={`Stage ${stage.code}, ${stage.label}`}
                                        className={`flex items-baseline gap-1.5 px-1 py-1 font-display text-[10px] uppercase tracking-luxe transition-colors duration-500 ${
                                            reached ? "text-champagne-300" : "text-stone-100/30 hover:text-stone-100/70"
                                        }`}>
                                        <span className="tabular-nums">{stage.code}</span>
                                        {/* Five labels will not fit on a phone. There,
                                            only the stage being played spells itself
                                            out; the rest keep their numbers. */}
                                        <span className={i === phase ? "" : "max-sm:hidden"}>{stage.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* The playhead, as a measured line. */}
                    <span aria-hidden="true" className="relative block h-px bg-stone-100/12">
                        <span className="reel-fill absolute inset-0 bg-linear-to-r from-champagne-400 to-champagne-100" />
                    </span>

                    {/* All five notes, stacked in one grid cell, four of them
                        held at zero opacity. It reads as a reserved height with a
                        crossfade, and it is one — but the height is the tallest
                        note's own, measured by the browser at whatever width and
                        font it actually got. A min-height would have meant four
                        magic numbers (the longest note runs to five lines at 320
                        and two at 640) that go stale the moment the copy or the
                        typeface changes, and a fold that jogs every two seconds
                        wherever they were wrong.

                        aria-live, because the stage turns over under a reader who
                        is not watching the pixels; polite, so it waits its turn.
                        The four inactive notes are hidden from the tree as well as
                        from the eye, or the region would read out all five. */}
                    <p aria-live="polite" className="grid text-sm leading-relaxed text-stone-100/65">
                        {reelPhases.map((stage, i) => (
                            <span key={stage.code} aria-hidden={i === phase ? undefined : "true"}
                                className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                                    i === phase ? "opacity-100" : "opacity-0"
                                }`}>
                                <span className="font-display uppercase tracking-luxe text-champagne-300">
                                    {stage.label}
                                </span>
                                <span aria-hidden="true" className="mx-2 text-stone-100/25">—</span>
                                {stage.note}
                            </span>
                        ))}
                    </p>
                </div>
            </div>

            <figcaption className="sr-only">{reel.description}</figcaption>
        </figure>
    );
}
