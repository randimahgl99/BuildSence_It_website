import { hook, noop, prefersReducedMotion } from "./dom";

// Home AI entrance scene. Port of mockup/index.html L17315-17500
// (`initHomeAiReferenceScene`). Elapsed time, never scroll distance, drives the
// heading rise, the per-letter colour wave, the chat slide and the right-column
// reveal. A one-shot IntersectionObserver STARTS it; one rAF loop runs it and
// terminates itself at 3.82 s.
//
// It writes CSS custom properties (--ai-*) on three elements and an inline
// colour on the server-rendered letter spans: no React state, no per-frame
// re-render. The static markup already is the final state, so "final" means
// "remove what the scene set" and cleanup does exactly the same.

const palette = [
  [248, 207, 72],
  [244, 161, 62],
  [239, 112, 82],
  [236, 91, 126],
  [208, 82, 172],
  [145, 97, 218],
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = (x: number) => 1 - Math.pow(1 - clamp(x), 3.5);
const phase = (time: number, start: number, end: number) => ease((time - start) / (end - start));

function gradientAt(t: number): number[] {
  const x = clamp(t) * (palette.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = palette[Math.min(i, palette.length - 1)];
  const b = palette[Math.min(i + 1, palette.length - 1)];
  return a.map((value, j) => lerp(value, b[j], f));
}

function parseRGB(value: string): number[] {
  const v = (value.match(/[\d.]+/g) || []).map(Number);
  return v.length >= 3 ? v.slice(0, 3) : [55, 58, 61];
}

const DURATION = 3.82;
const VARS = {
  title: ["--ai-heading-opacity", "--ai-heading-y"],
  chat: ["--ai-chat-x", "--ai-chat-y", "--ai-chat-opacity"],
  right: ["--ai-right-y", "--ai-right-opacity", "--ai-right-events"],
} as const;

export function startAiScene(section: HTMLElement): () => void {
  const title = hook(section, "title");
  const chat = hook(section, "chat-wrap");
  const right = hook(section, "right");
  const shell = section.querySelector<HTMLElement>(".bs-ai-shell");
  if (!title || !chat || !right || !shell) return noop;

  const chars = Array.from(title.querySelectorAll<HTMLElement>(".bs-ai-char"));
  const darkRGB = parseRGB(getComputedStyle(title).color);
  const originalColors = chars.map((_, i) => gradientAt(i / Math.max(1, chars.length - 1)));

  function applyWave(wave: number) {
    // Continuous left-to-right colour wave; adjacent letters overlap softly.
    const front = clamp(wave) * (chars.length + 10) - 4;
    chars.forEach((element, i) => {
      const mix = clamp((front - i) / 6);
      const source = originalColors[i];
      element.style.color =
        "rgb(" + source.map((value, j) => Math.round(lerp(value, darkRGB[j], mix))).join(",") + ")";
    });
  }

  /** Back to the server-rendered look (= the scene's final state). */
  function clearScene() {
    VARS.title.forEach((name) => title!.style.removeProperty(name));
    VARS.chat.forEach((name) => chat!.style.removeProperty(name));
    VARS.right.forEach((name) => right!.style.removeProperty(name));
    chars.forEach((element) => element.style.removeProperty("color"));
    right!.inert = false;
  }

  let raf = 0;
  let observer: IntersectionObserver | null = null;
  let sentinel: HTMLElement | null = null;
  let started = false;
  let completed = false;
  let startTime: number | null = null;
  let centerOffset = 0;

  function setFinal() {
    clearScene();
    completed = true;
    section.dataset.aiSequenceState = "complete";
  }

  if (prefersReducedMotion()) {
    setFinal();
    return () => {
      clearScene();
      delete section.dataset.aiSequenceState;
    };
  }

  // Measurements affect only the initial centre position; they never drive
  // animation timing or depend on scrolling after the trigger.
  function measureCenter() {
    const rect = chat!.getBoundingClientRect();
    const bounds = shell!.getBoundingClientRect();
    const priorX = parseFloat(chat!.style.getPropertyValue("--ai-chat-x")) || 0;
    const naturalCenter = rect.left - priorX + rect.width / 2;
    centerOffset = bounds.left + bounds.width / 2 - naturalCenter;
    // On stacked layouts the existing chat column is already centred.
    if (window.innerWidth <= 980) centerOffset = 0;
  }

  function render(elapsed: number) {
    // Absolute seconds after the one-time viewport trigger (independent of scroll).
    const heading = phase(elapsed, 0, 0.7);
    title!.style.setProperty("--ai-heading-opacity", heading.toFixed(4));
    title!.style.setProperty("--ai-heading-y", (42 * (1 - heading)).toFixed(2) + "px");
    applyWave(phase(elapsed, 0.25, 2.15));

    // 0.75-1.60 s: rise and fade in at centre. Hold centred until 1.90 s.
    const enter = phase(elapsed, 0.75, 1.6);
    // 1.90-3.05 s: move left using the same chat instance.
    const slide = phase(elapsed, 1.9, 3.05);
    chat!.style.setProperty("--ai-chat-x", (centerOffset * (1 - slide)).toFixed(2) + "px");
    chat!.style.setProperty("--ai-chat-y", (76 * (1 - enter)).toFixed(2) + "px");
    chat!.style.setProperty("--ai-chat-opacity", enter.toFixed(4));

    // 3.05-3.82 s: right column fades up AFTER the chat movement completes.
    const reveal = phase(elapsed, 3.05, 3.82);
    right!.style.setProperty("--ai-right-opacity", reveal.toFixed(4));
    right!.style.setProperty("--ai-right-y", (46 * (1 - reveal)).toFixed(2) + "px");
    right!.style.setProperty("--ai-right-events", reveal >= 0.98 ? "auto" : "none");
    if (right!.inert !== reveal < 0.98) right!.inert = reveal < 0.98;
    section.dataset.aiSequenceState =
      elapsed < 0.75
        ? "heading"
        : elapsed < 1.6
          ? "chat-center"
          : elapsed < 1.9
            ? "hold-center"
            : elapsed < 3.05
              ? "slide-left"
              : elapsed < DURATION
                ? "right-reveal"
                : "complete";
  }

  function animate(now: number) {
    if (completed) return;
    if (startTime === null) startTime = now;
    const elapsed = (now - startTime) / 1000;
    if (elapsed >= DURATION) {
      setFinal();
      return;
    }
    render(elapsed);
    raf = requestAnimationFrame(animate);
  }

  function start() {
    if (started) return;
    started = true;
    measureCenter();
    render(0);
    section.dataset.aiSequenceTriggered = "true";
    raf = requestAnimationFrame(animate);
  }

  // Establish the hidden presentation BEFORE any entrance begins.
  title.style.setProperty("--ai-heading-opacity", "0");
  title.style.setProperty("--ai-heading-y", "42px");
  chat.style.setProperty("--ai-chat-opacity", "0");
  chat.style.setProperty("--ai-chat-x", "0px");
  chat.style.setProperty("--ai-chat-y", "76px");
  right.style.setProperty("--ai-right-opacity", "0");
  right.style.setProperty("--ai-right-y", "46px");
  right.style.setProperty("--ai-right-events", "none");
  right.inert = true;
  applyWave(0);
  section.dataset.aiSequenceState = "waiting";

  if (typeof IntersectionObserver !== "undefined") {
    // Trigger when at least half the section is visible. If it is taller than
    // ~2 viewports, half can never fit: observe its centre crossing a central
    // band of the viewport as a reliable equivalent.
    const tooTall = section.getBoundingClientRect().height > window.innerHeight * 1.9;
    if (!tooTall) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
            observer?.disconnect();
            start();
          }
        },
        { threshold: [0.5] },
      );
      observer.observe(section);
    } else {
      sentinel = document.createElement("span");
      sentinel.setAttribute("aria-hidden", "true");
      sentinel.style.cssText = "position:absolute;top:50%;left:50%;height:1px;width:1px;pointer-events:none;";
      section.append(sentinel);
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            sentinel?.remove();
            sentinel = null;
            start();
          }
        },
        { rootMargin: "-34% 0px -34% 0px", threshold: 0 },
      );
      observer.observe(sentinel);
    }
  } else {
    // No IntersectionObserver: complete the scene automatically, never scroll-scrubbed.
    start();
  }

  return () => {
    cancelAnimationFrame(raf);
    observer?.disconnect();
    sentinel?.remove();
    clearScene();
    delete section.dataset.aiSequenceState;
    delete section.dataset.aiSequenceTriggered;
  };
}
