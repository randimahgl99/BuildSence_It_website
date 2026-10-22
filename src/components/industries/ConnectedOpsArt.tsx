import type { ConnectedOpsArt } from "@/data/industries";

/**
 * The six hand-drawn 120x94 card illustrations of "Connected operations"
 * (mockup L15412-15500). Shapes are copied verbatim; the `bs-co-*` classes carry
 * the colours and the one-shot / looping keyframes (styles/industries-connected.css).
 * `viewBox` is camelCase here (the mockup's string-injected icons used lowercase).
 */
export function ConnectedOpsArtSvg({ name }: { name: ConnectedOpsArt }) {
  switch (name) {
    case "checkout":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="18" y="17" width="84" height="61" rx="18" className="bs-co-soft" />
          <path d="M34 38h8l5 25h31l7-17H48" className="bs-co-stroke" />
          <circle cx="54" cy="69" r="4" className="bs-co-fill" />
          <circle cx="77" cy="69" r="4" className="bs-co-fill" />
          <path d="m74 35 7 7 13-14" className="bs-co-check" />
        </svg>
      );
    case "sales":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="17" y="13" width="86" height="67" rx="18" className="bs-co-sales-panel" />
          <path d="M33 65V51M50 65V42M67 65V32M84 65V23" className="bs-co-sales-bars" />
          <path d="M31 31h18M31 37h12" className="bs-co-sales-lines" />
        </svg>
      );
    case "inventory":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="17" y="14" width="86" height="66" rx="18" className="bs-co-soft" />
          <path d="m40 50 20-10 20 10-20 10-20-10Z" className="bs-co-box bs-co-box-1" />
          <path d="m40 50 20 10v17L40 67V50Z" className="bs-co-box bs-co-box-2" />
          <path d="m80 50-20 10v17l20-10V50Z" className="bs-co-box bs-co-box-3" />
          <path d="m49 35 11-6 11 6-11 6-11-6Z" className="bs-co-box bs-co-box-4" />
        </svg>
      );
    case "customer":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="18" y="14" width="84" height="66" rx="18" className="bs-co-soft" />
          <circle cx="49" cy="40" r="11" className="bs-co-profile" />
          <path d="M31 67c3-12 10-18 18-18s15 6 18 18" className="bs-co-stroke" />
          <path d="M74 34h13M74 44h17M74 54h11" className="bs-co-profile-lines" />
          <circle cx="91" cy="28" r="5" className="bs-co-profile-pulse" />
        </svg>
      );
    case "reporting":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="17" y="14" width="86" height="66" rx="18" className="bs-co-soft" />
          <path d="M32 65V48M46 65V39M60 65V53" className="bs-co-report-bars" />
          <circle cx="81" cy="43" r="15" className="bs-co-pie-ring" />
          <path d="M81 28v15h15" className="bs-co-pie-fill" />
        </svg>
      );
    case "visibility":
      return (
        <svg viewBox="0 0 120 94" fill="none">
          <rect x="17" y="14" width="86" height="66" rx="18" className="bs-co-soft" />
          <path d="M31 64 46 52l13 6 14-22 16 8" className="bs-co-visibility-line" />
          <path d="M31 69h60" className="bs-co-grid" />
          <circle cx="46" cy="52" r="3.5" className="bs-co-fill" />
          <circle cx="73" cy="36" r="3.5" className="bs-co-fill" />
          <circle cx="89" cy="44" r="3.5" className="bs-co-fill" />
        </svg>
      );
  }
}
