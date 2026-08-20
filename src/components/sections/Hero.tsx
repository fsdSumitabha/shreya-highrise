import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { site } from "@/data/site";

const marks = ["WBRERA registered", "Est. 2006", "10 addresses in Kolkata", "1,450 families"];

export default function Hero() {
    return (
        <section aria-labelledby="hero-heading"
            className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-navy-950 text-stone-100">
            <ImageFrame label="Hero — twin towers at dusk, New Town skyline" tone="dark" ratio="aspect-auto"
                bordered={false} className="absolute inset-0 -z-20" />
            <div aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/85 to-navy-950/40" />

            <Container className="flex flex-col gap-10 pb-14 pt-32 sm:pb-20">
                <p className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                    {site.locality}
                </p>
                <h1 id="hero-heading"
                    className="font-display text-6xl font-light leading-none tracking-tight sm:text-8xl lg:text-9xl xl:text-mega">
                    Homes that
                    <br />
                    <span className="text-champagne-300">rise</span> with the city
                </h1>
                <div className="flex flex-col gap-8 border-t border-stone-100/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
                    <p className="max-w-xl text-base leading-relaxed text-stone-100/75 sm:text-lg">
                        {site.intro}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <ActionLink href="/projects">View live projects</ActionLink>
                        <ActionLink href="/contact" variant="outlineLight">
                            Book a site visit
                        </ActionLink>
                    </div>
                </div>
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {marks.map((mark) => (
                        <li key={mark}
                            className="font-display text-xs uppercase tracking-luxe text-stone-100/55">
                            {mark}
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
