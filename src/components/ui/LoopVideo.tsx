"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { preload } from "react-dom";
import { registerVideo } from "@/lib/videoPlayback";

type LoopVideoProps = {
  /** URL of the MP4 under public/, e.g. "/media/videos/home-hero-v3.mp4". Always the last <source>. */
  src: string;
  /** Optional WebM of the same video. Listed first when given; omit it when no WebM file exists. */
  webmSrc?: string;
  /** URL of the poster image under public/, e.g. "/media/posters/home-hero-v2.jpg". */
  poster: string;
  /**
   * Hero video: preload="metadata" and the poster is preloaded at high priority
   * (it is the LCP image). Everything else: preload="none"; the file is fetched
   * only when the manager first plays it, i.e. when it scrolls into view.
   */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * The one decorative looping video used across the site (CLAUDE.md "Video rules").
 *
 * Playback is owned by `lib/videoPlayback` (port of the mockup's video manager):
 * it plays only while >= 12 % of the video is in the viewport and the tab is
 * visible, and never under `prefers-reduced-motion`, in which case the poster
 * stays on screen. A WebM source (when provided) is listed first, MP4 is the fallback.
 */
export function LoopVideo({ src, webmSrc, poster, priority = false, className, style }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  if (priority) preload(poster, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    return registerVideo(video);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload={priority ? "metadata" : "none"}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
