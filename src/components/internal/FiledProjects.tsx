import { removeProject } from "@/app/internal/projects/actions";
import type { TempProject } from "@/data/tempProjects";

/* The filing tray under the sheet: everything captured so far, newest last,
   in the same hand as the form. Only what was actually answered is printed —
   a half-filled sheet should read as a half-filled sheet, not as a wall of
   empty labels, so blanks simply do not appear. */

const stamp: Record<string, string> = {
    Completed: "border-emerald-700/40 text-emerald-800 dark:border-emerald-300/40 dark:text-emerald-300",
    Ongoing: "border-champagne-500/60 text-champagne-500 dark:border-champagne-300/50 dark:text-champagne-300",
    Upcoming: "border-navy-600/40 text-navy-600 dark:border-navy-300/50 dark:text-navy-300",
};

function Fact({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <span className="font-paper text-[14px] text-slate-800 dark:text-stone-100/80">
            <span className="uppercase tracking-[0.08em] text-slate-500 dark:text-stone-100/40">{label} </span>
            {value}
        </span>
    );
}

function size(project: TempProject) {
    const span = [project.sizeFrom, project.sizeTo].filter(Boolean).join(" – ");
    if (!span) return "";
    return `${span} sq ft${project.areaBasis ? ` (${project.areaBasis.toLowerCase()})` : ""}`;
}

function prices(project: TempProject) {
    return [
        project.price2bhk && `2 BHK ${project.price2bhk}`,
        project.price3bhk && `3 BHK ${project.price3bhk}`,
        project.price4bhk && `4 BHK ${project.price4bhk}`,
    ]
        .filter(Boolean)
        .join(" / ");
}

function handover(project: TempProject) {
    return [
        project.handedOver && `handed over ${project.handedOver}`,
        project.families && `${project.families} families living there`,
    ]
        .filter(Boolean)
        .join(", ");
}

function attachments(project: TempProject) {
    return [
        project.floorPlan && `floor plan: ${project.floorPlan}`,
        project.brochure && `brochure: ${project.brochure}`,
        project.photos && `photos: ${project.photos}`,
    ]
        .filter(Boolean)
        .join(" · ");
}

export default function FiledProjects({ projects }: { projects: TempProject[] }) {
    if (projects.length === 0) {
        return (
            <p
                className="border border-dashed border-slate-900/25 px-5 py-8 text-center font-paper text-[14px] text-slate-500 dark:border-stone-100/20 dark:text-stone-100/40">
                No sheets filed yet — the first one goes above.
            </p>
        );
    }

    return (
        <ol className="grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
                <li key={project.id}
                    className="flex flex-col gap-2 border border-slate-900/25 bg-[#fdfbf4] px-5 py-4 dark:border-stone-100/12 dark:bg-navy-900">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-900/20 pb-2 dark:border-stone-100/15">
                        <h3 className="flex items-baseline gap-2.5 font-paper text-[16px] text-slate-900 dark:text-stone-100">
                            <span aria-hidden="true" className="text-[12px] text-champagne-500 dark:text-champagne-300">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {project.name}
                        </h3>
                        {project.status && (
                            <span
                                className={`border px-2 py-0.5 font-paper text-[12px] uppercase tracking-[0.14em] ${stamp[project.status] ?? "border-slate-900/30 text-slate-600 dark:border-stone-100/25 dark:text-stone-100/60"}`}>
                                {project.status}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Fact label="Address" value={project.address} />
                        <Fact label="RERA" value={project.rera} />
                        <div className="flex flex-wrap gap-x-5 gap-y-1">
                            <Fact label="Types" value={project.flatTypes.join(", ")} />
                            <Fact label="Size" value={size(project)} />
                        </div>
                        <Fact label="From" value={prices(project)} />
                        <div className="flex flex-wrap gap-x-5 gap-y-1">
                            <Fact label="Possession" value={project.possession} />
                            <Fact label="Flats" value={project.totalFlats} />
                            <Fact label="Floors" value={project.floors} />
                        </div>
                        <Fact label="Completed" value={handover(project)} />
                    </div>

                    {project.highlights.length > 0 && (
                        <ul className="flex flex-col gap-0.5 border-t border-dotted border-slate-900/20 pt-2 dark:border-stone-100/15">
                            {project.highlights.map((highlight) => (
                                <li key={highlight}
                                    className="font-paper text-[14px] text-slate-800 dark:text-stone-100/80">
                                    <span aria-hidden="true"
                                        className="text-champagne-500 dark:text-champagne-300">✦ </span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    )}

                    {project.nearby.length > 0 && (
                        <p className="font-paper text-[14px] text-slate-800 dark:text-stone-100/80">
                            <span className="uppercase tracking-[0.08em] text-slate-500 dark:text-stone-100/40">
                                Nearby{" "}
                            </span>
                            {project.nearby
                                .map((place) => [place.name, place.distance].filter(Boolean).join(" — "))
                                .join(" · ")}
                        </p>
                    )}

                    <Fact label="Attached" value={attachments(project)} />

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-dashed border-slate-900/20 pt-2 dark:border-stone-100/15">
                        {/* Deterministic on both sides of hydration — toLocaleString is not. */}
                        <span className="font-paper text-[12px] text-slate-400 dark:text-stone-100/30">
                            Filed {project.capturedAt.slice(0, 16).replace("T", " ")} UTC
                        </span>
                        <form action={removeProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <button type="submit"
                                className="font-paper text-[12px] text-slate-500 underline decoration-dotted underline-offset-4 transition-colors hover:text-red-700 dark:text-stone-100/40 dark:hover:text-red-400">
                                Tear up
                            </button>
                        </form>
                    </div>
                </li>
            ))}
        </ol>
    );
}
