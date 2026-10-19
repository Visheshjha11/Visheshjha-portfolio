import { useEffect, useState } from "react";
import { countryName, regionName } from "../lib/regionNames";

const CACHE_KEY = "visitorLocation:v2";

interface RawGeo {
  city?: string | null;
  region?: string | null; // code from /api/geo, full name from the fallback
  country?: string | null; // ISO country code
  regionIsName?: boolean;
}

const format = ({ city, region, country, regionIsName }: RawGeo) => {
  const state = regionIsName ? region : regionName(country ?? null, region ?? null);
  const parts = [city, state, countryName(country ?? null)].filter(Boolean) as string[];
  // Drop consecutive duplicates, e.g. "Delhi, Delhi, India" -> "Delhi, India"
  return parts.filter((p, i) => p !== parts[i - 1]).join(", ") || null;
};

async function fromEdge(signal: AbortSignal): Promise<RawGeo | null> {
  const res = await fetch("/api/geo", { signal });
  if (!res.ok) return null;
  const data = await res.json();
  return data.country ? data : null;
}

// Fallback for local dev (no Vercel headers) or if /api/geo is unavailable.
async function fromThirdParty(signal: AbortSignal): Promise<RawGeo | null> {
  const res = await fetch("https://ipwho.is/", { signal });
  const data = await res.json();
  if (!data.success) return null;
  return { city: data.city, region: data.region, country: data.country_code, regionIsName: true };
}

/** Approximate "City, State, Country" from the visitor's IP. No permission prompt. */
export function useVisitorLocation() {
  const [location, setLocation] = useState<string | null>(() => sessionStorage.getItem(CACHE_KEY));

  useEffect(() => {
    if (sessionStorage.getItem(CACHE_KEY)) return;
    const controller = new AbortController();

    (async () => {
      let geo: RawGeo | null = null;
      try {
        geo = await fromEdge(controller.signal);
      } catch {
        /* fall through to the fallback */
      }
      if (!geo) {
        try {
          geo = await fromThirdParty(controller.signal);
        } catch {
          return; // blocked or offline: show nothing rather than something wrong
        }
      }
      const text = geo && format(geo);
      if (text) {
        sessionStorage.setItem(CACHE_KEY, text);
        setLocation(text);
      }
    })();

    return () => controller.abort();
  }, []);

  return location;
}
