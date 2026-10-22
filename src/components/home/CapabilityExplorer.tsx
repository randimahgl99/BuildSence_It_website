"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import type { Capability } from "@/data/capabilities";

// Mirrors `@keyframes stageIn` (mockup L267): the whole stage fades up 8px.
const STAGE_IN: Keyframe[] = [
  { opacity: 0.2, transform: "translateY(8px)" },
  { opacity: 1, transform: "none" },
];

const STAGE_IN_MS = 350;

type CapabilityExplorerProps = {
  items: readonly Capability[];
};

/**
 * Capabilities explorer: 8 numbered rows on the left, a sticky stage card on the
 * right that shows the active row's image, heading and copy.
 *
 * - Fine pointers (hover) activate a row on enter; touch activates on tap
 *   (`pointerType !== "touch"` keeps the touch-emulated enter out of it, so a
 *   tap is exactly one activation). Keyboard focus activates too.
 * - The POS & Retail row is a real link to /pos; the other rows only select.
 * - All stage slides are mounted and stacked; `data-active` flips visibility.
 *   No image src is ever assigned on first use, so there is no first-hover flash.
 * - The swap animation restarts through the Web Animations API instead of the
 *   mockup's forced-reflow trick (`void stage.offsetWidth`, AUDIT R14). Each swap
 *   cancels the previous animation, and unmount cancels the last one.
 */
export function CapabilityExplorer({ items }: CapabilityExplorerProps) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(0);

  useEffect(() => {
    // Nothing to animate for the initial state, or when the same row is re-activated.
    if (shownRef.current === active) return;
    shownRef.current = active;

    const stage = stageRef.current;
    if (!stage || typeof stage.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = stage.animate(STAGE_IN, { duration: STAGE_IN_MS, easing: "ease" });
    return () => animation.cancel();
  }, [active]);

  return (
    <div className="bs-cap-explorer">
      <ul className="bs-cap-menu">
        {items.map((item, index) => {
          const isActive = index === active;
          const rowProps = {
            className: "bs-cap-row",
            "data-active": isActive ? "" : undefined,
            "aria-current": isActive ? ("true" as const) : undefined,
            onPointerEnter: (event: PointerEvent) => {
              if (event.pointerType !== "touch") setActive(index);
            },
            onFocus: () => setActive(index),
            onClick: () => setActive(index),
          };
          const content = (
            <>
              <span className="bs-cap-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="bs-cap-row-title">{item.name}</span>
              <span className="bs-cap-arrow" aria-hidden="true">
                ↗
              </span>
              <span className="bs-cap-status" data-available={item.href ? "" : undefined}>
                {item.href ? "Available" : "Coming soon"}
              </span>
            </>
          );

          return (
            <li key={item.id} data-reveal="card">
              <h3 className="bs-cap-row-heading">
                {item.href ? (
                  <Link href={item.href} {...rowProps}>
                    {content}
                  </Link>
                ) : (
                  <button type="button" {...rowProps}>
                    {content}
                  </button>
                )}
              </h3>
            </li>
          );
        })}
      </ul>

      <div className="bs-cap-stage" ref={stageRef} data-reveal="media">
        <div className="bs-cap-window">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={item.id}
                className="bs-cap-slide"
                data-active={isActive ? "" : undefined}
                aria-hidden={isActive ? undefined : true}
              >
                <Image
                  className="bs-cap-image"
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 980px) calc(100vw - 40px), 670px"
                  alt={`${item.name} capability visual`}
                />
                <div className="bs-cap-copy">
                  <h3 className="bs-cap-copy-title">{item.name}</h3>
                  <p className="bs-cap-copy-text">{item.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
