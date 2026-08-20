import Container from "@/components/ui/Container";
import { stats } from "@/data/stats";

export default function StatsBand() {
    return (
        <section aria-label="Company track record"
            className="border-y border-slate-900/10 bg-white dark:border-stone-100/10 dark:bg-navy-900/40">
            <Container className="grid gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-2">
                        <p className="font-display text-5xl font-light leading-none tracking-tight text-champagne-400 sm:text-6xl dark:text-champagne-300">
                            {stat.value}
                        </p>
                        <p className="text-base font-medium">{stat.label}</p>
                        <p className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                            {stat.note}
                        </p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
