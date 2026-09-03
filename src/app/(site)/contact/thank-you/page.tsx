import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ActionLink from "@/components/ui/ActionLink";
import Ornament from "@/components/ui/Ornament";
import LogoMark from "@/components/brand/LogoMark";
import { responsePromise } from "@/data/contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Enquiry Received",
    description: "Your enquiry has reached the Shreya High Rise sales desk.",
    robots: { index: false, follow: true },
};

export default async function ThankYouPage({ searchParams }: PageProps<"/contact/thank-you">) {
    const { status } = await searchParams;
    const incomplete = status === "incomplete";

    return (
        <section aria-labelledby="thanks-heading"
            className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 py-20 text-stone-100 sm:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <LogoMark className="absolute -right-16 -top-40 h-[170%] w-auto text-stone-100/5" />
                <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/85 to-transparent" />
            </div>

            <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                <div className="flex flex-col gap-8 lg:col-span-7">
                    <p className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                        {incomplete ? "Something was missing" : "Enquiry received"}
                    </p>
                    <h1 id="thanks-heading"
                        className="font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
                        {incomplete ? (
                            <>
                                That did not
                                <br />
                                come through
                            </>
                        ) : (
                            <>
                                Thank you.
                                <br />
                                <span className="text-champagne-300">We have it.</span>
                            </>
                        )}
                    </h1>
                    <Ornament className="max-w-40 text-stone-100" />
                    <p className="max-w-xl text-base leading-relaxed text-stone-100/70 sm:text-lg">
                        {incomplete
                            ? "We need a name, a phone number we can reach you on, and your permission to call. Nothing was saved — go back and send it again, or simply call the sales desk and skip the form entirely."
                            : "Your enquiry is with the sales desk. Someone will call you within one working day with the projects that actually match what you asked for — and the full cost sheet attached before you travel anywhere."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {incomplete ? (
                            <ActionLink href="/contact#enquiry">Try again</ActionLink>
                        ) : (
                            <ActionLink href="/projects">Browse the projects</ActionLink>
                        )}
                        <ActionLink href={`tel:${site.phones[0].tel}`} variant="outlineLight">
                            Call {site.phones[0].display}
                        </ActionLink>
                    </div>
                </div>

                <div className="flex flex-col gap-8 border-t border-stone-100/15 pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                    <h2 className="font-display text-xs uppercase tracking-luxe text-champagne-300">
                        {incomplete ? "Reach us another way" : responsePromise.heading}
                    </h2>

                    {incomplete ? (
                        <ul className="flex flex-col gap-5">
                            {site.phones.map((phone) => (
                                <li key={phone.tel}>
                                    <a href={`tel:${phone.tel}`}
                                        className="font-display text-2xl font-light tracking-tight transition-colors hover:text-champagne-300 sm:text-3xl">
                                        {phone.display}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href={`mailto:${site.emails.sales}`}
                                    className="text-sm text-stone-100/65 underline-offset-4 hover:text-champagne-300 hover:underline">
                                    {site.emails.sales}
                                </a>
                            </li>
                        </ul>
                    ) : (
                        <ol className="flex flex-col gap-7">
                            {responsePromise.steps.map((step, index) => (
                                <li key={step.title} className="flex gap-5">
                                    <span aria-hidden="true"
                                        className="mt-0.5 font-display text-sm tracking-luxe text-champagne-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="font-display text-lg font-medium tracking-tight">
                                            {step.title}
                                        </p>
                                        <p className="text-sm leading-relaxed text-stone-100/65">{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}

                    <p className="border-t border-stone-100/15 pt-6 text-xs leading-relaxed text-stone-100/45">
                        {site.hours}
                    </p>
                </div>
            </Container>
        </section>
    );
}
