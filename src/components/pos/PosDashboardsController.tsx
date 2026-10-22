"use client";

import { useEffect } from "react";

const SECTION_ID = "pos-dashboards";
const ROW = "[data-dash-row]";
const CARD = "[data-dash-card]";

/**
 * Card selection for the POS dashboards marquee (mockup `initPosDashboardMarqueeV2`,
 * L14954). Renders nothing: the server-rendered rows carry `data-dash-row` /
 * `data-dash-card` and this controller drives two data attributes:
 *   data-selected  on a card (zoom, aria-pressed)  -- at most one card on the page
 *   data-paused    on its row (the track stops; the other cards in the row dim)
 *
 * Same behaviour as the mockup:
 *  - click / Enter / Space on a card selects it and pauses its row; doing it on the
 *    selected card again deselects it and resumes the row,
 *  - selecting a card clears any selection in the other row,
 *  - a click anywhere outside the section clears every selection.
 *
 * One document-level click listener and one keydown listener on the section, both
 * removed in the cleanup, which also clears the attributes it set, so the effect is
 * re-entrant (React Strict Mode mounts, cleans up and mounts again). React never
 * renders these attributes, so re-renders cannot overwrite them.
 */
export function PosDashboardsController() {
  useEffect(() => {
    const section = document.getElementById(SECTION_ID);
    if (!section) return;
    const rows = Array.from(section.querySelectorAll<HTMLElement>(ROW));

    const setSelected = (card: Element, selected: boolean) => {
      card.toggleAttribute("data-selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    };
    const clearAll = () =>
      rows.forEach((row) => {
        row.removeAttribute("data-paused");
        row.querySelectorAll(CARD).forEach((card) => setSelected(card, false));
      });

    const toggle = (card: Element) => {
      const row = card.closest(ROW);
      if (!row) return;
      const wasSelected = card.hasAttribute("data-selected");
      clearAll();
      if (wasSelected) return;
      setSelected(card, true);
      row.setAttribute("data-paused", "");
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !section.contains(target)) {
        clearAll();
        return;
      }
      const card = target.closest(CARD);
      if (card) toggle(card);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target instanceof Element ? event.target.closest(CARD) : null;
      if (!card) return;
      event.preventDefault();
      toggle(card);
    };

    document.addEventListener("click", onClick);
    section.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      section.removeEventListener("keydown", onKeyDown);
      clearAll();
    };
  }, []);

  return null;
}
