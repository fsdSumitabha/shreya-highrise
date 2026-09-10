import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { planSheetImages, planWording, type SanctionedPlan, type SheetImage, type SheetPlate } from "@/data/projects";

/* ── The drawings themselves ──────────────────────────────────────────────
   <ProjectPlan> reads the sanctioned sheets out to you as schedules and
   title-block facts. This section is the other half of that: the sheets as
   they were actually drawn, big enough to trace a flat around with a finger.
   A buyer looking at a G+4 block wants to see where the lift lands relative
   to their front door, and no table will ever tell them that.

   It renders only where scans exist. `planSheetImages` drops any sheet we
   hold only as a PDF, so a project whose drawings have not been scanned
   returns nothing here and the page closes up behind it — same rule as
   everywhere else in the catalogue, where an absent fact is an absent block
   rather than an empty one.

   Two things about these files are load-bearing:

   Sheets can arrive either way round, so no ratio may be assumed of the
   drawings — but the plates are shaped to whatever actually turned up. An
   architect normally issues a set all one way, and then the plates take that
   shape and the drawings fill them edge to edge. Only a genuinely mixed set
   falls back to a square, which costs both orientations some size but is what
   keeps a row of plates from stepping. Either way the drawing is fitted with
   object-contain and never cropped: cropping a sanctioned drawing would be a
   lie about what was sanctioned. Because the paper behind is white like the
   sheet itself, whatever letterbox is left over reads as margin, not a gap.

   And the filenames have spaces in them. `next/image` runs
   encodeURIComponent over `src` on its way to the optimizer, so the image
   takes the raw path; the PDF anchor beside it takes an encodeURI'd one,
   because nothing encodes an href on your behalf. Pre-encoding the image src
   would double-encode it and 404 — the two lines below differ on purpose. */

/** Which way up a sheet was drawn. */
const orientation = (image: SheetImage) => (image.height > image.width ? "portrait" : "landscape");

/** The plate shape for a set of sheets: the sheets' own, where they agree;
    a square where they do not, so a row of them still lines up. Null means
    mixed, and is resolved per sheet further down. */
function plateRatio(plates: SheetPlate[]): string | null {
    const kinds = new Set(plates.map((plate) => orientation(plate.image)));
    if (kinds.size !== 1) return null;

    return kinds.has("portrait") ? "aspect-3/4" : "aspect-4/3";
}

export default function ProjectPlanSheets({ plan }: { plan: SanctionedPlan }) {
    const plates = planSheetImages(plan);
    if (!plates.length) return null;

    /* Decided once across the whole section rather than per option, because
       the options stack down the same column and a plate that changed shape
       between them would read as a mistake. */
    const ratio = plateRatio(plates);
    const wording = planWording(plan);

    /* Grouped back into the options they came from, in the order the data
       lists them: two alternative layouts of one building read as two sets of
       drawings, never as four loose sheets. */
    const groups = plan.options
        .map((option) => ({
            name: option.name,
            note: option.note,
            plates: plates.filter((plate) => plate.option === option.name),
        }))
        .filter((group) => group.plates.length);

    return (
        <section aria-labelledby="sheets-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="sheets-heading" eyebrow="The drawings themselves"
                    lines={["The sheets,", "as they were drawn"]}
                    lede={`${wording.sheets}, reproduced whole and uncropped. Open any sheet to read it at full size, at the scale the architect drew it to.`} />

                {groups.map((group) => (
                    <div key={group.name} className="flex flex-col gap-6">
                        <header data-reveal="left" className="flex flex-col gap-2">
                            <div className="flex items-baseline gap-4">
                                <h3 className="font-display text-xl font-light tracking-tight">{group.name}</h3>
                                <span aria-hidden="true"
                                    className="h-px flex-1 bg-linear-to-r from-champagne-400/60 to-transparent dark:from-champagne-300/50" />
                            </div>
                            {group.note ? (
                                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {group.note}
                                </p>
                            ) : null}
                        </header>

                        <div data-stagger="120" className="grid items-start gap-6 lg:grid-cols-2">
                            {group.plates.map((plate) => (
                                <SheetPlateFigure key={plate.image.src} plate={plate} ratio={ratio} />
                            ))}
                        </div>
                    </div>
                ))}

                <p data-reveal="up"
                    className="max-w-3xl border-l border-champagne-400/50 pl-5 text-xs leading-relaxed text-slate-500 dark:border-champagne-300/40 dark:text-stone-100/50">
                    Drawings are {wording.reproduced} and are not to scale on screen. Dimensions written on the
                    sheet govern; anything measured off the picture does not.
                </p>
            </Container>
        </section>
    );
}

/* One sheet, mounted. The paper stays white in both themes because that is
   what the drawing is — black line work on a white sheet, which inverts into
   an unreadable negative the moment you try to theme it. The plate around it
   carries the dark mode instead. */

function SheetPlateFigure({ plate, ratio }: { plate: SheetPlate; ratio: string | null }) {
    const corner = "absolute size-3 border-champagne-400/70";

    /* A mixed set, where the section could not settle on one shape. Stacked
       one to a row on a phone a plate answers only to its own sheet, so it
       takes that sheet's orientation and wastes no paper; from `sm` up the
       plates sit two abreast and have each other to line up with, which is
       what the square is for. */
    const shape =
        ratio ??
        `${orientation(plate.image) === "portrait" ? "aspect-3/4" : "aspect-4/3"} sm:aspect-square`;

    return (
        <figure data-reveal="up" className="group flex flex-col gap-3">
            <a href={encodeURI(plate.file)} target="_blank" rel="noopener noreferrer"
                className={`relative block ${shape} overflow-hidden rounded-xl border border-slate-900/15 bg-white p-3 transition-[border-color,box-shadow] duration-500 ease-out hover:border-champagne-400 hover:shadow-[0_30px_60px_-30px] hover:shadow-navy-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-400 sm:p-4 dark:border-stone-100/15 dark:hover:border-champagne-300`}>
                <Image src={plate.image.src} alt={plate.image.alt} width={plate.image.width}
                    height={plate.image.height} quality={90} sizes="(min-width: 1024px) 46vw, 92vw"
                    className="size-full object-contain" />

                <span aria-hidden="true" className={`${corner} left-3 top-3 border-l border-t`} />
                <span aria-hidden="true" className={`${corner} right-3 top-3 border-r border-t`} />
                <span aria-hidden="true" className={`${corner} bottom-3 left-3 border-b border-l`} />
                <span aria-hidden="true" className={`${corner} bottom-3 right-3 border-b border-r`} />

                {/* Rises off the bottom edge of the sheet on hover, the way the
                    highlight strip does on a project card. */}
                <span aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-navy-950/85 px-5 py-3 font-display text-xs uppercase tracking-luxe text-champagne-300 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
                    Open the full sheet
                </span>

                <span className="sr-only">(opens the drawing as a PDF in a new tab)</span>
            </a>

            <figcaption
                className="flex items-baseline gap-3 font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                <span className="text-champagne-500 dark:text-champagne-300">PDF</span>
                <span className="text-slate-700 dark:text-stone-100/75">{plate.label}</span>
                <span aria-hidden="true"
                    className="mb-1 flex-1 border-b border-dotted border-slate-900/20 dark:border-stone-100/20" />
                <span>{plate.option}</span>
            </figcaption>
        </figure>
    );
}
