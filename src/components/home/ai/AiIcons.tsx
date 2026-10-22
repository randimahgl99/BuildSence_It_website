// Inline SVGs of the Home AI section as JSX (mockup L13897-14070). No icon
// library. Stroke colour/width/caps come from CSS (styles/home-ai.css), so the
// markup carries geometry only. Server Components.

/** Circumference of the step rings (r = 25), as the mockup computes it in JS. */
export const RING_CIRCUMFERENCE = String(2 * Math.PI * 25);

/**
 * The sparkle in its resting frame: the SVG's own attributes are the
 * "final frame"; the mockup's rotate/arc/core keyframes (Part B) start from here.
 * All three gradients keep their mockup ids.
 */
export function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="bs-ai-morph"
      role="img"
      aria-label="Animated sparkle with concentric gradient rings"
    >
      <defs>
        <linearGradient id="homeAiArcGradient" x1="3" y1="6" x2="44" y2="43" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FB0FF" />
          <stop offset=".24" stopColor="#367FFF" />
          <stop offset=".49" stopColor="#0090FF" />
          <stop offset=".74" stopColor="#0B3CA8" />
          <stop offset="1" stopColor="#6676E5" />
        </linearGradient>
        <linearGradient id="homeAiArcGradientReverse" x1="45" y1="5" x2="6" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FB0FF" />
          <stop offset=".33" stopColor="#367FFF" />
          <stop offset=".67" stopColor="#8A6FDF" />
          <stop offset="1" stopColor="#4E84EF" />
        </linearGradient>
        <linearGradient id="homeAiStarGradient" x1="15" y1="12" x2="33" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FB0FF" />
          <stop offset=".48" stopColor="#367FFF" />
          <stop offset="1" stopColor="#7773DB" />
        </linearGradient>
      </defs>
      <g className="bs-ai-morph-outer">
        <circle
          className="bs-ai-morph-arc"
          cx="24"
          cy="24"
          r="19"
          stroke="url(#homeAiArcGradient)"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeDasharray="32 87"
          transform="rotate(-75 24 24)"
        />
        <circle
          className="bs-ai-morph-arc"
          cx="24"
          cy="24"
          r="19"
          stroke="url(#homeAiArcGradientReverse)"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeDasharray="24 95"
          transform="rotate(102 24 24)"
        />
      </g>
      <g className="bs-ai-morph-inner">
        <circle
          className="bs-ai-morph-arc"
          cx="24"
          cy="24"
          r="14.5"
          stroke="url(#homeAiArcGradientReverse)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="21 70"
          transform="rotate(17 24 24)"
        />
        <circle
          className="bs-ai-morph-arc"
          cx="24"
          cy="24"
          r="14.5"
          stroke="url(#homeAiArcGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="16 75"
          transform="rotate(190 24 24)"
        />
      </g>
      <path
        className="bs-ai-morph-core"
        d="M24 14.1c1.55 5.4 3.5 7.35 8.9 8.9-5.4 1.55-7.35 3.5-8.9 8.9-1.55-5.4-3.5-7.35-8.9-8.9 5.4-1.55 7.35-3.5 8.9-8.9Z"
        fill="url(#homeAiStarGradient)"
      />
      <path
        className="bs-ai-morph-core bs-ai-morph-mini-star"
        d="M34 13c.55 1.7 1.3 2.45 3 3-1.7.55-2.45 1.3-3 3-.55-1.7-1.3-2.45-3-3 1.7-.55 2.45-1.3 3-3Z"
        fill="#0090FF"
      />
    </svg>
  );
}

export type TabIconName = "sales" | "inventory" | "customers";
export type InsightIconName = "forecast" | "sales" | "inventory";

const BOX = (
  <>
    <path d="m4 7 8-4 8 4-8 4-8-4Z" />
    <path d="M4 7v10l8 4 8-4V7M12 11v10" />
  </>
);

/** 24-box icon for a tab or an insight; `name` picks the geometry. */
export function PanelIcon({ name }: { name: TabIconName | InsightIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {name === "sales" && (
        <>
          <path d="M4 19V10M10 19V5M16 19v-7M21 19H2" />
          <path d="m4 8 6-5 6 4 5-4" />
        </>
      )}
      {name === "inventory" && BOX}
      {name === "customers" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-4 2.5-7 6-7s6 3 6 7" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 14c3.7 0 6 2.5 6 6" />
        </>
      )}
      {name === "forecast" && (
        <>
          <path d="M4 18v-5M9 18V9M14 18v-7M19 18V5" />
          <path d="m4 10 5-4 5 2 5-5" />
        </>
      )}
    </svg>
  );
}

/** Insight "sales" uses a plainer bar chart than the Sales tab. */
export function InsightIcon({ name }: { name: InsightIconName }) {
  if (name === "sales") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V9M10 19V5M16 19v-8M21 19H2" />
      </svg>
    );
  }
  return <PanelIcon name={name} />;
}

export function AttachIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m8 12 5-5a3 3 0 0 1 4 4l-7 7a5 5 0 0 1-7-7l7-7" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4 4 16 8-16 8 3-8-3-8Z" />
      <path d="M7 12h13" />
    </svg>
  );
}

/** Small tick used by the analysis lines and the confirmation badge (20-box). */
export function TickIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="m4 10.5 3.4 3.4L16 5.8" />
    </svg>
  );
}

/** Progress ring of a step; dash length is the circumference, offset 0 = complete. */
export function StepRing() {
  return (
    <svg className="bs-ai-step-ring" viewBox="0 0 58 58" fill="none">
      <circle className="bs-ai-ring-track" cx="29" cy="29" r="25" />
      <circle
        className="bs-ai-ring-progress"
        data-ai="ring"
        cx="29"
        cy="29"
        r="25"
        style={{ strokeDasharray: RING_CIRCUMFERENCE, strokeDashoffset: 0 }}
      />
    </svg>
  );
}

export function StepCheck() {
  return (
    <svg className="bs-ai-step-check" viewBox="0 0 24 24" fill="none">
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </svg>
  );
}
