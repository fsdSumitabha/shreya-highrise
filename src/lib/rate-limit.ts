import "server-only";

/* A fixed window, held in memory. The enquiry endpoint sends mail to an address
   supplied in the request, so without a brake it can be pointed at a stranger's
   inbox — or simply used to burn the SMTP account's daily quota.

   Memory means this holds per server instance and resets on deploy. That is
   enough to stop a script; if the site is ever spread across instances, swap the
   Map for Redis/Upstash and keep the signature. */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
        // Cheap sweep — this runs on submissions only, so the map stays small.
        if (hits.size > 500) {
            for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
        }
        hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true, retryAfterSeconds: 0 };
    }

    entry.count += 1;
    return {
        allowed: entry.count <= MAX_PER_WINDOW,
        retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
}

/** Best-effort client address. Behind a proxy the left-most XFF hop is the client. */
export function clientKey(headers: Headers): string {
    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]!.trim();
    return headers.get("x-real-ip") ?? "unknown";
}
