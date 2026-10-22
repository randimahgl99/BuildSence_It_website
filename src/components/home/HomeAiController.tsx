"use client";

import { useEffect } from "react";
import { startAiDemo } from "@/lib/homeAi/demo";
import { startAiScene } from "@/lib/homeAi/scene";
import { startAiSparkle } from "@/lib/homeAi/sparkle";

/**
 * Behaviour of the Home AI section (sub-phase 3.4 Part B). Renders nothing: the
 * section itself stays a Server Component, and this drives its server-rendered
 * markup imperatively through the `data-ai` hooks (contract in
 * HomeAiSection.tsx). No React state, so no per-frame renders.
 *
 * Three independent controllers, each re-entrant and fully undone by its own
 * cleanup (React Strict Mode mounts, unmounts and re-mounts this effect):
 *  - scene:   one-shot entrance (heading, letter wave, chat slide, right column)
 *  - sparkle: runs the sparkle keyframes only while on-screen and visible
 *  - demo:    the looping chat walkthrough
 * Cleanup leaves the section in its server-rendered, completed state.
 */
export function HomeAiController() {
  useEffect(() => {
    const section = document.getElementById("home-ai-assistant");
    if (!section) return;
    const stops = [startAiScene(section), startAiSparkle(section), startAiDemo(section)];
    return () => stops.forEach((stop) => stop());
  }, []);

  return null;
}
