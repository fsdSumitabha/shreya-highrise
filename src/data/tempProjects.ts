import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/* ── Build-time project intake ────────────────────────────────────────────
   A holding pen for project facts collected from the client while the site
   is being built, kept in a JSON file next to the real data modules rather
   than in a database. Nothing here is validated beyond a name: the point is
   to get what the client says onto paper, not to police it. Once a project
   is confirmed it gets promoted by hand into `projects.ts`, which stays the
   single source of truth for anything the public site renders.

   Server-side only — it touches the filesystem, so it must never be pulled
   into a Client Component. It also only works where the source tree is
   writable, which is why /internal is dev-gated. */

export type NearbyNote = { name: string; distance: string };

export type TempProject = {
    id: string;
    name: string;
    address: string;
    status: string;
    rera: string;
    flatTypes: string[];
    sizeFrom: string;
    sizeTo: string;
    areaBasis: string;
    price2bhk: string;
    price3bhk: string;
    price4bhk: string;
    possession: string;
    totalFlats: string;
    floors: string;
    handedOver: string;
    families: string;
    highlights: string[];
    nearby: NearbyNote[];
    floorPlan: string;
    brochure: string;
    photos: string;
    capturedAt: string;
};

export const TEMP_FILE = "src/data/temp-projects.json";

const filePath = path.join(process.cwd(), TEMP_FILE);

/** Missing or malformed file reads as an empty pen — never throws at render. */
export async function readTempProjects(): Promise<TempProject[]> {
    try {
        const parsed = JSON.parse(await readFile(filePath, "utf8")) as { projects?: TempProject[] };
        return Array.isArray(parsed?.projects) ? parsed.projects : [];
    } catch {
        return [];
    }
}

async function writeTempProjects(projects: TempProject[]) {
    await writeFile(filePath, `${JSON.stringify({ projects }, null, 4)}\n`, "utf8");
}

export async function appendTempProject(project: TempProject) {
    await writeTempProjects([...(await readTempProjects()), project]);
}

export async function dropTempProject(id: string) {
    await writeTempProjects((await readTempProjects()).filter((project) => project.id !== id));
}
