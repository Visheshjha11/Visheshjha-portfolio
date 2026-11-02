const RELOAD_KEY = "route-error-reload-at";

export const isChunkLoadError = (err: unknown) => {
  const msg = String((err as { message?: string } | null)?.message ?? err ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk/i.test(msg);
};

/** Reload once (max once per 10s) so a stale/failed chunk can't leave a dead page. */
export const reloadOnce = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 10_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    /* storage unavailable: fall through and reload */
  }
  window.location.reload();
  return true;
};
