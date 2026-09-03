import type { Metadata, Viewport } from "next";
import { Jost, Instrument_Sans } from "next/font/google";
import { DEFAULT_THEME, THEME_COLOR, themeBootScript } from "@/components/layout/theme";
import { site } from "@/data/site";
import "./globals.css";

/* ── The shell, and only the shell ────────────────────────────────────────
   <html>, <body>, the fonts, the theme and the stylesheet — the things every
   route in the app needs, whether or not it is part of the website.

   The header, footer and the rest of the client-facing chrome are NOT here;
   they live in app/(site)/layout.tsx and wrap only the routes inside that
   group. A layout cannot opt out of its parent, so anything put back in this
   file lands on /internal too. */

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });
const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name} — High-Rise Apartments Across Kolkata`,
        template: `%s | ${site.name}`,
    },
    description: site.intro,
    applicationName: site.name,
    keywords: [
        "flats in New Town Kolkata", "high rise apartments Kolkata", "Shreya High Rise",
        "3 BHK New Town", "co-operative housing Rajarhat", "real estate developer Kolkata",
        "flats in Madhyamgram", "builders in Kolkata",
    ],
    authors: [{ name: site.legalName }],
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "/",
        siteName: site.name,
        title: `${site.name} — High-rise homes across Kolkata`,
        description: site.intro,
        images: [{ url: "/shreya_logo.png", width: 1080, height: 1080, alt: `${site.name} logo` }],
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: site.intro,
        images: ["/shreya_logo.png"],
    },
    robots: { index: true, follow: true },
};

/* One tag, not a prefers-color-scheme pair: the theme is a choice made on the
   page, not a device setting, so <ThemeToggle> rewrites this tag’s content
   when it flips. */
export const viewport: Viewport = {
    themeColor: THEME_COLOR[DEFAULT_THEME],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        /* data-theme carries the light default through SSR; the boot script
           below overwrites it before paint when a reader has chosen dark, which
           React would otherwise flag as a hydration mismatch. */
        <html lang="en-IN" data-theme={DEFAULT_THEME} suppressHydrationWarning
            className={`${jost.variable} ${instrumentSans.variable} h-full scroll-smooth antialiased`}>
            <body className="flex min-h-full flex-col bg-slate-100 pb-[4.25rem] font-sans lg:pb-0 text-slate-900 selection:bg-champagne-300 selection:text-navy-950 dark:bg-navy-950 dark:text-stone-100">
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
                {children}
            </body>
        </html>
    );
}
