"use client";

import { useEffect } from "react";

const TARGET = "[data-about-reveal]";
const STATE = "data-reveal-state";
const ARMED = "data-reveal-armed";

/**
 * About-style scroll reveal (AUDIT 4.9; mockup `buildsense-about-matched-pos-humans-entrances`
 * L17901 and `buildsense-about-reveal-only` L17670). Used by /pos now, and by
 * About and Humans later. Renders nothing: server components mark their
 * elements with `aboutReveal` (see `revealAttrs.ts`) and this controller
 * drives them.
 *
 * Same behaviour as the mockup:
 *  - one IntersectionObserver, `threshold .08`, `rootMargin 0 0 -35px 0`, one-shot
 *    (the element is unobserved as soon as it is revealed),
 *  - each target is hidden (opacity 0, 24px down) only after the controller has
 *    prepared every target, and revealed with a .85s transition,
 *  - siblings that are also targets stagger by `min(index, 4) * 100ms`,
 *  - reduced motion or no IntersectionObserver: nothing is hidden.
 *
 * Addition (keyboard): focus scrolls a control into view "nearest", which can
 * park it inside the observer's bottom margin and leave a focused, invisible
 * element, so `focusin` shows the focused element's target at once.
 *
 * The state lives in `data-reveal-state` (`wait` -> `shown`), which React never
 * writes after hydration. Setup is fully undone in the cleanup, so the effect is
 * re-entrant (React Strict Mode mounts, cleans up and mounts again).
 */
export function AboutReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(TARGET));
    if (!items.length) return;

    // Server-rendered state of each target (hero copy arrives as "wait"), to restore on cleanup
    const initial = items.map((item) => item.getAttribute(STATE));
    const restore = () =>
      items.forEach((item, index) => {
        item.style.removeProperty("transition-delay");
        item.style.removeProperty("transition-property");
        item.removeAttribute(ARMED);
        if (initial[index] === null) item.removeAttribute(STATE);
        else item.setAttribute(STATE, initial[index]);
      });

    // Read here (not during render) so server and client markup agree
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => {
        item.setAttribute(ARMED, "");
        item.setAttribute(STATE, "shown");
      });
      return restore;
    }

    // Stagger inside each group of sibling targets (mockup: only when there is more than one)
    items.forEach((item) => {
      const siblings = Array.from(item.parentElement?.children ?? []).filter((child) => child.hasAttribute("data-about-reveal"));
      if (siblings.length > 1) item.style.transitionDelay = `${Math.min(siblings.indexOf(item), 4) * 100}ms`;
    });

    // Enter the hidden state without animating into it, then let the transitions back on
    const toHide = items.filter((item) => item.getAttribute(STATE) !== "wait");
    toHide.forEach((item) => {
      item.style.transitionProperty = "none";
      item.setAttribute(STATE, "wait");
    });
    items.forEach((item) => item.setAttribute(ARMED, ""));
    if (toHide.length) {
      void window.getComputedStyle(toHide[0]).opacity; // flush styles while transitions are off
      toHide.forEach((item) => item.style.removeProperty("transition-property"));
    }

    let remaining = items.length;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute(STATE, "shown");
          observer.unobserve(entry.target);
          remaining -= 1;
        });
        if (remaining <= 0) observer.disconnect(); // everything is revealed: nothing left to watch
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
    );
    items.forEach((item) => observer.observe(item));

    const onFocusIn = (event: FocusEvent) => {
      const item = (event.target as Element | null)?.closest<HTMLElement>(TARGET);
      if (item && item.getAttribute(STATE) === "wait") {
        item.setAttribute(STATE, "shown");
        observer.unobserve(item);
        remaining -= 1;
        if (remaining <= 0) observer.disconnect();
      }
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      observer.disconnect();
      restore();
    };
  }, []);

  return null;
}
