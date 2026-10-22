"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EcosystemSlide } from "@/data/industries";

type IndustrySlideshowProps = {
  slides: readonly EcosystemSlide[];
  intervalMs: number;
  carouselLabel: string;
  statusLabel: string;
  cta: { label: string; href: string };
};

/*
 * Photo is cover-scaled into the notch frame (88% x 85% of the card), so the
 * rendered width is the cover-scaled one: up to ~800px on desktop, ~740px in
 * the full-width layout, ~460px on phones. The preload below uses the same
 * `sizes`, so the browser picks the same candidate and the later <Image> is a
 * cache hit.
 */
const PHOTO_SIZES = "(max-width: 430px) 460px, (max-width: 767px) 740px, 800px";

// Notch outline (mockup L15268): the same path, once as the clip (objectBoundingBox
// units) and once as the glowing outline (1000x1000 viewBox).
const CLIP_PATH_ID = "bsIndNotchClip";
const CLIP_PATH_D =
  "M .036 .130 C .036 .069 .060 .037 .108 .037 L .421 .037 C .457 .037 .469 .055 .477 .091 C .487 .137 .507 .160 .545 .160 L .904 .160 C .952 .160 .963 .186 .963 .226 L .963 .889 C .963 .940 .942 .963 .886 .963 L .555 .963 C .511 .963 .505 .945 .488 .914 C .473 .867 .454 .852 .425 .852 L .104 .852 C .061 .852 .036 .830 .036 .782 Z";
const OUTLINE_PATH_D =
  "M 36 130 C 36 69 60 37 108 37 L 421 37 C 457 37 469 55 477 91 C 487 137 507 160 545 160 L 904 160 C 952 160 963 186 963 226 L 963 889 C 963 940 942 963 886 963 L 555 963 C 511 963 505 945 488 914 C 473 867 454 852 425 852 L 104 852 C 61 852 36 830 36 782 Z";

const pad = (value: number) => String(value).padStart(2, "0");

/** Start fetching a slide's photo off-DOM, with the same URL set `<Image>` will request. */
function preloadPhoto(slide: EcosystemSlide): HTMLImageElement {
  const { props } = getImageProps({
    src: slide.image.src,
    width: slide.image.width,
    height: slide.image.height,
    sizes: PHOTO_SIZES,
    alt: "",
  });
  const photo = new window.Image();
  photo.sizes = props.sizes ?? "";
  photo.srcset = props.srcSet ?? "";
  photo.src = props.src;
  return photo;
}

/**
 * Featured-industry slideshow (mockup `industry-feature-v5-controller`, L17011).
 *
 * Six stacked slides crossfade (opacity 750ms, CSS) inside the clip-path notch
 * frame. A single `setTimeout` chain advances every `intervalMs`, and runs only
 * while the section is >= 12% visible AND the tab is visible AND motion is
 * allowed. Before committing a slide, its photo is preloaded and the switch
 * waits for `load`, so the crossfade never starts on a blank frame; a failed
 * load skips that tick and tries again. Reduced motion = static first frame
 * (no timer, nothing preloaded).
 *
 * Differences from the mockup (which used two layers whose content it
 * rewrote): each slide is its own layer, and a slide's <Image> is mounted only
 * once it has been preloaded, so slides 1-5 cost nothing until they are about
 * to be shown. Slide 0 is lazy like any below-the-fold photo (the section is mid-page). The mockup never removed its
 * `visibilitychange` listener; here every observer, listener, timer and pending
 * preload is released in the effect cleanup, and the effect is re-entrant
 * (Strict Mode safe, no initialised flag).
 *
 * React state is discrete UI only (current index + which photos are mounted);
 * the timer, the visible/awaiting flags and the pending preload live in the
 * effect closure.
 */
export function IndustrySlideshow({ slides, intervalMs, carouselLabel, statusLabel, cta }: IndustrySlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<readonly number[]>([0]);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.closest("section");
    if (!root || !section) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = reduceQuery.matches;
    let visible = false;
    let awaiting = false;
    let timer = 0;
    let cancelPending: (() => void) | null = null;

    const clear = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const canRun = () => visible && !reduce && !document.hidden;
    const schedule = () => {
      clear();
      if (!canRun()) return;
      timer = window.setTimeout(advance, intervalMs);
    };
    const commit = (next: number) => {
      awaiting = false;
      cancelPending = null;
      indexRef.current = next;
      setMounted((previous) => (previous.includes(next) ? previous : [...previous, next]));
      setIndex(next);
      schedule();
    };
    function advance() {
      if (awaiting || !canRun()) return;
      awaiting = true;
      const next = (indexRef.current + 1) % slides.length;
      const photo = preloadPhoto(slides[next]);

      if (photo.complete && photo.naturalWidth > 0) {
        commit(next);
        return;
      }
      // Wait for the real file so no blank frame appears during the crossfade.
      const onLoad = () => {
        cancelPending = null;
        commit(next);
      };
      const onError = () => {
        cancelPending = null;
        awaiting = false;
        schedule();
      };
      photo.addEventListener("load", onLoad, { once: true });
      photo.addEventListener("error", onError, { once: true });
      cancelPending = () => {
        photo.removeEventListener("load", onLoad);
        photo.removeEventListener("error", onError);
      };
    }

    const onVisibility = () => {
      if (document.hidden) clear();
      else schedule();
    };
    const onMotionChange = () => {
      reduce = reduceQuery.matches;
      if (reduce) clear();
      else schedule();
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[entries.length - 1].isIntersecting;
          if (visible) schedule();
          else clear();
        },
        { threshold: 0.12 },
      );
      observer.observe(section);
    } else {
      visible = true;
      schedule();
    }
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onMotionChange);

    return () => {
      clear();
      cancelPending?.();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onMotionChange);
    };
    // slides/intervalMs are module constants passed from the server section.
  }, [slides, intervalMs]);

  return (
    <div
      ref={rootRef}
      className="bs-ind-feature"
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
    >
      <div className="bs-ind-feature-status" role="group" aria-label={statusLabel}>
        <span className="bs-ind-feature-current" aria-live="off">
          {pad(index + 1)}
        </span>
        <span className="bs-ind-feature-total">/ {pad(slides.length)}</span>
        <div className="bs-ind-feature-dots" aria-hidden="true">
          {slides.map((slide, n) => (
            <i key={slide.id} data-active={n === index ? "" : undefined} />
          ))}
        </div>
      </div>

      <svg className="bs-ind-feature-clipdefs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={CLIP_PATH_ID} clipPathUnits="objectBoundingBox">
            <path d={CLIP_PATH_D} />
          </clipPath>
        </defs>
      </svg>

      {slides.map((slide, n) => {
        const active = n === index;
        return (
          <div
            key={slide.id}
            className="bs-ind-feature-slide"
            data-active={active ? "" : undefined}
            aria-hidden={!active}
            inert={!active}
          >
            <div className="bs-ind-feature-image">
              <div className="bs-ind-feature-image-clip">
                {mounted.includes(n) && (
                  <Image
                    className="bs-ind-feature-photo"
                    src={slide.image.src}
                    width={slide.image.width}
                    height={slide.image.height}
                    sizes={PHOTO_SIZES}
                    alt={slide.alt}
                  />
                )}
              </div>
              <svg
                className="bs-ind-feature-outline"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={OUTLINE_PATH_D} />
              </svg>
            </div>
            <article className="bs-ind-feature-info">
              <div className="bs-ind-feature-industry">
                <span className="bs-ind-feature-icon" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 24 24">
                    {slide.iconPaths.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </span>
                <span className="bs-ind-feature-name">{slide.name}</span>
              </div>
              <h3 className="bs-ind-feature-headline">{slide.headline}</h3>
              <p className="bs-ind-feature-description">{slide.description}</p>
              <Link href={cta.href} className="bs-ind-feature-learn" tabIndex={active ? 0 : -1}>
                <span className="bs-ind-feature-learn-arrow" aria-hidden="true">
                  →
                </span>
                <span>{cta.label}</span>
              </Link>
            </article>
          </div>
        );
      })}
    </div>
  );
}
