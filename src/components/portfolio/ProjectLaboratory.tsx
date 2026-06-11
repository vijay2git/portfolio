"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, ChevronDown, CheckCircle2, Lightbulb, BarChart3 } from "lucide-react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/data/portfolio";
import { TiltCard } from "./TiltCard";
import { CinematicBackground } from "./CinematicBackground";
import { useState } from "react";

const ease = [0.32, 0.72, 0, 1] as const;

export function ProjectLaboratory() {
  return (
    <section id="projects" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <CinematicBackground variant="universe" />
      <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-background/10 via-background/30 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-24">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Project Laboratory
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-[-0.03em] text-balance">
              Selected <span className="italic text-accent">work.</span>
            </h2>
          </div>
          <p className="hidden md:block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            01 — 06
          </p>
        </div>

        <div className="space-y-36 md:space-y-56">
          {PROJECTS.map((p, i) => (
            <ProjectShowcase key={p.id} project={p} flipped={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, flipped, index }: { project: Project; flipped: boolean; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease }}
      className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start group"
    >
      <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
        <TiltCard className="rounded-2xl">
          <ProjectVisual project={project} />
        </TiltCard>
      </div>

      <div className={`lg:col-span-5 ${flipped ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-bronze text-[9px] font-mono tracking-[0.25em] uppercase text-gold mb-5">
          <Globe className="size-3" />
          {project.environment}
        </span>

        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-5">
          {project.index} · {project.tagline}
        </p>
        
        <h3 className="font-display text-5xl md:text-6xl tracking-[-0.03em] mb-6">
          {project.name}
        </h3>
        
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[48ch] mb-8 text-pretty">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full border border-border bg-surface/50 text-[11px] font-mono text-muted-foreground">{s}</span>
          ))}
        </div>

        {/* Problem / Solution / Results Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative">
              View Case Study
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <ChevronDown className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <div className="mt-6 space-y-4">
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="size-4 text-accent" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">Problem</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-4 text-emerald" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald">Solution</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                  </div>
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="size-4 text-gold" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold">Results</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.results}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-medium group/link">
            <span className="relative">
              Explore Repository
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
            </span>
            <span className="grid place-items-center size-10 rounded-full border border-border bg-surface/40 transition-all duration-500 group-hover/link:bg-accent group-hover/link:text-accent-foreground group-hover/link:border-accent">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <Link href={`/work/${project.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <span className="relative">
              Full Case Study
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="block relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface group/visual"
    >
      <div aria-hidden className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover/visual:opacity-100"
        style={{ background: "radial-gradient(60% 60% at 30% 30%, oklch(0.65 0.18 45 / 0.35), transparent 60%), radial-gradient(70% 70% at 80% 80%, oklch(0.55 0.14 165 / 0.35), transparent 65%), linear-gradient(135deg, oklch(0.145 0.01 280) 0%, oklch(0.12 0.008 280) 100%)" }}
      />
      <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full opacity-25 mix-blend-screen" aria-hidden>
        <defs>
          <pattern id={`g-${project.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <radialGradient id={`glow-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 45)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 45)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="450" fill={`url(#g-${project.id})`} className="text-foreground" />
        <circle cx="50%" cy="50%" r="120" fill={`url(#glow-${project.id})`} />
        <circle cx="180" cy="160" r="90" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <circle cx="420" cy="290" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald" />
        <circle cx="300" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold" />
        <path d="M180 160 Q240 120 300 100" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent opacity-60" />
        <path d="M300 100 Q360 200 420 290" stroke="currentColor" strokeWidth="1" fill="none" className="text-emerald opacity-60" />
        <path d="M180 160 Q300 250 420 290" stroke="currentColor" strokeWidth="1" fill="none" className="text-gold opacity-60" />
        <circle cx="160" cy="220" r="4" fill="oklch(0.65 0.18 45)" />
        <circle cx="200" cy="280" r="3" fill="oklch(0.72 0.14 75)" />
        <circle cx="350" cy="180" r="3" fill="oklch(0.55 0.14 165)" />
        <circle cx="450" cy="200" r="4" fill="oklch(0.65 0.18 45)" />
      </svg>
      <div className="absolute inset-0 flex items-end p-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{project.environment}</p>
          <p className="font-display text-3xl md:text-4xl text-foreground">{project.name}</p>
        </div>
      </div>
      <div className="absolute top-5 right-5 size-10 rounded-full glass-bronze grid place-items-center transition-transform duration-500 group-hover/visual:rotate-45">
        <ArrowUpRight className="size-4" />
      </div>
    </motion.a>
  );
}
