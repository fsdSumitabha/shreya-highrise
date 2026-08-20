import type { Metadata, Viewport } from "next";
import { Jost, Instrument_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";
import "./globals.css";

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
        "3 BHK New Town", "RERA projects Rajarhat", "real estate developer Kolkata",
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

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
        { media: "(prefers-color-scheme: dark)", color: "#071523" },
    ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en-IN"
            className={`${jost.variable} ${instrumentSans.variable} h-full scroll-smooth antialiased`}>
            <body className="flex min-h-full flex-col bg-slate-100 font-sans text-slate-900 selection:bg-champagne-300 selection:text-navy-950 dark:bg-navy-950 dark:text-stone-100">
                <a href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-stone-100">
                    Skip to main content
                </a>
                <Header />
                <main id="main" className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
