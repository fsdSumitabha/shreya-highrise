# Email & Form Submission Implementation Guide

## Overview

This document describes the new email and form submission system implemented for Shreya High Rise website. The system handles enquiry forms with automated email notifications to the sales team and confirmations to users.

## Architecture

### Directory Structure

```
src/
├── lib/
│   ├── mail-transporter.ts      # SMTP transporter configuration
│   ├── email-templates.ts       # HTML email templates
│   ├── email-service.ts         # Email sending logic
│   └── form-validation.ts       # Form validation utilities
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── submit.ts        # API endpoint for form submissions
│   └── (site)/
│       └── contact/
│           └── actions.ts       # Server action that calls the API
```

### Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│ EnquiryForm Component (React)                               │
│ └─ Submits form data via action                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ submitEnquiry() Server Action                               │
│ └─ Validates form data, calls API                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ POST /api/contact/submit (API Route)                        │
│ ├─ Validates using form-validation.ts                      │
│ ├─ Calls sendEnquiryEmail() service                         │
│ └─ Returns JSON response                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ sendEnquiryEmail() Service                                  │
│ ├─ Gets SMTP transporter                                   │
│ ├─ Generates email templates                               │
│ ├─ Sends admin notification email                          │
│ ├─ Sends user confirmation email                           │
│ └─ Returns success/error status                            │
└─────────────────────────────────────────────────────────────┘
```

## Files Added/Modified

### New Files

1. **`.env.example`**
   - Template for environment variables
   - Used to configure SMTP and email addresses
   - Commit to repo as documentation

2. **`src/lib/mail-transporter.ts`**
   - Creates and caches SMTP transporter
   - Validates required environment variables
   - Throws error if configuration missing
   - Server-only code (cannot run in browser)

3. **`src/lib/email-templates.ts`**
   - `generateEnquiryEmailTemplate()` — Admin notification
   - `generateEnquiryConfirmationEmail()` — User confirmation
   - Both return `{ subject: string, html: string }`
   - Includes data formatting and HTML escaping

4. **`src/lib/email-service.ts`**
   - `sendEnquiryEmail()` — Main email sending function
   - Handles multiple email types in one call
   - Error handling and logging
   - Returns `{ success: boolean, error?: string }`

5. **`src/lib/form-validation.ts`**
   - `validatePhone()` — Validates phone number format
   - `validateEmail()` — Validates email address format
   - `validateName()` — Validates name length
   - `validateEnquiryForm()` — Complete form validation
   - Reusable for other forms

6. **`src/app/api/contact/submit.ts`**
   - POST endpoint for form submissions
   - Input validation
   - Calls email service
   - Graceful handling of missing SMTP config
   - Returns JSON responses

7. **`SETUP_EMAIL.md`**
   - Comprehensive setup and configuration guide
   - SMTP provider instructions
   - Testing procedures
   - Troubleshooting guide

8. **`IMPLEMENTATION_GUIDE.md`** (this file)
   - Architecture overview
   - File descriptions
   - Integration instructions

### Modified Files

1. **`package.json`**
   - Added `nodemailer` dependency
   - Added `@types/nodemailer` dev dependency

2. **`src/app/(site)/contact/actions.ts`**
   - Replaced console logging with API call
   - Calls `/api/contact/submit` endpoint
   - Maintains same validation and redirect behavior
   - Graceful error handling

## Form Fields & Data

### Enquiry Form Structure

**Required Fields:**
- `name` (string, min 2 chars)
- `phone` (string, 10-20 digits)

**Optional Fields:**
- `email` (string, valid email format)
- `project` (string, project name from dropdown)
- `configuration` (string, e.g., "2 BHK", "3 BHK")
- `budget` (string, budget range)
- `timeline` (string, possession timeline)
- `purpose` (string, reason for purchase)
- `visitOn` (string, ISO date for preferred visit)
- `message` (string, additional information)

### Data Flow

```
Form Submission
    ↓
Validation (client-side + server-side)
    ↓
POST /api/contact/submit
    ↓
Database validation
    ↓
Email generation
    ↓
Email sending (admin + user)
    ↓
Redirect to thank-you page
```

## Email Templates

### Admin Notification Email

**Sent To:** `EMAIL_SALES` (configured in env)

**Contains:**
- Contact information (name, phone, email)
- Project interest details
- Budget, timeline, purpose
- Additional message
- Submission timestamp
- Follow-up reminder (should acknowledge within 1 working day)

**Purpose:** Sales team reviews enquiry and follows up with caller

### User Confirmation Email

**Sent To:** User's email (if provided)

**Contains:**
- Thank you message
- Confirmation that enquiry was received
- What to expect next (3-step process)
- Phone number and WhatsApp link
- Privacy notice (data not shared)

**Purpose:** Reassures user and sets expectations

## Environment Variables

### Required for Email

```
SMTP_HOST        # SMTP server (e.g., smtp.gmail.com)
SMTP_PORT        # SMTP port (587 for TLS, 465 for implicit)
SMTP_USER        # SMTP username
SMTP_PASS        # SMTP password or app password
```

### Optional for Email

```
EMAIL_FROM       # Sender address (default: noreply@shreyahighrise.com)
EMAIL_SALES      # Sales team email (default: sales@shreyahighrise.com)
EMAIL_PROJECTS   # Projects team email
EMAIL_ADMIN      # Admin email for CC
EMAIL_ADMIN_CC   # Enable admin CC (true/false)
```

### General

```
NEXT_PUBLIC_SITE_URL  # Website URL (used in action to call API)
```

## Error Handling

### Validation Errors (400)

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "name", "message": "Name must be at least 2 characters" },
    { "field": "phone", "message": "Phone must be a valid number" }
  ]
}
```

### Email Configuration Missing (200 with warning)

```json
{
  "success": true,
  "message": "Enquiry received (email not configured)"
}
```

The system continues processing even if email config is missing, allowing testing without full setup.

### Email Sending Error (500)

```json
{
  "error": "Failed to send email",
  "details": "SMTP connection timeout"
}
```

### General Errors (500)

```json
{
  "error": "Failed to process enquiry",
  "details": "JSON parse error"
}
```

## Security Features

1. **Input Validation**
   - Length checks (name ≥ 2 chars, phone ≥ 10 digits)
   - Format validation (email, date)
   - Required field checks

2. **Data Escaping**
   - HTML special characters escaped in email templates
   - Prevents XSS in email client
   - User data displayed safely

3. **Environment Protection**
   - SMTP credentials in env vars only
   - Not exposed to client code
   - Validated at module load time

4. **Server-Only Code**
   - Mail transporter marked with "server-only"
   - Cannot be imported in client components
   - Build will fail if accidentally used client-side

5. **API Validation**
   - Validates before sending email
   - Prevents sending invalid data to inbox
   - Sanitizes all user input

## Testing

### Setup Testing Environment

1. Copy `.env.example` to `.env.local`
2. Configure Gmail or test SMTP service
3. Run `npm install` to install dependencies
4. Start dev server: `npm run dev`

### Test Scenarios

**Scenario 1: Valid Submission**
- Fill all required fields with valid data
- Submit form
- Verify admin email received
- Verify user confirmation email received

**Scenario 2: Missing Optional Email**
- Fill required fields only
- Skip email field
- Submit form
- Verify admin email received
- Verify no confirmation email sent to user

**Scenario 3: Invalid Phone**
- Enter phone with < 10 digits
- Submit form
- Verify validation error returned
- Verify no emails sent

**Scenario 4: Missing SMTP Config**
- Remove SMTP env vars
- Submit form
- Verify form succeeds (doesn't break)
- Check server logs for warning

## Extending the System

### Adding a New Form Type

1. **Create validation schema** in `form-validation.ts`:
   ```typescript
   export function validateYourForm(data: any): ValidationError[] {
     // Your validation logic
   }
   ```

2. **Create email templates** in `email-templates.ts`:
   ```typescript
   export function generateYourFormEmail(data: any): EmailTemplate {
     return {
       subject: "...",
       html: "...",
     };
   }
   ```

3. **Create send function** in `email-service.ts`:
   ```typescript
   export async function sendYourFormEmail(data: any): Promise<EmailResult> {
     // Send logic
   }
   ```

4. **Create API route** or extend existing one:
   ```typescript
   // src/app/api/contact/submit.ts or create new route
   ```

5. **Connect form component** to call API

### Adding CRM Integration

Replace email sending with CRM API call:

```typescript
// In email-service.ts
const crmResponse = await fetch("https://crm.example.com/api/leads", {
  method: "POST",
  headers: { "Authorization": `Bearer ${process.env.CRM_API_KEY}` },
  body: JSON.stringify(enquiry),
});
```

### Adding Database Storage

Log submissions to database:

```typescript
// In email-service.ts
import { db } from "@/lib/db";

await db.enquiry.create({
  data: {
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email,
    // ... other fields
    submittedAt: new Date(),
  },
});
```

## Performance Considerations

1. **Email Sending is Async**
   - Doesn't block user redirect
   - Email sending happens in background
   - Errors logged but don't break form

2. **Transporter Caching**
   - SMTP connection created once
   - Reused for all subsequent emails
   - Reduces connection overhead

3. **Template Generation**
   - Templates generated on each send
   - Consider caching if high volume
   - HTML is generated, not pre-compiled

## Monitoring

### Key Log Messages

```
[Email Error] - Email sending failed
[API Error] - Form submission error
[Warning] - Configuration issue (e.g., missing SMTP)
[enquiry] - Form data received (logged in server action)
```

### Success Indicators

1. Admin receives notification email
2. User receives confirmation email (if email provided)
3. Browser redirects to thank-you page
4. No error logs in console

## Deployment

### Pre-Deployment Checklist

- [ ] `.env.example` committed to repo
- [ ] `.env.local` NOT committed (in `.gitignore`)
- [ ] All dependencies installed (`npm install`)
- [ ] Email templates tested locally
- [ ] SMTP credentials validated
- [ ] Email addresses configured for production
- [ ] Error logging configured
- [ ] Rate limiting considered

### Deployment Steps

1. Set environment variables on hosting platform:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=prod-email@gmail.com
   SMTP_PASS=app-password
   EMAIL_SALES=sales@shreyahighrise.com
   NEXT_PUBLIC_SITE_URL=https://shreyahighrise.com
   ```

2. Deploy application normally (`npm run build && npm start`)

3. Test form submission on production

4. Monitor logs for errors

## Maintenance

### Regular Tasks

1. **Monitor email deliverability**
   - Check spam folder
   - Verify SPF/DKIM records
   - Monitor bounce rates

2. **Review error logs**
   - Check for SMTP errors
   - Verify email addresses still valid
   - Watch for validation errors

3. **Update credentials**
   - Rotate Gmail app passwords periodically
   - Update SMTP passwords if required
   - Keep dependencies updated

4. **Test email delivery**
   - Send test enquiry monthly
   - Verify both admin and user emails
   - Check for email template rendering issues

## Support Resources

- **SETUP_EMAIL.md** — Detailed setup instructions
- **`.env.example`** — Configuration template
- **Nodemailer Docs** — https://nodemailer.com/
- **Gmail App Passwords** — https://myaccount.google.com/apppasswords
