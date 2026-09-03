import "server-only";

import { getTransporter } from "@/lib/mail-transporter";
import type { EnquiryData } from "@/lib/email-templates";
import { generateEnquiryEmailTemplate, generateEnquiryConfirmationEmail } from "@/lib/email-templates";

interface SendEnquiryEmailOptions {
  enquiry: EnquiryData;
  toAdmin: string;
  fromEmail: string;
  ccAdmin?: boolean;
  adminCcEmail?: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendEnquiryEmail({
  enquiry,
  toAdmin,
  fromEmail,
  ccAdmin = false,
  adminCcEmail,
}: SendEnquiryEmailOptions): Promise<EmailResult> {
  try {
    const transporter = getTransporter();

    const adminTemplate = generateEnquiryEmailTemplate(enquiry);

    const adminCC = ccAdmin && adminCcEmail ? adminCcEmail : undefined;

    await transporter.sendMail({
      from: `"Shreya High Rise" <${fromEmail}>`,
      to: toAdmin,
      cc: adminCC,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
    });

    if (enquiry.email) {
      const confirmationTemplate = generateEnquiryConfirmationEmail(enquiry.name);
      await transporter.sendMail({
        from: `"Shreya High Rise" <${fromEmail}>`,
        to: enquiry.email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html,
      });
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Email Error]", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
