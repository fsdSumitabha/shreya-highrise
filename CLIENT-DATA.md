# Client Data — Shreya High Rise

Everything on the website that we **made up** and the client still has to confirm.

Tick a box when the real answer is in the code. 🔴 marks things that are legally or
commercially dangerous to publish wrong — those must all be ticked before go-live.

Confirmed facts we already have are at the [bottom of this file](#already-confirmed) — don't re-ask those.

---

## Send the client CLIENT-QUESTIONS.md, not this file

`CLIENT-QUESTIONS.md` is the same information written as plain questions, with no
code paths and no internal notes. Coverage map:

| Section here | Asked in CLIENT-QUESTIONS.md |
| --- | --- |
| §1 Company basics | Part 1, Q1–Q5 |
| §2 Projects | Part 1, Q8–Q15 · Part 2 A |
| §3 Track-record numbers | Part 1, Q8–Q14 |
| §4 Claims we make | Part 1, Q16–Q19 · Part 2 C, D |
| §5 People | Part 1, Q6–Q7 · Part 2 B |
| §6 About page | Part 1, Q2 · Part 2 C, F |
| §7 Contact page | Part 1, Q4–Q5 · Part 2 D, E |
| §8 Testimonials | Part 2 G |
| §9 Photography | Part 2 H |
| §10 Technical setup | not on the sheet — see below |

**Not on the client sheet — still open here.** Ask these on a call, or decide them
ourselves. They are not answered anywhere:

- 🔴 **Domain name** (§1) — every canonical URL and OG tag depends on it.
- 🔴 **Where enquiry-form submissions go** (§7) — the form is still wired to nothing.
- **Which phone is primary, which email is public sales** (§1) — we can default and
  confirm verbally.
- **Director spellings, designations, join years, responsibilities** (§5, §6) — Part 1
  now only asks for a bio and a photo. Part 2 F asks which director heads which desk.
- **Social profile URLs and the Google Analytics ID** (§10).

**Ours to decide, deliberately never asked:** the About-page pull quote, the About-page
headline wording, and the enquiry-form dropdown options (budget bands, possession windows).

Answers land here: tick the box in this file, then change the value in the data file
named beside it.

---

## 1. Company basics

- [x] ✅ **Year founded** — confirmed **2021**, used in the hero, stats, About page timeline and footer copyright · `src/data/site.ts`
- [ ] 🔴 **Domain name** — assumed `https://shreyahighrise.in`, used in canonical URLs, OG tags and JSON-LD · `src/data/site.ts`
- [x] ✅ **CIN** — confirmed **U70109WB2021PTC246677**, printed in the footer legal line, the contact page legal note and the JSON-LD `identifier` · `src/data/site.ts`
- [ ] 🟡 **Which email is public sales, which is internal** — we treat `shreyahighrise@gmail.com` as sales and `royconstruction@gmail.com` as projects/handover · `src/data/site.ts`
- [ ] 🟡 **Are both phone numbers public, and which is primary?** — `8910355765` is primary (it's the header button), `9836649276` secondary · `src/data/site.ts`
- [ ] 🟡 **Office hours per office** — we invented Head Office Mon–Sun 10:00–19:00 and Registered Office Mon–Sat 11:00–18:00 · `src/data/site.ts`

---

## 2. Projects

All seven projects are invented. Ask for the **existing price sheet or brochure per project** —
almost everything below is already printed on it.

- [ ] 🔴 **The real project list** — name, stage (upcoming / ongoing / completed), full site address · `src/data/projects.ts`
- [ ] 🔴 **RERA registration number for each** — exact string as issued by WBRERA (older ones may say WBHIRA) · `projects.ts` → `rera`
- [ ] 🔴 **Price / "starting at" per project** — and whether prices should be public at all. Ours run ₹48 L – ₹1.18 Cr · `projects.ts` → `priceFrom`
- [ ] 🔴 **Possession date per project**, exactly as printed in the agreement · `projects.ts` → `possession`
- [ ] 🟡 **Configuration** actually on offer (2/3/4 BHK, duplex) · `projects.ts` → `typology`
- [ ] 🟡 **Area range** — and confirm it's *carpet* area, not super built-up. The site labels it "Carpet range" · `projects.ts` → `sizeRange`
- [ ] 🟡 **Three nearby landmarks + real distances** per project · `projects.ts` → `nearby`
- [ ] 🟡 **Three selling points** per project · `projects.ts` → `highlights`
- [ ] 🟡 For completed projects: **handover year and number of families** living there · `projects.ts`
- [ ] 🟡 **Floor plans and brochure PDFs** — needed for the Projects page
- [ ] 🔴 **Placeholder projects that predate the 2021 founding** — Spriha Heights (WBHIRA 2018, handed over 2019) and Shreya Greens (WBHIRA 2019) can't exist for a company incorporated in 2021. Left as-is pending the real project list · `src/data/projects.ts`

---

## 3. Track-record numbers

These are shown in huge type on the home page and the About page, so they need to agree with
each other **and** with the project list. If the client says "8 projects", the corridor counts
have to add up to 8.

- [ ] 🟡 **Total projects / addresses** (completed + ongoing) — we say **10** · `src/data/stats.ts`, `src/data/corridors.ts`
- [ ] 🔴 **Total families / flats handed over** — we say **1,450**, which is a very large number for a company founded in 2021. Needs the real figure · `src/data/stats.ts`
- [ ] 🔴 **Total sq. ft. developed** — we say **1.6M**; same problem as the family count against a 2021 founding · `src/data/stats.ts`
- [ ] 🟡 **Years in business** — stats band now says **5** (2021 to today). Confirm the count is how they want it phrased · `src/data/stats.ts`
- [ ] 🟡 **Which areas of Kolkata they actually build in** — we assume four corridors: New Town, Rajarhat, North Kolkata, South Kolkata · `src/data/corridors.ts`
- [ ] 🟡 **Project count per corridor** — we assume New Town 3, Rajarhat 1, North Kolkata 5, South Kolkata 1 · `src/data/corridors.ts`

---

## 4. Claims we make

Each of these is stated on the site as a fact. If it isn't true, it has to come off.

- [ ] 🔴 **CREDAI Bengal membership** · `src/data/assurance.ts`
- [ ] 🔴 **ISO 9001:2015 certification** · `src/data/assurance.ts`
- [ ] 🔴 **Which banks / HFCs have project-level approval** — we list 7: SBI, HDFC, ICICI, Axis, Bank of Baroda, PNB Housing, LIC Housing Finance · `src/data/assurance.ts`
- [ ] 🔴 **Third-party structural audit** — is there one, and by whom? · `src/data/assurance.ts`
- [ ] 🟡 **Delay-compensation clause in the agreement** · `src/data/advantages.ts`
- [ ] 🟡 **"Every project on time since 2016"** — if not true, what's the honest version? · `src/data/advantages.ts`
- [ ] 🟡 **24-month post-handover facility team** · `src/data/advantages.ts`
- [ ] 🟡 **Vaastu consultant** on unit layouts · `src/data/advantages.ts`
- [ ] 🟡 **Booking amount is 10%**, and the refund policy · `src/data/faqs.ts`
- [ ] 🟡 **7-step buying process** — does it match how they actually sell? · `src/data/journey.ts`
- [ ] 🟡 **Interior customisation until brickwork stage** · `src/data/faqs.ts`
- [ ] 🟡 **NRI buyers** — do they want them addressed, and is the FEMA answer right for them? · `src/data/faqs.ts`
- [ ] 🟡 **Any awards or recognition** worth showing — nothing on the site yet

---

## 5. People

- [ ] 🟡 **Correct spelling and job title of the three directors** — all three currently show as "Managing Director" · `src/data/site.ts`
- [ ] 🟡 **What each director actually looks after** — we invented finance / design / construction · `src/data/site.ts`
- [ ] 🟡 **The real amenity list** — 24 invented amenities across 4 groups; which are genuinely provided, and in which projects? · `src/data/amenities.ts`

---

## 6. About page — our story

**Everything on this page is written by us and needs the client to read it end to end.**
The narrative is deliberately specific (dates, numbers, a founding anecdote) — which is what
makes it good copy and also what makes it risky if the details are wrong.

- [ ] 🔴 **The founding story** — we wrote that the family bought a plot on Rabindra Sarani in New Barrackpur (now dated 2021), in a neighbourhood they already lived in, and that the first building there still houses the registered office. Is any of that true? · `src/data/about.ts` → `story`
- [ ] 🔴 **The timeline** — re-anchored to the confirmed 2021 founding, but the six milestones are still invented. Which ones are real, and what should replace the rest? · `src/data/about.ts` → `milestones`
  - 2021 incorporated + first plot · 2022 delay clause introduced + Shreya Greens handover · 2023 first piled high-rise · 2024 Verdant Court OC, first New Town address · 2025 Skyline One launch · 2029 Narendrapur
- [x] ✅ **Year of incorporation as a private limited company** — **2021**, per the CIN · `src/data/about.ts`
- [ ] 🔴 **Director biographies** — a paragraph each, all invented, including specific claims ("has negotiated every acquisition since", "personally signs off the snag list on each flat") · `src/data/site.ts` → `leadership`
- [ ] 🔴 **"We have never franchised the brand or sold a development-management licence"** — stated as fact · `src/data/about.ts` → `principles`
- [ ] 🔴 **"Funded out of projects already delivered"** / never taken construction finance — a claim about how the company is financed · `src/data/about.ts`
- [ ] 🔴 **The build specification sheet** — 12 rows of construction spec (M30 concrete, bored cast-in-situ piles, 200 mm AAC block, gearless MRL lifts at 1.5 m/s, NBC 2016 fire systems, seven-year facade warranty…). This is the most checkable thing on the site — a buyer's engineer will read it. Every line needs sign-off from the project team · `src/data/about.ts` → `buildSpecs`
- [ ] 🔴 **"Specification annexure attached to every agreement for sale"** with named brands, and the substitution rule — stated as fact under the spec sheet · `src/components/sections/BuildStandard.tsx`
- [ ] 🟡 **The six in-house desks** and which director leads each — invented org structure · `src/data/about.ts` → `desks`
- [ ] 🟡 **"Occupancy certificate before keys"** — stated as standard practice · `src/data/about.ts`
- [ ] 🟡 **The pull quote** ("sixty homes we can stand in front of…") — our words, presented as the company's. Keep, rewrite or drop · `src/data/about.ts` → `story.pullQuote`
- [ ] 🟡 **Director start years** — now Ranjeet and Sampa Roy as founders in 2021 and Partha Roy Chowdhury as "Director since 2021". Confirm who was on the board at incorporation and who joined later · `src/data/site.ts`
- [ ] 🟡 **Page headline** — "One family, ten addresses, no shortcuts". Are they comfortable leading with family ownership? · `src/data/about.ts`

---

## 7. Contact page — reaching you

- [ ] 🔴 **Where enquiry-form submissions should go** — a shared inbox, a CRM, WhatsApp for Business? **The form is not wired to anything yet**: it validates and writes to the server log, then shows a thank-you page. Nothing is emailed to anyone · `src/app/contact/actions.ts`
- [ ] 🔴 **Named grievance officer for WBRERA complaints** — the page publishes a grievance desk and promises a **written acknowledgement within three working days**. Confirm both the promise and who owns it · `src/data/contact.ts` → `departments`
- [ ] 🔴 **"We do not sell, share or resell your number"** — a data-protection promise on the form. Confirm it, and confirm the consent wording covers phone, WhatsApp and email · `src/data/contact.ts`, `src/components/sections/EnquiryForm.tsx`
- [ ] 🟡 **WhatsApp business number** — we're currently pointing `wa.me` at the primary phone. Is that number on WhatsApp? · `src/data/contact.ts` → `channels`
- [ ] 🟡 **Google Maps link or lat-long for both offices** — we build a Maps *search* link from the postal address, which may land on the wrong pin · `src/data/site.ts` → `mapQuery`, `src/data/contact.ts` → `mapLink`
- [ ] 🟡 **"Reply within one working day"** — repeated four times across the page. Is it a promise they can keep? · `src/data/contact.ts`
- [ ] 🟡 **Free pickup anywhere inside Kolkata** for site visits, with no obligation · `src/data/contact.ts` → `visitBrief`
- [ ] 🟡 **The site-visit description** — an engineer (not a salesperson) meets you at the gate, you walk a real unit, the sanctioned plan / RERA registration / title report are on the table, and you leave with a printed cost sheet. Does that match what actually happens? · `src/data/contact.ts` → `visitBrief`
- [ ] 🟡 **Visit practicalities** — 45–60 minutes, photo ID for the entry log, helmets and vests provided, children not above podium level, best before noon in summer · `src/data/contact.ts` → `visitBrief.practical`
- [ ] 🟡 **The six contact desks** — sales, construction & handover, residents & facility, channel partners, vendors & procurement, grievance. Do they want all six public, and should any get its own email address? · `src/data/contact.ts` → `departments`
- [ ] 🟡 **What each office is for** — registered office for paperwork, head office for sales and site visits · `src/data/site.ts` → `offices`
- [ ] 🟡 **Enquiry form dropdown options** — budget bands (under ₹50 L → above ₹1.5 Cr), configurations, possession windows, and "buying to live in / invest / purchase as an NRI" · `src/data/contact.ts` → `enquiryFields`
- [ ] 🟡 **Video walkthroughs and registration by power of attorney for overseas buyers** — stated as things they do · `src/data/contact.ts` → `contactFaqs`
- [ ] 🟡 **"A person picks up, not a call centre"** and "one follow-up call, and we stop if you tell us to" · `src/data/contact.ts` → `responsePromise`

---

## 8. Testimonials

- [ ] 🔴 **Real resident quotes, with written permission** to publish the name and project. All three on the site are invented people · `src/data/testimonials.ts`
- [ ] 🟡 Any **Google reviews** they'd rather we quote instead

---

## 9. Photography

One image is real: the rooftop clubhouse shot now running in the home-page amenity band
(`public/clubhouse_deck.png`, 1584×672). Every other image is still a dashed placeholder box
labelled with the shot it needs. **Ask whether a brochure PDF exists** — render shots can
usually be lifted from it while real photography is arranged.

- [ ] 🔴 **The clubhouse image — where is it from?** Which project, is it a photograph or a render, and do we have the right to publish it? It reads as a New Town rooftop at dusk. The alt text deliberately makes no project claim until we know · `src/components/sections/Amenities.tsx`
- [ ] 🟡 **Source file** — 1.9 MB PNG. Ask for the original JPEG/TIFF if there is one; a JPEG at this size would be a fraction of the weight · `public/clubhouse_deck.png`

| Shot | Where | Ratio |
| --- | --- | --- |
| Flagship tower at dusk | Home hero, full screen | Landscape, 2400px+ |
| Exterior / elevation per project (7) | Project cards | 4:3 |
| One shot per completed project | "Recently delivered" | 3:2 |
| Site engineer at work | Home, About | 3:4 |
| Handover / resident moment | Home | 3:4 |
| ~~Clubhouse or rooftop panorama~~ **received** | Amenities | 21:9 |
| Map marking all project locations | "Where we build" | 1:1 |
| The first building on Rabindra Sarani | About story | 4:5 |
| Directors on site during a slab pour | About story | 1:1 |
| **Portrait of each director (3)** | About, leadership | 3:4 |
| Slab reinforcement before a pour | About, specification | 3:2 |
| Map of each office (2) | Contact | 2:1 |

---

## 10. Technical setup

- [ ] 🔴 **Wire the enquiry form to a real destination** (see §7) · `src/app/contact/actions.ts`
- [ ] 🟡 **Real social media profile URLs** — the footer currently links to facebook.com, instagram.com, youtube.com and linkedin.com homepages · `src/data/site.ts` → `socials`
- [ ] 🟡 **Google Analytics / Tag Manager ID**

---

## Already confirmed

From `data.txt` and the supplied logo files. **Do not re-ask these.**

- Business name: **Shreya High Rise** · Legal name: **Shreya Highrise Private Limited**
- Directors: Ranjeet Roy, Sampa Roy, Partha Roy Chowdhury *(titles still to confirm — see §5)*
- GSTIN: **19ABGCS5087H1ZU**
- Registered office: Spriha Apartment, Flat No. 01, Gr. Fl., 97 Rabindra Sarani, New Barrackpur, Kolkata 700131
- Head office: Chaitali Co-op Housing Society Ltd., BB-102, Gr. Fl., Street No. 152, New Town, Kolkata 700156
- Phones: 8910355765 / 9836649276
- Emails: shreyahighrise@gmail.com · royconstruction@gmail.com
- Brand colours: Deep Navy `#0B1F33` · Champagne `#C8A96B`
- Logo files: `public/logo-currentcolor.svg` (header + footer), `public/shreya_logo.png` (social sharing),
  `public/shreya_favicon.png` (browser tab, copied to `src/app/icon.png` and `src/app/apple-icon.png`)
- CIN: **U70109WB2021PTC246677** · Year founded / incorporated: **2021**
- Photography received: `public/clubhouse_deck.png` — rooftop clubhouse and infinity pool at dusk,
  live in the home-page amenity band *(project and usage rights still to confirm — see §9)*
