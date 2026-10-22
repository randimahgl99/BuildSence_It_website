// Shared DOM helpers for the Home AI section controllers. Elements are found by
// the `data-ai="<name>"` hooks that HomeAiSection renders; state is written as
// data attributes (never classes) so React cannot overwrite it.

export const noop = () => {};

export function hook(section: ParentNode, name: string): HTMLElement | null {
  return section.querySelector<HTMLElement>(`[data-ai="${name}"]`);
}

export function hooks(section: ParentNode, name: string): HTMLElement[] {
  return Array.from(section.querySelectorAll<HTMLElement>(`[data-ai="${name}"]`));
}

/** `data-<name>` present = on, absent = off. */
export function flag(element: Element, name: string, on: boolean) {
  if (on) element.setAttribute(`data-${name}`, "");
  else element.removeAttribute(`data-${name}`);
}

/** Read inside effects only, never during render (hydration safety). */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
