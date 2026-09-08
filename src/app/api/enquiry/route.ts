import { intakeEnquiry } from "@/lib/enquiry-intake";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/* POST /api/enquiry
   The programmatic door for enquiries — a landing page, a partner site or a
   client-side widget can post JSON here. The contact form does not come through
   this route: it calls `intakeEnquiry` directly from its server action, which
   saves an HTTP hop and cannot break when the site URL is wrong. Both share the
   same validation and the same destination. */

export async function POST(request: Request) {
    const limit = rateLimit(clientKey(request.headers));
    if (!limit.allowed) {
        return Response.json(
            { ok: false, error: "Too many enquiries from this address. Please call us instead." },
            { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
        );
    }

    let body: Record<string, unknown>;
    try {
        const parsed: unknown = await request.json();
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
        body = parsed as Record<string, unknown>;
    } catch {
        return Response.json({ ok: false, error: "Expected a JSON object body." }, { status: 400 });
    }

    const result = await intakeEnquiry(body);

    if (result.status === "invalid") {
        return Response.json(
            { ok: false, error: "Validation failed", fields: result.errors },
            { status: 400 },
        );
    }

    if (result.status === "failed") {
        // 503, not 500: the enquiry was fine, the mail hop was not. Retrying may work.
        return Response.json(
            { ok: false, error: "The enquiry could not be delivered. Please call the sales desk." },
            { status: 503 },
        );
    }

    return Response.json({ ok: true, receivedAt: result.enquiry.receivedAt }, { status: 201 });
}
