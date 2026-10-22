/**
 * Without JavaScript nothing can reveal the About-style targets, so make them
 * visible. (Targets in the first viewport are server-rendered hidden; see
 * `revealAttrs.ts`.) Server Component, no client JS.
 */
export function AboutRevealFallback() {
  return (
    <noscript>
      <style>{"[data-about-reveal]{opacity:1!important;transform:none!important}"}</style>
    </noscript>
  );
}
