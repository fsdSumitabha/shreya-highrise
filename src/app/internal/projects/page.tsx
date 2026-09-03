import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CountUp from "@/components/motion/CountUp";
import ProjectSheet from "@/components/internal/ProjectSheet";
import FiledProjects from "@/components/internal/FiledProjects";
import { readTempProjects } from "@/data/tempProjects";
import { projects } from "@/data/projects";

/* ── /internal/projects ───────────────────────────────────────────────────
   A build-time desk, not a feature of the site. It exists so project facts
   can be taken down from the client one sheet at a time while the site is
   being written, and it writes straight into the source tree — which is
   exactly why it is dev-only: on a deployed build there is no writable
   source tree, and this is an unauthenticated page.

   Delete the route, the action, the two components and
   src/data/temp-projects.json once every project has been promoted into
   src/data/projects.ts. */

/* The typed-form face, loaded for this route only. Resolves --font-paper,
   which everything on the sheet is set in. */
const plexMono = IBM_Plex_Mono({
    variable: "--font-plex-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

export const metadata: Metadata = {
    // Absolute: no reason for a dev tool to wear the site's title template.
    title: { absolute: "Project intake — internal" },
    robots: { index: false, follow: false },
};

// Reads a file on every request; nothing here may be prerendered.
export const dynamic = "force-dynamic";

const notices: Record<string, { tone: "ok" | "bad"; text: string }> = {
    saved: { tone: "ok", text: "Sheet filed. The tally below has gone up by one." },
    removed: { tone: "ok", text: "Sheet torn up and removed from the file." },
    noname: { tone: "bad", text: "Nothing was saved — a sheet needs a project name. Everything else can wait." },
};

export default async function ProjectIntakePage({ searchParams }: PageProps<"/internal/projects">) {
    if (process.env.NODE_ENV === "production") notFound();

    const { state } = await searchParams;
    const notice = notices[String(state ?? "")];
    const captured = await readTempProjects();
    const total = projects.length + captured.length;

    return (
        <Container className={`${plexMono.variable} flex flex-col gap-6 py-8 sm:py-10`}>
            <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-slate-900/15 pb-5 dark:border-stone-100/12">
                <div className="flex flex-col gap-2">
                    <h1 className="font-display text-2xl font-light leading-none tracking-tight sm:text-4xl">
                        Project intake
                    </h1>
                </div>

                <dl className="flex items-end gap-8">
                    <div className="flex flex-col gap-1">
                        <dd className="font-display text-3xl font-semibold leading-none tracking-tight text-slate-900 sm:text-3xl dark:text-stone-100">
                            <CountUp to={total} duration={900} />
                        </dd>
                        <dt className="font-paper text-[12px] uppercase tracking-[0.12em] text-slate-600 dark:text-stone-100/45">
                            Projects on record
                        </dt>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-slate-900/15 pl-8 font-paper text-[13px] text-slate-600 dark:border-stone-100/12 dark:text-stone-100/45">
                        <p>
                            <span className="text-slate-900 dark:text-stone-100">{projects.length}</span> live in
                            projects.ts
                        </p>
                        <p>
                            <span className="text-slate-900 dark:text-stone-100">{captured.length}</span> captured
                            here
                        </p>
                    </div>
                </dl>
            </header>

            <ProjectSheet sheetNo={String(total + 1).padStart(2, "0")}
                notice={
                    notice && (
                        <p role="status"
                            className={`mb-3 border-l-2 px-3 py-1.5 font-paper text-[13px] ${
                                notice.tone === "ok"
                                    ? "border-champagne-500 text-slate-700 dark:border-champagne-300 dark:text-stone-100/75"
                                    : "border-red-700 text-red-800 dark:border-red-400 dark:text-red-300"
                            }`}>
                            {notice.text}
                        </p>
                    )
                } />

            <section aria-labelledby="filed-heading" className="flex flex-col gap-4">
                <h2 id="filed-heading"
                    className="flex items-baseline gap-3 font-paper text-[13px] uppercase tracking-[0.16em] text-slate-600 dark:text-stone-100/45">
                    Filed sheets
                    <span aria-hidden="true" className="h-px flex-1 bg-slate-900/15 dark:bg-stone-100/12" />
                    <span className="text-slate-900 dark:text-stone-100">
                        {String(captured.length).padStart(2, "0")}
                    </span>
                </h2>
                <FiledProjects projects={captured} />
            </section>
        </Container>
    );
}
