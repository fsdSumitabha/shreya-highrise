import Container from "@/components/ui/Container";
import { credentials, lenders } from "@/data/assurance";

export default function Assurance() {
    return (
        <section aria-labelledby="assurance-heading"
            className="border-y border-slate-900/10 bg-white py-16 dark:border-stone-100/10 dark:bg-navy-900/30">
            <Container className="flex flex-col gap-12">
                <h2 id="assurance-heading"
                    className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                    Approved, registered and financeable
                </h2>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {credentials.map((item) => (
                        <li key={item.label}
                            className="flex flex-col gap-2 border-l-2 border-champagne-300 pl-5">
                            <span className="font-display text-xs uppercase tracking-luxe text-champagne-400 dark:text-champagne-300">
                                {item.label}
                            </span>
                            <span className="font-display text-lg font-light tracking-tight sm:text-xl">
                                {item.value}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col gap-5 border-t border-slate-900/10 pt-8 dark:border-stone-100/10">
                    <h3 className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                        Home-loan partners
                    </h3>
                    <ul className="flex flex-wrap gap-x-10 gap-y-4">
                        {lenders.map((lender) => (
                            <li key={lender}
                                className="font-display text-base font-light tracking-tight text-slate-600 sm:text-lg dark:text-stone-100/65">
                                {lender}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}
