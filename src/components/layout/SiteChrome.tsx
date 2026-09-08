import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import MobileCallBar from "@/components/layout/MobileCallBar";
import WhatsAppCta from "@/components/layout/WhatsAppCta";
import MotionRoot from "@/components/motion/MotionRoot";

/* ── Everything a visitor sees around a page ──────────────────────────────
   The skip link, the motion root, the header and footer, and the three
   floating affordances.

   This is a component rather than the body of app/(site)/layout.tsx because
   one route needs the chrome from outside that group: app/not-found.tsx,
   which catches unmatched URLs and therefore renders against the root layout,
   below which no (site) layout exists. Both callers render the same tree from
   here, so the 404 cannot drift away from the rest of the site. */

export default function SiteChrome({ children }: { children: ReactNode }) {
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
