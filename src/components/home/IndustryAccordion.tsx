"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { containsTarget } from "@/lib/containsTarget";
import { createPreviewFollower, type PreviewFollower } from "@/lib/industryPreview";
import type { Industry } from "@/data/industries";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

type Layers = readonly [number | null, number | null];

/**
 * Home industries accordion (mockup L16440-16586). One row is active at a time.
 *
 * - Fine pointer (`(hover:hover) and (pointer:fine)`): hover or keyboard focus
 *   activates a row; leaving the list or moving focus out deactivates. The
 *   active row also floats a photo beside it (two stacked layers that crossfade,
 *   positioned by `lib/industryPreview.ts`: a follow loop capped at 720 ms with a
 *   cancel token).
 * - Touch / no fine pointer: tapping the title or the panel toggles the row; the
 *   photo is shown inline under the text instead (CSS, <= 767px or coarse).
 * - "Explore" is a link to /industries and never toggles the row.
 *
 * React owns the discrete state (which row is active, which industry each photo
 * layer shows, which layer is shown) and renders it as attributes; the per-frame
 * geometry (`--industry-preview-y`) is written imperatively and React never sets
 * that property. Cleanup: the follow loop's rAF, the window `resize` listener and
 * the matchMedia subscription (inside `useMediaQuery`); pointer/focus listeners
 * are React props. Strict Mode safe: the effect is re-entrant and undone fully.
 *
 * Photo layers differ from the mockup in mechanism only: it assigns `img.src`,
 * here the layer's `<Image>` is re-rendered with the new source. A layer is
 * revealed one frame after its source is committed (mockup: "frame separation
 * ensures opacity/scale transitions run on quick moves").
 */
export function IndustryAccordion({
  industries,
  exploreHref,
}: {
  industries: readonly Industry[];
  exploreHref: string;
}) {
  const fine = useMediaQuery(FINE_POINTER);

  const [active, setActive] = useState<number | null>(null);
  const [layers, setLayers] = useState<Layers>([null, null]);
  const [shown, setShown] = useState<0 | 1 | null>(null);
  const [pending, setPending] = useState<0 | 1 | null>(null);
  // Rows opened at least once: only those mount their inline (touch layout) photo,
  // like the mockup's lazily assigned `src`. Nothing is fetched until first use.
  const [opened, setOpened] = useState<ReadonlySet<number>>(() => new Set());

  // Mockup: finePointer 'change' -> setActive(null); displayedName=''.
  // Adjusting state while rendering is the supported way to reset on a changed input.
  const [prevFine, setPrevFine] = useState(fine);
  if (prevFine !== fine) {
    setPrevFine(fine);
    setActive(null);
  }

  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([null, null]);
  const followerRef = useRef<PreviewFollower | null>(null);
  // Mirrors of state for code that runs outside React (rAF loop, resize).
  const activeRef = useRef<number | null>(null);
  const fineRef = useRef(fine);
  const displayedRef = useRef(-1);
  const layerCursorRef = useRef(1);

  useEffect(() => {
    fineRef.current = fine;
    activeRef.current = null;
    displayedRef.current = -1;
    followerRef.current?.stop();
  }, [fine]);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const follower = createPreviewFollower({
      list,
      preview,
      getActiveRow: () => (activeRef.current === null ? null : (rowRefs.current[activeRef.current] ?? null)),
      isFine: () => fineRef.current,
    });
    followerRef.current = follower;

    // Re-measure after responsive flow changes without activating any new row.
    const onResize = () => {
      if (fineRef.current && activeRef.current !== null) follower.follow();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      follower.stop();
      followerRef.current = null;
    };
  }, []);

  // Reveal the incoming photo layer one frame after its source was committed.
  useEffect(() => {
    if (pending === null) return;
    const layer = layerRefs.current[pending];
    const frame = requestAnimationFrame(() => {
      // Record the layer's hidden style before it flips, so the very first
      // reveal of a freshly mounted layer still transitions.
      if (layer) void getComputedStyle(layer).opacity;
      setShown(pending);
    });
    return () => cancelAnimationFrame(frame);
  }, [pending]);

  const switchFloatingImage = (index: number) => {
    if (displayedRef.current === index) return;
    displayedRef.current = index;
    layerCursorRef.current = layerCursorRef.current === 0 ? 1 : 0;
    const incoming = layerCursorRef.current as 0 | 1;
    setLayers((previous) => (incoming === 0 ? [index, previous[1]] : [previous[0], index]));
    setPending(incoming);
  };

  const activate = (next: number | null) => {
    if (activeRef.current === next) return;
    activeRef.current = next;
    setActive(next);
    if (next !== null) setOpened((previous) => (previous.has(next) ? previous : new Set(previous).add(next)));
    if (next !== null && fine) {
      followerRef.current?.align();
      switchFloatingImage(next);
      followerRef.current?.follow();
    } else {
      followerRef.current?.stop();
    }
  };

  const toggle = (index: number) => activate(activeRef.current === index ? null : index);

  return (
    <div
      className="bs-ind-list"
      ref={listRef}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && fine) activate(null);
      }}
      onBlur={(event) => {
        if (!containsTarget(event.currentTarget, event.relatedTarget) && fine) activate(null);
      }}
    >
      {industries.map((industry, index) => {
        const isActive = active === index;
        const number = String(index + 1).padStart(2, "0");
        const panelId = `industry-panel-${industry.id}`;
        return (
          <div
            key={industry.id}
            className="bs-ind-row"
            data-active={isActive ? "" : undefined}
            data-reveal="card"
            ref={(element) => {
              rowRefs.current[index] = element;
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && fine) activate(index);
            }}
            onFocus={() => {
              if (fine) activate(index);
            }}
            // Tap the text/panel itself to expand, but preserve the separate Explore action.
            onClick={(event) => {
              if (fine || (event.target as Element).closest("button, a")) return;
              toggle(index);
            }}
          >
            <button
              type="button"
              className="bs-ind-trigger"
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={(event) => {
                event.stopPropagation();
                if (fine) activate(index);
                else toggle(index);
              }}
            >
              <span className="bs-ind-title">{`${number} · ${industry.name}`}</span>
            </button>

            <div id={panelId} className="bs-ind-panel" aria-hidden={!isActive}>
              <div className="bs-ind-panel-inner">
                <p>{industry.description}</p>
              </div>
            </div>

            <Link
              href={exploreHref}
              className="bs-ind-explore"
              aria-label={`Explore ${industry.name} solutions`}
              onClick={(event) => event.stopPropagation()}
            >
              Explore <span aria-hidden="true">↗</span>
            </Link>

            {/* Touch / narrow layout only (display:none otherwise). */}
            <div className="bs-ind-inline" aria-hidden="true">
              <div>
                {opened.has(index) ? (
                  <Image
                    src={industry.image.src}
                    width={industry.image.width}
                    height={industry.image.height}
                    sizes="340px"
                    alt=""
                  />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      <div
        className="bs-ind-preview"
        ref={previewRef}
        data-visible={fine && active !== null ? "" : undefined}
        aria-hidden="true"
      >
        {layers.map((industryIndex, layer) => {
          if (industryIndex === null) return null;
          const image = industries[industryIndex].image;
          return (
            <Image
              key={layer}
              ref={(element) => {
                layerRefs.current[layer] = element;
              }}
              className="bs-ind-float"
              data-shown={shown === layer ? "" : undefined}
              src={image.src}
              width={image.width}
              height={image.height}
              sizes="240px"
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}
