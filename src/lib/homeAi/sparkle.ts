import { noop, prefersReducedMotion } from "./dom";

/**
 * Gates the sparkle's keyframes (mockup `ai-icon-running`, L17486-17500): they
 * run only while the section is within 60px of the viewport AND the tab is
 * visible. State is `data-running` on the section; styles/home-ai.css pauses
 * the animations without it.
 *
 * One deliberate difference from the mockup: its visibilitychange handler only
 * ever removes the class, so after switching tabs away and back the sparkle
 * stayed frozen until the next scroll. Here visibility and intersection are
 * both tracked and the state is recomputed from the pair on either event.
 */
export function startAiSparkle(section: HTMLElement): () => void {
  if (prefersReducedMotion()) return noop; // CSS also sets animation:none

  if (typeof IntersectionObserver === "undefined") {
    section.setAttribute("data-running", "");
    return () => section.removeAttribute("data-running");
  }

  let inView = false;
  const sync = () => {
    if (inView && !document.hidden) section.setAttribute("data-running", "");
    else section.removeAttribute("data-running");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) inView = entry.isIntersecting;
      sync();
    },
    { rootMargin: "60px 0px 60px 0px", threshold: 0 },
  );
  observer.observe(section);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    section.removeAttribute("data-running");
  };
}
