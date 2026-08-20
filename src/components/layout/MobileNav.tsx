import Link from "next/link";
import { nav, site } from "@/data/site";

export default function MobileNav() {
    return (
        <details className="group relative lg:hidden">
            <summary aria-label="Open navigation menu"
                className="flex size-11 cursor-pointer list-none items-center justify-center border border-slate-900/20 dark:border-stone-100/20 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
                    <span className="block h-px bg-current transition-transform group-open:translate-y-2 group-open:rotate-45" />
                    <span className="block h-px bg-current transition-opacity group-open:opacity-0" />
                    <span className="block h-px bg-current transition-transform group-open:-translate-y-2 group-open:-rotate-45" />
                </span>
            </summary>
            <nav aria-label="Mobile"
                className="absolute right-0 top-14 z-50 flex w-64 flex-col border border-slate-900/15 bg-slate-100 p-2 shadow-xl dark:border-stone-100/15 dark:bg-navy-900">
                {nav.map((item) => (
                    <Link key={item.href} href={item.href}
                        className="px-4 py-3 font-display text-sm uppercase tracking-luxe hover:bg-slate-900/5 dark:hover:bg-stone-100/10">
                        {item.label}
                    </Link>
                ))}
                <a href={`tel:${site.phones[0].tel}`}
                    className="mt-1 bg-champagne-300 px-4 py-3 text-center font-display text-sm uppercase tracking-luxe text-navy-950">
                    Call {site.phones[0].display}
                </a>
            </nav>
        </details>
    );
}
