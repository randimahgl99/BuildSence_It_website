"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import type { WhyItem } from "@/data/why";

type WhyScrollerProps = {
  items: readonly WhyItem[];
  visualLabel: string;
};

/**
 * Why-BuildSense scroller (mockup `updateWhyHome`, L16590): four tall items on
 * the left, a sticky image card on the right that follows the item whose
 * centre is closest to the viewport centre.
 *
 * - One passive, rAF-batched scroll listener via `useRafScroll`. The early
 *   return when the section is off-screen is kept, so scrolling elsewhere on
 *   the page costs one cheap rect read per frame.
 * - All four images are mounted and stacked; `data-active` flips visibility, so
 *   no src is assigned on first scroll (AUDIT R10, §4.13 #6).
 * - The swap animations (`whyImageIn` .34s on the image, `stageIn` .28s on the
 *   title) are CSS keyframes that start when the new image becomes active and
 *   when the title element is re-mounted by its `key`. That replaces the
 *   mockup's forced-reflow restart (`void visual.offsetWidth`, AUDIT R14).
 *   `data-swapped` stays off until the first change, so nothing animates on load.
 */
export function WhyScroller({ items, visualLabel }: WhyScrollerProps) {
  const [{ active, swapped }, setState] = useState({ active: 0, swapped: false });
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const update = () => {
    const section = gridRef.current?.closest("section");
    if (section) {
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
    }

    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDistance = Infinity;
    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - mid);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    setState((previous) => (previous.active === best ? previous : { active: best, swapped: true }));
  };

  useRafScroll(update);

  // Initial pass (the mockup calls updateWhyHome() once on load), in a frame so
  // the layout is settled and no state is set synchronously inside the effect.
  useEffect(() => {
    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
    // `update` only reads refs and the window, so it is stable in effect.
  }, []);

  const current = items[active];

  return (
    <div className="bs-why-scroll" ref={gridRef}>
      <div className="bs-why-list">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="bs-why-item"
            data-active={index === active ? "" : undefined}
            data-reveal="card"
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
          >
            <div className="eyebrow">{item.eyebrow}</div>
            <h3 className="bs-why-item-title">{item.title}</h3>
            <p className="bs-why-item-copy">{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="bs-why-visual" data-swapped={swapped ? "" : undefined} data-reveal="media">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bs-why-slide"
            data-active={index === active ? "" : undefined}
            aria-hidden={index === active ? undefined : true}
          >
            <Image
              className="bs-why-image"
              src={item.image.src}
              width={item.image.width}
              height={item.image.height}
              sizes="(max-width: 980px) calc(100vw - 40px), 620px"
              alt={`${item.name} BuildSense IT approach`}
            />
          </div>
        ))}
        <div className="bs-why-overlay">
          <div className="bs-why-label">{visualLabel}</div>
          <div className="bs-why-title" key={current.id} aria-live="off">
            {current.name}
          </div>
        </div>
      </div>
    </div>
  );
}
