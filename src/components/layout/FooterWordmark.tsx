"use client";

import { useEffect, useRef } from "react";

/**
 * Full-width metallic "BUILDSENSE IT" wordmark, fitted to its container.
 * Port of mockup/index.html `buildsense-footer-wordmark-fit` (L17545-17620).
 *
 * The fit measures the text at its natural width with a 24-step binary search
 * (twice: once for the original face to get the target height, once for the
 * approved face). That is ~48 forced layouts, so the same guards are kept:
 *  - observe the wordmark's PARENT, not itself, so setting its own height
 *    cannot feed back into the observer,
 *  - rAF-coalesce requests and refuse re-entrant measuring,
 *  - wait for `document.fonts.ready`, and re-fit on `pageshow` (bfcache),
 *  - new: skip the work when the container width has not changed since the
 *    last fit (AUDIT §4.11), unless fonts/bfcache forced it.
 */
export function FooterWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const text = textRef.current;
    if (!wordmark || !text) return;

    let frame = 0;
    let measuring = false;
    let forceNext = true;
    let lastWidth = -1;
    let disposed = false;

    const original = {
      family: "'Arial Black','DejaVu Sans','Inter',Arial,sans-serif",
      stretch: "normal",
      tracking: ".021em",
      words: ".14em",
    };
    const approved = {
      family: "'Noto Sans Display ExtraCondensed',Impact,'Arial Narrow',sans-serif",
      stretch: "ultra-condensed",
      tracking: ".004em",
      words: ".012em",
    };

    // Measure text at its natural full-width dimensions. Binary search keeps
    // the intended content-width alignment at every viewport.
    function naturalFit(style: typeof original, targetWidth: number) {
      wordmark!.style.fontFamily = style.family;
      wordmark!.style.fontStretch = style.stretch;
      wordmark!.style.letterSpacing = style.tracking;
      wordmark!.style.wordSpacing = style.words;
      text!.style.transform = "none";
      wordmark!.style.height = "auto";
      let lo = 8;
      let hi = 850;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        wordmark!.style.fontSize = `${mid}px`;
        if (text!.getBoundingClientRect().width <= targetWidth) lo = mid;
        else hi = mid;
      }
      wordmark!.style.fontSize = `${lo.toFixed(3)}px`;
      return {
        height: wordmark!.getBoundingClientRect().height,
        glyphHeight: text!.getBoundingClientRect().height,
      };
    }

    function fit() {
      if (measuring || disposed) return;
      measuring = true;
      frame = 0;
      try {
        const available = wordmark!.clientWidth;
        if (available < 10) return;
        if (!forceNext && available === lastWidth) return;
        forceNext = false;
        lastWidth = available;

        const targetWidth = available * 0.99;
        // The approved visual doubles the previous wordmark's height without
        // stretching the letters horizontally.
        const originalSize = naturalFit(original, targetWidth);
        const newSize = naturalFit(approved, targetWidth);
        const targetHeight = originalSize.height * 2;
        const verticalScale = targetHeight / Math.max(1, newSize.glyphHeight);
        text!.style.transformOrigin = "top left";
        text!.style.transform = `scaleY(${verticalScale.toFixed(6)})`;
        wordmark!.style.height = `${targetHeight.toFixed(3)}px`;
      } finally {
        measuring = false;
      }
    }

    function queue(force = false) {
      if (force) forceNext = true;
      if (frame) return;
      frame = requestAnimationFrame(fit);
    }

    const onResize = () => queue();
    const onPageShow = () => queue(true);
    const onFontsReady = () => queue(true);

    let observer: ResizeObserver | undefined;
    if ("ResizeObserver" in window && wordmark.parentElement) {
      observer = new ResizeObserver(onResize);
      observer.observe(wordmark.parentElement);
    } else {
      window.addEventListener("resize", onResize, { passive: true });
    }
    window.addEventListener("pageshow", onPageShow);
    document.fonts?.ready.then(() => {
      if (!disposed) onFontsReady();
    });
    queue(true);

    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
  }, []);

  return (
    <div ref={wordmarkRef} className="bs-footer-wordmark" aria-hidden="true">
      <span ref={textRef}>BUILDSENSE IT</span>
    </div>
  );
}
