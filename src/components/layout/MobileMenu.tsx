"use client";

import type { Ref } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMO_CTA, MOBILE_LINKS } from "@/data/navigation";

type Props = {
  open: boolean;
  ref: Ref<HTMLDivElement>;
  onNavigate: () => void;
};

/**
 * Full-screen mobile/tablet navigation (<= 980px), mockup `#mobilePanel`.
 * Focus trap, Escape, scroll lock and the resize auto-close live in Navbar's
 * effect, which only runs while the panel is open.
 */
export function MobileMenu({ open, ref, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div id="mobile-menu" ref={ref} className="bs-mobile-panel" hidden={!open}>
      <div className="bs-mobile-content">
        <Link href={DEMO_CTA.href} className="cta-ref bs-mobile-cta" data-autofocus="" onClick={onNavigate}>
          {DEMO_CTA.label}
        </Link>
        <nav className="bs-mobile-links" aria-label="Mobile pages">
          {MOBILE_LINKS.map((link) => (
            // "Solutions" shares /pos with "BuildSense POS"; only the latter is the current page.
            <Link
              key={link.label}
              href={link.href}
              onClick={onNavigate}
              aria-current={pathname === link.href && link.label !== "Solutions" ? "page" : undefined}
            >
              <span>{link.label}</span>
              <span className="bs-mobile-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
