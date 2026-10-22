/**
 * Floating-photo positioning for the Home industries accordion (mockup
 * `alignFloatingImage` / `followExpandingRows`, L16498-16520).
 *
 * The photo is centred vertically on the active row (clamped inside the list)
 * through the `--industry-preview-y` custom property. Rows expand and collapse
 * over ~.5s, which moves the active row's offsetTop, so the position is
 * re-aligned every frame for at most 720 ms after each change. A token cancels
 * a superseded loop: every `follow()` and `stop()` bumps it, and a frame that
 * wakes up with a stale token does nothing.
 *
 * Frame budget: one rAF chain, only while a row is active, never longer than
 * 720 ms. `stop()` cancels the pending frame; call it from effect cleanup.
 */
export const FOLLOW_MS = 720;
const FALLBACK_HEIGHT = 158;

export type PreviewFollower = {
  /** Align once, now (before the preview becomes visible). */
  align(): void;
  /** Align every frame for up to FOLLOW_MS. */
  follow(): void;
  /** Cancel any pending frame and invalidate the running loop. */
  stop(): void;
};

export function createPreviewFollower({
  list,
  preview,
  getActiveRow,
  isFine,
}: {
  list: HTMLElement;
  preview: HTMLElement;
  getActiveRow: () => HTMLElement | null;
  isFine: () => boolean;
}): PreviewFollower {
  let frame = 0;
  let token = 0;

  const align = () => {
    const row = getActiveRow();
    if (!row || !isFine()) return;
    const height = preview.offsetHeight || FALLBACK_HEIGHT;
    const centered = row.offsetTop + (row.offsetHeight - height) / 2;
    const top = Math.max(3, Math.min(list.offsetHeight - height - 3, centered));
    preview.style.setProperty("--industry-preview-y", `${top}px`);
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    token++;
    frame = 0;
  };

  const follow = () => {
    if (frame) cancelAnimationFrame(frame);
    const mine = ++token;
    const began = performance.now();
    const update = (now: number) => {
      if (mine !== token) return;
      align();
      if (now - began < FOLLOW_MS && getActiveRow()) frame = requestAnimationFrame(update);
      else frame = 0;
    };
    frame = requestAnimationFrame(update);
  };

  return { align, follow, stop };
}
