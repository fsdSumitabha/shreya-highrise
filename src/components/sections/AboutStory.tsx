import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import Ornament from "@/components/ui/Ornament";
import { story } from "@/data/about";

const [opening, ...rest] = story.paragraphs;

export default function AboutStory() {
    return (
        <section aria-labelledby="story-heading" className="py-20 sm:py-28">
            <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-10 lg:col-span-7">
                    <SectionHeading id="story-heading" eyebrow={story.eyebrow} title={story.heading} />
                    <Ornament className="max-w-40 text-slate-900 dark:text-stone-100" />

                    <div className="flex flex-col gap-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/70">
                        <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-light first-letter:leading-[0.75] first-letter:text-champagne-400 sm:first-letter:text-7xl dark:first-letter:text-champagne-300">
                            {opening}
                        </p>
                        {rest.slice(0, 1).map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    <figure className="flex flex-col gap-5 border-y border-slate-900/15 py-9 dark:border-stone-100/15">
                        <p aria-hidden="true" className="font-display text-6xl leading-[0.5] text-champagne-300">
                            &ldquo;
                        </p>
                        <blockquote className="font-display text-2xl font-light leading-tight tracking-tight sm:text-4xl">
                            {story.pullQuote}
                        </blockquote>
                        <figcaption className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                            {story.pullQuoteBy}
                        </figcaption>
                    </figure>

                    <div className="flex flex-col gap-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-stone-100/70">
                        {rest.slice(1).map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-10">
                    <ImageFrame label={story.imageOne} ratio="aspect-4/5" />
                    <ImageFrame label={story.imageTwo} ratio="aspect-square" className="lg:ml-12" />
                </div>
            </Container>
        </section>
    );
}
