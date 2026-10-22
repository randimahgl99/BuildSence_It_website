"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Animation-clock gating. Port of mockup/index.html L13692-13715 (CSS) and
 * L18089-18107 (JS).
 *
 * Marks every `main section` (plus anything tagged `data-motion-gate`, e.g. the
 * footer) `data-bs-offscreen` while it is more than 80px outside the viewport,
 * and marks <html> `data-bs-tab-hidden` while the tab is hidden. The matching
 * rules in styles/motion-gate.css set `animation-play-state: paused`, so CSS
 * keyframe animations stop costing CPU/GPU when nobody can see them and resume
 * from the same frame.
 *
 * State lives in data attributes, never classes, so React re-renders cannot
 * overwrite it. Sections are re-collected whenever the route changes (the
 * mockup's page toggling becomes route mounting).
 *
 * SMIL: CSS `animation-play-state` cannot pause SVG `<animateMotion>`, so every
 * `svg[data-bs-smil]` (the Industries connected-operations flow dot) is paused /
 * resumed with `pauseAnimations()` / `unpauseAnimations()` while its section is
 * off-screen or the tab is hidden (approved gap fix, AUDIT 4.13 #1 / Q8; the
 * mockup left it running). Cleanup resumes them.
 */
export function MotionGate() {
  const pathname = usePathname();

  // Tab visibility: one listener for the lifetime of the app.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      if (document.hidden) root.setAttribute("data-bs-tab-hidden", "");
      else root.removeAttribute("data-bs-tab-hidden");
    };
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      document.removeEventListener("visibilitychange", sync);
      root.removeAttribute("data-bs-tab-hidden");
    };
  }, []);

  // Section visibility: re-run on route change.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main section, [data-motion-gate]"));
    if (!targets.length || !("IntersectionObserver" in window)) return;

    // Start paused; the observer's first callback resumes whatever is on screen.
    targets.forEach((target) => target.setAttribute("data-bs-offscreen", ""));

    // SMIL timelines (not covered by the CSS rule): paused with their section / tab.
    const smil = Array.from(document.querySelectorAll<SVGSVGElement>("svg[data-bs-smil]"));
    const syncSmil = () => {
      for (const svg of smil) {
        // Not every engine ships the SMIL timeline API; those simply keep running.
        if (typeof svg.pauseAnimations !== "function") continue;
        const owner = svg.closest("main section, [data-motion-gate]");
        if (document.hidden || owner?.hasAttribute("data-bs-offscreen")) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }
    };
    syncSmil();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.removeAttribute("data-bs-offscreen");
          else entry.target.setAttribute("data-bs-offscreen", "");
        }
        syncSmil();
      },
      { rootMargin: "80px 0px 80px 0px", threshold: 0 },
    );
    targets.forEach((target) => observer.observe(target));
    document.addEventListener("visibilitychange", syncSmil);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncSmil);
      targets.forEach((target) => target.removeAttribute("data-bs-offscreen"));
      for (const svg of smil) if (typeof svg.unpauseAnimations === "function") svg.unpauseAnimations();
    };
  }, [pathname]);

  return null;
}
