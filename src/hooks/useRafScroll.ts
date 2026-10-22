"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Also run on window resize (still rAF-batched and passive). */
  resize?: boolean;
  /** Set false to detach the listeners entirely (e.g. while a section is off-screen). */
  enabled?: boolean;
};

/**
 * One passive, rAF-batched window scroll listener (mockup pattern at L16262,
 * L16590, L17636): any number of scroll events inside a frame collapse into a
 * single `callback` call on the next animation frame.
 *
 * The latest `callback` is always used, so it may close over fresh state
 * without re-subscribing. Cleanup removes the listeners and cancels a pending
 * frame.
 */
export function useRafScroll(callback: () => void, { resize = false, enabled = true }: Options = {}) {
  const latest = useRef(callback);
  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const onEvent = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        latest.current();
      });
    };
    window.addEventListener("scroll", onEvent, { passive: true });
    if (resize) window.addEventListener("resize", onEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", onEvent);
      if (resize) window.removeEventListener("resize", onEvent);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, resize]);
}
