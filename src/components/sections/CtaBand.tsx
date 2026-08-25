import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import SplitText from "@/components/motion/SplitText";
import { site } from "@/data/site";

export default function CtaBand() {
    return (
        <section aria-labelledby="cta-heading"
            className="grain relative isolate overflow-hidden bg-navy-900 py-20 text-stone-100 sm:py-28">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="aurora absolute left-1/4 top-[-30%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_65%)] blur-3xl [--aurora-duration:28s]" />
                <div className="aurora absolute -right-32 bottom-[-40%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(60,130,190,0.20),transparent_65%)] blur-3xl [--aurora-duration:36s]" />
            </div>
            <div aria-hidden="true"
                className="blueprint-grid absolute inset-0 -z-10 text-stone-100/50 [--grid-size:7rem]" />

            <Container className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex max-w-2xl flex-col gap-6">
                    <p data-reveal="left"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-champagne-300" />
                        Visit a site this weekend
                    </p>
                    <h2 id="cta-heading"
                        className="font-display text-4xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                        <SplitText lines={["Walk the floor", "before you decide"]} delay={40} />
                    </h2>
                    <p data-reveal="up" style={{ "--rv-delay": "240ms" } as React.CSSProperties}
                        className="text-base leading-relaxed text-stone-100/70">
                        Pick a project, pick a time. We arrange pickup within Kolkata and keep the visit to an
                        hour — no pressure, no closing script. {site.hours}
                    </p>
                </div>

                <div data-stagger="110" className="flex flex-col gap-5">
                    <div data-reveal="up">
                        <ActionLink href="/contact">Schedule a visit</ActionLink>
                    </div>
                    <div data-reveal="up" className="flex flex-col gap-2">
                        {site.phones.map((phone) => (
                            <a key={phone.tel} href={`tel:${phone.tel}`}
                                className="group flex items-center gap-3 font-display text-2xl font-light tracking-tight text-stone-100 transition-colors duration-300 hover:text-champagne-300 sm:text-3xl">
                                <span aria-hidden="true"
                                    className="h-px w-5 bg-champagne-300/60 transition-all duration-500 ease-out group-hover:w-10" />
                                {phone.display}
                            </a>
                        ))}
                    </div>
                    <a data-reveal="up" href={`mailto:${site.emails.sales}`}
                        className="text-sm text-stone-100/60 underline-offset-4 transition-colors hover:text-champagne-300 hover:underline">
                        {site.emails.sales}
                    </a>
                </div>
            </Container>
        </section>
    );
}
