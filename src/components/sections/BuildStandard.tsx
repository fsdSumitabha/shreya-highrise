import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { buildSpecs, buildStandard } from "@/data/about";

export default function BuildStandard() {
    return (
        <section aria-labelledby="standard-heading" className="bg-navy-900 py-20 text-stone-100 sm:py-28">
            <Container className="flex flex-col gap-14">
                <div className="grid items-end gap-10 lg:grid-cols-12">
                    <SectionHeading id="standard-heading" tone="dark" className="lg:col-span-7"
                        eyebrow={buildStandard.eyebrow} title={buildStandard.heading}
                        lede={buildStandard.lede} />
                    <ImageFrame label="Slab reinforcement before a pour — Skyline One" tone="dark"
                        ratio="aspect-3/2" className="lg:col-span-5" />
                </div>

                <dl className="grid gap-px border border-stone-100/12 bg-stone-100/12 lg:grid-cols-2">
                    {buildSpecs.map((spec) => (
                        <div key={spec.system}
                            className="flex flex-col gap-1.5 bg-navy-900 px-6 py-6 sm:grid sm:grid-cols-[9.5rem_1fr] sm:items-baseline sm:gap-6 sm:px-8">
                            <dt className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                                {spec.system}
                            </dt>
                            <dd className="text-sm leading-relaxed text-stone-100/75">{spec.detail}</dd>
                        </div>
                    ))}
                </dl>

                <p className="max-w-3xl border-l border-champagne-300/40 pl-6 text-sm leading-relaxed text-stone-100/55">
                    Brand names for cement, steel, lifts and fittings are listed in the specification annexure
                    attached to every agreement for sale. If a listed brand becomes unavailable, the substitute
                    must be of equal or higher grade and is recorded in writing before it is used.
                </p>
            </Container>
        </section>
    );
}
