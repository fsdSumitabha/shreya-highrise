# Enquiry mail — how it works and how to switch it on

The contact form emails the sales desk. Nothing else is stored: there is no
database and no CRM, so **the mail is the lead**. That shapes every decision below.

---

## Switching it on

1. `cp .env.example .env.local`
2. Turn on 2-Step Verification for the Gmail account that will send.
3. Create an App Password at <https://myaccount.google.com/apppasswords> and put
   the 16 characters in `SMTP_PASS`. A normal account password will not work —
   Google refuses SMTP logins with it.
4. `npm run dev`, submit the form at `/contact`.

Two mails go out: the enquiry to the sales desk, and an acknowledgement to the
visitor if they left an email address. `Reply-To` on the desk copy is the
visitor, so hitting reply in the inbox answers them rather than the SMTP account.

**Nothing is configured yet?** The form says so and shows the phone numbers. It
never shows the thank-you page for an enquiry that did not send.

---

## The pieces

| File | Does |
| --- | --- |
| `src/lib/enquiry.ts` | The shape of an enquiry, parsing, validation. No server imports — safe anywhere. |
| `src/lib/enquiry-email.ts` | The two templates, and delivery. Server-only. |
| `src/lib/enquiry-intake.ts` | `intakeEnquiry()` — parse → validate → deliver → log. The single path in. |
| `src/lib/mail-transporter.ts` | The SMTP transport, built lazily so `next build` works without credentials. |
| `src/lib/rate-limit.ts` | Fixed window, in memory. |
| `src/app/(site)/contact/actions.ts` | The form's server action. Returns state on failure, redirects on success. |
| `src/app/api/enquiry/route.ts` | `POST /api/enquiry` for anything that is not the form. |
| `src/components/sections/EnquiryFields.tsx` | The form itself — the only part that ships to the browser. |

The form does **not** post to `/api/enquiry`. It calls `intakeEnquiry()` directly
from its server action: one less hop, and it cannot break because a site URL is
wrong. The route exists for a landing page, a partner site or a widget, and runs
the same validation into the same inbox.

### POST /api/enquiry

```jsonc
{
  "name": "Required, 2+ characters",
  "phone": "Required, 10–15 digits",
  "consent": true,          // required — permission to make contact
  "email": "optional, becomes Reply-To and gets the acknowledgement",
  "kind": "sales",          // or "projects" — picks the desk
  "project": "", "configuration": "", "budget": "",
  "timeline": "", "purpose": "", "visitOn": "", "message": ""
}
```

`201` delivered · `400` validation (`fields` says which) · `429` rate limited ·
`503` valid but the mail hop failed — retrying may work.

---

## When delivery fails

The visitor is told plainly and given the phone numbers, and the whole enquiry is
written to the server log as JSON behind `[enquiry] DELIVERY FAILED`. Grep for
that line before assuming a quiet week — a lead that arrived while SMTP was down
is recoverable from there and nowhere else.

---

## Before go-live

- **Gmail sends about 500 mails a day** on a free account. Fine for this volume,
  but it is a consumer relay — mail from it can land in spam. If enquiries start
  disappearing, move to a transactional provider (Resend, SES, Postmark) with
  SPF and DKIM on the real domain. Only the four `SMTP_*` values change.
- **The rate limit is in memory**: 5 submissions per IP per 10 minutes, per
  server instance, reset on deploy. Enough to stop a script. If the site is ever
  spread across instances, back `src/lib/rate-limit.ts` with Redis and keep the
  signature.
- **The acknowledgement quotes promises made on the page** — one working day,
  and that we do not sell the number. `CLIENT-DATA.md` §7 still has both open.
