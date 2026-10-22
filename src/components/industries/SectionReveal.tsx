"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

/**
 * A `<section>` plus the mockup's one-shot `.is-visible` trigger (L17181: the
 * first item of #real-operations / #connected-operations to enter the viewport
 * marks the whole section visible). Used by "Real operations" and "Connected
 * operations". In the rendered mockup the section-level entrances of the copy and
 * cards are neutralised (L5504); what `.is-visible` still drives is each
 * section's decorative parts (outline frames, flow path, node dots, card art)
 * and the entrance-delay transitions that stay on the cards afterwards.
 *
 * The trigger element is the child marked `data-ready-trigger` (the section
 * heading), else the section itself.
 *
 * State is the `data-state` attribute ("wait" -> "visible"), written to the DOM
 * and never rendered by React, so re-renders cannot overwrite it. Without JS,
 * without IntersectionObserver and under reduced motion the attribute is never
 * "wait", so the frames simply show (fail-visible).
 *
 * Re-entrant for React Strict Mode: all setup is in the effect, and cleanup
 * disconnects the observer and clears the attribute.
 */
export function SectionReveal({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const trigger = section.querySelector<HTMLElement>("[data-ready-trigger]") ?? section;
    const markVisible = () => section.setAttribute("data-state", "visible");
    const clear = () => section.removeAttribute("data-state");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Already scrolled past (reload with a restored scroll position): no entrance to play.
    const scrolledPast = trigger.getBoundingClientRect().bottom < 0;
    if (reduceMotion || scrolledPast || typeof IntersectionObserver === "undefined") {
      markVisible();
      return clear;
    }

    section.setAttribute("data-state", "wait");
    // Same margins/thresholds as the mockup's reveal observer (L17165).
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        markVisible();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.02, 0.12] },
    );
    observer.observe(trigger);

    return () => {
      observer.disconnect();
      clear();
    };
  }, []);

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
