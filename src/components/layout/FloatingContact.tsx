import { SITE } from "@/data/navigation";

/**
 * Global floating "CALL US" pill (mockup L16918). Pure CSS: slides in on load,
 * reveals the number on hover/focus. Server Component.
 */
export function FloatingContact() {
  return (
    <aside className="bs-floating" aria-label="Quick contact">
      <a
        className="bs-floating-call"
        href={SITE.phone.href}
        aria-label={`Call BuildSense IT at ${SITE.phone.href.replace("tel:", "")}`}
      >
        <span className="bs-floating-status">CALL US</span>
        <span className="bs-floating-circle" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <path d="M17.2 10.5l5.2 8.4-3.5 3.5c2.2 4.3 5.7 7.8 10 10l3.5-3.5 8.4 5.2-2.1 5.4c-.8 1.9-2.8 3-4.8 2.6-13.7-2.7-24.4-13.4-27.1-27.1-.4-2 .7-4 2.6-4.8z" />
          </svg>
        </span>
        <span className="bs-floating-phone">{SITE.phone.callLabel}</span>
      </a>
    </aside>
  );
}
