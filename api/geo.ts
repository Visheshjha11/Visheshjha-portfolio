// Vercel Edge Function: GET /api/geo
// Vercel adds geo headers to every request based on the visitor's IP, so we
// can read the location here with no browser permission prompt, no API key,
// and without sending the visitor's IP to any third-party service.
export const config = { runtime: "edge" };

const decode = (value: string | null) => {
  if (!value) return null;
  try {
    return decodeURIComponent(value); // city names arrive URL-encoded (e.g. "S%C3%A3o%20Paulo")
  } catch {
    return value;
  }
};

export default function handler(request: Request) {
  const h = request.headers;
  const body = {
    city: decode(h.get("x-vercel-ip-city")),
    region: h.get("x-vercel-ip-country-region"), // ISO 3166-2 code, e.g. "PB"
    country: h.get("x-vercel-ip-country"), // ISO 3166-1 code, e.g. "IN"
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store", // location is per-visitor, never cache at the CDN
    },
  });
}
