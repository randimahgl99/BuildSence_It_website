"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { aboutRevealAboveFold } from "@/components/motion/revealAttrs";
import { HUMANS_PAGE, TEAM } from "@/data/team";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Humans hero controls + searchable team grid (mockup `#page-humans` L15724 and
 * `buildsense-humans-page-navigation` L17830).
 *
 * The search is controlled React state. The mockup toggles `hidden` on each card
 * and the `bs-last-alone` class by hand; here both are derived from the query:
 *  - a card is hidden when "<name> <hometown>" does not contain the (trimmed,
 *    lower-cased) query,
 *  - the last visible card is "alone" (centred) when the visible count leaves a
 *    single card on the last row: `count % 2 === 1` in the 2-column layout
 *    (<= 900px), `count % 3 === 1` in the 3-column one. The <= 600px layout is a
 *    single column and its CSS ignores the class.
 *
 * The breakpoint comes from `useMediaQuery`, never read during render, so the
 * server markup is breakpoint-neutral: with no query all 7 cards are visible and
 * 7 is odd for both layouts, so the 7th card is "alone" on every width.
 *
 * Cards stay mounted when filtered out (as in the mockup) so the scroll reveal's
 * observer picks them up when they come back. The reveal itself is the shared
 * `AboutReveal` controller (mounted by the page); nothing here owns listeners.
 *
 * `children` is the server-rendered hero copy (h1 + intro), placed above the
 * controls inside the same `<header>`.
 */
export function HumansDirectory({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const twoColumns = useMediaQuery("(max-width: 900px)");

  const needle = query.toLocaleLowerCase().trim();
  const matches = TEAM.map((member) => `${member.name} ${member.hometown}`.toLocaleLowerCase().includes(needle));
  const visibleCount = matches.filter(Boolean).length;
  const lastVisible = matches.lastIndexOf(true);
  const lastAlone = visibleCount > 0 && visibleCount % (twoColumns ? 2 : 3) === 1;

  return (
    <>
      <header className="bs-humans-hero">
        {children}
        <div className="bs-humans-controls" {...aboutRevealAboveFold}>
          <label className="bs-humans-search-wrap">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="m16 16 4.4 4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span className="bs-humans-sr-only">{HUMANS_PAGE.searchLabel}</span>
            <input
              type="search"
              id="bsHumansSearch"
              placeholder={HUMANS_PAGE.searchPlaceholder}
              autoComplete="off"
              aria-controls="bsHumansGrid"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
      </header>

      <div className="bs-humans-grid" id="bsHumansGrid" role="group" aria-label={HUMANS_PAGE.gridLabel}>
        {TEAM.map((member, index) => (
          <article
            key={member.name}
            className={lastAlone && index === lastVisible ? "bs-humans-member bs-last-alone" : "bs-humans-member"}
            hidden={!matches[index]}
            {...aboutRevealAboveFold}
          >
            <div className="bs-humans-avatar">
              <Image
                src={member.photo.src}
                width={member.photo.width}
                height={member.photo.height}
                sizes="(max-width: 600px) 125px, 156px"
                alt={member.photo.alt}
              />
            </div>
            <h2>{member.name}</h2>
            <p>{member.hometown}</p>
          </article>
        ))}
      </div>

      {/* Persistent live region: the message is announced when it appears */}
      <div role="status">
        <p className="bs-humans-empty" hidden={visibleCount !== 0}>
          {HUMANS_PAGE.emptyMessage}
        </p>
      </div>
    </>
  );
}
