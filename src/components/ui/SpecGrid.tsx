export type Spec = { term: string; value: string };

type Props = {
    facts: Spec[];
    /** Column count at the widest breakpoint. Below it the grid halves. */
    columns?: 2 | 3 | 4;
    /** Hairlines above and below, as on a project card. */
    ruled?: boolean;
    className?: string;
};

const columnClass: Record<2 | 3 | 4, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
};

/* A schedule of facts — the same little dl on a card, in a project hero and
   under a floor plan. Callers pass only the facts they actually hold, so an
   address the client has half-answered renders a short grid rather than a
   row of dashes. Empty in, nothing out. */

export default function SpecGrid({ facts, columns = 2, ruled = false, className = "" }: Props) {
    if (!facts.length) return null;

    const rule = ruled ? "border-y border-slate-900/10 py-4 dark:border-stone-100/10" : "";

    return (
        <dl className={`grid gap-x-4 gap-y-3 text-sm ${columnClass[columns]} ${rule} ${className}`}>
            {facts.map((fact) => (
                <div key={fact.term}>
                    <dt className="font-display text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-stone-100/50">
                        {fact.term}
                    </dt>
                    <dd className="mt-1 font-medium">{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}
