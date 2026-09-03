import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { departments } from "@/data/contact";
import { site } from "@/data/site";

export default function Departments() {
    return (
        <section aria-labelledby="departments-heading"
            className="border-y border-slate-900/10 bg-white py-20 text-slate-900 sm:py-28 dark:border-stone-100/10 dark:bg-navy-900 dark:text-stone-100">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="departments-heading" eyebrow="Who to write to"
                    title="Send it to the right desk"
                    lede="A misrouted email costs a day. These six addresses go straight to the people who can actually answer." />

                <ul className="grid gap-px border border-slate-900/12 bg-slate-900/12 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-100/12 dark:bg-stone-100/12">
                    {departments.map((department) => (
                        <li key={department.name} className="flex flex-col gap-4 bg-white p-8 sm:p-9 dark:bg-navy-900">
                            <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                                {department.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {department.purpose}
                            </p>
                            <div className="mt-auto flex flex-col gap-1.5 border-t border-slate-900/12 pt-4 dark:border-stone-100/12">
                                <a href={`mailto:${department.email}`}
                                    className="break-words text-sm text-champagne-500 underline-offset-4 hover:underline dark:text-champagne-300">
                                    {department.email}
                                </a>
                                {department.phone ? (
                                    <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/45">
                                        {department.phone}
                                    </p>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="max-w-3xl border-l border-champagne-400/50 pl-6 text-sm leading-relaxed text-slate-500 dark:border-champagne-300/40 dark:text-stone-100/55">
                    {site.legalName} · CIN {site.cin} · GSTIN {site.gstin}. To raise a complaint about a project or a home
                    you have booked, write to the grievance desk above with your project name and unit number.
                    You will have a written acknowledgement within three working days.
                </p>
            </Container>
        </section>
    );
}
