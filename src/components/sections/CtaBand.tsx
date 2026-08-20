import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import { site } from "@/data/site";

export default function CtaBand() {
    return (
        <section aria-labelledby="cta-heading" className="bg-navy-900 py-20 text-stone-100 sm:py-28">
            <Container className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex max-w-2xl flex-col gap-6">
                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                        Visit a site this weekend
                    </p>
                    <h2 id="cta-heading"
                        className="font-display text-4xl font-light leading-none tracking-tight sm:text-6xl lg:text-7xl">
                        Walk the floor
                        <br />
                        before you decide
                    </h2>
                    <p className="text-base leading-relaxed text-stone-100/70">
                        Pick a project, pick a time. We arrange pickup within Kolkata and keep the visit to an
                        hour — no pressure, no closing script. {site.hours}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <ActionLink href="/contact">Schedule a visit</ActionLink>
                    {site.phones.map((phone) => (
                        <a key={phone.tel} href={`tel:${phone.tel}`}
                            className="font-display text-2xl font-light tracking-tight text-stone-100 hover:text-champagne-300 sm:text-3xl">
                            {phone.display}
                        </a>
                    ))}
                    <a href={`mailto:${site.emails.sales}`}
                        className="text-sm text-stone-100/60 underline-offset-4 hover:text-champagne-300 hover:underline">
                        {site.emails.sales}
                    </a>
                </div>
            </Container>
        </section>
    );
}
