export interface EnquiryData {
  name: string;
  phone: string;
  email?: string;
  project?: string;
  message?: string;
  configuration?: string;
  budget?: string;
  timeline?: string;
  purpose?: string;
  visitOn?: string;
  receivedAt: string;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function escapedHtml(text: string | undefined): string {
  if (!text) return "—";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateEnquiryEmailTemplate(data: EnquiryData): EmailTemplate {
  return {
    subject: `New Site Visit Enquiry: ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #D4A574; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #1a1a2e; font-size: 24px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: 600; color: #1a1a2e; margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
          .field { display: flex; margin-bottom: 12px; }
          .label { font-weight: 600; width: 150px; color: #666; }
          .value { flex: 1; color: #333; word-break: break-word; }
          .empty { color: #999; font-style: italic; }
          .footer { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Site Visit Enquiry</h1>
          </div>

          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapedHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${escapedHtml(data.phone)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${data.email ? `<a href="mailto:${escapedHtml(data.email)}">${escapedHtml(data.email)}</a>` : '<span class="empty">Not provided</span>'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Enquiry Details</div>
            <div class="field">
              <div class="label">Project Interest</div>
              <div class="value">${data.project ? escapedHtml(data.project) : '<span class="empty">Not specified</span>'}</div>
            </div>
            ${data.configuration ? `
            <div class="field">
              <div class="label">Configuration</div>
              <div class="value">${escapedHtml(data.configuration)}</div>
            </div>
            ` : ''}
            ${data.budget ? `
            <div class="field">
              <div class="label">Budget</div>
              <div class="value">${escapedHtml(data.budget)}</div>
            </div>
            ` : ''}
            ${data.timeline ? `
            <div class="field">
              <div class="label">Possession Needed</div>
              <div class="value">${escapedHtml(data.timeline)}</div>
            </div>
            ` : ''}
            ${data.purpose ? `
            <div class="field">
              <div class="label">Purchase Purpose</div>
              <div class="value">${escapedHtml(data.purpose)}</div>
            </div>
            ` : ''}
            ${data.visitOn ? `
            <div class="field">
              <div class="label">Preferred Visit Date</div>
              <div class="value">${new Date(data.visitOn).toLocaleDateString("en-IN")}</div>
            </div>
            ` : ''}
          </div>

          ${data.message ? `
          <div class="section">
            <div class="section-title">Additional Information</div>
            <div class="value" style="padding: 10px; background-color: #f9f9f9; border-left: 3px solid #D4A574; border-radius: 2px;">
              ${escapedHtml(data.message).replace(/\n/g, "<br>")}
            </div>
          </div>
          ` : ''}

          <div class="footer">
            <strong>Submission Time:</strong> ${formatDate(data.receivedAt)} IST<br>
            <strong>Status:</strong> Lead received - awaiting follow-up<br>
            <em>This enquiry should be acknowledged within one working day.</em>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function generateEnquiryConfirmationEmail(name: string): EmailTemplate {
  return {
    subject: "We've received your enquiry — Shreya High Rise",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #D4A574; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #1a1a2e; font-size: 24px; }
          .message { background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .steps { margin: 20px 0; }
          .step { display: flex; margin-bottom: 15px; }
          .step-num { font-weight: 600; color: #D4A574; width: 30px; min-width: 30px; }
          .step-text { flex: 1; }
          .footer { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 30px; font-size: 12px; color: #666; }
          .cta { display: inline-block; background-color: #D4A574; color: #1a1a2e; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You!</h1>
          </div>

          <p>Hi ${escapedHtml(name)},</p>

          <div class="message">
            <strong>✓ We've received your enquiry</strong><br>
            Your enquiry about Shreya High Rise has been submitted successfully. Our sales team will review it and get back to you within one working day.
          </div>

          <div class="steps">
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-text">
                <strong>We read it, not a bot</strong><br>
                Your enquiry goes to the sales desk directly — nothing routed through a call-centre queue.
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-text">
                <strong>One call, within a working day</strong><br>
                We'll ask what you're looking for and send only the relevant projects with full cost sheets attached.
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-text">
                <strong>A visit, if you want one</strong><br>
                A project engineer will meet you at the gate. Weekend slots fill first, so pick two times if you can.
              </div>
            </div>
          </div>

          <p style="margin-top: 30px;">
            Can't wait? You can also reach us directly:
          </p>
          <ul>
            <li><strong>Call:</strong> +91-33-4028-5555 (Mon–Sun, 10:00–19:00 IST)</li>
            <li><strong>WhatsApp:</strong> Same number for instant price sheets and floor plans</li>
            <li><strong>Email:</strong> sales@shreyahighrise.com</li>
          </ul>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            <em>We do not sell, share or resell your number. One follow-up call, and we stop if you ask us to.</em>
          </p>

          <div class="footer">
            <strong>Shreya High Rise</strong><br>
            Luxury homes in Kolkata | New Town, Rajarhat, Madhyamgram, Narendrapur<br>
            <em>Two offices, seven days a week</em>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}
