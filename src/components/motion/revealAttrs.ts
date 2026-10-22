// Attribute helpers (revealAttrs.ts) for the About-style reveal (AUDIT 4.9; controller:
// `AboutReveal.tsx`). Server Components spread these onto the elements that
// should enter on scroll.

/** Marks an element as an About-style reveal target. */
export const aboutReveal = { "data-about-reveal": "" } as const;

/**
 * For targets that are always inside the first viewport (hero copy). They are
 * server-rendered already hidden (`data-reveal-state="wait"`), so the first
 * paint does not show the text and then hide it again once the controller
 * hydrates. The hidden state is fail-visible: reduced motion and `<noscript>`
 * are handled in `styles/about-reveal.css` / by `AboutRevealFallback`.
 */
export const aboutRevealAboveFold = { ...aboutReveal, "data-reveal-state": "wait" } as const;
