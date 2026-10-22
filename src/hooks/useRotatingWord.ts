"use client";

import { type RefObject, useEffect } from "react";

const HOLD_MS = 2600;
const SWAP_MS = 240;

/**
 * Cycles the word inside `labelRef` (mockup `initVisibleHeroHeadline`, L16380).
 *
 * Two self-scheduled timeouts, never an interval: hold HOLD_MS, mark the label
 * `data-swap` (CSS fades it out), after SWAP_MS replace the text and hold again.
 * It runs only while the enclosing <section> intersects the viewport AND the
 * tab is visible AND motion is not reduced; otherwise both timers are cleared
 * and `data-swap` is removed (the word stays put, fully visible).
 *
 * The label is updated imperatively and the hook holds no React state, so a
 * tick never re-renders anything. The server renders `words[0]`; the current
 * index is re-derived from the DOM text on every setup, so Strict Mode's
 * mount -> cleanup -> mount and hot reloads continue from the visible word.
 * Cleanup clears both timers and removes the observer and both listeners.
 */
export function useRotatingWord(words: readonly string[], labelRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const label = labelRef.current;
    const textNode = label?.firstChild;
    if (!label || !textNode || words.length < 2) return;
    const host = label.closest("section") ?? label;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let index = Math.max(0, words.indexOf(label.textContent?.trim() ?? ""));
    let visible = false;
    let intervalId = 0;
    let swapId = 0;

    const enabled = () => visible && !document.hidden && !reduced.matches;

    const stop = () => {
      clearTimeout(intervalId);
      clearTimeout(swapId);
      intervalId = swapId = 0;
      label.removeAttribute("data-swap");
    };

    const tick = () => {
      intervalId = 0;
      if (!enabled()) return;
      label.setAttribute("data-swap", "");
      swapId = window.setTimeout(() => {
        swapId = 0;
        if (!enabled()) {
          label.removeAttribute("data-swap");
          return;
        }
        index = (index + 1) % words.length;
        // Edit React's own text node in place instead of replacing it.
        textNode.nodeValue = words[index];
        label.removeAttribute("data-swap");
        intervalId = window.setTimeout(tick, HOLD_MS);
      }, SWAP_MS);
    };

    const sync = () => {
      if (!enabled()) {
        stop();
        return;
      }
      if (!intervalId && !swapId) intervalId = window.setTimeout(tick, HOLD_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      stop();
    };
  }, [words, labelRef]);
}
