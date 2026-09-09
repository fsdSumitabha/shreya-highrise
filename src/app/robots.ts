import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/* ── /robots.txt ──────────────────────────────────────────────────────────
   The door policy. Every crawler is welcome on the whole public site — the
   AI ones included, deliberately: /llms.txt exists to be read, and a builder
   whose six addresses are the entire product has nothing to gain by hiding
   them from the machines buyers now ask.

   Two things are shut. /internal is the intake sheet that turns the client's
   answers into src/data/projects.ts — it 404s in production anyway, and this
   keeps it out of a crawl log as well. /api is the enquiry endpoint, a POST
   handler with nothing at the other end of a GET.

   /contact/thank-you is NOT listed. It carries robots: noindex in its own
   metadata, and a page has to be crawled for that tag to be read — blocking
   it here would leave the URL indexable-by-hearsay, which is the one outcome
   we do not want for it. */

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/internal/", "/api/"] }],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}
