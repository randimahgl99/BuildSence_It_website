"use client";

import { useRef } from "react";
import { useRotatingWord } from "@/hooks/useRotatingWord";

/**
 * The rotating word inside the hero H1. Renders `words[0]` on the server and on
 * first paint; rotation starts after hydration (see useRotatingWord).
 */
export function RotatingWord({ words }: { words: readonly string[] }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  useRotatingWord(words, labelRef);
  return (
    <span className="bs-home-hero-rotate">
      <span ref={labelRef} className="bs-home-hero-word">
        {words[0]}
      </span>
    </span>
  );
}
