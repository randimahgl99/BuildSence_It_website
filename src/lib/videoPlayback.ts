/**
 * Central video playback manager.
 *
 * Port of mockup/index.html `buildsense-page-aware-video-playback-2026`
 * (L17966-18087). A registered video plays only while ALL of these hold:
 *   - the tab is visible,
 *   - the visitor has not asked for reduced motion,
 *   - at least 12 % of the video rectangle is inside the viewport.
 * Otherwise it is paused. Scrolling away/back and switching tabs pause/resume
 * (they never rewind).
 *
 * Differences from the mockup, all because it was a single-page app and this
 * is not:
 *   - No "active page" condition and no MutationObserver: a page's videos only
 *     exist while its route is mounted.
 *   - No `resetForNewVisit` / `pendingReset`: every route visit mounts a fresh
 *     <video> that already starts at 0. (pendingReset also waited for
 *     `loadedmetadata`, which never arrives for `preload="none"` videos until
 *     play() is called, so keeping it would stop lazy videos from ever starting.)
 *   - Shared state is ref-counted. The first registration creates the single
 *     IntersectionObserver and the document/window listeners; the last
 *     unregistration removes all of them and cancels the pending frame. That
 *     keeps it safe under React Strict Mode (mount -> cleanup -> mount).
 */

const VISIBLE_FRACTION = 0.12;
const THRESHOLDS = [0, 0.05, 0.12, 0.25, 0.5];

type VideoRecord = { removeListeners: () => void };

const records = new Map<HTMLVideoElement, VideoRecord>();
const playPending = new WeakSet<HTMLVideoElement>();
const autoplayBlocked = new WeakSet<HTMLVideoElement>();

let observer: IntersectionObserver | null = null;
let reduceMotion: MediaQueryList | null = null;
let frameRequest = 0;
let teardownShared: (() => void) | null = null;

function pause(video: HTMLVideoElement) {
  if (!video.paused) video.pause();
}

// Check the actual video rectangle, not just whether an ancestor is mounted.
function isInViewport(video: HTMLVideoElement): boolean {
  const rect = video.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(0, rect.left));
  const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(0, rect.top));
  return (visibleWidth * visibleHeight) / (rect.width * rect.height) >= VISIBLE_FRACTION;
}

function allowed(video: HTMLVideoElement): boolean {
  return !document.hidden && !reduceMotion?.matches && isInViewport(video);
}

function safePlay(video: HTMLVideoElement) {
  if (!video.paused || playPending.has(video) || autoplayBlocked.has(video)) return;
  const block = (error: unknown) => {
    // NotAllowedError: autoplay refused (e.g. iOS Low Power Mode).
    // NotSupportedError: no playable <source>. Either way, retrying on every
    // scroll would just spam rejected play() calls. AbortError is expected
    // when we pause() an in-flight play(), so it is not a block.
    const name = (error as { name?: string } | null)?.name;
    if (name === "NotAllowedError" || name === "NotSupportedError") autoplayBlocked.add(video);
  };
  try {
    const promise = video.play();
    if (promise && typeof promise.then === "function") {
      playPending.add(video);
      promise
        .then(() => {
          playPending.delete(video);
          // A play() that resolved after the video left the screen must not keep running.
          if (!records.has(video) || !allowed(video)) pause(video);
        })
        .catch((error) => {
          playPending.delete(video);
          block(error);
        });
    }
  } catch (error) {
    block(error);
  }
}

function synchronize() {
  records.forEach((_, video) => {
    if (allowed(video)) safePlay(video);
    else pause(video);
  });
}

function scheduleSync() {
  if (frameRequest) return;
  frameRequest = requestAnimationFrame(() => {
    frameRequest = 0;
    synchronize();
  });
}

function setupShared() {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onVisibility = () => synchronize();
  const onReducedMotion = () => synchronize();

  // Intersection events manage scrolling without restarting currentTime.
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(scheduleSync, { threshold: THRESHOLDS });
  } else {
    window.addEventListener("scroll", scheduleSync, { passive: true });
  }
  document.addEventListener("visibilitychange", onVisibility);
  // pageshow also fires on bfcache restores, where playback must be re-evaluated.
  window.addEventListener("pageshow", scheduleSync);
  window.addEventListener("resize", scheduleSync, { passive: true });
  reduceMotion.addEventListener("change", onReducedMotion);

  teardownShared = () => {
    observer?.disconnect();
    observer = null;
    window.removeEventListener("scroll", scheduleSync);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", scheduleSync);
    window.removeEventListener("resize", scheduleSync);
    reduceMotion?.removeEventListener("change", onReducedMotion);
    reduceMotion = null;
    if (frameRequest) cancelAnimationFrame(frameRequest);
    frameRequest = 0;
  };
}

/**
 * Hands a <video> to the manager. Returns the matching unregister function
 * (call it from the effect cleanup). Registering the same element twice is a
 * no-op, so overlapping Strict Mode mounts cannot double-register.
 */
export function registerVideo(video: HTMLVideoElement): () => void {
  if (!records.has(video)) {
    if (records.size === 0) setupShared();

    // React does not reliably emit the `muted` attribute; iOS Safari will not
    // autoplay without it, so set the properties imperatively as well.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;

    const onLoadedMetadata = () => scheduleSync();
    const onCanPlay = () => scheduleSync();
    const onError = () => autoplayBlocked.add(video);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    records.set(video, {
      removeListeners: () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("error", onError);
      },
    });

    // Never autoplay on mount; the first sync decides.
    pause(video);
    observer?.observe(video);
    scheduleSync();
  }

  return () => unregisterVideo(video);
}

function unregisterVideo(video: HTMLVideoElement) {
  const record = records.get(video);
  if (!record) return;
  record.removeListeners();
  observer?.unobserve(video);
  records.delete(video);
  playPending.delete(video);
  autoplayBlocked.delete(video);
  pause(video);
  if (records.size === 0) {
    teardownShared?.();
    teardownShared = null;
  }
}
