/**
 * GlobalBackdrop — pure CSS ambient backdrop.
 * 3D cinematic environments are now handled per-section via CinematicBackground.
 * This provides the base gradient + grain that fills viewport gaps between sections.
 */
export function GlobalBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-30 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.65 0.18 45 / 0.06), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.55 0.14 165 / 0.04), transparent 50%), var(--background)",
      }}
    />
  );
}
