// Vercel Edge Function: /api/visitors
//
//   GET  -> { count }  current number of unique visitors (read-only)
//   POST -> { count }  registers this visitor (once, ever) and returns the new total
//
// The count is REAL: every visitor is identified by a salted SHA-256 hash of
// their IP and stored in a Redis SET. SADD ignores duplicates, so refreshing,
// clearing localStorage or using another tab never inflates the number.
// Raw IPs are never stored - only the irreversible hash.
//
// Setup (one time): Vercel dashboard -> Storage / Marketplace -> add "Upstash
// Redis" and connect it to this project. That injects the env vars below.
//   KV_REST_API_URL + KV_REST_API_TOKEN          (or)
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
// Optional:
//   VISITOR_SALT          any random string; makes the hashes un-guessable
//   VISITOR_COUNT_OFFSET  number added to the total, e.g. to carry over the
//                         count from the old counterapi.dev counter
export const config = { runtime: "edge" };

const SET_KEY = "portfolio:unique-visitors";
const BOT_RE = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|facebookexternalhit/i;

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store", // always a live number
    },
  });

async function sha256(text: string) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Runs several Redis commands in one round trip via Upstash's REST pipeline.
async function redis(commands: (string | number)[][]): Promise<{ result: unknown }[]> {
  const res = await fetch(`${redisUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "content-type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  return res.json();
}

export default async function handler(request: Request) {
  if (!redisUrl || !redisToken) {
    // Not configured: say so instead of inventing a number.
    return json({ error: "counter_not_configured" }, 503);
  }

  try {
    let results: { result: unknown }[];

    if (request.method === "POST") {
      const ua = request.headers.get("user-agent") ?? "";
      const ip =
        request.headers.get("x-real-ip") ??
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "";

      if (ip && !BOT_RE.test(ua)) {
        const id = await sha256(`${process.env.VISITOR_SALT ?? "portfolio"}:${ip}`);
        results = await redis([["SADD", SET_KEY, id], ["SCARD", SET_KEY]]);
        results = [results[1]];
      } else {
        results = await redis([["SCARD", SET_KEY]]); // bots/unknown IPs are not counted
      }
    } else if (request.method === "GET") {
      results = await redis([["SCARD", SET_KEY]]);
    } else {
      return json({ error: "method_not_allowed" }, 405);
    }

    const offset = Number(process.env.VISITOR_COUNT_OFFSET) || 0;
    return json({ count: Number(results[0].result) + offset });
  } catch {
    return json({ error: "counter_unavailable" }, 502);
  }
}
