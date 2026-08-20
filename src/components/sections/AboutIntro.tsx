import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import ImageFrame from "@/components/ui/ImageFrame";
import { leadership, site } from "@/data/site";

export default function AboutIntro() {
    return (
        <section aria-labelledby="about-heading" className="py-20 sm:py-28">
            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-8">
                    <SectionHeading id="about-heading" eyebrow="Who we are"
                        title={<>Building across Kolkata since {site.founded}</>}
                        lede="Shreya High Rise began with a single four-storey building on Rabindra Sarani in New Barrackpur. Eighteen years on, we plan, fund and construct high-rise residences at ten addresses across the city — still run day to day by the three people who started it."/>
                    <div className="grid gap-6 border-t border-slate-900/10 pt-8 sm:grid-cols-3 dark:border-stone-100/10">
                        {leadership.map((person) => (
                            <div key={person.name} className="flex flex-col gap-1.5">
                                <p className="font-display text-lg font-medium leading-tight">
                                    {person.name}
                                </p>
                                <p className="font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                                    {person.role}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-stone-100/65">
                                    {person.focus}
                                </p>
                            </div>
                        ))}
                    </div>
                    <ActionLink href="/about" variant="ghost" className="self-start">
                        Read our full story →
                    </ActionLink>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <ImageFrame label="Site engineer reviewing drawings" ratio="aspect-3/4"
                        className="sm:mt-12" />
                    <ImageFrame label="Handover ceremony with residents" ratio="aspect-3/4" />
                </div>
            </Container>
        </section>
    );
}
