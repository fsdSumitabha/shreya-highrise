import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import MobileCallBar from "@/components/layout/MobileCallBar";
import WhatsAppCta from "@/components/layout/WhatsAppCta";
import MotionRoot from "@/components/motion/MotionRoot";

/* ── The client-facing shell ──────────────────────────────────────────────
   Everything a visitor sees around a page: the skip link, the motion root,
   the header and footer, and the three floating affordances.

   This used to live in the root layout, which meant every route in the app
   got it — including /internal, a build-time tool that wants none of it. It
   sits in a (site) route group instead, so the chrome is opt-in by folder:
   a route inside the group is a page of the website, a route outside it is
   not. The group name is in parentheses, so no URL changes.

   The DOM this emits is identical to what the root layout emitted before,
   deliberately — the public site should not be able to tell it moved. */

export default function SiteLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <a href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-stone-100">
                Skip to main content
            </a>
            <MotionRoot />
            <ScrollProgress />
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
            <WhatsAppCta />
            <MobileCallBar />
        </>
    );
}
