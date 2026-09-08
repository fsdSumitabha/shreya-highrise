import { Fragment } from "react";
import type { Block } from "@/data/privacy";

/* ── One policy block, rendered ───────────────────────────────────────────
   The privacy copy in src/data/privacy.ts is a list of typed blocks rather
   than a slab of HTML, so the page stays semantic — a table is a <table>
   with a <caption>, a definition list is a <dl>, and a crawler reads the
   structure instead of guessing at it.

   Nothing here is a client component and nothing animates: a legal notice
   should be readable the instant the HTML lands, with JS off, in a reader
   view, and in whatever a search engine renders it into. */

/** The only inline markup the policy copy uses: **bold** runs. */
function RichText({ value }: { value: string }) {
    return (
        <>
            {value.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                i % 2 === 1 ? (
                    <strong key={i} className="font-medium text-slate-900 dark:text-stone-100">
                        {part}
                    </strong>
                ) : (
                    <Fragment key={i}>{part}</Fragment>
                ),
            )}
        </>
    );
}

const PROSE = "text-[0.9375rem] leading-relaxed text-slate-600 dark:text-stone-100/70";
const HEAD_CELL =
    "border-b border-slate-900/15 px-4 py-3 text-left align-bottom font-display text-[0.65rem] " +
    "uppercase tracking-luxe text-champagne-500 dark:border-stone-100/15 dark:text-champagne-300";
const CELL =
    "border-b border-slate-900/8 px-4 py-3.5 align-top text-sm leading-relaxed " +
    "text-slate-600 dark:border-stone-100/8 dark:text-stone-100/70";

export default function PolicyBlock({ block }: { block: Block }) {
    switch (block.kind) {
        case "text":
            return (
                <p className={PROSE}>
                    <RichText value={block.body} />
                </p>
            );

        case "list":
            return (
                <ul className="flex flex-col gap-3">
                    {block.items.map((item) => (
                        <li key={item} className={`relative pl-6 ${PROSE}`}>
                            <span aria-hidden="true"
                                className="absolute left-0 top-[0.6em] size-1.5 rotate-45 bg-champagne-400/80 dark:bg-champagne-300/70" />
                            <RichText value={item} />
                        </li>
                    ))}
                </ul>
            );

        case "terms":
            return (
                <dl className="grid gap-px border border-slate-900/10 bg-slate-900/10 sm:grid-cols-[minmax(0,15rem)_1fr] dark:border-stone-100/10 dark:bg-stone-100/10">
                    {block.items.map((item) => (
                        <Fragment key={item.term}>
                            <dt className="bg-white px-4 py-3.5 font-display text-xs uppercase tracking-luxe text-slate-500 sm:py-4 dark:bg-navy-950 dark:text-stone-100/55">
                                {item.term}
                            </dt>
                            <dd className={`bg-white px-4 pb-4 pt-1 sm:py-4 dark:bg-navy-950 ${PROSE}`}>
                                <RichText value={item.detail} />
                            </dd>
                        </Fragment>
                    ))}
                </dl>
            );

        case "table":
            return (
                /* The scroll box, not the page, takes the overflow — a wide
                   table must never make the whole document swipe sideways. */
                <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[34rem] border-collapse text-left">
                        {block.caption ? (
                            <caption className="pb-3 text-left font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                                {block.caption}
                            </caption>
                        ) : null}
                        <thead>
                            <tr>
                                {block.head.map((cell) => (
                                    <th key={cell} scope="col" className={HEAD_CELL}>
                                        {cell}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Index keys: the rows are static copy, and the first
                                cell is not unique — §7 has two "Advertising" rows. */}
                            {block.rows.map((row, r) => (
                                <tr key={r}>
                                    {row.map((cell, i) => (
                                        <td key={i}
                                            className={`${CELL} ${i === 0 ? "font-medium text-slate-800 dark:text-stone-100/90" : ""}`}>
                                            <RichText value={cell} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case "links":
            return (
                <ul className="grid gap-px border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 dark:border-stone-100/10 dark:bg-stone-100/10">
                    {block.items.map((item) => (
                        <li key={item.href} className="bg-white dark:bg-navy-950">
                            <a href={item.href} target="_blank" rel="noreferrer noopener nofollow"
                                className="group flex h-full flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-champagne-100/45 dark:hover:bg-champagne-300/8">
                                <span className="flex items-baseline gap-2 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                    {item.label}
                                    <span aria-hidden="true"
                                        className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                                <span className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {item.note}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            );

        case "note":
            return (
                <aside className="relative bg-slate-100/70 px-5 py-4 pl-6 dark:bg-navy-900/45">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-champagne-300" />
                    <p className="text-[0.9375rem] leading-relaxed text-slate-600 dark:text-stone-100/70">
                        <RichText value={block.body} />
                    </p>
                </aside>
            );
    }
}
