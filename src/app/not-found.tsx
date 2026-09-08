import SiteChrome from "@/components/layout/SiteChrome";
import NotFound from "@/components/sections/NotFound";

/* The 404 for URLs that match no route at all.

   It sits at the root, not inside (site), because an unmatched URL never
   reaches a route group — Next renders this against the root layout alone. So
   the header and footer have to be asked for here; inside the group they come
   from the layout, which is why (site)/not-found.tsx renders the section bare. */

export default function GlobalNotFound() {
    return (
        <SiteChrome>
            <NotFound />
        </SiteChrome>
    );
}
