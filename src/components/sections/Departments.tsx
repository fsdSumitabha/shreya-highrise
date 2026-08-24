import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { departments } from "@/data/contact";
import { site } from "@/data/site";

export default function Departments() {
    return (
        <section aria-labelledby="departments-heading"
            className="bg-navy-900 py-20 text-stone-100 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="departments-heading" tone="dark" eyebrow="Who to write to"
                    title="Send it to the right desk"
                    lede="A misrouted email costs a day. These six addresses go straight to the people who can actually answer." />

                <ul className="grid gap-px border border-stone-100/12 bg-stone-100/12 sm:grid-cols-2 lg:grid-cols-3">
                    {departments.map((department) => (
                        <li key={department.name} className="flex flex-col gap-4 bg-navy-900 p-8 sm:p-9">
                            <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                                {department.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-stone-100/65">{department.purpose}</p>
                            <div className="mt-auto flex flex-col gap-1.5 border-t border-stone-100/12 pt-4">
                                <a href={`mailto:${department.email}`}
                                    className="break-words text-sm text-champagne-300 underline-offset-4 hover:underline">
                                    {department.email}
                                </a>
                                {department.phone ? (
                                    <p className="font-display text-xs uppercase tracking-luxe text-stone-100/45">
                                        {department.phone}
                                    </p>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="max-w-3xl border-l border-champagne-300/40 pl-6 text-sm leading-relaxed text-stone-100/55">
                    {site.legalName} · GSTIN {site.gstin}. For a complaint under the West Bengal Real Estate
                    (Regulation and Development) rules, write to the grievance desk above with your project name,
                    unit number and WBRERA registration number. You will have a written acknowledgement within
                    three working days.
                </p>
            </Container>
        </section>
    );
}
