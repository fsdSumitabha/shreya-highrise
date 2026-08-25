import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    return (
        <section aria-labelledby="testimonials-heading" className="relative overflow-hidden py-20 sm:py-28">
            <Container className="flex flex-col gap-14">
                <SectionHeading id="testimonials-heading" eyebrow="Resident voices"
                    lines={["1,450 families, and", "the reason they stayed"]}
                    lede="Quotes collected at handover and again two years later, published with the owners' consent." />

                {/* One swipeable rail on a phone, three columns from tablet up. */}
                <ul data-stagger="140"
                    className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
                    {testimonials.map((item) => (
                        <li key={item.name} data-reveal="up"
                            className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
                            <TestimonialCard testimonial={item} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
