import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { leadership } from "@/data/site";

export default function Leadership() {
    return (
        <section aria-labelledby="leadership-heading"
            className="border-y border-slate-900/10 bg-white py-20 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="leadership-heading" eyebrow="Who runs it"
                    title="Three directors, and no layer between them and the site"
                    lede="Every drawing, every price sheet and every handover is signed by one of these three. There is no regional head, no project management company and no one else empowered to make a promise on our behalf." />

                <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                    {leadership.map((person) => (
                        <li key={person.name} className="flex flex-col gap-6">
                            <ImageFrame label={person.portrait} ratio="aspect-3/4" />
                            <div className="flex flex-col gap-3 border-t border-slate-900/15 pt-6 dark:border-stone-100/15">
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-display text-2xl font-light tracking-tight sm:text-3xl">
                                        {person.name}
                                    </h3>
                                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                        {person.role} · {person.since}
                                    </p>
                                </div>
                                <p className="text-sm font-medium">{person.focus}</p>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                    {person.bio}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
