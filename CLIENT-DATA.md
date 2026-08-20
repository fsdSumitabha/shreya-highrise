# Client Data Tracker — Shreya High Rise

Every value on the website that is **assumed / invented** and must be replaced with real
information from the client. Work through it in rounds; update the `Status` column as answers
come in, and edit the file named in `Lives in`.

**Status key:** `TODO` = not asked yet · `ASKED` = waiting on client · `DONE` = real data in code

---

## Legend of risk

| Risk | Meaning |
| --- | --- |
| 🔴 | **Legally or commercially dangerous if published wrong.** Must be real before go-live. |
| 🟠 | Wrong facts damage credibility. Replace before go-live. |
| 🟡 | Marketing copy. Client should review, but a placeholder can survive a soft launch. |

---

## Round 1 — Blockers (ask first, cannot launch without these)

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 1.1 | 🔴 | **RERA registration number for every project.** Exact string as issued by WBRERA (older ones may be WBHIRA). | All 7 are invented, e.g. `WBRERA/P/NOR/2025/001842` | `src/data/projects.ts` → `rera` | TODO |
| 1.2 | 🔴 | **Real project list** — name, stage (upcoming / ongoing / completed), full site address. | 7 invented projects | `src/data/projects.ts` | TODO |
| 1.3 | 🔴 | **Company registration (CIN)** — and whether it should appear in the footer. | Not shown (placeholder removed) | `src/data/site.ts` | TODO |
| 1.4 | 🔴 | **Year founded / incorporated.** | Assumed **2006** — used in hero, stats, About, footer copyright | `src/data/site.ts` → `founded` | TODO |
| 1.5 | 🔴 | **Domain name** for the live site. | Assumed `https://shreyahighrise.in` — used in canonical URL, OG tags, JSON-LD | `src/data/site.ts` → `url` | TODO |
| 1.6 | 🟠 | Which email is the **public sales enquiry** address, and which is internal? | `shreyahighrise@gmail.com` = sales, `royconstruction@gmail.com` = projects | `src/data/site.ts` → `emails` | TODO |
| 1.7 | 🟠 | Are **both phone numbers** public? Which is primary (it becomes the header button)? | `8910355765` primary, `9836649276` secondary | `src/data/site.ts` → `phones` | TODO |

---

## Round 2 — Per-project detail (repeat for each real project)

Ask once the project list from 1.2 is confirmed.

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 2.1 | 🔴 | **Price / "starting at"** figure — and whether prices should be public at all. | Invented: ₹48 L – ₹1.18 Cr | `projects.ts` → `priceFrom` | TODO |
| 2.2 | 🔴 | **Possession date** as printed in the agreement. | Invented: Mar 2027 – Jun 2029 | `projects.ts` → `possession` | TODO |
| 2.3 | 🟠 | **Configuration** (2/3/4 BHK, duplex) actually on offer. | Invented | `projects.ts` → `typology` | TODO |
| 2.4 | 🟠 | **Area range** — and confirm it is *carpet* area, not super built-up. | Invented; the site currently labels it "Carpet range" | `projects.ts` → `sizeRange` | TODO |
| 2.5 | 🟠 | **3 nearby landmarks + real distances** per project (station, hospital, school, mall). | Invented distances | `projects.ts` → `nearby` | TODO |
| 2.6 | 🟡 | **3 selling points** per project (tower count, view, floor plate, USP). | Invented | `projects.ts` → `highlights` | TODO |
| 2.7 | 🟡 | For completed projects: handover year, number of families resident. | Invented | `projects.ts` → `possession`, `highlights` | TODO |

> **Shortcut for the client conversation:** ask for the existing price sheet or brochure per
> project. Nearly every field in Round 2 is already printed on it.

---

## Round 3 — Track record numbers (displayed large; easy to get wrong)

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 3.1 | 🟠 | Total **projects / addresses** completed + ongoing. | Assumed **10** | `src/data/stats.ts`, `src/data/corridors.ts` | TODO |
| 3.2 | 🟠 | Total **families / flats handed over**. | Assumed **1,450** | `src/data/stats.ts` | TODO |
| 3.3 | 🟠 | Total **sq. ft. developed**. | Assumed **1.6M** | `src/data/stats.ts` | TODO |
| 3.4 | 🟠 | Project count **per corridor**. | Assumed New Town 3 / Rajarhat 1 / North Kolkata 5 / South Kolkata 1 | `src/data/corridors.ts` | TODO |
| 3.5 | 🟠 | Which **areas of Kolkata** do they actually build in? Confirm the four corridors. | Assumed New Town, Rajarhat, North Kolkata, South Kolkata | `src/data/corridors.ts` | TODO |

> ⚠️ 3.1–3.4 must agree with each other **and** with the project list. If the client says
> "8 projects", the four corridor counts have to add up to 8.

---

## Round 4 — Claims and credentials (each one is a factual assertion)

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 4.1 | 🔴 | Is the company a **CREDAI Bengal member**? | Stated as fact | `src/data/assurance.ts` | TODO |
| 4.2 | 🔴 | Is there a real **ISO 9001:2015** certificate? | Stated as fact | `src/data/assurance.ts` | TODO |
| 4.3 | 🔴 | Which **banks / HFCs have project-level approval**? | Invented list of 7 (SBI, HDFC, ICICI, Axis, BoB, PNB HF, LIC HF) | `src/data/assurance.ts` → `lenders` | TODO |
| 4.4 | 🔴 | Is there really a **third-party structural audit**? By whom? | Stated as fact | `src/data/assurance.ts` | TODO |
| 4.5 | 🟠 | Is there a **delay-compensation clause** in the agreement? | Stated as fact | `src/data/advantages.ts` | TODO |
| 4.6 | 🟠 | Is "**every project on time since 2016**" true? If not, what is the honest version? | Stated as fact | `src/data/advantages.ts` | TODO |
| 4.7 | 🟠 | Is there a **24-month post-handover facility team**? | Stated as fact | `src/data/advantages.ts` | TODO |
| 4.8 | 🟠 | Do they use a **Vaastu consultant**? | Stated as fact | `src/data/advantages.ts` | TODO |
| 4.9 | 🟡 | Any **awards or recognitions** worth showing? | Nothing on site yet | new data file | TODO |

---

## Round 5 — People, amenities, process

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 5.1 | 🟠 | Correct **spelling and job title** of the three directors. | Ranjeet Roy, Sampa Roy, Partha Roy Chowdhury — all shown as "Managing Director" | `src/data/site.ts` → `leadership` | TODO |
| 5.2 | 🟡 | What each director actually **looks after**. | Invented: finance / design / construction | `src/data/site.ts` → `leadership` | TODO |
| 5.3 | 🟠 | The **real amenity list** — which are genuinely provided, and in which projects? | 24 invented amenities across 4 groups | `src/data/amenities.ts` | TODO |
| 5.4 | 🟠 | Does the **7-step buying process** match how they actually sell? | Invented but conventional | `src/data/journey.ts` | TODO |
| 5.5 | 🟠 | Is the **booking amount 10%**? What is the refund policy? | Stated as fact in FAQ | `src/data/faqs.ts` | TODO |
| 5.6 | 🟠 | **Site office hours**, and is pickup really offered? | Assumed Mon–Sun 10:00–19:00; pickup claimed | `src/data/site.ts` → `hours`, `CtaBand.tsx` | TODO |
| 5.7 | 🟡 | Do they want **NRI buyers** addressed? Is the FEMA answer accurate for them? | FAQ answers it | `src/data/faqs.ts` | TODO |
| 5.8 | 🟡 | Is **interior customisation until brickwork stage** accurate? | Stated as fact in FAQ | `src/data/faqs.ts` | TODO |

---

## Round 6 — Testimonials (need written consent)

| # | Risk | What to ask | Currently on site | Lives in | Status |
| --- | --- | --- | --- | --- | --- |
| 6.1 | 🔴 | **Real resident quotes + written permission** to publish name and project. | 3 invented residents with invented names | `src/data/testimonials.ts` | TODO |
| 6.2 | 🟡 | Any Google reviews the client would prefer quoted instead. | — | `src/data/testimonials.ts` | TODO |

---

## Round 7 — Photography (every image is a dashed placeholder today)

Each placeholder box on the page is labelled with the shot it needs.

| # | Shot needed | Where it appears | Ideal ratio | Status |
| --- | --- | --- | --- | --- |
| 7.1 | Flagship tower at dusk | Full-screen hero background | Landscape, 2400px+ wide | TODO |
| 7.2 | Exterior / elevation shot **per project** (7 needed) | Project cards | 4:3 | TODO |
| 7.3 | One shot per completed project | "Recently delivered" | 3:2 | TODO |
| 7.4 | Site engineer / team at work | About section | 3:4 portrait | TODO |
| 7.5 | Handover or resident moment | About section | 3:4 portrait | TODO |
| 7.6 | Clubhouse / rooftop amenity panorama | Amenities | 21:9 ultra-wide | TODO |
| 7.7 | Map graphic marking all project locations | "Where we build" | 1:1 square | TODO |

> Ask whether a brochure PDF exists — render shots can usually be lifted from it while real
> photography is arranged.

---

## Round 8 — Needed for the other three pages

| # | What to ask | Needed for | Status |
| --- | --- | --- | --- |
| 8.1 | Google Maps link / lat-long for both offices | Contact page | TODO |
| 8.2 | Real social media profile URLs (footer currently links to generic homepages) | Footer | TODO |
| 8.3 | WhatsApp business number | Contact page | TODO |
| 8.4 | Company story, milestones, timeline | About page | TODO |
| 8.5 | Floor plans and brochure PDFs per project | Projects page | TODO |
| 8.6 | Where enquiry-form submissions should go (email inbox? CRM?) | Contact page | TODO |
| 8.7 | Google Analytics / Tag Manager ID | Whole site | TODO |

---

## Confirmed data (already correct — do not re-ask)

From `data.txt` and the supplied logo files.

- Business name: **Shreya High Rise** · Legal name: **Shreya Highrise Private Limited**
- Directors: Ranjeet Roy, Sampa Roy, Partha Roy Chowdhury *(titles still to confirm — see 5.1)*
- GSTIN: **19ABGCS5087H1ZU**
- Registered office: Spriha Apartment, Flat No. 01, Gr. Fl., 97 Rabindra Sarani, New Barrackpur, Kolkata 700131
- Head office: Chaitali Co-op Housing Society Ltd., BB-102, Gr. Fl., Street No. 152, New Town, Kolkata 700156
- Phones: 8910355765 / 9836649276
- Emails: shreyahighrise@gmail.com · royconstruction@gmail.com
- Brand colours: Deep Navy `#0B1F33` · Champagne `#C8A96B`
- Logo files in use: `public/logo-currentcolor.svg` (header + footer), `public/shreya_logo.png`
  (social sharing image), `public/shreya_favicon.png` (browser tab icon, copied to
  `src/app/icon.png` and `src/app/apple-icon.png`)
