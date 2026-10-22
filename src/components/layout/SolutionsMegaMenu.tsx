"use client";

import type { FocusEvent, MouseEvent, Ref } from "react";
import Link from "next/link";
import { SOLUTIONS_MEGA } from "@/data/navigation";

type Props = {
  open: boolean;
  ref: Ref<HTMLDivElement>;
  onMouseLeave: (event: MouseEvent<HTMLDivElement>) => void;
  onBlur: (event: FocusEvent<HTMLDivElement>) => void;
  onNavigate: () => void;
};

/**
 * Desktop "Solutions" mega menu (mockup `#mega`, built from `megaData.solutions`).
 * Rendered from data on the server and shown/hidden with `data-open`; when
 * closed it is `visibility: hidden`, so it is neither focusable nor announced.
 * Hidden entirely at <= 980px (the mobile panel replaces it).
 */
export function SolutionsMegaMenu({ open, ref, onMouseLeave, onBlur, onNavigate }: Props) {
  return (
    <div
      id="solutions-menu"
      ref={ref}
      className="bs-mega"
      data-open={open ? "" : undefined}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
    >
      <div className="bs-mega-grid">
        {SOLUTIONS_MEGA.map((column) => (
          <div key={column.heading}>
            <p className="bs-mega-heading">{column.heading}</p>
            {column.items.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="bs-mega-link"
                  data-available=""
                  onClick={onNavigate}
                >
                  <span>{item.label}</span>
                  <small>Available Now</small>
                </Link>
              ) : (
                <span key={item.label} className="bs-mega-link" data-soon="">
                  <span>{item.label}</span>
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
