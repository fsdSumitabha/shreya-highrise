import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    return (
        <section aria-labelledby="testimonials-heading" className="py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="testimonials-heading" eyebrow="Resident voices"
                    title="1,450 families, and the reason they stayed"
                    lede="Quotes collected at handover and again two years later, published with the owners' consent."/>
                <div className="grid gap-6 lg:grid-cols-3">
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.name} testimonial={item} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
