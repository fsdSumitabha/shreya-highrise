import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Ornament from "@/components/ui/Ornament";
import type { PlanOption, PlanSheet, SanctionedPlan } from "@/data/projects";

/* ── The sanctioned drawings ──────────────────────────────────────────────
   Everything in this section is read off the architect's sheets rather than
   off the price list, so it is set as a drawing sheet: ruled paper, a title
   block, area schedules as tables, and the PDFs themselves at the bottom of
   each option. The distinction matters commercially — what a buyer is told
   and what has been sanctioned are two different documents, and this section
   is only ever the second one.

   Where the architect has issued alternative layouts of the same building,
   each is an option rather than a project of its own: same plot, same title
   block, different schedule. Every block below is optional, so a project with
   nothing but two sheets and a plot size still renders correctly.

   Filenames arrive from the architect with spaces in them and are left that
   way on disk — encodeURI is applied here rather than renaming the files, so
   the asset on the server always matches the sheet the architect sent. */

export default function ProjectPlan({ plan }: { plan: SanctionedPlan }) {
    const titleBlock = [
        plan.plotAddress && { term: "Plot", value: plan.plotAddress },
        plan.plotSize && { term: "Plot size", value: plan.plotSize },
        plan.roadWidth && { term: "Frontage", value: plan.roadWidth },
        plan.stack && { term: "Storeys", value: plan.stack },
        plan.unitsPerFloor && { term: "Homes", value: plan.unitsPerFloor },
        plan.lift && { term: "Vertical core", value: plan.lift },
        plan.scale && { term: "Scale", value: plan.scale },
        plan.drawingNo && { term: "Drawing no.", value: plan.drawingNo },
    ].filter((row) => !!row);

    return (
        <section aria-labelledby="plan-heading"
            className="relative isolate overflow-hidden border-y border-slate-900/10 bg-slate-100 py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-950">
            <div aria-hidden="true"
                className="blueprint-grid pointer-events-none absolute inset-0 -z-10 text-slate-900/70 [--grid-size:4rem] dark:text-stone-100/60" />

            <Container className="flex flex-col gap-14">
                <SectionHeading id="plan-heading" eyebrow="From the sanctioned drawing"
                    lines={["What has actually", "been drawn"]}
                    lede={`${plan.title}. Areas, bays and services below are read straight off the architect's sheets — the sheets themselves are linked under each option.`} />

                {titleBlock.length ? (
                    <dl data-stagger="70"
                        className="grid gap-px border border-slate-900/15 bg-slate-900/15 sm:grid-cols-2 lg:grid-cols-4 dark:border-stone-100/12 dark:bg-stone-100/12">
                        {titleBlock.map((row) => (
                            <div key={row.term} data-reveal="up"
                                className="flex flex-col gap-1.5 bg-slate-100 p-5 dark:bg-navy-950">
                                <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50">
                                    {row.term}
                                </dt>
                                <dd className="text-sm font-medium leading-relaxed">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                ) : null}

                {plan.unitPlan?.length || plan.services?.length ? (
                    <div className="grid gap-10 sm:grid-cols-2">
                        <PlanList title="Drawn into every flat" items={plan.unitPlan} />
                        <PlanList title="On the ground floor" items={plan.services} />
                    </div>
                ) : null}

                <div data-stagger="120" className="grid gap-8 lg:grid-cols-2">
                    {plan.options.map((option) => (
                        <PlanOptionCard key={option.name} option={option} />
                    ))}
                </div>

                {plan.caveat ? (
                    <p data-reveal="up"
                        className="max-w-3xl border-l border-champagne-400/50 pl-5 text-xs leading-relaxed text-slate-500 dark:border-champagne-300/40 dark:text-stone-100/50">
                        {plan.caveat}
                    </p>
                ) : null}
            </Container>
        </section>
    );
}

function PlanList({ title, items }: { title: string; items?: string[] }) {
    if (!items?.length) return null;

    return (
        <div data-reveal="up" className="flex flex-col gap-4">
            <h3 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                {title}
            </h3>
            <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                    <li key={item}
                        className="flex items-baseline gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-stone-100/70">
                        <span aria-hidden="true"
                            className="mt-1 size-1 shrink-0 rotate-45 bg-champagne-400/60 dark:bg-champagne-300/50" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PlanOptionCard({ option }: { option: PlanOption }) {
    return (
        <article data-reveal="up"
            className="flex flex-col gap-6 border border-slate-900/15 bg-white p-6 sm:p-8 dark:border-stone-100/12 dark:bg-navy-900/50">
            <header className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-light tracking-tight">{option.name}</h3>
                {option.note ? (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">{option.note}</p>
                ) : null}
                <Ornament className="pt-1" />
            </header>

            {option.units?.length ? (
                <PlanTable caption="Tenement schedule"
                    head={["Unit", "Tenement", "Super built-up"]}
                    rows={option.units.map((unit) => [unit.unit, unit.tenement, unit.superBuiltUp])} />
            ) : null}

            {option.spaces?.length ? (
                <PlanTable caption="Ground floor"
                    head={["Space", "Built-up", "Super built-up"]}
                    rows={option.spaces.map((space) => [space.space, space.builtUp, space.superBuiltUp])} />
            ) : null}

            {option.parking ? (
                <p className="flex items-baseline gap-3 text-sm text-slate-600 dark:text-stone-100/70">
                    <span aria-hidden="true" className="size-1 rotate-45 bg-champagne-400 dark:bg-champagne-300" />
                    {option.parking}
                </p>
            ) : null}

            {option.sheets.length ? (
                <ul className="mt-auto flex flex-col gap-px border-t border-slate-900/10 pt-4 dark:border-stone-100/10">
                    {option.sheets.map((sheet) => (
                        <SheetLink key={sheet.file} sheet={sheet} />
                    ))}
                </ul>
            ) : null}
        </article>
    );
}

function PlanTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
    return (
        <table className="w-full text-left text-sm">
            <caption className="mb-2 text-left font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                {caption}
            </caption>
            <thead>
                <tr className="border-b border-slate-900/12 dark:border-stone-100/12">
                    {head.map((cell, i) => (
                        <th key={cell} scope="col"
                            className={`pb-2 font-display text-[10px] font-normal uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50 ${i ? "text-right" : ""}`}>
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/8 dark:divide-stone-100/8">
                {rows.map((row) => (
                    <tr key={row[0]}>
                        {row.map((cell, i) => (
                            <td key={cell + i}
                                className={`py-2.5 ${i ? "text-right tabular-nums text-slate-600 dark:text-stone-100/70" : "font-medium"}`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function SheetLink({ sheet }: { sheet: PlanSheet }) {
    return (
        <li>
            <a href={encodeURI(sheet.file)} target="_blank" rel="noopener noreferrer"
                className="group/sheet flex items-baseline gap-3 py-2 text-sm transition-colors hover:text-champagne-500 dark:hover:text-champagne-300">
                <span aria-hidden="true"
                    className="font-display text-[10px] uppercase tracking-[0.16em] text-champagne-500 dark:text-champagne-300">
                    PDF
                </span>
                <span>{sheet.label}</span>
                <span aria-hidden="true"
                    className="mb-1 flex-1 border-b border-dotted border-slate-900/20 dark:border-stone-100/20" />
                <span aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover/sheet:translate-x-1">
                    →
                </span>
                <span className="sr-only">(opens the drawing as a PDF in a new tab)</span>
            </a>
        </li>
    );
}
