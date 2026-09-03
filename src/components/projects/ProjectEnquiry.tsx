import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import SplitText from "@/components/motion/SplitText";
import { site } from "@/data/site";
import type { Project } from "@/data/projects";

/* The closing ask, on the same brand plate as <CtaBand> — but naming the
   address the reader is standing on rather than the company. The WhatsApp
   link opens with the project already typed into the message, so nobody has
   to explain which of six societies they are calling about. */

export default function ProjectEnquiry({ project }: { project: Project }) {
    const phone = site.phones[0];
    const message = `Hello, I would like the cost sheet and floor plan for ${project.name}${
        project.locality ? ` (${project.locality})` : ""
    }.`;
    const whatsapp = `https://wa.me/${phone.tel.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

    return (
        <section aria-labelledby="enquiry-heading"
            className="grain relative isolate overflow-hidden border-y border-transparent bg-champagne-500 py-20 text-white sm:py-28 dark:border-stone-100/10 dark:bg-navy-900 dark:text-stone-100">
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_140%_at_15%_-30%,rgba(255,255,255,0.20),transparent_62%)] dark:hidden" />
            <div aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent dark:via-champagne-300" />
            <div aria-hidden="true"
                className="aurora absolute left-1/4 top-[-30%] -z-10 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)] blur-3xl [--aurora-duration:28s] dark:bg-[radial-gradient(circle,rgba(200,169,107,0.22),transparent_65%)]" />
            <div aria-hidden="true"
                className="blueprint-grid absolute inset-0 -z-10 text-white/60 [--grid-size:7rem] dark:text-stone-100/50" />

            <Container className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex max-w-2xl flex-col gap-6">
                    <p data-reveal="left"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-white dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        {project.name}
                    </p>
                    <h2 id="enquiry-heading"
                        className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
                        <SplitText lines={["Ask for the", "cost sheet"]} delay={40} />
                    </h2>
                    <p data-reveal="up" style={{ "--rv-delay": "240ms" } as React.CSSProperties}
                        className="text-base leading-relaxed text-white/85 dark:text-stone-100/70">
                        Area, floor rise, parking, GST and maintenance on one sheet, sent before you decide whether
                        a visit is worth your Sunday. {site.hours}
                    </p>
                </div>

                <div data-stagger="110" className="flex flex-col gap-5">
                    <div data-reveal="up" className="flex flex-wrap gap-4">
                        <ActionLink href="/contact" variant="outlineLight">
                            Book a site visit
                        </ActionLink>
                        <ActionLink href={whatsapp} variant="outlineLight">
                            Ask on WhatsApp
                        </ActionLink>
                    </div>
                    <a data-reveal="up" href={`tel:${phone.tel}`}
                        className="group flex items-center gap-3 font-display text-2xl font-light tracking-tight transition-colors duration-300 hover:text-champagne-100 sm:text-3xl dark:text-stone-100 dark:hover:text-champagne-300">
                        <span aria-hidden="true"
                            className="h-px w-5 bg-white/50 transition-all duration-500 ease-out group-hover:w-10 dark:bg-champagne-300/60" />
                        {phone.display}
                    </a>
                    <a data-reveal="up" href={`mailto:${site.emails.sales}?subject=${encodeURIComponent(project.name)}`}
                        className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline dark:text-stone-100/60 dark:hover:text-champagne-300">
                        {site.emails.sales}
                    </a>
                </div>
            </Container>
        </section>
    );
}
