import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/ui/FaqItem";
import { contactFaqs } from "@/data/contact";

export default function ContactFaq() {
    return (
        <section aria-labelledby="contact-faq-heading" className="py-20 sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                <SectionHeading id="contact-faq-heading" eyebrow="Practical questions"
                    title="Getting hold of us"
                    lede="Everything about buying itself is answered on the home page. This is just about reaching a person."
                    className="lg:col-span-5" />
                <div className="flex flex-col border-t border-slate-900/10 lg:col-span-7 dark:border-stone-100/10">
                    {contactFaqs.map((faq) => (
                        <FaqItem key={faq.question} faq={faq} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
