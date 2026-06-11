"use client";

import { useRef, type ReactNode } from "react";

/**
 * TiltCard — wraps children with a CSS 3D tilt that follows pointer.
 * Lightweight, no R3F. Use as drop-in container in card grids.
 */
export function TiltCard({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative will-change-transform transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}
      style={{
        background:
          "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--accent) 14%, transparent), transparent 40%)",
      }}
    >
      {children}
    </div>
  );
}
