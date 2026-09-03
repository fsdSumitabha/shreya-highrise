import Container from "@/components/ui/Container";
import ImageFrame from "@/components/ui/ImageFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { addressBook, corridorsIntro, mapLabel, mapNote } from "@/data/corridors";
import { plottedProjects } from "@/data/locations";

/* The address book beside the map of it. Both columns are written out of
   projects.ts — the rows are every society on the books, and the pins are the
   ones whose address places them on the ground (see locations.ts). The number
   on a row is the number on its pin, so the two columns can be read against
   each other without a hover or a line of JavaScript. */

export default function Corridors() {
    return (
        <section aria-labelledby="corridors-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-10">
                    <SectionHeading id="corridors-heading" eyebrow={corridorsIntro.eyebrow}
                        lines={corridorsIntro.lines} lede={corridorsIntro.body} />

                    <ul data-stagger="100"
                        className="grid gap-px border border-slate-900/10 bg-slate-900/10 dark:border-stone-100/10 dark:bg-stone-100/10">
                        {addressBook.map((entry) => (
                            <li key={entry.slug} data-reveal="left"
                                className="group relative flex flex-col gap-2 bg-slate-100 p-6 transition-colors duration-500 hover:bg-white dark:bg-navy-950 dark:hover:bg-navy-900/60">
                                {/* Marker rail that fills top-to-bottom on hover. */}
                                <span aria-hidden="true"
                                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-champagne-300 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h3 className="flex items-baseline gap-3 font-display text-2xl font-light tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                                        {/* Ties the row to its pin. An address we cannot
                                            place has no pin, so it carries no number. */}
                                        <span aria-hidden="true"
                                            className="font-display text-xs tabular-nums tracking-luxe text-champagne-500 dark:text-champagne-300">
                                            {entry.pin ? String(entry.pin).padStart(2, "0") : "—"}
                                        </span>
                                        {entry.name}
                                    </h3>
                                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                        {entry.when}
                                    </p>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600 transition-transform duration-500 ease-out group-hover:translate-x-2 dark:text-stone-100/65">
                                    {entry.plot ? `${entry.plot} — ` : null}
                                    {entry.where}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                    <div data-reveal="zoom" className="group relative">
                        <ImageFrame label={mapLabel} ratio="aspect-square" zoom />

                        {/* One pin per located address, at its true position inside the
                            frame's bounds. A label sits on whichever side keeps it inside
                            the square — the western half reads outward to the left. */}
                        {plottedProjects.map(({ project, at, position }, i) => {
                            const westward = Number.parseFloat(position.left) < 47;

                            return (
                                <span key={project.slug} style={position}
                                    className="absolute flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                                    <span aria-hidden="true"
                                        className="window-lit absolute size-6 rounded-full bg-champagne-300/25"
                                        style={{ "--lit-duration": `${3 + i * 0.7}s`, "--lit-min": "0.1", "--lit-max": "0.8" } as React.CSSProperties} />
                                    <span aria-hidden="true"
                                        className="relative size-2 rotate-45 bg-champagne-400 dark:bg-champagne-300" />
                                    <span
                                        className={`absolute whitespace-nowrap font-display text-[0.625rem] uppercase leading-none tracking-luxe text-slate-700 dark:text-stone-100/70 ${westward ? "right-full mr-2.5" : "left-full ml-2.5"}`}>
                                        <span className="tabular-nums text-champagne-500 dark:text-champagne-300">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>{" "}
                                        {at.label}
                                        <span className="sr-only">, {project.name}</span>
                                    </span>
                                </span>
                            );
                        })}
                    </div>

                    <p data-reveal="up" className="text-xs leading-relaxed text-slate-500 dark:text-stone-100/50">
                        {mapNote}
                    </p>
                </div>
            </Container>
        </section>
    );
}
