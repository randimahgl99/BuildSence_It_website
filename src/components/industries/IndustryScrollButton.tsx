"use client";

type IndustryScrollButtonProps = {
  /** Element to scroll to, e.g. "industries-v2-cards" */
  targetId: string;
  label: string;
  className?: string;
};

/**
 * "Explore Industries" (mockup `[data-industry-scroll]`, L16831): smooth-scrolls
 * to the cards section and does nothing if the target is not on the page.
 * The mockup used `scrollIntoView({behavior:'smooth', block:'start'})` with no
 * offset; the smooth behaviour comes from `html { scroll-behavior: smooth }`
 * (globals.css), which is turned off under `prefers-reduced-motion`.
 *
 * It is a button, not a link, like the mockup: no hash is added to the URL.
 */
export function IndustryScrollButton({ targetId, label, className }: IndustryScrollButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ block: "start" })}
    >
      {label}
    </button>
  );
}
