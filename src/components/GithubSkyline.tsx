import { useEffect, useState, type CSSProperties } from "react";
import ContributionSkyline, { type ContributionDay } from "./ui/contribution-skyline";
import { SNAPSHOT, SNAPSHOT_FETCHED } from "../data/githubContributions";

const USER = "Visheshjha11";

// Site accent (#da2727) as the third of four activity levels, light -> heavy.
const PALETTE = ["#0e4429", "#006d32", "#26a641", "#39d353"];

// The component themes itself from these shadcn-style tokens (falling back to white).
// This site doesn't define them, so scope a dark set to this section only.
const THEME = {
  "--color-background": "#0a0a0a",
  "--color-foreground": "#fafafa",
  "--color-border": "rgba(255,255,255,0.12)",
  "--color-muted-foreground": "#a3a3a3",
} as CSSProperties;

export default function GithubSkyline() {
  // Starts from the bundled snapshot so it paints instantly, then swaps in live data.
  const [days, setDays] = useState<ContributionDay[]>(SNAPSHOT);
  const [source, setSource] = useState({ live: false, date: SNAPSHOT_FETCHED });

  useEffect(() => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    fetch("/api/github", { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const valid =
          j &&
          Array.isArray(j.days) &&
          j.days.length > 300 &&
          j.days.every((d: ContributionDay) => typeof d.date === "string" && typeof d.count === "number");
        if (!valid) return; // e.g. `vite dev` has no /api: keep the snapshot
        setDays(j.days);
        setSource({ live: true, date: String(j.fetchedAt ?? "").slice(0, 10) });
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => {
      ctl.abort();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12" style={THEME}>
      <h3 className="font-helvetica font-bold tracking-tight text-3xl md:text-5xl text-white leading-none mb-8 md:mb-10">
        A year of shipping
      </h3>

      <ContributionSkyline data={days} palette={PALETTE} className="font-helvetica" />

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 font-helvetica text-xs text-white/50">
        <span>{source.live ? "Live from GitHub" : `Snapshot from ${source.date}`}</span>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline underline-offset-4 hover:text-white"
        >
          github.com/{USER}
        </a>
      </div>
    </div>
  );
}
