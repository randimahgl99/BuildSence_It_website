"use client";

import { useEffect } from "react";

const ITEM = "[data-reveal-group] [data-reveal]";
const GROUP = "[data-reveal-group]";
const STATE = "data-rise";
const ARMED = "data-rise-armed";
const DELAY = "--bs-delay";

// Entrance duration per kind (mockup `revealOne`, L17190): used to know when the
// entrance transition has finished and the element's own transitions can return
const DURATION: Record<string, number> = { cta: 850, card: 980, media: 980, description: 900 };

/**
 * Home + Industries scroll reveal (AUDIT 4.8; mockup `buildsense-premium-scroll-controller`
 * L17089 and `buildsense-premium-scroll-styles` L5491). Renders nothing: the sections
 * mark their elements `data-reveal="eyebrow|heading|description|card|media|cta"` inside
 * a `data-reveal-group="<section>"`, and this controller drives them. (/about and
 * /pos use the separate, subtler `AboutReveal`, as in the mockup.)
 *
 * Same behaviour as the mockup:
 *  - one IntersectionObserver (`rootMargin 0 0 -8% 0`, thresholds 0/.02/.12), one-shot
 *    (each element is unobserved the moment it is revealed),
 *  - elements that are in view together are revealed in DOM order with a stagger of
 *    120ms per element inside their section, capped at 600ms (85ms / 340ms <= 767px),
 *  - elements already scrolled past are left visible,
 *  - only elements this controller has registered are ever hidden, so a failure
 *    leaves content visible; reduced motion / no IntersectionObserver hide nothing.
 *
 * Addition (keyboard): focus scrolls a control into view "nearest", which can
 * park it inside the observer's bottom margin and leave a focused, invisible
 * element, so `focusin` reveals the focused element's waiting target at once.
 *
 * State is `data-rise` (`hide` -> `wait` -> `risen` -> `done`), which React never writes
 * after hydration. `hide` and `wait` look the same; `hide` only turns the transition off
 * so the element is hidden without animating into the hidden state. `done` lets the
 * element's own hover/colour transitions come back (styles/premium-reveal.css).
 *
 * Setup lives in the effect and is fully undone in the cleanup (observer, pending
 * timers, attributes), so it is re-entrant under React Strict Mode.
 */
export function PremiumReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(ITEM));
    if (!items.length) return;

    // Server-rendered state (the above-the-fold hero marquee arrives as "wait"), restored on cleanup
    const initial = items.map((item) => item.getAttribute(STATE));
    const restore = () =>
      items.forEach((item, index) => {
        item.removeAttribute(ARMED);
        item.style.removeProperty(DELAY);
        if (initial[index] === null) item.removeAttribute(STATE);
        else item.setAttribute(STATE, initial[index]);
      });

    // Read here (not during render) so server and client markup agree
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item, index) => {
        if (initial[index] !== null) item.setAttribute(STATE, "done");
      });
      return restore;
    }

    const timers = new Set<number>();

    // Already passed (restored scroll position, fast navigation): keep visible
    const waiting: HTMLElement[] = [];
    items.forEach((item) => {
      item.setAttribute(ARMED, "");
      if (item.getBoundingClientRect().bottom < 0) item.setAttribute(STATE, "done");
      else waiting.push(item);
    });

    // Enter the hidden state without animating into it, then let the transitions back on
    waiting.forEach((item) => item.setAttribute(STATE, "hide"));
    if (waiting.length) void window.getComputedStyle(waiting[0]).opacity; // flush styles while transitions are off
    waiting.forEach((item) => item.setAttribute(STATE, "wait"));

    let remaining = waiting.length;
    const reveal = (item: HTMLElement, delay: number) => {
      observer.unobserve(item);
      remaining -= 1;
      item.style.setProperty(DELAY, `${delay}ms`);
      item.setAttribute(STATE, "risen");
      const duration = DURATION[item.getAttribute("data-reveal") ?? ""] ?? 950;
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        item.setAttribute(STATE, "done");
      }, delay + duration + 60);
      timers.add(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // DOM order is the visual reading order
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.target.getAttribute(STATE) === "wait")
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

        const mobile = window.innerWidth <= 767;
        const interval = mobile ? 85 : 120;
        const cap = mobile ? 340 : 600;
        const perGroup = new Map<Element | null, number>();
        visible.forEach((item) => {
          const group = item.closest(GROUP);
          const n = perGroup.get(group) ?? 0;
          perGroup.set(group, n + 1);
          reveal(item, Math.min(n * interval, cap)); // cap the tail: quick scrolling never leaves content hidden long
        });
        if (remaining <= 0) observer.disconnect(); // everything is revealed: nothing left to watch
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.02, 0.12] },
    );
    waiting.forEach((item) => observer.observe(item));

    const onFocusIn = (event: FocusEvent) => {
      const item = (event.target as Element | null)?.closest<HTMLElement>(ITEM);
      if (item && item.getAttribute(STATE) === "wait") {
        reveal(item, 0);
        if (remaining <= 0) observer.disconnect();
      }
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      restore();
    };
  }, []);

  return null;
}
