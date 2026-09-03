import { type NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email-service";
import { validateEnquiryForm } from "@/lib/form-validation";
import type { EnquiryData } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const enquiry: EnquiryData = {
      name: String(data.name ?? "").trim(),
      phone: String(data.phone ?? "").trim(),
      email: String(data.email ?? "").trim() || undefined,
      project: String(data.project ?? "").trim() || undefined,
      message: String(data.message ?? "").trim() || undefined,
      configuration: String(data.configuration ?? "").trim() || undefined,
      budget: String(data.budget ?? "").trim() || undefined,
      timeline: String(data.timeline ?? "").trim() || undefined,
      purpose: String(data.purpose ?? "").trim() || undefined,
      visitOn: String(data.visitOn ?? "").trim() || undefined,
      receivedAt: new Date().toISOString(),
    };

    const validationErrors = validateEnquiryForm({
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
    });

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    const fromEmail = process.env.EMAIL_FROM || "noreply@shreyahighrise.com";
    const toEmail = process.env.EMAIL_SALES || "sales@shreyahighrise.com";
    const adminCcEmail = process.env.EMAIL_ADMIN;
    const enableAdminCC = process.env.EMAIL_ADMIN_CC === "true";

    if (!process.env.SMTP_HOST) {
      console.warn("[Warning] Email not configured - skipping send but proceeding with submission");
      return NextResponse.json(
        { success: true, message: "Enquiry received (email not configured)" },
        { status: 200 }
      );
    }

    const result = await sendEnquiryEmail({
      enquiry,
      toAdmin: toEmail,
      fromEmail,
      ccAdmin: enableAdminCC,
      adminCcEmail: adminCcEmail || undefined,
    });

    if (!result.success) {
      console.error("[Enquiry Email Error]", result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[API Error]", errorMessage);

    return NextResponse.json(
      { error: "Failed to process enquiry", details: errorMessage },
      { status: 500 }
    );
  }
}
