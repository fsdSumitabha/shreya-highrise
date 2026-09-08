import Container from "@/components/ui/Container";
import Ornament from "@/components/ui/Ornament";
import { policyMeta, summary } from "@/data/privacy";

/* The whole policy in five lines, printed before the policy proper.

   Not a legal shortcut — everything here is stated again, and more precisely,
   in the numbered sections below. It exists because the DPDP Act asks for
   clear and plain language, and because almost nobody reads past the first
   screen of a privacy policy. The people who stop here should still leave
   knowing the four things that matter. */

const dateLabel = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });

export default function PolicySummary() {
    return (
        <section aria-labelledby="summary-heading" className="bg-slate-100 py-16 sm:py-20 dark:bg-navy-950">
            <Container className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h2 id="summary-heading"
                        className="flex items-center gap-3 font-display text-xs uppercase tracking-luxe text-champagne-500 dark:text-champagne-300">
                        <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                        In short
                    </h2>
                    <Ornament className="max-w-xs text-slate-900 dark:text-stone-100" />
                </div>

                <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {summary.map((item) => (
                        <div key={item.term} className="flex flex-col gap-2 border-t border-champagne-400/45 pt-4 dark:border-champagne-300/35">
                            <dt className="font-display text-lg font-light tracking-tight">{item.term}</dt>
                            <dd className="text-sm leading-relaxed text-slate-600 dark:text-stone-100/65">
                                {item.detail}
                            </dd>
                        </div>
                    ))}
                </dl>

                <p className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/10 pt-6 font-display text-xs uppercase tracking-luxe text-slate-500 dark:border-stone-100/10 dark:text-stone-100/45">
                    <span>
                        In force from{" "}
                        <time dateTime={policyMeta.effective}>{dateLabel(policyMeta.effective)}</time>
                    </span>
                    <span aria-hidden="true" className="size-1 rotate-45 bg-champagne-400/70" />
                    <span>
                        Last updated{" "}
                        <time dateTime={policyMeta.updated}>{dateLabel(policyMeta.updated)}</time>
                    </span>
                    <span aria-hidden="true" className="size-1 rotate-45 bg-champagne-400/70" />
                    <span>Version {policyMeta.version}</span>
                </p>
            </Container>
        </section>
    );
}
