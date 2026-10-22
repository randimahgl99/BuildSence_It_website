"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True when the visitor asked the OS/browser for reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
