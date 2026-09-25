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
| §11 Privacy policy | not on the sheet — needs a call, see below |

**Not on the client sheet — still open here.** Ask these on a call, or decide them
ourselves. They are not answered anywhere:

- 🔴 **Domain name** (§1) — every canonical URL and OG tag depends on it.
- 🔴 **Where enquiry-form submissions go** (§7) — the form is still wired to nothing.
- **Which phone is primary, which email is public sales** (§1) — we can default and
  confirm verbally.
- **Director spellings, designations, join years, responsibilities** (§5, §6) — Part 1
  now only asks for a bio and a photo. Part 2 F asks which director heads which desk.
- **Google Analytics ID** (§10). Social profile URLs are now received.

**Ours to decide, deliberately never asked:** the About-page pull quote, the About-page
headline wording, and the enquiry-form dropdown options (budget bands, possession windows).

Answers land here: tick the box in this file, then change the value in the data file
named beside it.

---

## 1. Company basics

- [x] ✅ **Year founded** — confirmed. Three dates, all now used deliberately: **2012** land trading (where the About timeline opens), **2016** first building as Roy Constructions (`site.founded` — the "since" year in the hero, stats, About intro and footer copyright), **2021** incorporation as Shreya Highrise Pvt Ltd (the CIN year) · `src/data/site.ts`
- [ ] 🔴 **Domain name** — assumed `https://shreyahighrise.com`, used in canonical URLs, OG tags and JSON-LD · `src/data/site.ts`
- [x] ✅ **CIN** — confirmed **U70109WB2021PTC246677**, printed in the footer legal line, the contact page legal note and the JSON-LD `identifier` · `src/data/site.ts`
- [ ] 🟡 **Which email is public sales, which is internal** — we treat `shreyahighrise@gmail.com` as sales and `royconstruction@gmail.com` as projects/handover · `src/data/site.ts`
- [ ] 🟡 **Are both phone numbers public, and which is primary?** — `8910355765` is primary (it's the header button), `9836649276` secondary · `src/data/site.ts`
- [x] ✅ **Site / head office hours** — confirmed **Mon–Sat, 10:00 – 19:00 IST**, now in `site.hours`, the head-office row, the contact hero strip, the "Reach us directly" sales-desk note and the enquiry auto-reply · `src/data/site.ts`, `src/data/contact.ts`
- [ ] 🟡 **Registered office hours** — still ours: we invented Mon–Sat 11:00–18:00 for New Barrackpur · `src/data/site.ts`

---

## 2. Projects

The invented catalogue is gone — the site now runs on the client's own six records. What is
left below is what those records do **not** say. Ask for the **existing price sheet, brochure
and sanctioned drawings per project**; almost everything still open is already printed on one
of the three.

- [x] ✅ **The real project list** — the **seven** records in `src/data/temp-projects.json` are now the public catalogue: six co-operative societies and one house on a private plot. `src/data/projects.ts` was rebuilt from them and every invented project is gone; each address has its own page at `/projects/<slug>`, slugged off the project name. Still to come: the remaining three-or-so addresses, since the site claims **10+** · `src/data/projects.ts`
- [x] ✅ **RERA** — the client does not have WBRERA registration. **Every RERA/WBRERA claim has been stripped from the public site** (hero credential strips, footer disclaimer, grievance note, FAQs, buyer journey, co-operative process, site intro, page metadata, keywords, and the `rera` field on the project cards). `Project.rera` survives as an optional field and renders a row the moment one is filled in. The internal filing pages and `temp-projects.json` still carry a RERA field, left alone on purpose · `src/data/projects.ts`
- [ ] 🟡 **What replaces it, if anything** — projects are described by sanctioned plan, title deed and mutation record now. If any project is ever registered, tell us and the number goes back on the card · `src/data/projects.ts`
- [ ] 🔴 **LIG Co-operative (CD-114): is the 4 BHK really ₹7 Cr?** — that is what the intake sheet records, and it is published as given. It sits beside a ₹45 L 2 BHK in the same G+4 block, so it is almost certainly **₹70 L** mistyped. **Do not go live without an answer** · `projects.ts` → `prices`
- [ ] 🔴 **LIG Co-operative (CD-114): the drawings and the brief disagree** — the client's sheet says 2 & 4 BHK from 750 sq. ft.; the architect's sanctioned plan shows three two-bedroom flats per floor at 665 – 725 sq. ft. super built-up. Both are published, in separate sections and labelled as such, rather than reconciled by us. Which is current? · `projects.ts` → `plan`
- [ ] 🟡 **LIG Co-operative (CD-114): which layout option is being built?** — the architect issued two. Option A has 8 car bays and a 405 sq. ft. office; Option B has 5 bays, a longer shop and a wider Flat C. Both are on the project page until the client says which was sanctioned · `public/projects/plans/cd_114/`
- [ ] 🟡 **CD-114's street number** — the drawing's title block says Street No. 266, the society's own paperwork says Street No. 114, and the PIN differs too (700 156 against 700 163). Both are printed, with a footnote under the drawings · `projects.ts`
- [x] ✅ **Which project is `public/projects/plans/0068/`?** — answered. It is **Pre Hold Individual Plot**, AA Block, Street No. 68, and both the drawings and the AA-110 renders are now published on that project's page · `src/data/projects.ts`
- [ ] 🔴 **Pre Hold Individual Plot: 148 flats and 148 families are not possible** — the intake sheet records both. The architect's own drawing for the address puts **one 4 BHK home on each of four floors**, on a plot of about 2,150 sq. ft. with 1,382 sq. ft. of ground coverage. 148 would also put more families in this one house than the site claims for the whole practice (120+). **Both fields are withheld from the site** until the client corrects them — everything else on that record is published as given · `projects.ts`
- [ ] 🔴 **Pre Hold Individual Plot: which is the premises number?** — the sheet's title block reads "PLAN OF RESIDENCE AT PRE NO. **-11-0572**, NEW TOWN, KOLKATA", while **02-0068** is the drawing number in the corner box. The data was edited by hand to say Premises No. **02-068**, so the page now gives the drawing number as the premises number and the "Drawing no." row repeats it. Either the title block is wrong or the edit is — confirm which · `projects.ts` → `plotAddress`, `title`, `caveat`
- [ ] 🟡 **Pre Hold Individual Plot: three plot references for one address** — the client's sheet says **Plot 111**, the architect's renders are captioned **AA-110**, and the title block carries a premises number (see above). All are printed as received, with a footnote under the drawings. Which is the address a buyer would be given? · `projects.ts`
- [ ] 🟡 **Is "Pre Hold Individual Plot" the public name?** — it reads as an internal description rather than a name a buyer would be sold. It is used verbatim, and it is the URL: `/projects/pre-hold-individual-plot`. A different name means a different URL, so decide before launch · `projects.ts` → `name`
- [x] ✅ **Is Pre Hold Individual Plot for sale?** — yes. It was re-filed as **under construction, possession December 2026** (it had first been recorded as handed over in 2024), so it now sits in "Open for sale" beside the two societies and in the enquiry-form dropdown. The catalogue is three under construction and four handed over · `projects.ts`
- [x] ✅ **Price / "starting at" per project** — given for three of the six: ₹45 L (CD-114, 2 BHK), ₹55 L (CC-59), ₹36 L (New Manikanchan). Chaitali, Mitrae and the Street 609 society carry no price and their pages show none. See the ₹7 Cr flag above · `projects.ts` → `prices`
- [ ] 🟡 **Possession date per project**, exactly as printed in the agreement — only CC-59 has one (October 2026). **CD-114 has none on file** and its page therefore shows no date at all · `projects.ts` → `possession`
- [x] ✅ **Configuration** — 2 & 4 BHK (CD-114), 2 BHK (CC-59 and New Manikanchan), 3 BHK (Street 609). Chaitali and Mitrae have none on file · `projects.ts` → `typology`
- [x] ✅ **Area basis** — confirmed **super built-up**, not carpet. The site no longer says "Carpet range" anywhere; each project labels its own figure out of `areaBasis`, so an address measured differently can say so · `projects.ts` → `sizeRange`, `areaBasis`
- [ ] 🟡 **Nearby landmarks + distances** — given for CC-59, New Manikanchan and the Street 609 society. Chaitali, Mitrae and **CD-114** have none, and their pages omit the block entirely · `projects.ts` → `nearby`
- [ ] 🟡 **Selling points per project** — all six currently carry the same five-line society standard the client dictated. Anything true of one address and not the others still needs asking · `projects.ts` → `highlights`
- [ ] 🟡 For completed projects: **handover year and number of families** — Mitrae has neither, nor an address. Chaitali, New Manikanchan and Street 609 are complete · `projects.ts`
- [x] ✅ **Floor plans** — the CD-114 sanctioned drawings are live on that project's page as area schedules plus the four PDFs. **No other project has drawings.** Any project given a `plan` block gets the same section automatically · `public/projects/plans/`
- [ ] 🟡 **Brochure PDFs** — none received. `Project.brochure` takes a path and renders a download button the moment one is dropped in · `projects.ts` → `brochure`
- [x] ✅ **Placeholder projects that predate the 2021 founding** — Spriha Heights and Shreya Greens are gone with the rest of the invented catalogue. The real record still has two 2018 projects (Mitrae, Street 609), which is consistent: the company built as **Roy Constructions** from 2016 and incorporated in 2021 · `src/data/projects.ts`
- [ ] 🟡 **Two projects are both called "LIG Co-operative"** — CD-114 and CC-59. Kept exactly as the client named them; the site separates them by plot reference everywhere, including the enquiry-form dropdown. Do they have distinct marketing names? · `projects.ts` → `name`

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

- [x] ✅ **CREDAI Bengal membership** — client does not have it. Removed from the credentials row on the home page; nothing on the site claims it now · `src/data/assurance.ts`
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

- [ ] 🔴 **Where enquiry-form submissions should go** — the form now emails the sales desk over SMTP, defaulting to `shreyahighrise@gmail.com` (`EMAIL_TO_SALES` overrides it). Confirm that is the right inbox, and whether a CRM or WhatsApp for Business should receive it too. **There is no database — the mail is the lead** · `src/lib/enquiry-intake.ts`, `MAIL-SETUP.md`
- [ ] 🔴 **Named grievance officer for WBRERA complaints** — the page publishes a grievance desk and promises a **written acknowledgement within three working days**. Confirm both the promise and who owns it · `src/data/contact.ts` → `departments`
- [ ] 🔴 **"We do not sell, share or resell your number"** — a data-protection promise on the form. Confirm it, and confirm the consent wording covers phone, WhatsApp and email · `src/data/contact.ts`, `src/components/sections/EnquiryForm.tsx`
- [ ] 🟡 **WhatsApp business number** — we're currently pointing `wa.me` at the primary phone. Is that number on WhatsApp? · `src/data/contact.ts` → `channels`
- [x] ✅ **Head office pin** — client gave **22.5891026, 88.4528644** (Action Area I, New Town). It drives both the embedded map and the "Open in Maps →" link on the contact page · `src/data/site.ts` → `headOffice.mapPin` / `mapEmbed`
- [ ] 🟡 **Registered office pin** — still built as a Maps *search* from the postal address, so it can land on the wrong doorway. It only appears in the footer now, not on the contact page · `src/data/site.ts` → `registeredOffice.mapQuery`
- [ ] 🟡 **The head office pin sits in Action Area I, 700163, while the printed address reads BB-102, Street No. 152, New Town, 700156** — worth a glance to confirm the postal address is written the way the client wants it · `src/data/site.ts`
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
- [ ] 🟡 **The lobby nameplate — render or photograph?** `public/lobby_nameplate.png` (1024×1024, renamed from a UUID filename) shows the Shreya High Rise logo in brass on black granite beside glass lobby doors. It reads as a studio mockup rather than a photograph of one of the six addresses, so the alt text names no building. Confirm what it is and that it may be published · `src/data/about.ts` → `imageOne`
- [x] ✅ **The two AA-110 renders — which building are they?** Answered by the client filing them under `public/projects/aa_68/` with the new **Pre Hold Individual Plot** record. The AA-110 (02-0068) stamp matches that address's drawings, as suspected. They are now published on that project alone, as its lead image and gallery · `src/data/projects.ts`
- [ ] 🔴 **May we publish the AA-110 renders at all?** — both are watermarked **"KarmaQuar's — Architectural & Engineering Services"**, a third party. They are on the live project page. Confirm the client holds the right to publish another firm's renders, or get clean copies · `public/projects/aa_68/`
- [ ] 🔴 **Chaitali's two images are Google Street View captures** — not photographs taken for us. Both carry a "© 2026 Google" watermark, and the wider one still has Street View's own "Aerial" button and drag bar across the bottom. They are live on the project card and page. **Google's imagery is licensed and is not ours to publish on a commercial site**, so these need replacing with the client's own photographs of BB-102 — which should be easy, since the head office is on the ground floor · `public/projects/bb_102/`
- [ ] 🟡 **A third Chaitali capture is unpublished** — `street_elevation_raw_screenshot.jpg` is the same frame as the lead image with a phone status bar, a "Google · Jan 2026" pill and a close button across the top. Left on disk, referenced nowhere. Delete it once real photographs arrive · `public/projects/bb_102/`
- [ ] 🟡 **Pre Hold Individual Plot has renders, not photographs** — reasonable while it is under construction, and both are labelled "Architect's render" in the alt text and lightbox caption. Ask for site progress photographs, and for an exterior once it tops out · `projects.ts` → `imageLabel`, `gallery`
- [ ] 🟡 **Source file** — 1.9 MB PNG. Ask for the original JPEG/TIFF if there is one; a JPEG at this size would be a fraction of the weight · `public/clubhouse_deck.png`

| Shot | Where | Ratio |
| --- | --- | --- |
| Flagship tower at dusk | Home hero, full screen | Landscape, 2400px+ |
| Exterior / elevation per project (6) — **5 of 6 filled**; only the 8 Member MIG Society has none | Project cards, project pages | 4:3 |
| One shot per completed project (4) — **2 received** (New Manikanchan, Mitrae) | "Recently delivered" | 3:2 |
| Site engineer at work | Home, About | 3:4 |
| Handover / resident moment | Home | 3:4 |
| ~~Clubhouse or rooftop panorama~~ **received** | Amenities | 21:9 |
| Map marking all project locations | "Where we build" | 1:1 |
| ~~The first building on Rabindra Sarani~~ — the About-story 4:5 slot now carries the received nameplate | About story | 4:5 |
| Directors on site during a slab pour — **still outstanding**; the 1:1 slot currently stands in with a director portrait | About story | 1:1 |
| ~~Portrait of each director (3)~~ **received** — `public/directors/` | About, leadership | 3:4 |
| Slab reinforcement before a pour | About, specification | 3:2 |
| ~~Map of each office (2)~~ **not needed** — live Google embed instead | Contact | 2:1 |

---

## 10. Technical setup

- [ ] 🔴 **Wire the enquiry form to a real destination** (see §7) · `src/app/contact/actions.ts`
- [x] ~~**Real social media profile URLs**~~ **received** — Facebook `https://www.facebook.com/shreyahighrise`, Instagram `https://www.instagram.com/shreyahighrise`. LinkedIn dropped from the footer · `src/data/site.ts` → `socials`
- [ ] 🟡 **Google Analytics / Tag Manager ID**

---

## 11. Privacy policy — `/privacy`

The page at `src/app/(site)/privacy/page.tsx` renders `src/data/privacy.ts`. It is a **legal
notice**: under §4 of the DPDP Act the notice *is* the lawful basis for processing, so anything
inaccurate here does not merely read badly — it invalidates the consent it describes. Every item
below is something we asserted on the client's behalf and they have to confirm or correct.

- [ ] 🔴 **Name the Grievance Officer.** DPDP §13 and SPDI Rule 5(9) both require a published,
  named person. The card currently prints the designation, the desk email, the second phone number
  and the registered office — a lawful fallback, but not the whole requirement. Fill
  `grievanceOfficer.name` and the line appears · `src/data/privacy.ts` → `grievanceOfficer`
- [ ] 🔴 **There is no cookie consent banner on this site.** The policy is written to be true today
  (`analyticsLive = false` → §7 says nothing is running and no banner is needed). **The moment a
  Meta Pixel, GA4 or Google Ads tag is added, a consent banner has to ship in the same deploy and
  `analyticsLive` must be flipped to `true`** — which rewrites §4 and §7 to the consent wording.
  Shipping a tag without both is the single most likely way this page becomes untrue ·
  `src/data/privacy.ts` → `analyticsLive`
- [ ] 🔴 **Retention periods are ours, not theirs.** We committed the company in writing to:
  enquiries deleted **24 months** after last contact; deletion on request within **30 days**;
  consent records kept **3 years**; booking/KYC/registration records **8 years** from the end of the
  financial year. The 8 years is defensible from the Companies Act and the tax statutes; the other
  three are our choice and the client must actually be able to keep them ·
  `src/data/privacy.ts` → `sections` → `retention`
- [ ] 🔴 **Grievance timelines** — **three working days** to acknowledge, **thirty days** to answer.
  These now appear on a legal page, not just in marketing copy · `src/data/privacy.ts`
- [ ] 🟡 **Booking-stage practice at the offices**, described in §3: masked Aadhaar accepted and the
  full twelve digits never stored, Aadhaar never mandatory, PAN quoted on the TDS challan, financial
  documents passed only to the lender the buyer names. Confirm this is what the desk actually does ·
  `src/data/privacy.ts` → `sections` → `sensitive`
- [ ] 🟡 **"We do not circulate enquiries to brokers"** (§9) and **"we do not send bulk promotional
  SMS"** (§15). Both are absolute statements about current practice ·
  `src/data/privacy.ts` → `sections` → `sharing`, `marketing`
- [ ] 🟡 **Hosting provider and its log retention** — §11 says server logs are kept "as our hosting
  provider retains them, typically 30 days". Confirm against the actual host once deployment is
  settled · `src/data/privacy.ts` → `sections` → `retention`
- [ ] 🟡 **Bengali or Hindi copy on request** — §5 offers the notice in an Eighth Schedule language,
  which DPDP §5(3) entitles the reader to. Someone has to be able to produce it ·
  `src/data/privacy.ts` → `sections` → `consent`
- [ ] 🟡 **Effective date and version** — published as **8 September 2026, version 1.0**. Bump both
  on any substantive edit; the date is also the JSON-LD `dateModified` ·
  `src/data/privacy.ts` → `policyMeta`
- [ ] 🟡 **A Terms of Use / disclaimer page** is not written. The footer disclaimer covers the
  indicative-imagery point, but `legalNav` is an array precisely so a second entry can be added ·
  `src/data/site.ts` → `legalNav`
- [x] ✅ **No WBRERA claim** — §1 states positively that the company is *not* registered with
  WBRERA, consistent with the rest of the site · `src/data/privacy.ts`

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
- Real project records live in `src/data/temp-projects.json` (seven so far, all G+4 and all in New Town — six
  co-operative societies and one house on a private plot), and are now promoted into `src/data/projects.ts` —
  the seven the public site runs on
- Sanctioned drawings received: `public/projects/plans/cd_114/` (four PDFs, the LIG Co-operative at CD-114 — live on
  that project's page)
- Architect's drawings received: `public/projects/plans/0068/` — the Pre Hold Individual Plot at AA Block,
  Street No. 68. Seven PDFs arrived but only **four were distinct**: a ground floor and a typical floor, each
  issued twice, once in colour and once as line work. Three were byte-identical duplicates (`…TYP FL-OP2_02`,
  `…REN_GR FL_CAR`, `…REN_TYP_0P2_02`) and have been deleted; the content survives under the names below.
  The colour sheets were rasterised to JPEG here, so all four drawings now show as images and link to their PDF:
  `ground_floor_plan_colour_render`, `ground_floor_plan_line_drawing`, `typical_floor_plan_op_2_colour_render`,
  `typical_floor_plan_op_2_line_drawing` — `.pdf` and `.jpg` each
- Project photography received: `public/projects/manikanchan/street_elevation.png` and
  `public/projects/mitrae_co-operative/street_elevation_dusk.png` — both completed G+4 blocks, occupied,
  live on their project cards and pages. The first images on file that read as photographs of a named address
  *(confirm they are photographs of that society, not of another — see §9)*
- Street View captures received: `public/projects/bb_102/street_elevation.jpg` and `street_corner_from_gate.jpg`
  — Chaitali at BB-102, live on its card and page. **Google imagery, watermarked, and not ours to publish —
  needs replacing with the client's own photographs (see §9).** A third, `street_elevation_raw_screenshot.jpg`,
  is the same frame with the phone's status bar on it and is referenced nowhere
- Brand imagery received: `public/lobby_nameplate.png` — logo in brass on granite at a lobby entrance,
  live in the About-story column *(origin still to confirm — see §9)*
- Renders received: `public/projects/aa_68/left_side_view.jpg` and `right_side_view.jpg` (both stamped AA-110 / 02-0068
  and watermarked "KarmaQuar's"), now live on **Pre Hold Individual Plot** as its lead image and gallery, labelled
  as renders *(usage rights still to confirm — see §9)*; `public/under_construction.jpg`, live in the specification band
- Photography received: `public/clubhouse_deck.png` — rooftop clubhouse and infinity pool at dusk,
  live in the home-page amenity band *(project and usage rights still to confirm — see §9)*
