import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, SITE, SOCIAL_LINKS } from "@/data/navigation";
import { FooterWordmark } from "./FooterWordmark";

/**
 * Site footer (mockup `#buildsenseFooter`, L16060). Server Component: the only
 * client piece is the wordmark fit. `data-motion-gate` lets MotionGate pause the
 * "online" pulse while the footer is off-screen or the tab is hidden.
 */
export function Footer() {
  return (
    <footer className="bs-footer" aria-label="BuildSense IT footer" data-motion-gate="">
      <div className="bs-footer-inner">
        <div className="bs-footer-main">
          <div className="bs-footer-company">
            <h2 className="bs-footer-name">{SITE.name}</h2>
            <p className="bs-footer-tagline">{SITE.tagline}</p>

            <div className="bs-footer-social" role="group" aria-label="BuildSense IT social media">
              {SOCIAL_LINKS.map(({ platform, label, icon, size, url }) => {
                // 3-6 KB pre-sized PNGs: serving them as-is saves four image-optimizer runs.
                const image = <Image src={icon} alt="" width={size[0]} height={size[1]} sizes="19px" unoptimized />;
                return url ? (
                  <a
                    key={platform}
                    className="bs-footer-social-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — opens in a new tab`}
                  >
                    {image}
                  </a>
                ) : (
                  // No profile URL yet: shown (as in the mockup) but not a link.
                  <span key={platform} className="bs-footer-social-link" aria-hidden="true">
                    {image}
                  </span>
                );
              })}
            </div>

            <div className="bs-footer-status">
              <span className="bs-footer-status-dot" aria-hidden="true" />
              <span>We&apos;re online worldwide</span>
            </div>
          </div>

          <nav className="bs-footer-nav" aria-label="Footer navigation">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="bs-footer-column">
                <h3>{column.heading}</h3>
                {column.links.map((link) =>
                  link.href ? (
                    <Link key={link.label} href={link.href} className="bs-footer-link">
                      {link.label}
                    </Link>
                  ) : (
                    <span key={link.label} className="bs-footer-link" data-pending="" title={link.pendingNote}>
                      {link.label}
                    </span>
                  ),
                )}
              </div>
            ))}

            <div className="bs-footer-column">
              <h3>Contact Us</h3>
              <a href={SITE.phone.href} className="bs-footer-contact-link">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 2.7c-.5-.5-1.3-.6-1.8-.1L2.7 4.5c-.7.7-.9 1.7-.7 2.7C3.4 14.2 9.8 20.5 16.9 22c1 .2 2-.1 2.7-.8l1.9-2c.5-.5.4-1.3-.1-1.8l-3.2-2.6c-.5-.4-1.2-.4-1.7 0l-1.8 1.5c-3.1-1.4-5.6-3.9-7-7L9.2 7c.4-.5.4-1.2 0-1.7L6.6 2.7z" />
                </svg>
                <span>{SITE.phone.display}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="bs-footer-contact-link">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                  <path d="M3 5h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm.7 2L12 13l8.3-6H3.7zm17.3 10V9l-8.4 6.1c-.36.25-.85.25-1.2 0L3 9v8h18z" />
                </svg>
                <span>{SITE.email}</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="bs-footer-divider" aria-hidden="true" />
        <FooterWordmark />
      </div>
    </footer>
  );
}
