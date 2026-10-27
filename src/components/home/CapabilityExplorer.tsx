"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import type { Capability } from "@/data/capabilities";
import { ArrowIcon, CapabilityIcon, LockIcon } from "./CapabilityIcons";

type CapabilityExplorerProps = {
  items: readonly Capability[];
};

// Bento placement: the live card is the 2x2 feature, the second card is a wide
// one, the rest are single tiles (see .bs-cap-grid in home-capabilities.css).
const WIDE_SIZES = "(max-width: 980px) calc(100vw - 40px), 640px";
const TILE_SIZES = "(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 50vw, 320px";

// Auto "peek" on the Coming soon cards. Every card runs its own loop with random
// timings, [min, max] in ms: how long it shows its photo, how long it rests before
// the next try, and the first delay (so cards do not start in step). At most
// PEEK_MAX cards show at once; a card that finds the limit reached retries soon.
const PEEK_SHOW_MS: Range = [1500, 2800];
const PEEK_GAP_MS: Range = [800, 3200];
const PEEK_START_MS: Range = [200, 2400];
const PEEK_RETRY_MS: Range = [400, 1200];
const PEEK_MAX = 3;

type Range = readonly [number, number];
const randomIn = ([min, max]: Range) => min + Math.random() * (max - min);

/**
 * Capabilities bento grid: 8 numbered cards. The active card shows its photo and
 * description (what the old side stage did); the live card (POS & Retail) always
 * shows its photo and is the 2x2 feature.
 *
 * - Fine pointers (hover) activate a card on enter; touch activates on tap
 *   (`pointerType !== "touch"` keeps the touch-emulated enter out of it, so a
 *   tap is exactly one activation). Keyboard focus activates too.
 * - Each card's title is its one interactive element (a link to the live page,
 *   or a button that only selects), stretched over the whole card by
 *   `.bs-cap-card-hit::after`, so headings never sit inside buttons.
 * - All photos are mounted; `data-active` fades them in, so there is no
 *   first-hover src swap or flash.
 * - Peek: while the grid is on screen and nobody is pointing at or focused in
 *   it, each Coming soon card independently gets `data-peek` (its photo shows
 *   like a hover) for a random time, then rests for a random time, so several
 *   can show at once in a random pattern (up to PEEK_MAX, never the active one). Paused while hovered/focused or the tab is hidden; off under
 *   reduced motion. Leaving the grid with the mouse hands "active" back to
 *   the live card so the grid returns to its resting look.
 */
export function CapabilityExplorer({ items }: CapabilityExplorerProps) {
  const [active, setActive] = useState(0);
  const [peeks, setPeeks] = useState<readonly number[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = items.flatMap((item, index) => (item.href ? [] : [index]));
    if (candidates.length === 0) return;

    let inView = false;
    let pointerInside = false;
    let focusInside = false;
    // One pending timeout per card; a card with no entry is not running
    const timers = new Map<number, number>();
    const showing = new Set<number>();

    const canRun = () => inView && !pointerInside && !focusInside && !document.hidden;
    const publish = () => setPeeks([...showing]);
    const schedule = (index: number, range: Range) => {
      timers.set(index, window.setTimeout(() => tick(index), randomIn(range)));
    };

    // One step of a card's loop: hide if showing, otherwise try to show
    const tick = (index: number) => {
      if (!canRun()) {
        timers.delete(index);
        return;
      }
      if (showing.has(index)) {
        showing.delete(index);
        publish();
        schedule(index, PEEK_GAP_MS);
      } else if (showing.size >= PEEK_MAX || index === activeRef.current) {
        schedule(index, PEEK_RETRY_MS);
      } else {
        showing.add(index);
        publish();
        schedule(index, PEEK_SHOW_MS);
      }
    };

    const stop = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      showing.clear();
      publish();
    };
    const start = () => {
      if (!canRun()) return;
      candidates.forEach((index) => {
        if (!timers.has(index)) schedule(index, PEEK_START_MS);
      });
    };
    const sync = () => (canRun() ? start() : stop());

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(list);

    const onPointerEnter = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = true;
      sync();
    };
    const onPointerLeave = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = false;
      sync();
    };
    const onFocusIn = () => {
      focusInside = true;
      sync();
    };
    const onFocusOut = (event: FocusEvent) => {
      focusInside = list.contains(event.relatedTarget as Node | null);
      sync();
    };

    list.addEventListener("pointerenter", onPointerEnter);
    list.addEventListener("pointerleave", onPointerLeave);
    list.addEventListener("focusin", onFocusIn);
    list.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      list.removeEventListener("pointerenter", onPointerEnter);
      list.removeEventListener("pointerleave", onPointerLeave);
      list.removeEventListener("focusin", onFocusIn);
      list.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", sync);
      timers.forEach((timer) => window.clearTimeout(timer));
      setPeeks([]);
    };
  }, [items]);

  return (
    <ul
      ref={listRef}
      className="bs-cap-grid"
      aria-label="Capabilities"
      onPointerLeave={(event: PointerEvent) => {
        if (event.pointerType !== "touch") setActive(0);
      }}
    >
      {items.map((item, index) => {
        const isActive = index === active;
        const live = Boolean(item.href);
        const number = String(index + 1).padStart(2, "0");
        const hitProps = {
          className: "bs-cap-card-hit",
          "aria-current": isActive ? ("true" as const) : undefined,
          onFocus: () => setActive(index),
          onClick: () => setActive(index),
        };

        return (
          <li
            key={item.id}
            className="bs-cap-card"
            data-active={isActive ? "" : undefined}
            data-peek={peeks.includes(index) && !isActive ? "" : undefined}
            data-live={live ? "" : undefined}
            data-reveal="card"
            onPointerEnter={(event: PointerEvent) => {
              if (event.pointerType !== "touch") setActive(index);
            }}
          >
            <div className="bs-cap-card-media" aria-hidden="true">
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                sizes={index < 2 ? WIDE_SIZES : TILE_SIZES}
                alt=""
              />
            </div>

            <div className="bs-cap-card-top">
              {live ? (
                <span className="bs-cap-pill" data-live="">
                  <span className="bs-cap-pill-dot" aria-hidden="true" />
                  Available now
                </span>
              ) : (
                item.icon && (
                  <span className="bs-cap-icon" aria-hidden="true">
                    <CapabilityIcon name={item.icon} />
                  </span>
                )
              )}
              {!live && (
                <span className="bs-cap-pill">
                  <LockIcon />
                  Coming soon
                </span>
              )}
            </div>

            <div className="bs-cap-card-body">
              <span className="bs-cap-num" aria-hidden="true">
                {number}
              </span>
              <h3 className="bs-cap-card-title">
                {item.href ? (
                  <Link href={item.href} {...hitProps}>
                    {item.name}
                  </Link>
                ) : (
                  <button type="button" {...hitProps}>
                    {item.name}
                  </button>
                )}
              </h3>
              <div className="bs-cap-card-copy">
                <p>{item.copy}</p>
              </div>
              {item.cta && (
                // Visual only: the title link (stretched over the card) is the real control
                <span className="bs-cap-cta" aria-hidden="true">
                  {item.cta}
                  <ArrowIcon />
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
