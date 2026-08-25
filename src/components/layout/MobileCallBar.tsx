import Link from "next/link";
import { site } from "@/data/site";

/* Phone-only action bar. Slides up once the hero is behind you, so the
   fold stays clean and the two things a buyer actually taps are never
   more than a thumb away after that. */
export default function MobileCallBar() {
    return (
        <div
            className="fixed inset-x-0 bottom-0 z-50 translate-y-full border-t border-slate-900/10 bg-slate-100/95 backdrop-blur-md transition-transform duration-500 ease-out lg:hidden [html[data-deep]_&]:translate-y-0 dark:border-stone-100/10 dark:bg-navy-950/95">
            <div className="grid grid-cols-2 gap-px bg-slate-900/10 dark:bg-stone-100/10">
                <a href={`tel:${site.phones[0].tel}`}
                    className="flex items-center justify-center gap-2 bg-slate-100 py-4 font-display text-xs uppercase tracking-luxe dark:bg-navy-950">
                    Call the desk
                </a>
                <Link href="/contact"
                    className="flex items-center justify-center gap-2 bg-champagne-300 py-4 font-display text-xs uppercase tracking-luxe text-navy-950">
                    Book a visit
                </Link>
            </div>
        </div>
    );
}
