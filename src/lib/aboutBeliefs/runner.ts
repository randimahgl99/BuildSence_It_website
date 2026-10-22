// Belief energy runner (mockup `buildsense-about-belief-energy`, L17694-17828; AUDIT 4.6).
// One rAF timeline shared by the four belief cards: a single lit dash makes one
// trip around one card's border, then the next card, with short pauses between.
// Imperative on purpose (per-frame style writes, no React state).

const PAUSE_BETWEEN_CARDS = 140;
const PAUSE_AFTER_LAST = 700;
const SPEED_PX_PER_SECOND = 345;
const MIN_DURATION = 4100;
const MAX_DURATION = 6200;
const MAX_FRAME_DELTA = 90; // no jump after a long frame / tab restore
const RESIZE_DEBOUNCE = 100;
const INSET = 1.2;

type Segment = {
  card: HTMLElement;
  path: SVGRectElement;
  svg: SVGSVGElement;
  length: number;
  dash: number;
  duration: number;
};

type Phase = "run" | "between" | "last-pause";

/**
 * Starts the runner on the server-rendered cards of `section` and returns a stop
 * function that undoes everything (rAF, timer, observers, listeners) and removes
 * every attribute/inline style it set, so the cards are back to their shipped,
 * invisible-runner state. Safe to call again (React Strict Mode).
 * Reduced motion = feature off: nothing is started.
 */
export function startBeliefRunner(section: HTMLElement): () => void {
  const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-about-belief]"));
  const segments: Segment[] = [];
  for (const card of cards) {
    const path = card.querySelector<SVGRectElement>("[data-about-runner]");
    const svg = path?.ownerSVGElement;
    if (path && svg) segments.push({ card, path, svg, length: 0, dash: 0, duration: 4800 });
  }
  if (segments.length !== 4) return () => {};

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let stopRunning: (() => void) | null = null;

  const sync = () => {
    if (motion.matches) {
      stopRunning?.();
      stopRunning = null;
    } else if (!stopRunning) {
      stopRunning = run(section, segments);
    }
  };
  motion.addEventListener("change", sync);
  sync();

  return () => {
    motion.removeEventListener("change", sync);
    stopRunning?.();
    stopRunning = null;
  };
}

function run(section: HTMLElement, segments: Segment[]): () => void {
  let current = 0;
  let phase: Phase = "run";
  let elapsed = 0;
  let lastTime: number | null = null;
  let rafId = 0;
  let sectionVisible = false;
  let activePath: SVGRectElement | null = null;
  let resizeTimer = 0;

  const silenceAll = () => {
    for (const item of segments) {
      item.path.style.opacity = "0";
      item.path.style.strokeDashoffset = "0";
    }
    activePath = null;
  };

  const renderRunner = (item: Segment, progress: number) => {
    const { path, length, dash } = item;
    if (!length) return;
    // One dash enters at the start, makes exactly one complete trip (including
    // geometry hidden under higher stacked cards), then exits; the rest of the
    // perimeter is an unlit gap.
    path.style.strokeDashoffset = (dash - (length + 2 * dash) * progress).toFixed(2);
    path.style.opacity = progress <= 0 || progress >= 1 ? "0" : "1";
    activePath = path;
  };

  const measure = () => {
    for (const item of segments) {
      const { card, path, svg } = item;
      const { width, height } = card.getBoundingClientRect();
      if (width < 10 || height < 10) continue;
      // Pixel-accurate geometry keeps the card's real radius at any viewport
      const radius = parseFloat(getComputedStyle(card).borderTopLeftRadius) || 13;
      const actualRadius = Math.max(2, radius - INSET);
      svg.setAttribute("viewBox", `0 0 ${width.toFixed(2)} ${height.toFixed(2)}`);
      path.setAttribute("x", String(INSET));
      path.setAttribute("y", String(INSET));
      path.setAttribute("width", Math.max(1, width - 2 * INSET).toFixed(2));
      path.setAttribute("height", Math.max(1, height - 2 * INSET).toFixed(2));
      path.setAttribute("rx", actualRadius.toFixed(2));
      path.setAttribute("ry", actualRadius.toFixed(2));
      const perimeter = path.getTotalLength();
      // The gap is longer than the whole path, so there is never a second dash
      const dash = Math.min(230, Math.max(155, perimeter * 0.13));
      path.style.strokeDasharray = `${dash.toFixed(2)} ${(perimeter + 2 * dash + 12).toFixed(2)}`;
      item.length = perimeter;
      item.dash = dash;
      item.duration = Math.round(
        Math.min(MAX_DURATION, Math.max(MIN_DURATION, (perimeter / SPEED_PX_PER_SECOND) * 1000)),
      );
      if (path === activePath && phase === "run") renderRunner(item, Math.min(1, elapsed / item.duration));
      else path.style.opacity = "0";
    }
  };

  const advance = () => {
    silenceAll();
    if (phase === "run") phase = "between";
    else if (phase === "between") {
      if (current === segments.length - 1) phase = "last-pause";
      else {
        current++;
        phase = "run";
      }
    } else {
      current = 0;
      phase = "run";
    }
  };

  const durationForPhase = () =>
    phase === "run" ? segments[current].duration : phase === "between" ? PAUSE_BETWEEN_CARDS : PAUSE_AFTER_LAST;

  const frame = (timestamp: number) => {
    rafId = 0;
    if (!sectionVisible || document.hidden) {
      lastTime = null;
      return;
    }
    const delta = lastTime === null ? 0 : Math.min(timestamp - lastTime, MAX_FRAME_DELTA);
    lastTime = timestamp;
    elapsed += Math.max(0, delta);
    while (elapsed >= durationForPhase()) {
      elapsed -= durationForPhase();
      advance();
    }
    if (phase === "run") renderRunner(segments[current], elapsed / segments[current].duration);
    else if (activePath) silenceAll();
    rafId = requestAnimationFrame(frame);
  };

  const syncPlayback = () => {
    const shouldPlay = sectionVisible && !document.hidden;
    if (shouldPlay && !rafId) {
      lastTime = null;
      rafId = requestAnimationFrame(frame);
    }
    if (!shouldPlay) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTime = null;
      silenceAll();
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === section) {
          sectionVisible = entry.isIntersecting;
          syncPlayback();
        }
      }
    },
    { threshold: 0 },
  );
  io.observe(section);
  document.addEventListener("visibilitychange", syncPlayback);

  // Geometry is measured once per resize burst, not per frame
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      syncPlayback();
    }, RESIZE_DEBOUNCE);
  };
  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(onResize);
    segments.forEach((item) => resizeObserver?.observe(item.card));
  } else {
    window.addEventListener("resize", onResize, { passive: true });
  }
  measure();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    clearTimeout(resizeTimer);
    io.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", syncPlayback);
    // Back to the server-rendered state: no geometry, no inline styles
    for (const { path, svg } of segments) {
      for (const attr of ["x", "y", "width", "height", "rx", "ry"]) path.removeAttribute(attr);
      svg.removeAttribute("viewBox");
      path.style.removeProperty("opacity");
      path.style.removeProperty("stroke-dashoffset");
      path.style.removeProperty("stroke-dasharray");
      if (!path.getAttribute("style")) path.removeAttribute("style");
    }
  };
}
