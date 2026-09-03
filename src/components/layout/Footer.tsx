import Link from "next/link";
import Container from "@/components/ui/Container";
import BrandMark from "@/components/layout/BrandMark";
import { nav, offices, site, socials } from "@/data/site";

export default function Footer() {
    return (
        <footer
            className="border-t border-slate-900/10 bg-slate-200 text-slate-900 dark:border-stone-100/10 dark:bg-navy-950 dark:text-stone-100">
            <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
                <div className="flex flex-col gap-6 lg:col-span-4">
                    <BrandMark />
                    <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                        {site.intro}
                    </p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {socials.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} target="_blank" rel="noreferrer noopener"
                                    className="font-display text-xs uppercase tracking-luxe text-slate-500 hover:text-champagne-500 dark:text-stone-100/60 dark:hover:text-champagne-300">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {offices.map((office) => (
                    <address key={office.label} className="flex flex-col gap-3 not-italic lg:col-span-3">
                        <h2 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                            {office.label}
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/70">
                            {office.lines.join(", ")}
                        </p>
                        <a href={`mailto:${office.email}`}
                            className="text-sm text-slate-600 underline-offset-4 hover:text-champagne-500 hover:underline dark:text-stone-100/70 dark:hover:text-champagne-300">
                            {office.email}
                        </a>
                    </address>
                ))}

                <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                            Explore
                        </h2>
                        <nav aria-label="Footer" className="flex flex-col gap-2">
                            {nav.map((item) => (
                                <Link key={item.href} href={item.href}
                                    className="text-sm text-slate-600 hover:text-champagne-500 dark:text-stone-100/70 dark:hover:text-champagne-300">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                            Sales
                        </h2>
                        {site.phones.map((phone) => (
                            <a key={phone.tel} href={`tel:${phone.tel}`}
                                className="text-sm text-slate-600 hover:text-champagne-500 dark:text-stone-100/70 dark:hover:text-champagne-300">
                                {phone.display}
                            </a>
                        ))}
                    </div>
                </div>
            </Container>

            <Container
                className="flex flex-col gap-3 border-t border-slate-900/10 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-stone-100/10 dark:text-stone-100/50">
                <p>
                    © {site.founded}–{new Date().getFullYear()} {site.legalName}. All rights reserved.
                </p>
                <p>CIN {site.cin} · GSTIN {site.gstin}</p>
            </Container>
            <Container className="pb-10">
                <p className="max-w-4xl text-xs leading-relaxed text-slate-500 dark:text-stone-100/40">
                    Disclaimer: Images, plans and specifications shown are indicative and subject to approval
                    by the competent authority. Nothing on this website constitutes an offer or contract.
                    Please refer to the sanctioned plan, the project details and the agreement for sale
                    before making a purchase decision.
                </p>
            </Container>
        </footer>
    );
}
