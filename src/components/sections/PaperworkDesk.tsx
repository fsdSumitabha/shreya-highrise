import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import { paperworkIntro, paperworkServices } from "@/data/paperwork";
import { site } from "@/data/site";

/* The documentation desk, deliberately the shortest section on the page.

   Everything above it sells a building; this sells a service, and it sits
   between two tall sections, so it is built as a band rather than a chapter —
   one screen at most on a desktop, no photography, no full-bleed graphic.

   The one flourish is the stamp: hovering a service lands a rubber stamp on
   its card, scaled down and set at an angle as though it had just been pressed.
   That is the whole interaction, it costs one transition, and it is the only
   place on the site where the motif fits. */

export default function PaperworkDesk() {
    return (
        <section aria-labelledby="paperwork-heading"
            className="border-y border-slate-900/10 py-20 sm:py-24 dark:border-stone-100/10">
            <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                <div className="flex flex-col gap-8">
                    <SectionHeading id="paperwork-heading" eyebrow="Property & land documentation"
                        lines={["Any paperwork.", "Any land work."]} lede={paperworkIntro.lede} />

                    <div data-stagger="120" className="flex flex-col gap-5">
                        <div data-reveal="up">
                            <ActionLink href="/contact">Bring us your file</ActionLink>
                        </div>
                        <a data-reveal="up" href={`tel:${site.phones[0].tel}`}
                            className="group flex items-center gap-3 self-start font-display text-xl font-light tracking-tight transition-colors duration-300 hover:text-champagne-500 dark:hover:text-champagne-300">
                            <span aria-hidden="true"
                                className="h-px w-5 bg-slate-900/25 transition-all duration-500 ease-out group-hover:w-10 dark:bg-stone-100/30" />
                            {site.phones[0].display}
                        </a>
                    </div>
                </div>

                <ul data-stagger="110" className="grid gap-5 sm:grid-cols-2">
                    {paperworkServices.map((service, index) => (
                        <li key={service.title} data-reveal="up"
                            className="group relative flex flex-col gap-3 border border-slate-900/12 bg-white p-6 transition-colors duration-500 hover:border-champagne-400/45 dark:border-stone-100/12 dark:bg-navy-950 dark:hover:border-champagne-300/40">
                            {/* Pressed on as the pointer lands: it arrives
                                oversized and settles to size, which is what makes
                                it read as a stamp rather than a label fading in.
                                It lands beside the file number, which is kept to
                                two digits so there is nothing there to sit on. */}
                            <span aria-hidden="true"
                                className="pointer-events-none absolute right-5 top-5 scale-125 -rotate-12 border-2 border-champagne-400/50 px-2 py-1 font-display text-[0.6rem] uppercase tracking-luxe text-champagne-500 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 dark:border-champagne-300/45 dark:text-champagne-300">
                                {service.stamp}
                            </span>

                            <p className="font-display text-xs tracking-luxe text-champagne-500 dark:text-champagne-300">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="font-display text-2xl font-light leading-tight tracking-tight transition-colors duration-500 group-hover:text-champagne-500 dark:group-hover:text-champagne-300">
                                {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {service.body}
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
