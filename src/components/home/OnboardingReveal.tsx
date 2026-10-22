"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

/**
 * The `<section>` of the POS onboarding block, plus the mockup's one-shot
 * `.is-ready` trigger (mockup L17183: the first item of #selected-work to
 * enter the viewport marks the whole section ready). It drives the header
 * fade, the connector-line fill and the step-number pop in
 * styles/home-onboarding.css.
 *
 * State is the `data-state` attribute ("wait" -> "ready"), written to the DOM
 * and never rendered by React, so re-renders cannot overwrite it. Without JS,
 * without IntersectionObserver and under reduced motion the attribute is never
 * "wait", so the section simply shows its final look (fail-visible).
 *
 * Re-entrant for React Strict Mode: all setup is in the effect, and cleanup
 * disconnects the observer and clears the attribute.
 */
export function OnboardingReveal({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const trigger = section.querySelector<HTMLElement>("[data-ready-trigger]") ?? section;
    const markReady = () => section.setAttribute("data-state", "ready");
    const clear = () => section.removeAttribute("data-state");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Already scrolled past (reload with a restored scroll position): no entrance to play.
    const scrolledPast = trigger.getBoundingClientRect().bottom < 0;
    if (reduceMotion || scrolledPast || typeof IntersectionObserver === "undefined") {
      markReady();
      return clear;
    }

    section.setAttribute("data-state", "wait");
    // Same margins/thresholds as the mockup's reveal observer (L17165).
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        markReady();
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
