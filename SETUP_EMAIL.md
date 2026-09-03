# Email Setup Guide

This guide explains how to configure and test the email system for form submissions on the Shreya High Rise website.

## Overview

The email system handles enquiry form submissions through:
- **API Route**: `/api/contact/submit` — receives form data and sends emails
- **Email Service**: Sends confirmation emails to users and admin notifications to sales team
- **Email Templates**: HTML templates for admin notifications and user confirmations

## Prerequisites

1. Node.js 18+ installed
2. A Gmail account or other SMTP provider
3. Environment variables configured

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs `nodemailer` which is required for sending emails.

### 2. Configure Gmail (Recommended)

For Gmail, follow these steps:

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password

3. **Set Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Update the following variables:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your-email@gmail.com
     SMTP_PASS=your-app-password
     EMAIL_FROM=noreply@shreyahighrise.com
     EMAIL_SALES=sales@shreyahighrise.com
     EMAIL_PROJECTS=projects@shreyahighrise.com
     EMAIL_ADMIN=admin@shreyahighrise.com
     ```

### 3. Configure Email Addresses

Update the following environment variables in `.env.local`:

| Variable | Purpose | Example |
|----------|---------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` (TLS), `465` (implicit TLS) |
| `SMTP_USER` | SMTP authentication username | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP authentication password | Your Gmail App Password |
| `EMAIL_FROM` | Sender email address | `noreply@shreyahighrise.com` |
| `EMAIL_SALES` | Sales team email address | `sales@shreyahighrise.com` |
| `EMAIL_PROJECTS` | Projects team email address | `projects@shreyahighrise.com` |
| `EMAIL_ADMIN` | Admin email (optional for CC) | `admin@shreyahighrise.com` |
| `EMAIL_ADMIN_CC` | Enable CC to admin email | `true` or `false` |

### 4. Alternative SMTP Providers

You can use any SMTP provider by updating the configuration:

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Microsoft Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-password
```

**Custom SMTP:**
```env
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Email Architecture

### Components

1. **Mail Transporter** (`src/lib/mail-transporter.ts`)
   - Manages SMTP connection
   - Lazy-loads transporter on first use
   - Validates required environment variables

2. **Email Templates** (`src/lib/email-templates.ts`)
   - `generateEnquiryEmailTemplate()` — Admin notification email
   - `generateEnquiryConfirmationEmail()` — Customer confirmation email
   - Both include HTML formatting and data escaping

3. **Email Service** (`src/lib/email-service.ts`)
   - `sendEnquiryEmail()` — Sends both admin and customer emails
   - Error handling and logging

4. **API Route** (`src/app/api/contact/submit.ts`)
   - POST endpoint at `/api/contact/submit`
   - Validates form data
   - Calls email service
   - Returns JSON response

### Form Submission Flow

```
User submits form
    ↓
EnquiryForm component
    ↓
submitEnquiry() server action
    ↓
Validates form data
    ↓
POST to /api/contact/submit
    ↓
sendEnquiryEmail() service
    ↓
Admin email sent to EMAIL_SALES
    ↓
Confirmation email sent to user (if email provided)
    ↓
Redirect to /contact/thank-you
```

## Form Fields

The enquiry form captures the following data:

**Required:**
- Name (minimum 2 characters)
- Phone (minimum 10 digits)

**Optional:**
- Email (for confirmation)
- Project of interest
- Configuration (2 BHK, 3 BHK, etc.)
- Budget range
- Possession timeline
- Purchase purpose (Live in, Invest, NRI)
- Site visit date preference
- Additional message

## Testing

### Local Development

1. Set up `.env.local` with Gmail credentials
2. Start the dev server: `npm run dev`
3. Navigate to `http://localhost:3000/contact`
4. Fill and submit the enquiry form
5. Check your email for:
   - Admin notification at `EMAIL_SALES`
   - Confirmation email at the user's email address

### Without Email Configuration

The system gracefully handles missing SMTP configuration:
- Form submissions are still processed
- A warning is logged to console
- User is still redirected to thank-you page
- No errors are thrown

This allows testing without email setup.

### Email Testing Services

For development, consider using:
- **Mailtrap** (https://mailtrap.io) — Captures emails for testing
- **MailHog** (https://github.com/mailhog/MailHog) — Local email catcher
- **Gmail** with test account — Simple and reliable

## Security Considerations

1. **Never commit `.env.local`**
   - Add to `.gitignore`
   - Use `.env.example` as template

2. **Protect App Passwords**
   - Don't share credentials
   - Rotate periodically
   - Use OAuth when possible

3. **Validate Input**
   - All user input is trimmed and validated
   - HTML special characters are escaped in email templates
   - Phone numbers require minimum length

4. **Rate Limiting**
   - Consider adding rate limiting to `/api/contact/submit`
   - Prevent spam submissions

5. **GDPR Compliance**
   - Email confirmation includes privacy notice
   - User can see data being submitted
   - Consider adding unsubscribe mechanism

## Monitoring & Logging

Check server logs for:
- `[Email Error]` — Email sending failures
- `[API Error]` — API processing errors
- `[Warning]` — Configuration warnings

## Extending the System

### Add New Form Type

1. Create new email template in `src/lib/email-templates.ts`:
   ```typescript
   export function generateYourFormEmailTemplate(data: YourData): EmailTemplate {
     // Return { subject, html }
   }
   ```

2. Extend `src/lib/email-service.ts` with new send function:
   ```typescript
   export async function sendYourFormEmail(data: YourData) {
     // Implementation
   }
   ```

3. Create new API route or extend existing one

### Add CRM Integration

Replace the email sending with CRM API calls:

```typescript
const result = await crmClient.createLead({
  name: enquiry.name,
  phone: enquiry.phone,
  email: enquiry.email,
  // ... other fields
});
```

### Add Database Logging

Store submissions in a database:

```typescript
await db.enquiries.create({
  data: enquiry,
});
```

## Troubleshooting

### Emails not sending

1. Check environment variables are set: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
2. Verify SMTP credentials are correct
3. Check firewall/network allows SMTP port (587 or 465)
4. Enable "Less secure app access" (Gmail only, if not using App Password)

### Gmail App Password issues

- Ensure 2-Factor Authentication is enabled
- Generate a new App Password from https://myaccount.google.com/apppasswords
- Use exactly 16 characters (without spaces)

### Confirmation email not sent

- Verify `EMAIL_FROM` is a valid email
- Check user email address in form
- Look for errors in server logs

### SMTP Connection timeout

- Verify correct host and port
- Check network connectivity
- Try `SMTP_PORT=465` (implicit TLS) instead of 587

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify all environment variables are set
4. Test with a simple email service first (Gmail)
