"use client";

import { type FocusEvent, type MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMO_CTA, HERO_ROUTES, NAV_LINKS } from "@/data/navigation";
import { useRafScroll } from "@/hooks/useRafScroll";
import { containsTarget } from "@/lib/containsTarget";
import { MobileMenu } from "./MobileMenu";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";

const HIDE_AFTER_SCROLL_Y = 120;
const DESKTOP_QUERY = "(min-width: 981px)";

/**
 * Site navbar. Port of the mockup's header behaviour:
 *  - hides when scrolling down past 120px, returns on scroll up (L16262)
 *  - transparent while its route's hero (`[data-header-hero]`) sits under it (L17636)
 *  - Solutions mega menu: hover/click to open; closes on leaving, Escape
 *    (focus returns to the trigger) and outside pointerdown (L16243-16290).
 *    Keyboard additions: opening with Enter/Space moves focus to the first
 *    link (the panel follows the navbar in the DOM), and Tab moving focus out
 *    of the navbar + panel closes it
 *  - mobile panel: focus trap, Escape, body scroll lock, closes above 980px (L16194)
 *
 * Both scroll handlers are passive and rAF-batched. Document-level listeners
 * (Escape / pointerdown / Tab trap) exist only while their menu is open and
 * are removed in the effect cleanup.
 */
export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  // Matches the mockup's initial markup (`hero-header-transparent` on load) so
  // the server HTML and first paint need no correction on hero routes.
  const [onHero, setOnHero] = useState(() => HERO_ROUTES.includes(pathname));
  const [hidden, setHidden] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Any route change closes both menus (the mockup's showPage -> closeMega).
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setSolutionsOpen(false);
    setMenuOpen(false);
  }

  // ---- scroll behaviour -------------------------------------------------
  useRafScroll(() => {
    const y = window.scrollY;
    setHidden(y > lastY.current && y > HIDE_AFTER_SCROLL_Y);
    lastY.current = y;
  });

  const updateHero = () => {
    const hero = document.querySelector<HTMLElement>("[data-header-hero]");
    const nav = navRef.current;
    let overHero = false;
    if (hero && nav) {
      const bounds = hero.getBoundingClientRect();
      // The stable header height, not its transform, so the scroll-hide
      // animation does not change the cutoff.
      overHero = bounds.top < window.innerHeight && bounds.bottom > nav.offsetHeight;
    }
    setOnHero(overHero);
  };
  useRafScroll(updateHero, { resize: true });

  // Re-evaluate after each route change and once the page has fully loaded.
  useEffect(() => {
    let frame = requestAnimationFrame(updateHero);
    const onLoad = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateHero);
    };
    window.addEventListener("load", onLoad);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
    // updateHero only reads refs/DOM and calls a stable state setter, so the
    // effect intentionally re-runs on route change only.
  }, [pathname]);

  // ---- Solutions mega menu ----------------------------------------------
  const closeSolutions = () => setSolutionsOpen(false);

  const onNavLeave = (event: MouseEvent<HTMLElement>) => {
    if (!containsTarget(megaRef.current, event.relatedTarget)) closeSolutions();
  };
  const onMegaLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (!containsTarget(navRef.current, event.relatedTarget)) closeSolutions();
  };
  // Keyboard only: a null relatedTarget (click on blank space, window blur) is
  // ignored so mouse users keep the menu they opened by hover/click.
  const onFocusLeave = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next && !containsTarget(navRef.current, next) && !containsTarget(megaRef.current, next)) closeSolutions();
  };
  const onSolutionsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSolutionsOpen(true);
    // detail === 0: activated from the keyboard (Enter/Space), not a pointer.
    if (event.detail === 0) {
      requestAnimationFrame(() => megaRef.current?.querySelector<HTMLElement>("a[href]")?.focus());
    }
  };

  useEffect(() => {
    if (!solutionsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSolutionsOpen(false);
      solutionsBtnRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!navRef.current?.contains(target) && !megaRef.current?.contains(target)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [solutionsOpen]);

  // ---- Mobile menu ------------------------------------------------------
  const toggleMenu = () => {
    setHidden(false);
    setSolutionsOpen(false);
    setMenuOpen((open) => !open);
  };
  const closeMenu = () => {
    setHidden(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const desktop = window.matchMedia(DESKTOP_QUERY);

    document.body.dataset.mobileMenu = "open";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      // Trap focus between the menu button and the panel's controls.
      const controls = [
        menuBtnRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((control): control is HTMLElement => control !== null);
      const index = controls.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && (index === 0 || index === -1)) {
        event.preventDefault();
        controls[controls.length - 1]?.focus();
      } else if (!event.shiftKey && index === controls.length - 1) {
        event.preventDefault();
        controls[0]?.focus();
      }
    };
    // Auto-close when the viewport grows past the mobile breakpoint.
    const onViewportChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      delete document.body.dataset.mobileMenu;
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="bs-nav"
        aria-label="Main"
        data-hero={onHero ? "" : undefined}
        data-hidden={hidden ? "" : undefined}
        data-solutions-open={solutionsOpen ? "" : undefined}
        onMouseLeave={onNavLeave}
        onBlur={onFocusLeave}
      >
        <div className="bs-nav-inner">
          <Link href="/" className="bs-brand" onClick={menuOpen ? closeMenu : undefined}>
            <span className="bs-brand-logo">
              <Image src="/media/brand/logo-v1.png" alt="BuildSense IT" width={1570} height={621} sizes="219px" loading="eager" />
            </span>
          </Link>

          <div className="bs-nav-links">
            <button
              ref={solutionsBtnRef}
              type="button"
              className="bs-nav-link"
              aria-expanded={solutionsOpen}
              aria-controls="solutions-menu"
              onMouseEnter={() => setSolutionsOpen(true)}
              onClick={onSolutionsClick}
            >
              Solutions
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bs-nav-link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="bs-nav-actions">
            <Link href={DEMO_CTA.href} className="cta-ref">
              {DEMO_CTA.label}
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="bs-menu-btn"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              <span className="bs-hamburger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu ref={panelRef} open={menuOpen} onNavigate={closeMenu} />
      <SolutionsMegaMenu
        ref={megaRef}
        open={solutionsOpen}
        onMouseLeave={onMegaLeave}
        onBlur={onFocusLeave}
        onNavigate={closeSolutions}
      />
    </>
  );
}
