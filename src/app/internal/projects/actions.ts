"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { appendTempProject, dropTempProject, type TempProject } from "@/data/tempProjects";

/* Server Actions are reachable by direct POST, not only through the page, so
   the dev-only gate has to be repeated here — the check on the page itself
   does not protect them. */
function devOnly() {
    if (process.env.NODE_ENV === "production") notFound();
}

export async function captureProject(formData: FormData) {
    devOnly();

    const read = (key: string) => String(formData.get(key) ?? "").trim();

    // The only rule on this sheet: a project has to be called something.
    const name = read("name");
    if (!name) redirect("/internal/projects?state=noname");

    const project: TempProject = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        address: read("address"),
        status: read("status"),
        rera: read("rera"),
        flatTypes: formData.getAll("flatTypes").map(String),
        sizeFrom: read("sizeFrom"),
        sizeTo: read("sizeTo"),
        areaBasis: read("areaBasis"),
        price2bhk: read("price2bhk"),
        price3bhk: read("price3bhk"),
        price4bhk: read("price4bhk"),
        possession: read("possession"),
        totalFlats: read("totalFlats"),
        floors: read("floors"),
        handedOver: read("handedOver"),
        families: read("families"),
        highlights: [read("highlight1"), read("highlight2"), read("highlight3")].filter(Boolean),
        nearby: [1, 2, 3]
            .map((n) => ({ name: read(`nearby${n}`), distance: read(`nearbyAt${n}`) }))
            .filter((place) => place.name || place.distance),
        floorPlan: read("floorPlan"),
        brochure: read("brochure"),
        photos: read("photos"),
        capturedAt: new Date().toISOString(),
    };

    await appendTempProject(project);
    revalidatePath("/internal/projects");
    redirect("/internal/projects?state=saved");
}

export async function removeProject(formData: FormData) {
    devOnly();

    await dropTempProject(String(formData.get("id") ?? ""));
    revalidatePath("/internal/projects");
    redirect("/internal/projects?state=removed");
}
