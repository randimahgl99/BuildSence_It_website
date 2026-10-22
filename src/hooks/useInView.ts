"use client";

import { type RefObject, useEffect, useState } from "react";

export type UseInViewOptions = {
  threshold?: number | readonly number[];
  rootMargin?: string;
  /** Stop observing after the first time the element is seen (one-shot reveals). */
  once?: boolean;
};

/**
 * Reports whether the element in `ref` intersects the viewport.
 *
 * One IntersectionObserver per call; it is disconnected on cleanup and
 * re-created if the options change, so it is safe under React Strict Mode.
 * Without IntersectionObserver support it reports `true` (fail-visible).
 */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0, rootMargin = "0px", once = false }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false);
  // Arrays are compared by value so callers can pass a literal each render.
  const thresholdKey = typeof threshold === "number" ? String(threshold) : threshold.join(",");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const thresholds = thresholdKey.split(",").map(Number);
    const observer = new IntersectionObserver(
      (entries) => {
        // Entries are ordered by time; the last one is the current state.
        const latest = entries[entries.length - 1];
        if (!latest) return;
        setInView(latest.isIntersecting);
        if (once && latest.isIntersecting) observer.disconnect();
      },
      { threshold: thresholds.length === 1 ? thresholds[0] : thresholds, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, thresholdKey, rootMargin, once]);

  return inView;
}
