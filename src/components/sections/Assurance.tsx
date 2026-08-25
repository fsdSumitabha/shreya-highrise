import Container from "@/components/ui/Container";
import Marquee from "@/components/motion/Marquee";
import { credentials, lenders } from "@/data/assurance";

export default function Assurance() {
    return (
        <section aria-labelledby="assurance-heading"
            className="border-y border-slate-900/10 bg-white py-16 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-12">
                <h2 id="assurance-heading" data-reveal="left"
                    className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    Approved, registered and financeable
                </h2>

                <ul data-stagger="110" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {credentials.map((item) => (
                        <li key={item.label} data-reveal="up" className="group relative flex flex-col gap-2 pl-5">
                            <span aria-hidden="true"
                                className="absolute inset-y-0 left-0 w-0.5 origin-top bg-champagne-300 transition-transform duration-500 ease-out group-hover:scale-y-110" />
                            <span className="font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                                {item.label}
                            </span>
                            <span className="font-display text-lg font-light tracking-tight sm:text-xl">
                                {item.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </Container>

            <div className="mt-12 flex flex-col gap-5 border-t border-slate-900/10 pt-8 dark:border-stone-100/10">
                <Container>
                    <h3 className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                        Home-loan partners
                    </h3>
                </Container>
                <Marquee items={lenders} duration={52}
                    itemClassName="font-display text-xl font-light tracking-tight text-slate-600 sm:text-2xl dark:text-stone-100/70" />
            </div>
        </section>
    );
}
