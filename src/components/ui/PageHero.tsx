import Link from "next/link";
import Container from "@/components/ui/Container";
import LogoMark from "@/components/brand/LogoMark";

type Props = {
    eyebrow: string;
    heading: string;
    lede: string;
    marks?: string[];
    crumb: string;
};

export default function PageHero({ eyebrow, heading, lede, marks, crumb }: Props) {
    return (
        <section aria-labelledby="page-heading"
            className="relative isolate overflow-hidden bg-navy-950 text-stone-100">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <LogoMark className="absolute -right-10 -top-32 h-[150%] w-auto text-stone-100/5 sm:-right-4" />
                <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-champagne-300/50 to-transparent" />
            </div>

            <Container className="flex flex-col gap-7 pb-16 pt-14 sm:gap-9 sm:pb-24 sm:pt-20">
                <nav aria-label="Breadcrumb"
                    className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-stone-100/45">
                    <Link href="/" className="transition-colors hover:text-champagne-300">
                        Home
                    </Link>
                    <span aria-hidden="true" className="text-champagne-300/60">
                        /
                    </span>
                    <span className="text-stone-100/75">{crumb}</span>
                </nav>

                <div className="flex flex-col gap-6">
                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-300">{eyebrow}</p>
                    <h1 id="page-heading"
                        className="max-w-5xl font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                        {heading}
                    </h1>
                </div>

                <p className="max-w-2xl border-l border-champagne-300/40 pl-6 text-base leading-relaxed text-stone-100/70 sm:text-lg">
                    {lede}
                </p>

                {marks?.length ? (
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-stone-100/10 pt-7">
                        {marks.map((mark) => (
                            <li key={mark}
                                className="font-display text-xs uppercase tracking-luxe text-stone-100/50">
                                {mark}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </Container>
        </section>
    );
}
