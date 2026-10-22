"use client";

import { useSyncExternalStore } from "react";

/** False while the tab is hidden (`document.hidden`). Start work only when true. */
export function useDocumentVisible(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => !document.hidden,
    () => true,
  );
}
