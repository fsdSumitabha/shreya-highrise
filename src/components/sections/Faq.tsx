import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/ui/FaqItem";
import { faqs } from "@/data/faqs";

export default function Faq() {
    return (
        <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                <SectionHeading id="faq-heading" eyebrow="Before you ask"
                    title="Questions we answer every week"
                    lede="Still unsure? Call the sales desk — a person picks up, not a form."
                    className="lg:col-span-5" />
                <div className="flex flex-col border-t border-slate-900/10 lg:col-span-7 dark:border-stone-100/10">
                    {faqs.map((faq) => (
                        <FaqItem key={faq.question} faq={faq} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
