import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { amenityGroups } from "@/data/amenities";

export default function Amenities() {
    return (
        <section aria-labelledby="amenities-heading" className="bg-navy-900 py-20 text-stone-100 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="amenities-heading" eyebrow="In every project" tone="dark"
                    title="The amenity set we build to"
                    lede="Scale changes from address to address, but the checklist does not. We build what residents actually book — a clubhouse that fills on weekends, a gym that opens at five, and services still running long after handover."/>
                <ImageFrame label="Clubhouse and rooftop deck — Riverstone Heights" tone="dark" ratio="aspect-21/9" />
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {amenityGroups.map((group) => (
                        <div key={group.group}
                            className="flex flex-col gap-4 border-t border-stone-100/15 pt-6">
                            <h3 className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                                {group.group}
                            </h3>
                            <ul className="flex flex-col gap-2.5">
                                {group.items.map((item) => (
                                    <li key={item} className="text-sm leading-relaxed text-stone-100/75">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
