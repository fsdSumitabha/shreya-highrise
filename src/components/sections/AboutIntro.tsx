import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { leadership, site } from "@/data/site";

export default function AboutIntro() {
    return (
        <section aria-labelledby="about-heading" className="relative overflow-hidden py-20 sm:py-28">
            {/* Founding year, set enormous and almost invisible behind the copy. */}
            <span aria-hidden="true" data-parallax="0.06"
                className="pointer-events-none absolute -right-10 top-6 select-none font-display text-[22rem] font-light leading-none tracking-tighter text-slate-900/[0.035] max-lg:hidden dark:text-stone-100/[0.03]">
                {site.founded}
            </span>

            <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-8">
                    <SectionHeading id="about-heading" eyebrow="Who we are"
                        lines={["Building across", <>Kolkata since {site.founded}</>]}
                        lede="Shreya High Rise began with a single four-storey building on Rabindra Sarani in New Barrackpur. Eighteen years on, we plan, fund and construct high-rise residences at ten addresses across the city — still run day to day by the three people who started it." />

                    <div data-reveal="rule" className="h-px w-full origin-left bg-slate-900/10 dark:bg-stone-100/10" />

                    <ul data-stagger="120" className="grid gap-6 sm:grid-cols-3">
                        {leadership.map((person) => (
                            <li key={person.name} data-reveal="up" className="group flex flex-col gap-1.5">
                                <span aria-hidden="true"
                                    className="mb-2 block h-px w-6 bg-champagne-400 transition-all duration-500 ease-out group-hover:w-full dark:bg-champagne-300" />
                                <p className="font-display text-lg font-medium leading-tight">{person.name}</p>
                                <p className="font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                                    {person.role}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-stone-100/65">{person.focus}</p>
                            </li>
                        ))}
                    </ul>

                    <div data-reveal="up">
                        <ActionLink href="/about" variant="ghost" arrow className="self-start">
                            Read our full story
                        </ActionLink>
                    </div>
                </div>

                {/* data-parallax and data-reveal both write transform, so they live on
                    separate elements rather than fighting over one. */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div data-parallax="0.05" className="sm:mt-12">
                        <div data-reveal="curtain" className="group">
                            <ImageFrame label="Site engineer reviewing drawings" ratio="aspect-3/4" zoom />
                        </div>
                    </div>
                    <div data-parallax="-0.05">
                        <div data-reveal="curtain" className="group"
                            style={{ "--rv-delay": "160ms" } as React.CSSProperties}>
                            <ImageFrame label="Handover ceremony with residents" ratio="aspect-3/4" zoom />
                        </div>
                    </div>
                </div>

            </Container>
        </section>
    );
}
