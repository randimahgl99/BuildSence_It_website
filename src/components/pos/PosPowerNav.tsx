"use client";

import { useCallback, useEffect, useState } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";

type PosPowerNavProps = {
  label: string;
  topics: readonly { id: string; title: string }[];
};

const SECTION = "#posPowerSection";

const topicElements = () => Array.from(document.querySelectorAll<HTMLElement>(`${SECTION} [data-pos-section]`));

/**
 * Active topic = the one containing the line at `min(42% of the viewport, 360px)`;
 * when none does, the nearest one (mockup `updatePosPowerNav`, L16705). Reads the
 * topics' rects, so it runs only from the rAF-batched scroll hook below.
 */
function activeTopicId(): string | null {
  const topics = topicElements();
  if (!topics.length) return null;

  const targetY = Math.min(window.innerHeight * 0.42, 360);
  let active = topics[0];
  let best = Infinity;
  for (const topic of topics) {
    const rect = topic.getBoundingClientRect();
    if (rect.top <= targetY && rect.bottom > targetY) {
      active = topic;
      best = -1;
    } else if (best !== -1 && Math.abs(rect.top - targetY) < best) {
      best = Math.abs(rect.top - targetY);
      active = topic;
    }
  }
  return active.dataset.posSection ?? null;
}

/**
 * Sticky left nav of the POS power explorer (the topics are server-rendered next
 * to it). Scroll-spy runs on the shared rAF-batched passive scroll hook instead
 * of the mockup's unbatched listener (Q8); it also re-checks on resize because
 * the topics move when the layout reflows. Clicking a button scrolls to its topic:
 * the offset is the topic's `scroll-margin-top` and the smooth behaviour comes
 * from `html { scroll-behavior: smooth }` (off under reduced motion).
 */
export function PosPowerNav({ label, topics }: PosPowerNavProps) {
  // The server renders the first topic as active; scroll position is read after mount
  const [active, setActive] = useState(topics[0]?.id ?? "");

  const sync = useCallback(() => {
    const id = activeTopicId();
    if (id) setActive(id);
  }, []);

  useRafScroll(sync, { resize: true });

  // The mockup also ran once on load (restored scroll positions, direct visits)
  useEffect(() => {
    const frame = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(frame);
  }, [sync]);

  return (
    <aside className="bs-pos-power-nav" aria-label={label}>
      {topics.map((topic) => (
        <button
          key={topic.id}
          type="button"
          className="bs-pos-power-nav-item"
          data-active={active === topic.id ? "" : undefined}
          aria-current={active === topic.id ? "true" : undefined}
          onClick={() =>
            topicElements()
              .find((el) => el.dataset.posSection === topic.id)
              ?.scrollIntoView({ block: "start" })
          }
        >
          {topic.title}
        </button>
      ))}
    </aside>
  );
}
