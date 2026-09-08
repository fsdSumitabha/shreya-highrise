import { registeredOffice, site } from "@/data/site";

/* ── The privacy policy, as data ──────────────────────────────────────────
   Copy lives here; app/(site)/privacy/page.tsx only lays it out. Everything
   in this file describes what the site *actually does* — the enquiry form in
   src/lib/enquiry.ts, the in-memory rate limiter in src/lib/rate-limit.ts,
   the Gmail SMTP transport in src/lib/mail-transporter.ts, the two browser
   storage keys, and the one embedded Google Map on the contact page.

   If any of those change, this file changes with them. A privacy policy that
   describes a different website is worse than none: under s.4 of the DPDP Act
   the notice is the lawful basis, and an inaccurate notice invalidates it. */

/** Flip to `true` the day an analytics or advertising tag actually ships.
    It rewrites the status line in §7 and §8 from "not yet running" to "running",
    so the page can never claim one thing while the <head> does another. */
export const analyticsLive = false;

export type Block =
    | { kind: "text"; body: string }
    | { kind: "list"; items: string[] }
    | { kind: "terms"; items: { term: string; detail: string }[] }
    | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
    | { kind: "links"; items: { label: string; href: string; note: string }[] }
    | { kind: "note"; body: string };

export type PolicySection = {
    id: string;
    /** Short form for the contents rail; the full `title` is the <h2>. */
    short: string;
    title: string;
    lede?: string;
    blocks: Block[];
};

export const policyMeta = {
    eyebrow: "Legal",
    heading: "Privacy Policy",
    crumb: "Privacy Policy",
    lede: "What we collect when you enquire about a flat, why we hold it, who else sees it, how long it stays, and how to make us delete it. Written to the Digital Personal Data Protection Act, 2023 — and in plain English, because a notice nobody can read is not a notice.",
    marks: ["Effective 8 September 2026", "Version 1.0", "Governed by Indian law"],
    /** ISO dates — used for <time datetime> and the JSON-LD. */
    effective: "2026-09-08",
    updated: "2026-09-08",
    version: "1.0",
};

/* Named officer is still with the client — see CLIENT-DATA.md §11. Until it
   arrives the page publishes the office and the desk, which is a lawful
   fallback; the personal name is not, so it must be filled before go-live. */
export const grievanceOfficer = {
    name: "",
    designation: "Grievance Officer & Data Protection Contact",
    company: site.legalName,
    email: site.emails.projects,
    phone: site.phones[1],
    address: registeredOffice.lines,
    acknowledge: "three working days",
    resolve: "thirty days",
};

/** The one-screen version, printed before the policy proper. */
export const summary = [
    {
        term: "We collect very little",
        detail: "A name, a phone number, an optional email, and whatever you tell us about the flat you are looking for. Nothing else is asked for on this website.",
    },
    {
        term: "There is no lead database",
        detail: "The enquiry form sends an email to our own sales desk over an encrypted connection. It is not written to a database, a CRM or an ad platform.",
    },
    {
        term: "We do not sell your data",
        detail: "Not to brokers, not to data merchants, not to anyone. Your number is used to answer your enquiry and for nothing else.",
    },
    {
        term: "One call, then we stop",
        detail: "Tell us to stop calling — on the phone, over WhatsApp or by email — and we stop, and delete the enquiry if you ask us to.",
    },
    {
        term: "You can make us delete it",
        detail: "Write to the Grievance Officer below. We acknowledge in three working days and act within thirty.",
    },
];

/** The statutes this policy is written against. Rendered as a plate in §16. */
export const statutes = [
    {
        act: "Digital Personal Data Protection Act, 2023",
        note: "and the rules made under it — the primary Indian privacy statute. Sets our duties as a Data Fiduciary and your rights as a Data Principal.",
    },
    {
        act: "Information Technology Act, 2000",
        note: "§43A and §72A — compensation for negligent handling of personal data, and criminal liability for disclosing it in breach of a lawful contract.",
    },
    {
        act: "IT (Reasonable Security Practices and Sensitive Personal Data or Information) Rules, 2011",
        note: "The SPDI Rules — the requirement to publish this policy, to name a Grievance Officer, and to obtain consent before collecting financial or other sensitive information.",
    },
    {
        act: "TRAI Telecom Commercial Communications Customer Preference Regulations, 2018",
        note: "Governs the calls, SMS and WhatsApp messages we send you, and your right to refuse them.",
    },
    {
        act: "Companies Act, 2013 · Income-tax Act, 1961 · CGST Act, 2017",
        note: "Books, invoices and transaction records must be kept for years after a sale — which is why a booking cannot simply be erased on request.",
    },
    {
        act: "Registration Act, 1908 and the applicable stamp law",
        note: "Identity documents collected for the registration of a conveyance are filed with the sub-registrar, not held only by us.",
    },
    {
        act: "Consumer Protection Act, 2019",
        note: "Governs the accuracy of what we advertise and the complaints you can bring about it.",
    },
];

export const sections: PolicySection[] = [
    {
        id: "who-we-are",
        short: "Who we are",
        title: "Who we are, and what this policy covers",
        lede: "Under the Digital Personal Data Protection Act, 2023 we are the Data Fiduciary for the information described here — the company that decides why and how it is used. You are the Data Principal.",
        blocks: [
            {
                kind: "terms",
                items: [
                    { term: "Legal entity", detail: site.legalName },
                    { term: "CIN", detail: site.cin },
                    { term: "GSTIN", detail: site.gstin },
                    { term: "Registered office", detail: registeredOffice.lines.join(", ") },
                    { term: "Website", detail: site.url },
                    { term: "Data protection contact", detail: site.emails.projects },
                ],
            },
            {
                kind: "text",
                body: "This policy covers this website and everything that follows from it — the enquiry form, the calls, WhatsApp messages and emails we exchange with you afterwards, a site visit you book, and the paperwork if you go on to book a flat. It applies whether you reach us through the form, by phone, by email or in person at either office.",
            },
            {
                kind: "text",
                body: "It does not cover websites we link to. Google Maps, WhatsApp, our social profiles and the banks we introduce buyers to each run under their own policies, and we have no control over what they collect once you are on their side of the line.",
            },
            {
                kind: "note",
                body: "We are not registered with WBRERA. Nothing in this policy should be read as a representation that we are, and no data collected here is filed with that authority as a matter of course.",
            },
        ],
    },
    {
        id: "what-we-collect",
        short: "What we collect",
        title: "What we collect",
        lede: "Three kinds of information: what you type into the form, what your browser reveals in the act of loading a page, and what you hand over later if you actually buy something.",
        blocks: [
            { kind: "text", body: "**What you give us on this website.** The enquiry form asks for:" },
            {
                kind: "table",
                caption: "Every field the enquiry form collects",
                head: ["Field", "Required", "What we do with it"],
                rows: [
                    ["Name", "Yes", "To address you, and to log the enquiry"],
                    ["Phone number", "Yes", "The reply. Stored as ten digits — the +91 is fixed, and never stored twice"],
                    ["Email address", "No", "Sends you a copy of the enquiry, and becomes the Reply-To on our answer"],
                    ["Project of interest", "No", "So we send the right price sheet"],
                    ["Configuration, budget band, possession timeline", "No", "To shortlist units instead of sending you all of them"],
                    ["Buying to live in / invest / as an NRI", "No", "Changes the paperwork we prepare, not the price"],
                    ["Preferred site-visit date", "No", "To hold a slot"],
                    ["Your message", "No", "Read by a person at the sales desk"],
                    ["Consent tick", "Yes", "Recorded with the enquiry as proof that you asked us to call"],
                    ["Time received", "Automatic", "Set on our server, never taken from your browser"],
                ],
            },
            {
                kind: "text",
                body: "Nothing else on this site asks you for anything. There is no account to create, no newsletter, no chat widget and no payment page.",
            },
            {
                kind: "text",
                body: "**What is collected automatically.** Loading any page on the internet reveals some things whether you intend it or not:",
            },
            {
                kind: "list",
                items: [
                    "**Your IP address**, when — and only when — you submit the enquiry form. It is used to count submissions and stop the form being turned into a machine for mailing strangers. It is held in the server's memory for ten minutes, never written to disk, never attached to your enquiry, and lost entirely when the server restarts.",
                    "**Ordinary server logs** kept by our hosting provider: the page requested, the time, the response code, the browser and operating system string, and the address the request came from. We use them to keep the site up and to investigate abuse.",
                    "**The page you arrived from**, if your browser chooses to send one.",
                ],
            },
            {
                kind: "text",
                body: "**What you give us if you book.** Everything above happens on the website. A booking happens on paper, at an office, and needs more — identity and address proof, PAN, a photograph, co-applicant and nominee details, bank and home-loan information, and the documents your lender and the sub-registrar require. That information is collected offline, is governed by this policy all the same, and is dealt with in the next section.",
            },
            {
                kind: "text",
                body: "**What we never collect.** No card numbers, UPI IDs or net-banking credentials are handled by this website — there is nothing on it to pay for. We do not collect biometrics, we do not read your precise location, we do not buy lists of phone numbers, and we do not scrape or enrich your details from anywhere else.",
            },
        ],
    },
    {
        id: "sensitive",
        short: "Sensitive information",
        title: "Sensitive and financial information",
        lede: "The SPDI Rules, 2011 treat financial details, identity documents and health information as a separate and more protected class. We touch them only at the booking stage.",
        blocks: [
            {
                kind: "list",
                items: [
                    "**Financial information** — income proof, bank statements and loan sanction letters — is collected only when you ask us to coordinate a home loan, and goes only to the lender you name.",
                    "**PAN** is mandatory by law on a property transaction above the statutory threshold, and is quoted on the TDS challan and the conveyance.",
                    "**Aadhaar is optional.** Where you choose to give it as address proof we accept a masked Aadhaar, we do not use it for authentication, and we do not store the full twelve digits. No booking is refused for declining to give it.",
                    "**Identity documents** collected for registration are filed with the sub-registrar as the Registration Act, 1908 requires. Once filed they sit on that office's record and are outside our control.",
                ],
            },
            {
                kind: "note",
                body: "We ask for none of this on the website, and nobody from this company will ever ask you for a password, an OTP, a card number or a full Aadhaar number over the phone, on WhatsApp or by email. If someone does, it is not us — call the sales desk and tell us.",
            },
        ],
    },
    {
        id: "why",
        short: "Why we use it",
        title: "Why we use it, and on what legal basis",
        lede: "The DPDP Act allows personal data to be used only for the purpose it was given for. This is that purpose, written out — with the ground we rely on for each one.",
        blocks: [
            {
                kind: "table",
                caption: "Purpose, data used, and lawful basis",
                head: ["What we do", "What it uses", "Basis"],
                rows: [
                    ["Answer your enquiry — one call, and the price sheet you asked for", "Name, phone, email, form answers", "Your consent, and the fact that you gave it voluntarily for this purpose (DPDP §7(a))"],
                    ["Book and run a site visit", "Name, phone, preferred date", "Consent"],
                    ["Follow up on an enquiry you have not answered", "Name, phone", "Consent — withdrawable at any time"],
                    ["Prepare a cost sheet, allotment letter and agreement", "Everything above, plus booking details", "Performance of the contract you are entering"],
                    ["Coordinate a home loan", "The financial documents you supply", "Your explicit instruction"],
                    ["Statutory filings — TDS, GST, stamp duty, registration, books of account", "Transaction and identity records", "Legal obligation (DPDP §7(b))"],
                    ["Keep the site up and stop abuse of the enquiry form", "IP address, server logs", "Legitimate use — security of the service"],
                    ["Answer a complaint, or defend a claim", "Whatever the matter concerns", "Legal obligation, and the establishment of legal claims"],
                    ["Measure how the website is used, and advertise on Meta and Google", "Cookie and pixel identifiers — see §7 and §8", analyticsLive ? "Your consent, given through the cookie banner" : "Your consent — not yet sought, because none of it is running yet"],
                ],
            },
            {
                kind: "text",
                body: "We do not use your data for anything else. If we ever need to — a new purpose, not a new phrasing of the old one — we will ask you again before we do it.",
            },
            {
                kind: "text",
                body: "**No automated decisions.** Nothing here is decided by an algorithm. There is no lead score, no profiling engine and no automated rejection: a person at the sales desk reads your enquiry, and a person calls you back.",
            },
        ],
    },
    {
        id: "consent",
        short: "Consent",
        title: "Consent, and how to take it back",
        lede: "Consent under the DPDP Act must be free, specific, informed, unconditional and unambiguous — and it must be as easy to withdraw as it was to give.",
        blocks: [
            {
                kind: "text",
                body: "The tick box on the enquiry form is the consent. It says, in terms, that you would like us to contact you about that enquiry by phone, WhatsApp or email. It is not pre-ticked, the form will not send without it, and we record that you ticked it alongside the enquiry so both of us can point to it later.",
            },
            {
                kind: "text",
                body: `**To withdraw it**, tell the person who calls you, reply to any message we send, or write to ${site.emails.projects}. We stop within one working day. Withdrawing consent does not undo the calls already made, and it does not erase records we are separately required by law to keep — but it does end the contact.`,
            },
            {
                kind: "text",
                body: "**If you withdraw before you have booked**, we delete the enquiry entirely on request. **If you have already booked**, we can stop marketing contact but cannot delete the transaction record — §11 explains why.",
            },
            {
                kind: "note",
                body: "This notice is published in English. §5(3) of the DPDP Act gives you the right to it in any language in the Eighth Schedule to the Constitution — ask, and we will provide it in Bengali or Hindi.",
            },
        ],
    },
    {
        id: "device",
        short: "On your device",
        title: "What this website stores on your device",
        lede: "Two keys, both set by us, both readable only by this website, neither ever sent to our server.",
        blocks: [
            {
                kind: "table",
                caption: "Browser storage set by this website",
                head: ["Key", "Where", "What it holds", "How long"],
                rows: [
                    ["shreya-theme", "Local storage", "Whether you chose the light or the dark theme", "Until you clear your browser data"],
                    ["shr-wa-hushed", "Session storage", "That you dismissed the WhatsApp button, so it stays dismissed", "Until you close the tab"],
                ],
            },
            {
                kind: "text",
                body: "Neither is a cookie, neither identifies you, and neither leaves your browser. Clearing them costs you a theme preference and nothing else.",
            },
            {
                kind: "note",
                body: "The typefaces on this site are served from our own domain, not from Google's font servers. Loading a page here sends no request to Google for fonts, and therefore no IP address either.",
            },
        ],
    },
    {
        id: "cookies",
        short: "Cookies & pixels",
        title: "Cookies, pixels and similar technologies",
        lede: analyticsLive
            ? "This website uses cookies and similar technologies for the purposes set out below. Non-essential ones are set only after you accept them."
            : "As at the effective date of this policy, this website sets no analytics or advertising cookies of its own. The section below describes what runs today and what will run when we switch measurement and advertising on.",
        blocks: [
            {
                kind: "text",
                body: "A cookie is a small file a site asks your browser to keep. A pixel — Meta calls its own the Meta Pixel, Google calls its the global site tag — is a fragment of code that reports an event, such as a page view or a form submission, back to the platform. Local storage does the same job as a cookie without the file. We treat all three the same way here.",
            },
            {
                kind: "table",
                caption: "Cookie and tag categories",
                head: ["Category", "Who sets it", "What it is for", "Running today?"],
                rows: [
                    ["Strictly necessary", "Us, and our host", "Serving the page, balancing load, and rate-limiting the enquiry form. No consent is required for these and they cannot be switched off.", "Yes"],
                    ["Preference", "Us", "The theme and WhatsApp-button keys in §6.", "Yes"],
                    ["Third-party embed", "Google", "The map on the Contact page is an embedded Google Map. Google may set cookies such as NID and CONSENT when that frame loads, under its own policy.", "Yes, on /contact only"],
                    ["Analytics", "Google", "Google Analytics 4 (_ga, _ga_*) — how many people visit, which pages they read, where they came from.", analyticsLive ? "Yes, with consent" : "Not yet running"],
                    ["Advertising", "Meta", "Meta Pixel (_fbp) and the Conversions API — measuring and targeting our advertising on Facebook and Instagram.", analyticsLive ? "Yes, with consent" : "Not yet running"],
                    ["Advertising", "Google", "Google Ads conversion tracking and remarketing (_gcl_au, IDE) — measuring and targeting our advertising on Google and YouTube.", analyticsLive ? "Yes, with consent" : "Not yet running"],
                ],
            },
            {
                kind: "text",
                body: analyticsLive
                    ? "**How to control them.** Analytics and advertising cookies are set only if you accept them in the cookie banner, and you can change that choice at any time by clearing this site's data in your browser and choosing again. Strictly necessary cookies cannot be declined, because without them the page does not load and the form cannot be protected. Every major browser also lets you block or delete cookies wholesale, in its privacy settings — the site will still work."
                    : "**How to control them.** Today there is nothing to decline: we set no analytics or advertising cookie, so there is no banner asking you to accept one. Before the first such tag goes live we will publish a consent banner, ask you before it loads, and update this section on the same day. Strictly necessary cookies cannot be declined, because without them the page does not load and the form cannot be protected. Every major browser also lets you block or delete cookies wholesale, in its privacy settings — the site will still work.",
            },
            {
                kind: "note",
                body: "We do not honour Do Not Track or Global Privacy Control signals as a distinct mechanism, because no settled standard tells us what a compliant response looks like. The browser controls above — and the consent banner, once there is anything for it to gate — are the mechanism that does work.",
            },
        ],
    },
    {
        id: "advertising",
        short: "Meta & Google ads",
        title: "Advertising on Meta and Google",
        lede: "We advertise flats. This section exists because Meta's Business Tools Terms and the Google Analytics and Google Ads terms each require an advertiser to disclose, here, exactly what it does with your data — and because you are entitled to know.",
        blocks: [
            { kind: "text", body: "**Meta — Facebook, Instagram and WhatsApp.**" },
            {
                kind: "list",
                items: [
                    "**Meta Pixel and the Conversions API.** When these are live, an event such as *viewed a project page* or *submitted an enquiry* is reported to Meta. Where the event carries contact details, they are hashed — irreversibly scrambled with SHA-256 — in your browser or on our server before they are sent. Meta uses them to match the event to an account and to tell us the advertising worked.",
                    "**Custom and Lookalike Audiences.** We may ask Meta to show ads to people who have visited this site, and to people who resemble them. Any list we upload is hashed first, and we upload only records for which we hold consent.",
                    "**Lead ads.** If you fill in a form inside Facebook or Instagram rather than on this site, Meta collects it and passes it to us. Meta's own policy governs that collection; this policy governs everything we do with it afterwards.",
                    "**We do not target by sensitive category** — no religion, caste, health, sexual orientation or political belief — and we do not direct advertising at anyone under eighteen.",
                ],
            },
            { kind: "text", body: "**Google — Search, YouTube, Analytics and Maps.**" },
            {
                kind: "list",
                items: [
                    "**Google Analytics 4**, when live, measures traffic and behaviour in aggregate. We have IP anonymisation on where the setting is available and we do not send it any name, phone number or email address.",
                    "**Google Ads conversion tracking and remarketing**, when live, tells us which ads produced enquiries and lets us show ads to people who have already visited.",
                    "**Google Maps** is embedded on the Contact page today. Loading that page loads a frame from Google, which sees your IP address and may set its own cookies.",
                    "**Gmail** carries the enquiry itself — see §9. Google is our email provider, and processes the message on our instructions.",
                ],
            },
            {
                kind: "text",
                body: "**Opting out of personalised advertising.** These controls sit with the platforms, not with us, and they work across every advertiser — not only this one:",
            },
            {
                kind: "links",
                items: [
                    {
                        label: "Meta ad preferences",
                        href: "https://www.facebook.com/adpreferences/ad_settings",
                        note: "Turn off ads based on data from partners, and see which businesses have uploaded your details",
                    },
                    {
                        label: "Google ad settings",
                        href: "https://myadcenter.google.com/",
                        note: "Turn personalised advertising off across Google Search, YouTube and partner sites",
                    },
                    {
                        label: "Google Analytics opt-out add-on",
                        href: "https://tools.google.com/dlpage/gaoptout",
                        note: "A browser extension that stops Analytics on every website you visit",
                    },
                    {
                        label: "How Google uses data from sites that use its services",
                        href: "https://policies.google.com/technologies/partner-sites",
                        note: "Google's own account of what it receives from a site like this one",
                    },
                    {
                        label: "Meta Privacy Policy",
                        href: "https://www.facebook.com/privacy/policy",
                        note: "What Meta does with the data it receives",
                    },
                    {
                        label: "Google Privacy Policy",
                        href: "https://policies.google.com/privacy",
                        note: "What Google does with the data it receives",
                    },
                ],
            },
            {
                kind: "note",
                body: "Opting out of personalised advertising does not mean fewer ads. It means the ones you see are chosen without reference to what you have looked at.",
            },
        ],
    },
    {
        id: "sharing",
        short: "Who sees it",
        title: "Who else sees your data",
        lede: "A short list, and it is the whole list. We do not sell personal data, we do not rent it, and we do not trade it for leads.",
        blocks: [
            {
                kind: "terms",
                items: [
                    {
                        term: "Our own desks",
                        detail: "Sales, and construction and handover. Access is limited to the people who need it to answer you.",
                    },
                    {
                        term: "Google (Gmail)",
                        detail: "Our email runs on Gmail, so an enquiry sent from this site arrives in — and is stored in — a Google mailbox. Google processes it as our email provider, on our instructions, under its own security terms.",
                    },
                    {
                        term: "Our hosting provider",
                        detail: "Serves the website and keeps the server logs described in §2. Enquiries are not stored on the web server — with one exception: if the mail fails to send, the enquiry is written to the server log so that it can be recovered and answered rather than silently lost. Those log entries age out with every other log.",
                    },
                    {
                        term: "Meta (WhatsApp)",
                        detail: "Only if you choose to message us there. Tapping our WhatsApp button opens WhatsApp with a message drafted; nothing is sent, and Meta learns nothing, until you press send.",
                    },
                    {
                        term: "Banks and housing finance companies",
                        detail: "Only the lender you name, and only when you have asked us to arrange a loan.",
                    },
                    {
                        term: "Channel partners and brokers",
                        detail: "Only where you came to us through one, or told us to work with one. We do not circulate enquiries to brokers.",
                    },
                    {
                        term: "Professional advisers",
                        detail: "Our auditors, lawyers and chartered accountants, under professional confidentiality, when a matter requires it.",
                    },
                    {
                        term: "Government and regulators",
                        detail: "Where a law, a court order or a lawful demand requires it — tax authorities, the sub-registrar, a police investigation, or the Data Protection Board of India.",
                    },
                    {
                        term: "A buyer of the business",
                        detail: "If the company or a project is ever sold, merged or restructured, records may pass to the successor, who is bound by this policy until it tells you otherwise.",
                    },
                ],
            },
            {
                kind: "note",
                body: "Every processor above is engaged under a contract that binds it to use your data only for what we asked and to protect it — as §8(2) of the DPDP Act requires. It does not become theirs to use.",
            },
        ],
    },
    {
        id: "transfers",
        short: "Where it goes",
        title: "Where your data goes",
        lede: "Our records are held in India. Some of the services we use are not.",
        blocks: [
            {
                kind: "text",
                body: "Gmail, Google Analytics, Google Ads, Google Maps and Meta all operate global infrastructure, so data reaching them may be processed on servers outside India. §16 of the DPDP Act permits transfer outside India except to a country the Central Government has restricted by notification; we do not transfer to any restricted country, and we will stop any transfer that becomes restricted.",
            },
            {
                kind: "text",
                body: "Where a transfer happens, it is covered by the provider's own contractual data-protection terms, and it does not change your rights under this policy or your right to complain to us or to the Board.",
            },
        ],
    },
    {
        id: "retention",
        short: "How long",
        title: "How long we keep it",
        lede: "Long enough to do the job, and as long after that as the law insists. Not longer.",
        blocks: [
            {
                kind: "table",
                caption: "Retention periods",
                head: ["What", "How long", "Why"],
                rows: [
                    ["An enquiry you never took further", "24 months from our last contact, then deleted", "A property search runs for months, and buyers come back. After two years it is dead."],
                    ["An enquiry you asked us to delete", "Deleted on request, within 30 days", "Your right under DPDP §12"],
                    ["Your record of consent, and of withdrawing it", "3 years after the consent ends", "So we can prove we had permission when we called"],
                    ["IP addresses used for rate-limiting", "10 minutes, in memory only", "It exists to count submissions and nothing else"],
                    ["Server logs, including an enquiry that failed to send", "As our hosting provider retains them, typically 30 days", "Security, fault diagnosis, and recovering a lead the mail server dropped"],
                    ["Booking, payment, KYC and registration records", "At least 8 years from the end of the financial year", "Companies Act, 2013 §128; the CGST record rules; and the Income-tax Act assessment window"],
                    ["Anything under dispute", "Until the matter is finally closed, and the appeal period has run", "We cannot destroy evidence in a live proceeding"],
                ],
            },
            {
                kind: "text",
                body: "When a period ends, the record is deleted or irreversibly anonymised. Aggregate figures that cannot be traced back to a person — how many enquiries a project drew in a quarter — may be kept indefinitely.",
            },
        ],
    },
    {
        id: "security",
        short: "Security",
        title: "How we protect it, and what happens if it leaks",
        lede: "The strongest protection here is architectural: this website has no lead database to steal.",
        blocks: [
            {
                kind: "list",
                items: [
                    "**The site is served over HTTPS.** Everything you type into the form is encrypted in transit.",
                    "**There is no database.** The enquiry is composed on our server and sent straight to our own inbox over an authenticated, TLS-encrypted SMTP connection. Nothing is written to disk on the web server, so there is no store to breach.",
                    "**The mailbox is protected** by two-step verification, and the site authenticates to it with a scoped application password rather than the account password.",
                    "**The form is rate-limited** to five submissions per address in ten minutes, so it cannot be used to flood a stranger's inbox.",
                    "**Everything you type is sanitised** before it goes near an email header, which closes the header-injection route into our mail.",
                    "**Access is need-to-know.** Only the sales and handover desks read enquiries. Paper files at the offices are held in locked storage.",
                ],
            },
            {
                kind: "text",
                body: "These are reasonable security practices within the meaning of §43A of the Information Technology Act, 2000 and Rule 8 of the SPDI Rules, 2011. They are not a guarantee: no system carrying data across the internet is perfectly secure, and anyone who tells you otherwise is selling something.",
            },
            {
                kind: "text",
                body: "**If there is a breach.** §8(6) of the DPDP Act requires us to report a personal data breach to the Data Protection Board of India and to every affected person. We will do that without delay, in writing, telling you what happened, what data was involved, what we have done about it, and what you should do — even where the breach turns out to be minor.",
            },
        ],
    },
    {
        id: "rights",
        short: "Your rights",
        title: "Your rights, and your duties",
        lede: "Chapter III of the DPDP Act gives every Data Principal five rights. They are exercised by writing to the Grievance Officer in §17, and they are free.",
        blocks: [
            {
                kind: "terms",
                items: [
                    {
                        term: "Access — §11",
                        detail: "Ask what personal data of yours we hold, what we have done with it, and who we shared it with. We reply with a summary.",
                    },
                    {
                        term: "Correction and erasure — §12",
                        detail: "Have a wrong detail corrected, an incomplete one completed, an outdated one updated, and anything we no longer need erased.",
                    },
                    {
                        term: "Grievance redressal — §13",
                        detail: "Complain to us about how we have handled your data, and get a reasoned answer within the timelines in §17 — before taking it any further.",
                    },
                    {
                        term: "Nomination — §14",
                        detail: "Name someone to exercise these rights on your behalf if you die or become incapable of exercising them yourself. Write to us and we will record it.",
                    },
                    {
                        term: "Withdraw consent — §6(4)",
                        detail: "At any moment, as easily as you gave it. See §5.",
                    },
                ],
            },
            {
                kind: "text",
                body: "**How to exercise them.** Write to the address in §17 from the email address or phone number you gave us, or tell us how else to verify that the request is yours — we ask because handing your data to someone impersonating you is itself a breach. We do not charge, and we do not require a form.",
            },
            {
                kind: "text",
                body: "**We may have to refuse in part.** Erasure does not reach records the Companies Act, the tax statutes or a live dispute require us to keep, and it does not reach documents already filed with a sub-registrar. Where we refuse, we say so in writing and tell you which law requires it.",
            },
            {
                kind: "note",
                body: "**Your duties — §15.** The Act asks something of you in return: do not impersonate anyone when giving your details, do not file a false or frivolous complaint, do not suppress material information on a document required by law, and give authentic particulars when you ask for a correction. A complaint made in bad faith is punishable under the Act.",
            },
        ],
    },
    {
        id: "children",
        short: "Children",
        title: "Children and guardianship",
        lede: "Under the DPDP Act a child is anyone under eighteen — a higher bar than most of the internet works to, and one we take at face value.",
        blocks: [
            {
                kind: "list",
                items: [
                    "This website is meant for adults buying property. It is not directed at children, and we do not knowingly collect a child's personal data.",
                    "We do not track children, monitor their behaviour, or direct advertising at them — all three are prohibited outright by §9(3), consent or no consent.",
                    "Where data of a child is genuinely needed — a minor named as a co-owner or a nominee on a booking — we collect it only with the verifiable consent of a parent or lawful guardian, and only for that purpose.",
                    "The same protection applies to a person with disability who has a lawful guardian: we act on the guardian's consent.",
                    "If you believe a child has given us details through this site, write to the Grievance Officer and we will delete them.",
                ],
            },
        ],
    },
    {
        id: "marketing",
        short: "Calls & messages",
        title: "Calls, WhatsApp and messages",
        lede: "You gave us a number so that we would ring it. Here is exactly what that buys, and how to end it.",
        blocks: [
            {
                kind: "list",
                items: [
                    "**One call**, within a working day, from the sales desk — not a call centre, and not an auto-dialler.",
                    "**Follow-up only where it is useful**: the price sheet you asked for, a floor plan, a visit confirmation, or progress on a project you were watching.",
                    "**We stop when you say stop.** Say it to the person on the phone, reply STOP to any message, or write to us. It takes effect within one working day and we do not ask again.",
                    "**We do not send bulk promotional SMS**, and we do not add you to a broadcast list.",
                ],
            },
            {
                kind: "text",
                body: "Commercial calls and messages in India are regulated by the TRAI Telecom Commercial Communications Customer Preference Regulations, 2018. Independently of anything we do, you can register your preferences on the national Do Not Disturb registry through your operator, by messaging 1909, or in the TRAI DND app — which blocks unsolicited commercial communication from every registered sender, not just from us.",
            },
            {
                kind: "note",
                body: "Consenting to be contacted about a flat does not consent you to anything else. We will not use your number for a different project's campaign, and we will not pass it to another developer.",
            },
        ],
    },
    {
        id: "laws",
        short: "The law",
        title: "The law this policy is written to",
        lede: "Indian law, in force as at the effective date of this policy. Where any of it changes, this page changes.",
        blocks: [],
    },
    {
        id: "grievance",
        short: "Grievance officer",
        title: "Grievance redressal, and how to escalate",
        lede: "§13 of the DPDP Act and Rule 5(9) of the SPDI Rules both require us to publish a person you can complain to, and to answer within a fixed time. This is that person.",
        blocks: [
            {
                kind: "text",
                body: `Write with what happened, when, and the phone number or email you gave us, so we can find the record. We acknowledge every complaint in writing within ${grievanceOfficer.acknowledge}, and answer it within ${grievanceOfficer.resolve} of receiving it.`,
            },
            {
                kind: "text",
                body: "**If our answer does not satisfy you**, you may complain to the Data Protection Board of India, which is the statutory authority for this Act. The Act asks you to exhaust the route above first. Nothing here takes away your right to approach a consumer forum or a court on any other ground.",
            },
        ],
    },
    {
        id: "changes",
        short: "Changes & contact",
        title: "Changes to this policy, and how to reach us",
        blocks: [
            {
                kind: "text",
                body: "We update this page when what we do changes — a new analytics tag, a new processor, a change in the law. The version number and the date at the top of the page always tell you which text you are reading, and the effective date tells you when it started to apply.",
            },
            {
                kind: "text",
                body: "For a change that materially affects you — a genuinely new purpose, or a new category of recipient — we will not rely on a quiet edit. We will ask for your consent again before the new use begins.",
            },
            {
                kind: "text",
                body: `**General questions** about a flat, a booking or a visit: ${site.emails.sales}, or ${site.phones[0].display}. **Anything about your data** — access, correction, erasure, consent or a complaint: the Grievance Officer in §17.`,
            },
            {
                kind: "text",
                body: "**Governing law.** This policy is governed by the laws of India, and the courts at Kolkata, West Bengal have jurisdiction over any dispute arising out of it.",
            },
        ],
    },
];
