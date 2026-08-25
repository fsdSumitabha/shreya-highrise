import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActionLink from "@/components/ui/ActionLink";
import FaqItem from "@/components/ui/FaqItem";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";

export default function Faq() {
    return (
        <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                <div className="flex flex-col gap-8 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                    <SectionHeading id="faq-heading" eyebrow="Before you ask"
                        lines={["Questions we", "answer every week"]}
                        lede="Still unsure? Call the sales desk — a person picks up, not a form." />
                    <div data-reveal="up" className="flex flex-col gap-3">
                        <a href={`tel:${site.phones[0].tel}`}
                            className="font-display text-3xl font-light tracking-tight transition-colors duration-300 hover:text-champagne-500 sm:text-4xl dark:hover:text-champagne-300">
                            {site.phones[0].display}
                        </a>
                        <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                            {site.hours}
                        </p>
                        <ActionLink href="/contact" variant="ghost" arrow className="mt-2 self-start">
                            Send an enquiry instead
                        </ActionLink>
                    </div>
                </div>

                <div data-stagger="70"
                    className="flex flex-col border-t border-slate-900/10 lg:col-span-7 dark:border-stone-100/10">
                    {faqs.map((faq) => (
                        <div key={faq.question} data-reveal="up">
                            <FaqItem faq={faq} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
