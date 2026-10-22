"use client";

import { Toaster } from "sonner";

/**
 * Site toast host (Sonner). Mount once on any page that calls `toast(...)`; it is
 * mounted on /contact only for now, so other routes do not ship the library. A toast
 * made on a page without this component is simply not shown.
 *
 * Look and feel live in styles/toaster.css (`.bs-toast*`); this file only sets
 * behaviour: bottom-right on desktop, full width on phones (<= 600px, Sonner's own
 * breakpoint), one toast at a time, a close button, and the fixed "CALL US" pill
 * (styles/floating-contact.css: right 18 / bottom 44, 88px tall; 10 / 38 / 76px at
 * <= 620px) kept clear by lifting the stack above it. Sonner renders an
 * `aria-live="polite"` region and cleans up its own listeners and timers on unmount.
 */
export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      offset={{ right: 18, bottom: 144 }}
      mobileOffset={{ left: 12, right: 12, bottom: 126 }}
      visibleToasts={1}
      closeButton
      containerAriaLabel="Notifications"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "bs-toast",
          icon: "bs-toast-icon",
          content: "bs-toast-content",
          title: "bs-toast-title",
          description: "bs-toast-description",
          closeButton: "bs-toast-close",
        },
      }}
      icons={{
        success: (
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M4.5 10.5l3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        error: (
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M10 5.5v5.5M10 14.4v.1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      }}
    />
  );
}
