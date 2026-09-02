"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/* Floating WhatsApp desk, bottom right. Sits above <MobileCallBar> on phones
   and above <BackToTop> on desktop, so the three never overlap.

   Two moving parts, both deliberate:

     · the button itself arrives a beat after load, with a slow halo, and then
       stays put — it is the one thing on the page that should always be a
       thumb away;
     · the card and the arrow are the *ask*. The card shows once, holds for a
       few seconds and retires. The arrow keeps redrawing itself for as long as
       the reader leaves it alone.

   Only the ✕ silences the arrow, and only for the rest of the session
   (sessionStorage, not localStorage — someone returning on another day is a
   fresh lead, not a pestered one). Opening a chat closes the card but leaves
   the arrow: WhatsApp opens in its own tab, the reader comes back to a page
   whose main call to action is still that button, and nothing about having
   tapped it once means they are done with it.

   The pointer is public/right-arrow.gif redrawn as vector — the same lasso,
   traced off the clip's last frame and re-timed in CSS. Vector because the GIF
   is black ink on an opaque white card: it cannot sit on the dark theme, cannot
   take the champagne it is drawn in here, weighs 224 KB against about a
   kilobyte, and cannot hold still for a reader who has asked for less motion. */

const WA_NUMBER = site.phones[0].tel.replace(/\D/g, "");

/* Pre-filled, so the buyer never has to compose the first message — the single
   biggest drop-off between a WhatsApp button being tapped and a chat actually
   starting. */
const WA_MESSAGE = `Hi ${site.name}, I would like the price sheet, floor plans and current availability. Please share the details.`;
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const HUSH_KEY = "shr-wa-hushed";
const ARRIVE_MS = 1_400;
const ASK_MS = 6_000;
const ASK_HOLD_MS = 15_000;

/* The lasso, in a 264 × 92 box: in from the left, once round the loop, out
   under its own tail, and then the sweep — the part of the reference clip that
   does the work. It is cut as two cubics rather than one because a single
   curve cannot both climb hard through the middle and go level for the last
   third, and that late flattening is what makes the line feel drawn rather
   than plotted. Measured off the clip, the rise reaches 92% by 68% of the run;
   the fitted curve lands within half a percent of that at every sample, and
   the head comes to rest 3° off level, at the button. */
const ARROW_LINE =
    "M 4,57 C 38,72 38,72.6 89.6,79.3 C 105.4,81.4 122.4,76.1 133.8,65.5 C 145.3,55 149.3,40.9 144.3,28.9 C 139.3,16.9 126,9 109.9,8.3 C 93.7,7.6 77.3,14.3 67.1,25.6 C 57,36.9 54.7,51.1 61.4,62.4 C 72.5,80 86,87 105,87 C 130,87 190.6,53.2 212.1,46.6 C 226.4,42.2 238,45 258,44";

/* The head, pointing along +x with its tip on the right edge of its own box
   and level with its middle — which is where .wa-arrow-tip anchors it to the
   line. Symmetric on purpose: it makes that anchor an exact 100% 50%. */
const ARROW_HEAD = "M 0,0 -20,-8 -15.5,0 -20,8 Z";

export default function WhatsAppCta() {
    const [visible, setVisible] = useState(false);
    const [asking, setAsking] = useState(false);
    const [quiet, setQuiet] = useState(false);

    useEffect(() => {
        const timers = [window.setTimeout(() => setVisible(true), ARRIVE_MS)];

        // Private mode throws on sessionStorage rather than returning null.
        let hushed = false;
        try {
            hushed = sessionStorage.getItem(HUSH_KEY) === "1";
        } catch {}

        if (hushed) {
            setQuiet(true);
        } else {
            timers.push(window.setTimeout(() => setAsking(true), ASK_MS));
            timers.push(window.setTimeout(() => setAsking(false), ASK_MS + ASK_HOLD_MS));
        }

        return () => timers.forEach(clearTimeout);
    }, []);

    /* Taking the offer up puts the card away — the arrow and the button stay. */
    const closeCard = () => setAsking(false);

    /* Turning it down puts everything away, until a new session. */
    const hush = () => {
        setAsking(false);
        setQuiet(true);
        try {
            sessionStorage.setItem(HUSH_KEY, "1");
        } catch {}
    };

    return (
        <div
            className={`fixed bottom-[5.5rem] right-5 z-50 flex flex-col items-end gap-3 transition-[opacity,transform] duration-700 ease-out lg:bottom-24 lg:right-8 [html[data-menu]_&]:hidden ${
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}>
            {/* The card comes first in the DOM: it reads before the button for a
                screen reader, and the close control stays reachable by keyboard. */}
            <div
                aria-hidden={!asking}
                className={`relative w-[16.5rem] max-w-[calc(100vw-2.5rem)] origin-bottom-right border border-slate-900/10 bg-slate-100/95 p-4 pr-8 shadow-[0_18px_50px_-20px_rgba(7,21,35,0.55)] backdrop-blur-md transition-[opacity,transform] duration-500 ease-out dark:border-stone-100/15 dark:bg-navy-900/95 ${
                    asking
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-2 scale-95 opacity-0"
                }`}>
                <p className="font-display text-[0.62rem] uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                    Sales desk
                </p>
                <p className="mt-2 font-display text-base leading-snug text-navy-950 dark:text-stone-100">
                    Price sheet on WhatsApp
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-600 dark:text-stone-300/80">
                    Floor plans, current availability and the all-in price — in your chat, usually within
                    minutes.
                </p>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer" onClick={closeCard}
                    tabIndex={asking ? 0 : -1}
                    className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.62rem] uppercase tracking-luxe text-navy-950 underline-offset-4 hover:underline dark:text-stone-100">
                    Start the chat
                    <span aria-hidden="true">→</span>
                </a>

                <button type="button" onClick={hush} tabIndex={asking ? 0 : -1}
                    aria-label="Dismiss the WhatsApp prompt"
                    className="absolute right-1.5 top-1.5 grid size-6 place-items-center text-slate-500 transition-colors duration-300 hover:text-navy-950 dark:text-stone-400 dark:hover:text-stone-100">
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M1.5 1.5 10.5 10.5M10.5 1.5 1.5 10.5" />
                    </svg>
                </button>

                {/* Tail, aimed down at the button. */}
                <span aria-hidden="true"
                    className="absolute -bottom-[7px] right-6 size-3 rotate-45 border-b border-r border-slate-900/10 bg-slate-100/95 dark:border-stone-100/15 dark:bg-navy-900/95" />
            </div>

            <div className="flex items-center gap-1">
                {/* The nudge. Out of the accessibility tree — it says nothing
                    the card and the button's own label do not. It redraws
                    itself on a loop until the ✕ retires it. */}
                <svg viewBox="0 0 264 92" aria-hidden="true"
                    className={`wa-arrow w-[7.5rem] shrink-0 text-champagne-500 transition-opacity duration-700 lg:w-[9.5rem] dark:text-champagne-300 ${
                        quiet ? "opacity-0" : "opacity-100"
                    }`}>
                    <path className="wa-arrow-line wa-arrow-veil" d={ARROW_LINE} pathLength={1}
                        fill="none" strokeWidth={5} strokeLinecap="round" />
                    <path className="wa-arrow-line" d={ARROW_LINE} pathLength={1} fill="none"
                        stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
                    <path className="wa-arrow-tip" d={ARROW_HEAD} fill="currentColor"
                        style={{ offsetPath: `path("${ARROW_LINE}")` } as React.CSSProperties} />
                </svg>

                <a href={WA_HREF} target="_blank" rel="noopener noreferrer" onClick={closeCard}
                    aria-label={`Chat with the ${site.name} sales desk on WhatsApp`}
                    className="group relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.85)] transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-400 active:scale-95">
                    {/* Two halos, half a cycle apart — a slow sonar rather than a
                        throb, so it reads as availability, not an alarm. */}
                    <span aria-hidden="true" className="wa-halo absolute inset-0 rounded-full bg-[#25d366]/50" />
                    <span aria-hidden="true"
                        className="wa-halo wa-halo-late absolute inset-0 rounded-full bg-[#25d366]/40" />

                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className="relative size-7 transition-transform duration-300 group-hover:scale-110">
                        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                        <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22.4l5.74-1.5a9.87 9.87 0 0 0 4.3.98h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2Zm0 1.8a8.03 8.03 0 0 1 5.7 2.37 8.02 8.02 0 0 1 2.36 5.7c0 4.45-3.62 8.06-8.06 8.06a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.45 3.62-8.06 8.06-8.06h.13Z" />
                    </svg>

                    {/* Availability dot. Kept out of the tree — the desk hours
                        live in the footer and on the contact page. */}
                    <span aria-hidden="true"
                        className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-slate-100 bg-champagne-300 dark:border-navy-950" />
                </a>
            </div>
        </div>
    );
}
