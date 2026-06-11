"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/portfolio";
import { Command } from "lucide-react";

export function Dock({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState<string>("#projects");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
      aria-label="Main navigation"
    >
      <div className={`glass-bronze flex items-center gap-1 px-2 py-1.5 rounded-full shadow-2xl transition-all duration-500 ${
        scrolled ? "neural-glow" : ""
      }`}>
        <a href="#home" className="flex items-center gap-2 pl-1 pr-2 group" aria-label="Home">
          <span className="grid place-items-center size-7 rounded-full bg-gradient-to-br from-accent to-gold text-[9px] font-bold text-background transition-transform duration-300 group-hover:scale-110">
            V
          </span>
        </a>

        <div className="hidden md:flex items-center">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${isActive ? "text-foreground" : ""}`}>
                  {l.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="w-px h-5 bg-border mx-1" />
        
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-1.5 pl-2 pr-2 py-1 rounded-full text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          aria-label="Open command palette (Ctrl+K)"
        >
          <Command className="size-3" />
          <span className="hidden sm:inline">K</span>
        </button>
      </div>
    </motion.nav>
  );
}
