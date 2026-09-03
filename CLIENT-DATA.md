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

- [x] ✅ **Year founded** — confirmed. Three dates, all now used deliberately: **2012** land trading (where the About timeline opens), **2016** first building as Roy Constructions (`site.founded` — the "since" year in the hero, stats, About intro and footer copyright), **2021** incorporation as Shreya Highrise Pvt Ltd (the CIN year) · `src/data/site.ts`
- [ ] 🔴 **Domain name** — assumed `https://shreyahighrise.in`, used in canonical URLs, OG tags and JSON-LD · `src/data/site.ts`
- [x] ✅ **CIN** — confirmed **U70109WB2021PTC246677**, printed in the footer legal line, the contact page legal note and the JSON-LD `identifier` · `src/data/site.ts`
- [ ] 🟡 **Which email is public sales, which is internal** — we treat `shreyahighrise@gmail.com` as sales and `royconstruction@gmail.com` as projects/handover · `src/data/site.ts`
- [ ] 🟡 **Are both phone numbers public, and which is primary?** — `8910355765` is primary (it's the header button), `9836649276` secondary · `src/data/site.ts`
- [ ] 🟡 **Office hours per office** — we invented Head Office Mon–Sun 10:00–19:00 and Registered Office Mon–Sat 11:00–18:00 · `src/data/site.ts`

---

## 2. Projects

All seven projects are invented. Ask for the **existing price sheet or brochure per project** —
almost everything below is already printed on it.

- [ ] 🔴 **The real project list** — six are now recorded in `src/data/temp-projects.json` (Chaitali, LIG BA Block, Mitrae, LIG Street 237, New Manikanchan, the Street 609 MIG society). **The public Projects page still runs on the seven invented ones in `src/data/projects.ts`** — that swap is the next job, and it needs the remaining four-to-six addresses · `src/data/projects.ts`
- [x] ✅ **RERA** — the client does not have WBRERA registration. **Every RERA/WBRERA claim has been stripped from the public site** (hero credential strips, footer disclaimer, grievance note, FAQs, buyer journey, co-operative process, site intro, page metadata, keywords, and the `rera` field on the project cards). The internal filing pages and `temp-projects.json` still carry a RERA field, left alone on purpose · `src/data/projects.ts`
- [ ] 🟡 **What replaces it, if anything** — projects are described by sanctioned plan, title deed and mutation record now. If any project is ever registered, tell us and the number goes back on the card · `src/data/projects.ts`
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

- [x] ✅ **Total projects / addresses** (completed + ongoing) — client says **10+**, now in the stats band, both heroes and the projects intro · `src/data/stats.ts`, `src/data/corridors.ts`
- [x] ✅ **Total families / flats handed over** — client says **120+** · `src/data/stats.ts`
- [ ] 🟡 **Total sq. ft. built** — we publish **130K+**, and it is the one number on the band the client has not given us. Derived: ~12 G+4 societies × ~12 flats × ~900 sq ft super built-up ≈ 130,000. Ask them to confirm or replace it · `src/data/stats.ts`
- [x] ✅ **Years in business** — **10**, counted from the first building in 2016 · `src/data/stats.ts`
- [ ] 🟡 **Which areas of Kolkata they actually build in** — client named New Town (2016), then Rajarhat, Madhyamgram, Birati and New Barrackpur (2021). Those are now the first three corridors. **The fourth, South Kolkata / Narendrapur, is still ours** — drop it or replace it · `src/data/corridors.ts`
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

- [ ] 🟡 **The founding story** — rewritten from the client's own account: land trading from 2012, first building as Roy Constructions in New Town in 2016, incorporation and expansion in 2021. The facts are theirs; the wording is ours, so it still needs a read-through · `src/data/about.ts` → `story`
- [x] ✅ **The timeline** — rebuilt from the client's journey plus the real projects in `src/data/temp-projects.json` · `src/data/about.ts` → `milestones`
  - 2012 land trading · 2016 Roy Constructions, first New Town building · 2018 Mitrae Co-operative + the eight-member MIG society on Street 609 handed over · 2021 incorporated, expands to Rajarhat / Madhyamgram / Birati / New Barrackpur · 2022 Chaitali Co-operative BB-102 · 2023 New Manikanchan MIG Society · 2026 two Action Area I societies, first possession October
  - Still to confirm: the 2018 pairing (`temp-projects.json` gives Mitrae a 2018 *possession* and the Street 609 society a 2018 *handover* — same year, but recorded in different fields)
- [x] ✅ **Year of incorporation as a private limited company** — **2021**, per the CIN. *(Client called it "LLP or whatever" — the CIN's `PTC` says private limited company, and the site says so.)* · `src/data/about.ts`
- [ ] 🔴 **Director biographies** — a paragraph each, all invented, including specific claims ("has negotiated every acquisition since", "personally signs off the snag list on each flat") · `src/data/site.ts` → `leadership`
- [ ] 🔴 **"We have never franchised the brand or sold a development-management licence"** — stated as fact · `src/data/about.ts` → `principles`
- [ ] 🔴 **"Funded out of projects already delivered"** / never taken construction finance — a claim about how the company is financed · `src/data/about.ts`
- [ ] 🔴 **The build specification sheet** — 12 rows of construction spec (M30 concrete, bored cast-in-situ piles, 200 mm AAC block, gearless MRL lifts at 1.5 m/s, NBC 2016 fire systems, seven-year facade warranty…). This is the most checkable thing on the site — a buyer's engineer will read it. Every line needs sign-off from the project team · `src/data/about.ts` → `buildSpecs`
- [ ] 🔴 **"Specification annexure attached to every agreement for sale"** with named brands, and the substitution rule — stated as fact under the spec sheet · `src/components/sections/BuildStandard.tsx`
- [ ] 🟡 **The six in-house desks** and which director leads each — invented org structure · `src/data/about.ts` → `desks`
- [ ] 🟡 **"Occupancy certificate before keys"** — stated as standard practice · `src/data/about.ts`
- [ ] 🟡 **The pull quote** ("sixty homes we can stand in front of…") — our words, presented as the company's. Keep, rewrite or drop · `src/data/about.ts` → `story.pullQuote`
- [ ] 🟡 **Director start years** — now Ranjeet and Sampa Roy as "Founder, 2012" (the year the family business began) and Partha Roy Chowdhury as "Director since 2021". Confirm who was there in 2012, who from 2016, and who signed at incorporation · `src/data/site.ts`
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
- CIN: **U70109WB2021PTC246677** · Incorporated **2021** as Shreya Highrise Private Limited
- The journey: **2012** land buying and reselling (unregistered) · **2016** building starts as **Roy Constructions**, working area New Town · **2021** incorporated, expands to Rajarhat, Madhyamgram, Birati, New Barrackpur
- Track record: **10 years since 2016** · **10+ addresses** · **120+ families**
- Real project records live in `src/data/temp-projects.json` (six so far, all G+4 co-operative societies in New Town)
- Photography received: `public/clubhouse_deck.png` — rooftop clubhouse and infinity pool at dusk,
  live in the home-page amenity band *(project and usage rights still to confirm — see §9)*
