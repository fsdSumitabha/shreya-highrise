import type { ReactNode } from "react";
import { captureProject } from "@/app/internal/projects/actions";

/* ── The intake sheet ─────────────────────────────────────────────────────
   Deliberately not a web form. It is the paper questionnaire we send the
   client, set in type: numbered items, ruled lines to write on, boxes to
   tick. Whoever is on a call with the client fills it in at the speed they
   talk, which is why the only field that can stop a submission is the
   project name.

   Flat on purpose — one hairline border, no shadow, no depth. A sheet of
   paper on a desk, not a card floating above one. It is given a viewport of
   height and the rows are spread through it (`content-between`), so the
   spacing is a printed form's rather than a dense web layout's.

   Plain inputs posting to a Server Action — no client JS, so the sheet
   files itself with or without hydration. */

const rule =
    "min-w-0 flex-1 border-b border-slate-900/30 bg-transparent px-1 pb-1 font-paper text-[15px] leading-6 text-slate-900 outline-none transition-colors placeholder:text-slate-900/25 focus:border-champagne-500 dark:border-stone-100/25 dark:text-stone-100 dark:placeholder:text-stone-100/20 dark:focus:border-champagne-300";
const legend = "shrink-0 font-paper text-[13px] font-medium text-slate-600 dark:text-stone-100/60";
const num = "w-5 shrink-0 font-paper text-[12px] text-champagne-500 dark:text-champagne-300";

function Row({ no, children, className = "" }: { no: string; children: ReactNode; className?: string }) {
    return (
        <div className={`flex min-w-0 items-baseline gap-3 ${className}`}>
            <span aria-hidden="true" className={num}>{no}</span>
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-6 gap-y-3">{children}</div>
        </div>
    );
}

function Field({ label, name, placeholder, required = false, className = "flex-1" }: {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <label className={`flex min-w-[10rem] items-baseline gap-2.5 ${className}`}>
            <span className={legend}>
                {label}
                {required && (
                    <span aria-hidden="true" className="text-champagne-500 dark:text-champagne-300"> *</span>
                )}
            </span>
            <input type="text" name={name} placeholder={placeholder} required={required} autoComplete="off"
                className={rule} />
        </label>
    );
}

/** A box you tick with a pen, not a browser checkbox. */
function Tick({ name, value, type = "checkbox" }: { name: string; value: string; type?: "checkbox" | "radio" }) {
    return (
        <label className="inline-flex cursor-pointer items-center gap-2">
            <input type={type} name={name} value={value} className="peer sr-only" />
            <span aria-hidden="true"
                className="grid size-4 shrink-0 place-items-center border border-slate-900/45 font-paper text-[13px] leading-none text-transparent transition-colors peer-checked:border-champagne-500 peer-checked:text-champagne-500 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne-500 dark:border-stone-100/45 dark:peer-checked:border-champagne-300 dark:peer-checked:text-champagne-300">
                ✓
            </span>
            <span className="font-paper text-[14px] text-slate-800 dark:text-stone-100/80">{value}</span>
        </label>
    );
}

function TickSet({ label, name, values, type = "checkbox" }: {
    label: string;
    name: string;
    values: string[];
    type?: "checkbox" | "radio";
}) {
    return (
        <fieldset className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-3">
            <legend className="sr-only">{label}</legend>
            <span aria-hidden="true" className={legend}>{label}</span>
            {values.map((value) => (
                <Tick key={value} name={name} value={value} type={type} />
            ))}
        </fieldset>
    );
}

export default function ProjectSheet({ sheetNo, notice }: { sheetNo: string; notice?: ReactNode }) {
    return (
        <form action={captureProject} autoComplete="off"
            className="flex flex-col border border-slate-900/25 bg-[#fdfbf4] px-5 py-5 sm:px-8 sm:py-6 lg:min-h-[82vh] dark:border-stone-100/20 dark:bg-navy-900">
            <header
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-slate-900/30 pb-3 dark:border-stone-100/25">
                <h2 className="font-paper text-[14px] uppercase tracking-[0.18em] text-slate-800 dark:text-stone-100/85">
                    Project data sheet
                </h2>
                <p className="font-paper text-[13px] text-slate-500 dark:text-stone-100/50">
                    Sheet no. {sheetNo} · one per project · name required, the rest as it comes
                </p>
            </header>

            {notice}

            {/* flex-1 + content-between spreads the thirteen items down the
                whole sheet instead of stacking them at the top. */}
            <div className="grid flex-1 content-between gap-x-14 gap-y-6 py-6 lg:grid-cols-2">
                <Row no="01">
                    <Field label="Project name" name="name" placeholder="Skyline One" required />
                </Row>
                <Row no="02">
                    <Field label="RERA no." name="rera" placeholder="WBRERA/P/NOR/2025/00…" />
                </Row>

                <Row no="03" className="lg:col-span-2">
                    <Field label="Address" name="address"
                        placeholder="Plot, street, locality, PIN — as written on the sanction" />
                </Row>

                <Row no="04">
                    <TickSet label="Status" name="status" type="radio"
                        values={["Completed", "Ongoing", "Upcoming"]} />
                </Row>
                <Row no="05">
                    <TickSet label="Flat types" name="flatTypes" values={["2 BHK", "3 BHK", "4 BHK", "Duplex"]} />
                </Row>

                <Row no="06">
                    <Field label="Flat size" name="sizeFrom" placeholder="890" className="w-36 flex-none" />
                    <Field label="to" name="sizeTo" placeholder="1,510" className="w-32 flex-none" />
                    <span className={legend}>sq ft</span>
                </Row>
                <Row no="07">
                    <TickSet label="Area quoted is" name="areaBasis" type="radio"
                        values={["Carpet", "Super built-up"]} />
                </Row>

                <Row no="08" className="lg:col-span-2">
                    <span className={legend}>Price starts from</span>
                    <Field label="2 BHK" name="price2bhk" placeholder="₹62 L" className="w-48 flex-none" />
                    <Field label="3 BHK" name="price3bhk" placeholder="₹94 L" className="w-48 flex-none" />
                    <Field label="4 BHK" name="price4bhk" placeholder="₹1.4 Cr" className="w-48 flex-none" />
                </Row>

                <Row no="09" className="lg:col-span-2">
                    <Field label="Possession" name="possession" placeholder="Mar 2027 — as per the agreement"
                        className="min-w-[17rem] flex-1" />
                    <Field label="Total flats" name="totalFlats" placeholder="148" className="w-44 flex-none" />
                    <Field label="Floors" name="floors" placeholder="G+22" className="w-40 flex-none" />
                </Row>

                <Row no="10" className="lg:col-span-2">
                    <span className={legend}>If completed —</span>
                    <Field label="handed over" name="handedOver" placeholder="2024" className="w-48 flex-none" />
                    <Field label="families living there" name="families" placeholder="148"
                        className="w-64 flex-none" />
                </Row>

                <Row no="11" className="lg:col-span-2">
                    <span className={legend}>Three things that make it special</span>
                    <Field label="i" name="highlight1" placeholder="300 m from the metro" />
                    <Field label="ii" name="highlight2" placeholder="only 24 flats, no crowding" />
                    <Field label="iii" name="highlight3" placeholder="corner plot, three sides open" />
                </Row>

                <Row no="12" className="lg:col-span-2">
                    <span className={legend}>Three landmarks &amp; how far</span>
                    {[1, 2, 3].map((n) => (
                        <span key={n} className="flex min-w-[16rem] flex-1 items-baseline gap-3">
                            <Field label={String(n)} name={`nearby${n}`} placeholder="City Centre 2" />
                            <Field label="—" name={`nearbyAt${n}`} placeholder="1.5 km"
                                className="w-28 flex-none" />
                        </span>
                    ))}
                </Row>

                <Row no="13" className="lg:col-span-2">
                    <Field label="Floor plans" name="floorPlan" placeholder="file name or link" />
                    <Field label="Brochure" name="brochure" placeholder="file name or link" />
                    <Field label="Photos" name="photos" placeholder="outside · entrance · one finished flat" />
                </Row>
            </div>

            <div
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-900/30 pt-4 dark:border-stone-100/25">
                <p className="font-paper text-[13px] text-slate-500 dark:text-stone-100/50">
                    Leave blank whatever the client has not answered — blanks get filled in later.
                </p>
                <button type="submit"
                    className="border border-slate-900/60 px-7 py-2.5 font-paper text-[13px] uppercase tracking-[0.16em] text-slate-800 transition-colors hover:border-champagne-500 hover:bg-champagne-300 hover:text-navy-950 dark:border-stone-100/40 dark:text-stone-100/85 dark:hover:border-champagne-300 dark:hover:bg-champagne-300 dark:hover:text-navy-950">
                    File this sheet
                </button>
            </div>
        </form>
    );
}
