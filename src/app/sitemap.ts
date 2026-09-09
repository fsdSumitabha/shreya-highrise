import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

/* ── /sitemap.xml ─────────────────────────────────────────────────────────
   Every indexable URL on the site, written out of the same catalogue the
   pages are: add a project to src/data/projects.ts and it appears here, in
   the index, in the enquiry dropdown and at its own address, without this
   file being opened.

   Left out on purpose: /contact/thank-you (noindex — it is the far side of a
   form, and a search result that lands there is a wasted click), /internal
   and /api (both closed in robots.ts).

   `lastModified` is the moment of the build. The site is fully static, so
   that is a true statement — this is when the page as it stands was
   published — but it is a coarse one: a build triggered for any reason
   re-dates all ten URLs. Giving a project a real revision date means adding a
   field to `Project` and reading it here; until the client's records carry
   one, the build date is the honest ceiling on what we know. */

const at = (path: string) => `${site.url}${path}`;

const published = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [
        { url: at("/"), lastModified: published, changeFrequency: "monthly", priority: 1 },
        { url: at("/projects"), lastModified: published, changeFrequency: "monthly", priority: 0.9 },
        { url: at("/contact"), lastModified: published, changeFrequency: "yearly", priority: 0.7 },
        { url: at("/about"), lastModified: published, changeFrequency: "yearly", priority: 0.6 },
        { url: at("/privacy"), lastModified: published, changeFrequency: "yearly", priority: 0.2 },
    ];

    /* A building still open for booking is worth more to a searcher than one
       handed over years ago — the priorities say so, and the elevation photo
       rides along so the address can also be found in image search. */
    const catalogue: MetadataRoute.Sitemap = projects.map((project) => ({
        url: at(`/projects/${project.slug}`),
        lastModified: published,
        changeFrequency: "monthly",
        priority: project.stage === "completed" ? 0.6 : 0.8,
        images: project.image ? [at(project.image)] : undefined,
    }));

    return [...pages, ...catalogue];
}
