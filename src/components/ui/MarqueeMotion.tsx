"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Mockup speed: one 15-card group (6810px) per 118s on desktop, ~57px/s.
const SPEED_PX_PER_S = 56;
// Longest frame step honoured: after a throttled/background frame the strip
// moves on by at most this much instead of jumping.
const MAX_STEP_MS = 100;
// Same margin as MotionGate: stop a little outside the viewport.
const OFFSCREEN_MARGIN = "80px 0px 80px 0px";

type MarqueeMotionProps = {
  frameClassName: string;
  trackClassName: string;
  label: string;
  children: ReactNode;
};

/**
 * Script-driven marquee frame for the client-stories strip. The track inside
 * is two identical groups (TestimonialMarquee); this moves it by one group
 * width, rightwards, on requestAnimationFrame and wraps for a seamless loop.
 *
 * Why not the CSS keyframe animation (still the no-JS fallback in
 * home-stories.css): iOS Safari runs a transform animation on the GPU without
 * repainting, and on a track this wide it paints only the tiles near the start
 * position, so most of the loop shows an empty strip. Setting the transform
 * from script each frame makes WebKit repaint the tiles that come into view.
 *
 * Pauses like the CSS version: pointer over the strip (not touch), keyboard
 * focus inside, strip more than 80px off-screen, hidden tab. Under reduced
 * motion the script does nothing and the CSS static strip applies.
 */
export function MarqueeMotion({ frameClassName, trackClassName, label, children }: MarqueeMotionProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const group = track.firstElementChild;
    if (!(group instanceof HTMLElement)) return;

    let groupWidth = group.getBoundingClientRect().width;
    let x = -groupWidth;
    let inView = false;
    let pointerInside = false;
    let focusInside = false;
    let raf = 0;
    let last = 0;

    const apply = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    const canRun = () => inView && !pointerInside && !focusInside && !document.hidden && groupWidth > 0;

    const step = (now: number) => {
      raf = 0;
      if (!canRun()) return;
      const dt = Math.min(now - last, MAX_STEP_MS);
      last = now;
      x += (SPEED_PX_PER_S * dt) / 1000;
      if (x >= 0) x -= groupWidth;
      apply();
      raf = window.requestAnimationFrame(step);
    };
    const sync = () => {
      if (canRun()) {
        if (!raf) {
          last = performance.now();
          raf = window.requestAnimationFrame(step);
        }
      } else if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // Take over from the CSS animation at the same start position
    track.setAttribute("data-driven", "");
    apply();

    // Card widths change with the breakpoints: keep the loop length in step
    const resize = new ResizeObserver(() => {
      const next = group.getBoundingClientRect().width;
      if (next === groupWidth) return;
      groupWidth = next;
      if (x < -groupWidth) x = -groupWidth;
      apply();
      sync();
    });
    resize.observe(group);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: OFFSCREEN_MARGIN, threshold: 0 },
    );
    observer.observe(frame);

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = true;
      sync();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = false;
      sync();
    };
    const onFocusIn = () => {
      focusInside = true;
      sync();
    };
    const onFocusOut = (event: FocusEvent) => {
      focusInside = frame.contains(event.relatedTarget as Node | null);
      sync();
    };

    frame.addEventListener("pointerenter", onPointerEnter);
    frame.addEventListener("pointerleave", onPointerLeave);
    frame.addEventListener("focusin", onFocusIn);
    frame.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", sync);

    return () => {
      resize.disconnect();
      observer.disconnect();
      frame.removeEventListener("pointerenter", onPointerEnter);
      frame.removeEventListener("pointerleave", onPointerLeave);
      frame.removeEventListener("focusin", onFocusIn);
      frame.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", sync);
      if (raf) window.cancelAnimationFrame(raf);
      track.removeAttribute("data-driven");
      track.style.transform = "";
    };
  }, []);

  return (
    // tabIndex: the only way for keyboard users to reach the hover/focus pause
    // (WCAG 2.2.2) and, under reduced motion, to scroll the strip.
    <div ref={frameRef} className={frameClassName} role="group" aria-label={label} tabIndex={0} data-reveal="media">
      <div ref={trackRef} className={trackClassName}>
        {children}
      </div>
    </div>
  );
}
