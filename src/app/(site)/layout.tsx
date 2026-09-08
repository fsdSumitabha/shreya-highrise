import SiteChrome from "@/components/layout/SiteChrome";

/* ── The client-facing shell ──────────────────────────────────────────────
   The chrome itself lives in <SiteChrome>; this file is only the statement
   that every route inside the (site) group wears it.

   It used to be the root layout, which meant every route in the app got the
   chrome — including /internal, a build-time tool that wants none of it. It
   sits in a (site) route group instead, so the chrome is opt-in by folder: a
   route inside the group is a page of the website, a route outside it is not.
   The group name is in parentheses, so no URL changes. */

export default function SiteLayout({ children }: LayoutProps<"/">) {
    return <SiteChrome>{children}</SiteChrome>;
}
