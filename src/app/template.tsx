// Re-mounted on every navigation (unlike layout.tsx), which replays the
// mockup's `.page.active { animation: fade .35s ease }` page transition.
// Opacity + a 6px rise only; the wrapper has no overflow, so position:sticky
// inside pages is unaffected (AUDIT R5).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
