import Link from "next/link";
import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import Ornament from "@/components/ui/Ornament";
import LogoMark from "@/components/brand/LogoMark";
import { nav, site } from "@/data/site";

/* The 404 sheet — the same drafting paper every inner page opens on, ruled
   and watermarked, with nothing on it but the wrong turn and the way back.

   Deliberately free of [data-reveal]: this renders under app/not-found.tsx as
   well, where MotionRoot is mounted but the page has already been paid for by
   a wasted request. Nothing here should wait to be scrolled into. */

export default function NotFound() {
    return (
        <section aria-labelledby="notfound-heading"
            className="grain relative isolate flex min-h-[72svh] items-center overflow-hidden bg-white py-20 text-slate-900 sm:py-28 dark:bg-navy-950 dark:text-stone-100">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="blueprint-grid absolute inset-0 text-slate-900/65 [--grid-size:4.5rem] dark:text-stone-100/60" />
                <LogoMark
                    className="absolute -right-24 -top-32 h-[155%] w-auto text-slate-900/[0.06] sm:-right-16 dark:text-stone-100/[0.06]" />
                {/* Solid paper under the type, clear paper under the mark. */}
                <div
                    className="absolute inset-0 bg-linear-to-r from-white from-15% via-white/85 via-55% to-transparent to-95% dark:from-navy-950 dark:via-navy-950/85" />
            </div>

            <Container className="relative z-10 flex flex-col gap-7">
                <p className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                    <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                    Error 404
                </p>

                <h1 id="notfound-heading"
                    className="font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
                    This address
                    <br />
                    <span className="text-champagne-500 dark:text-champagne-300">was never built.</span>
                </h1>

                <Ornament className="max-w-40 text-slate-900 dark:text-stone-100" />

                <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/70">
                    The page you asked for has moved, or never existed. Everything we have built and everything we are
                    building is still one step away.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                    <ActionLink href="/">Back to home</ActionLink>
                    <ActionLink href="/projects" variant="outline">
                        Browse the projects
                    </ActionLink>
                </div>

                <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-900/10 pt-7 dark:border-stone-100/10">
                    {nav.slice(1).map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}
                                className="font-display text-xs uppercase tracking-luxe text-slate-500 transition-colors hover:text-champagne-500 dark:text-stone-100/50 dark:hover:text-champagne-300">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a href={`tel:${site.phones[0].tel}`}
                            className="font-display text-xs uppercase tracking-luxe text-slate-500 transition-colors hover:text-champagne-500 dark:text-stone-100/50 dark:hover:text-champagne-300">
                            {site.phones[0].display}
                        </a>
                    </li>
                </ul>
            </Container>
        </section>
    );
}
