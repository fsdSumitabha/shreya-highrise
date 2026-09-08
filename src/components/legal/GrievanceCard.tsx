import { grievanceOfficer } from "@/data/privacy";

/* The published point of contact §13 of the DPDP Act and Rule 5(9) of the
   SPDI Rules both require.

   `name` is deliberately allowed to be empty: until the client names the
   officer, the card publishes the office, the desk and the address — which is
   a lawful fallback — rather than inventing a person. Fill the name in
   src/data/privacy.ts and the line appears. */

export default function GrievanceCard() {
    const rows: { term: string; detail: React.ReactNode }[] = [
        ...(grievanceOfficer.name ? [{ term: "Name", detail: grievanceOfficer.name }] : []),
        { term: "Designation", detail: grievanceOfficer.designation },
        { term: "Company", detail: grievanceOfficer.company },
        {
            term: "Email",
            detail: (
                <a href={`mailto:${grievanceOfficer.email}`}
                    className="underline-offset-4 hover:text-champagne-500 hover:underline dark:hover:text-champagne-300">
                    {grievanceOfficer.email}
                </a>
            ),
        },
        {
            term: "Phone",
            detail: (
                <a href={`tel:${grievanceOfficer.phone.tel}`}
                    className="underline-offset-4 hover:text-champagne-500 hover:underline dark:hover:text-champagne-300">
                    {grievanceOfficer.phone.display}
                </a>
            ),
        },
        { term: "Post", detail: grievanceOfficer.address.join(", ") },
        { term: "We acknowledge in", detail: `${grievanceOfficer.acknowledge} of receiving your complaint` },
        { term: "We answer within", detail: `${grievanceOfficer.resolve} of receiving your complaint` },
    ];

    return (
        <div className="border border-champagne-400/45 bg-champagne-100/35 dark:border-champagne-300/30 dark:bg-champagne-300/8">
            <h3 className="flex items-center gap-3 border-b border-champagne-400/35 px-5 py-4 font-display text-xs uppercase tracking-luxe text-champagne-600 sm:px-7 dark:border-champagne-300/25 dark:text-champagne-200">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                Grievance Officer
            </h3>

            <dl className="grid gap-x-6 gap-y-3.5 px-5 py-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:px-7">
                {rows.map((row) => (
                    <div key={row.term} className="contents">
                        <dt className="font-display text-xs uppercase tracking-luxe text-slate-500 dark:text-stone-100/50">
                            {row.term}
                        </dt>
                        <dd className="text-[0.9375rem] leading-relaxed text-slate-700 dark:text-stone-100/75">
                            {row.detail}
                        </dd>
                    </div>
                ))}
            </dl>

            <p className="border-t border-champagne-400/35 px-5 py-4 text-sm leading-relaxed text-slate-600 sm:px-7 dark:border-champagne-300/25 dark:text-stone-100/65">
                Still unresolved? Escalate to the{" "}
                <span className="font-medium text-slate-800 dark:text-stone-100">
                    Data Protection Board of India
                </span>
                , the statutory authority constituted under the Digital Personal Data Protection Act, 2023.
            </p>
        </div>
    );
}
