import Container from "@/components/ui/Container";
import { channels } from "@/data/contact";

export default function ContactChannels() {
    return (
        <section aria-labelledby="channels-heading"
            className="border-b border-slate-900/10 bg-white dark:border-stone-100/10 dark:bg-navy-900/40">
            <Container className="flex flex-col gap-10 py-14 sm:py-16">
                <h2 id="channels-heading"
                    className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    Reach us directly
                </h2>
                <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {channels.map((channel) => (
                        <li key={channel.label} className="flex flex-col gap-2 border-l-2 border-champagne-300 pl-5">
                            <p className="font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                                {channel.label}
                            </p>
                            <a href={channel.href}
                                {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                                className="break-words font-display text-lg font-light tracking-tight underline-offset-8 transition-colors hover:text-champagne-500 hover:underline sm:text-xl dark:hover:text-champagne-300">
                                {channel.value}
                            </a>
                            <p className="text-sm text-slate-600 dark:text-stone-100/60">{channel.note}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
