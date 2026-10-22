"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. `matchMedia` is only read in the browser
 * snapshot, never during render on the server, so there is no hydration
 * mismatch: the server (and the first hydration pass) use `serverValue`.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
