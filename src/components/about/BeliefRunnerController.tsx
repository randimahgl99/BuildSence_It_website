"use client";

import { useEffect } from "react";
import { startBeliefRunner } from "@/lib/aboutBeliefs/runner";

/**
 * Behaviour of the "What we believe" section (sub-phase 3.10 Part B). Renders
 * nothing: the section stays a Server Component and this drives its
 * server-rendered `data-about` hooks (contract in AboutBeliefs.tsx). The runner
 * is re-entrant and fully undone in the cleanup, so React Strict Mode's
 * mount/unmount/mount leaves exactly one loop.
 */
export function BeliefRunnerController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-about="beliefs"]');
    if (!section) return;
    return startBeliefRunner(section);
  }, []);

  return null;
}
