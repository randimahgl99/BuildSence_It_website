"use client";

type PosFeatureJumpProps = {
  /** Element to scroll to, e.g. "posPowerSection" */
  targetId: string;
  label: string;
  className?: string;
};

/**
 * "Explore POS Features" (mockup `buildsense-pos-feature-hero-jump`, L17883):
 * scrolls to the power explorer with the header offset, and does nothing if the
 * target is not on the page. The offset is the target's `scroll-margin-top`
 * (styles/pos-hero.css), and the smooth behaviour comes from `html
 * { scroll-behavior: smooth }`, which globals.css already turns off under
 * `prefers-reduced-motion` (the mockup scrolled instantly in that case).
 *
 * It is a button, not a link, like the mockup: no hash is added to the URL.
 */
export function PosFeatureJump({ targetId, label, className }: PosFeatureJumpProps) {
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
