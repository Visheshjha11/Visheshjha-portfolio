// Vercel Edge Function: GET /api/github
//
// Returns the public GitHub contribution calendar for the profile as JSON:
//   { user, from, to, total, days: [{ date, count, level }], fetchedAt }
//
// GitHub has no CORS-friendly public endpoint for this, so we read the same
// public calendar fragment that github.com/<user> renders, server-side. It needs
// no token. Per-day counts come from the accessible tooltips and are checked
// against the total GitHub prints in the fragment's heading.
//
// Optional: set GITHUB_USER in the Vercel project to override the default.
export const config = { runtime: "edge" };

const USER = process.env.GITHUB_USER || "Visheshjha11";

interface Day {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const attr = (tag: string, name: string) =>
  new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1] ?? null;

function parseCalendar(html: string) {
  // id -> tooltip text, e.g. "7 contributions on November 2nd." / "No contributions on ..."
  const tips = new Map<string, string>();
  for (const m of html.matchAll(/<tool-tip\b([^>]*)>\s*([^<]*?)\s*<\/tool-tip>/g)) {
    const target = attr(m[1], "for");
    if (target) tips.set(target, m[2]);
  }

  const days: Day[] = [];
  for (const m of html.matchAll(/<td\b[^>]*\sdata-date="[^"]+"[^>]*>/g)) {
    const tag = m[0];
    const date = attr(tag, "data-date");
    const id = attr(tag, "id");
    const level = Number(attr(tag, "data-level") ?? 0);
    if (!date) continue;
    const count = Number(/^(\d+)\s+contribution/.exec(tips.get(id ?? "") ?? "")?.[1] ?? 0);
    days.push({ date, count, level: Math.max(0, Math.min(4, level)) as Day["level"] });
  }

  days.sort((a, b) => (a.date < b.date ? -1 : 1));

  const headline = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i.exec(html.replace(/\s+/g, " "));
  const reported = headline ? Number(headline[1].replace(/,/g, "")) : null;
  return { days, reported };
}

export default async function handler() {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { "user-agent": "Mozilla/5.0 (portfolio contribution skyline)", accept: "text/html" },
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const { days, reported } = parseCalendar(await res.text());
    if (days.length < 300) throw new Error("Unexpected calendar markup");

    const total = days.reduce((sum, d) => sum + d.count, 0);
    // If our per-day sum disagrees with GitHub's own heading, the markup changed: fail loudly
    // so the client falls back to its snapshot instead of showing wrong numbers.
    if (reported !== null && reported !== total) throw new Error(`Total mismatch ${total} vs ${reported}`);

    return new Response(
      JSON.stringify({
        user: USER,
        from: days[0].date,
        to: days[days.length - 1].date,
        total,
        days,
        fetchedAt: new Date().toISOString(),
      }),
      {
        headers: {
          "content-type": "application/json",
          // Contribution data changes slowly: cache at the CDN for an hour.
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 502,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }
}
