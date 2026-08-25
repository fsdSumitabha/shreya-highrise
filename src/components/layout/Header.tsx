import Link from "next/link";
import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import BrandMark from "@/components/layout/BrandMark";
import MobileNav from "@/components/layout/MobileNav";
import { nav, site } from "@/data/site";

export default function Header() {
    return (
        <header
            className="sticky top-0 z-50 border-b border-transparent bg-slate-100/70 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 [html[data-scrolled]_&]:border-slate-900/10 [html[data-scrolled]_&]:bg-slate-100/90 [html[data-scrolled]_&]:shadow-[0_10px_30px_-24px_rgba(7,21,35,0.9)] dark:bg-navy-950/70 dark:[html[data-scrolled]_&]:border-stone-100/10 dark:[html[data-scrolled]_&]:bg-navy-950/90">
            <Container
                className="flex items-center justify-between gap-6 py-4 transition-[padding] duration-500 ease-out [html[data-scrolled]_&]:py-2.5">
                <Link href="/" aria-label={`${site.name} — home`}
                    className="transition-transform duration-500 ease-out [html[data-scrolled]_&]:scale-95 [html[data-scrolled]_&]:origin-left">
                    <BrandMark />
                </Link>
                <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href}
                            className="group relative py-1 font-display text-xs uppercase tracking-luxe text-slate-700 transition-colors hover:text-champagne-500 dark:text-stone-100/75 dark:hover:text-champagne-300">
                            {item.label}
                            <span aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-champagne-400 transition-transform duration-400 ease-out group-hover:origin-left group-hover:scale-x-100 dark:bg-champagne-300" />
                        </Link>
                    ))}
                </nav>
                <ActionLink href={`tel:${site.phones[0].tel}`} arrow={false}
                    className="max-lg:hidden [html[data-scrolled]_&]:px-6 [html[data-scrolled]_&]:py-3">
                    {site.phones[0].display}
                </ActionLink>
                <MobileNav />
            </Container>
        </header>
    );
}
