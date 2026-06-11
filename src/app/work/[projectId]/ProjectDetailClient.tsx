"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Github, Lightbulb, CheckCircle2, BarChart3 } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/portfolio";

const ease = [0.32, 0.72, 0, 1] as const;

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="relative min-h-screen bg-background">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[min(700px,80vw)] aspect-square rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-5"
          >
            {project.index} · {project.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.9] text-balance mb-8"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="max-w-[56ch] text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-10"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {project.stack.map((s: string) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full border border-border bg-surface/50 text-[11px] font-mono text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.65 }}
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-medium group/link"
            >
              <span className="relative">
                Explore Repository
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </span>
              <span className="grid place-items-center size-10 rounded-full border border-border bg-surface/40 transition-all duration-500 group-hover/link:bg-accent group-hover/link:text-accent-foreground group-hover/link:border-accent">
                <Github className="size-4" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 30%, oklch(0.62 0.16 45 / 0.45), transparent 60%), radial-gradient(70% 70% at 80% 80%, oklch(0.7 0.14 50 / 0.35), transparent 65%), linear-gradient(135deg, oklch(0.22 0.01 60) 0%, oklch(0.15 0.005 60) 100%)",
              }}
            />
            <svg
              viewBox="0 0 600 450"
              className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen"
              aria-hidden
            >
              <defs>
                <pattern
                  id={`gd-${project.id}`}
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M30 0H0V30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                width="600"
                height="450"
                fill={`url(#gd-${project.id})`}
                className="text-foreground"
              />
              <circle cx="180" cy="160" r="90" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
              <circle cx="420" cy="290" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
              <path d="M180 160 Q300 100 420 290" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent" />
            </svg>

            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  Case · {project.index}
                </p>
                <p className="font-display text-3xl md:text-5xl text-foreground">
                  {project.name}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 md:top-8 md:right-8 size-10 rounded-full glass grid place-items-center">
              <ArrowUpRight className="size-4" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution / Results */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-bronze rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="size-5 text-accent" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">Problem</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-bronze rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="size-5 text-emerald" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald">Solution</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-bronze rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="size-5 text-gold" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold">Results</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.results}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 px-6 py-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Vijayaraghavan — AI Engineer & Full Stack Developer
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
