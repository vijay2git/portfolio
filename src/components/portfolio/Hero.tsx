"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { GITHUB_PROFILE, BIO, METRICS } from "@/data/portfolio";

const HeroSculpture = lazy(() =>
  import("./HeroSculpture").then((m) => ({ default: m.HeroSculpture })),
);

const ease = [0.32, 0.72, 0, 1] as const;

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const vx = (e.clientX / window.innerWidth) * 100;
      const vy = (e.clientY / window.innerHeight) * 100;
      el.style.background = `radial-gradient(ellipse 80% 60% at ${vx}% ${vy}%, oklch(0.65 0.18 45 / 0.07), transparent 70%), radial-gradient(ellipse at 50% 100%, oklch(0.12 0.008 280) 0%, transparent 60%)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center"
    >
      {/* === BACKGROUND LAYERS === */}
      
      {/* Cinematic 3D backdrop */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {mounted && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 opacity-60">
              <HeroSculpture />
            </div>
          </Suspense>
        )}
      </div>

      {/* Radial gradient overlay — follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.65 0.18 45 / 0.07), transparent 70%), radial-gradient(ellipse at 50% 100%, oklch(0.12 0.008 280) 0%, transparent 60%)",
        }}
      />

      {/* Deep background gradient */}
      <div className="absolute inset-0 -z-[15] pointer-events-none bg-gradient-to-b from-background/30 via-background/50 to-background" />

      {/* Subtle grid */}
      <div className="absolute inset-0 -z-[12] neural-grid opacity-[0.07] pointer-events-none" />

      {/* Ambient glow orb — top center */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[min(900px,90vw)] aspect-square rounded-full bg-accent/[0.04] blur-[150px] -z-[11] pointer-events-none" />

      {/* Secondary glow — bottom right */}
      <div className="absolute bottom-[10%] right-[15%] w-[min(500px,50vw)] aspect-square rounded-full bg-emerald/[0.03] blur-[120px] -z-[11] pointer-events-none" />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-bronze">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-gold/90">
              Available for new projects
            </span>
            <Sparkles className="size-3.5 text-accent/60" />
          </div>
        </motion.div>

        {/* Name — massive display */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.35 }}
          className="mb-8"
        >
          <h1 className="font-display text-[clamp(2.6rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            <span className="chrome-text">VIJAYARAGHAVAN</span>
            <span className="text-accent ml-3 md:ml-5 text-[clamp(2rem,6vw,6rem)]">S</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className="mb-10 font-mono text-[11px] md:text-[13px] tracking-[0.35em] uppercase text-muted-foreground/60"
        >
          AI Engineer & Full Stack Developer
        </motion.p>

        {/* Headline */}
        <h1 className="font-display leading-[0.92] tracking-[-0.045em] text-balance">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="block text-[clamp(2.2rem,6.5vw,6.5rem)] chrome-text"
          >
            Building
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.85 }}
            className="block text-[clamp(2.2rem,6.5vw,6.5rem)] chrome-text"
          >
            Intelligent
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.0 }}
            className="block text-[clamp(2.2rem,6.5vw,6.5rem)] bronze-text"
          >
            Software Systems
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.25 }}
          className="mt-10 max-w-[46ch] text-lg md:text-xl text-muted-foreground/80 text-pretty leading-relaxed font-light"
        >
          {BIO}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            Explore Projects <ArrowUpRight className="size-4" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Book a Consultation
          </MagneticButton>
          <MagneticButton href={GITHUB_PROFILE} external variant="ghost">
            <Github className="size-4" /> GitHub
          </MagneticButton>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-14"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + i * 0.08 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="font-display text-2xl md:text-3xl tracking-[-0.03em] chrome-text leading-none">
                {m.value}<span className="text-accent text-lg md:text-xl">{m.suffix}</span>
              </span>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent/50" />
        </motion.div>
      </motion.div>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.015] -z-[5]">
        <div className="absolute inset-x-0 h-px bg-accent animate-scan" />
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  external,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  variant: "primary" | "secondary" | "ghost";
}) {
  const base =
    "group inline-flex items-center gap-2.5 h-12 px-7 rounded-full text-[15px] font-medium transition-all duration-300 will-change-transform tracking-[-0.01em]";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-accent hover:text-accent-foreground shadow-[0_0_20px_-4px_oklch(0.945_0.015_85/0.15)] hover:shadow-[0_0_30px_-4px_oklch(0.65_0.18_45/0.3)]",
    secondary: "glass-bronze hover:bg-foreground/[0.06]",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]",
  };

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </motion.a>
  );
}
