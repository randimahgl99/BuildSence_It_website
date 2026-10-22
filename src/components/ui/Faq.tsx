"use client";

import { useId, useState } from "react";
import { aboutReveal } from "@/components/motion/revealAttrs";
import type { FaqItem } from "@/data/faqs";

/**
 * FAQ accordion (mockup `.faq` / `renderFaq`, L16690), shared by Home, /pos
 * and /industries. Multi-open by default, like the Home/POS mockup (each item
 * toggles on its own). `singleOpen` is the Industries mode (mockup L16858):
 * opening an item closes the others, and clicking the open item closes it.
 *
 * Unlike the mockup (a click handler on a <div>, not reachable by keyboard),
 * every question is a real <button aria-expanded aria-controls> inside a
 * heading, and the answer is a labelled region. The open/close animation is the
 * mockup's: `grid-template-rows` 0fr -> 1fr (.3s) with the chevron rotating
 * (styles/faq.css). Closed answers are `inert`, so their text is not exposed to
 * assistive tech or the tab order while clipped to zero height.
 *
 * State is the set of open indexes: discrete UI state, no timers or listeners.
 *
 * `reveal` marks the whole list as an About-style reveal target (the /pos
 * mockup reveals the `.faq` block as one unit, L17929). The reveal controller owns
 * `data-reveal-state`; this component never renders or touches it.
 */
export function Faq({
  items,
  reveal = false,
  singleOpen = false,
}: {
  items: readonly FaqItem[];
  reveal?: boolean;
  singleOpen?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((previous) => {
      if (singleOpen) return previous.has(index) ? new Set() : new Set([index]);
      const next = new Set(previous);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <div className="bs-faq" {...(reveal ? aboutReveal : null)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className="bs-faq-item" data-open={isOpen ? "" : undefined} data-reveal="card">
            <h3 className="bs-faq-q">
              <button
                type="button"
                id={buttonId}
                className="bs-faq-head"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="bs-faq-icon" aria-hidden="true" />
                <span>{item.question}</span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="bs-faq-body">
              <div inert={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
