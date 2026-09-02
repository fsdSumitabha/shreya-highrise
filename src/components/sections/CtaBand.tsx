import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import SplitText from "@/components/motion/SplitText";
import { site } from "@/data/site";

/* The closing ask, on the same solid brand plate as <StatsBand>: brass in
   light, navy in dark, light type on both. champagne-500 for the same reason
   it is used there — it is the only gold in the ramp that white clears on. */

export default function CtaBand() {
    return (
        <section aria-labelledby="cta-heading"
            className="grain relative isolate overflow-hidden border-y border-transparent bg-champagne-500 py-20 text-white sm:py-28 dark:border-stone-100/10 dark:bg-navy-900 dark:text-stone-100">
            {/* Light catching the top-left corner of the plate. */}
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_140%_at_15%_-30%,rgba(255,255,255,0.20),transparent_62%)] dark:hidden" />
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent dark:via-champagne-300" />
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="aurora absolute left-1/4 top-[-30%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)] blur-3xl [--aurora-duration:28s] dark:bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_65%)]" />
                <div className="aurora absolute -right-32 bottom-[-40%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)] blur-3xl [--aurora-duration:36s] dark:bg-[radial-gradient(circle,rgba(60,130,190,0.20),transparent_65%)]" />
            </div>
            <div aria-hidden="true"
                className="blueprint-grid absolute inset-0 -z-10 text-white/60 [--grid-size:7rem] dark:text-stone-100/50" />

            <Container className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex max-w-2xl flex-col gap-6">
                    <p data-reveal="left"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-white dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        Visit a site this weekend
                    </p>
                    <h2 id="cta-heading"
                        className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                        <SplitText lines={["Walk the floor", "before you decide"]} delay={40} />
                    </h2>
                    <p data-reveal="up" style={{ "--rv-delay": "240ms" } as React.CSSProperties}
                        className="text-base leading-relaxed text-white/85 dark:text-stone-100/70">
                        Pick a project, pick a time. We arrange pickup within Kolkata and keep the visit to an
                        hour — no pressure, no closing script. {site.hours}
                    </p>
                </div>

                <div data-stagger="110" className="flex flex-col gap-5">
                    <div data-reveal="up">
                        <ActionLink href="/contact" variant="outlineLight">Schedule a visit</ActionLink>
                    </div>
                    <div data-reveal="up" className="flex flex-col gap-2">
                        {site.phones.map((phone) => (
                            <a key={phone.tel} href={`tel:${phone.tel}`}
                                className="group flex items-center gap-3 font-display text-2xl font-light tracking-tight transition-colors duration-300 hover:text-champagne-100 sm:text-3xl dark:text-stone-100 dark:hover:text-champagne-300">
                                <span aria-hidden="true"
                                    className="h-px w-5 bg-white/50 transition-all duration-500 ease-out group-hover:w-10 dark:bg-champagne-300/60" />
                                {phone.display}
                            </a>
                        ))}
                    </div>
                    <a data-reveal="up" href={`mailto:${site.emails.sales}`}
                        className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline dark:text-stone-100/60 dark:hover:text-champagne-300">
                        {site.emails.sales}
                    </a>
                </div>
            </Container>
        </section>
    );
}
