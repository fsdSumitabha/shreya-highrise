import Link from "next/link";
import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import BrandMark from "@/components/layout/BrandMark";
import MobileNav from "@/components/layout/MobileNav";
import { nav, site } from "@/data/site";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-slate-100/85 backdrop-blur-md dark:border-stone-100/10 dark:bg-navy-950/85">
            <Container className="flex items-center justify-between gap-6 py-4">
                <Link href="/" aria-label={`${site.name} — home`}>
                    <BrandMark />
                </Link>
                <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href}
                            className="font-display text-xs uppercase tracking-luxe text-slate-700 transition-colors hover:text-champagne-400 dark:text-stone-100/75 dark:hover:text-champagne-300">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <ActionLink href={`tel:${site.phones[0].tel}`} className="max-lg:hidden">
                    {site.phones[0].display}
                </ActionLink>
                <MobileNav />
            </Container>
        </header>
    );
}
