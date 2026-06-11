"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Star, GitFork, Globe } from "lucide-react";
import { GITHUB_PROFILE, PROJECTS, LANGUAGES } from "@/data/portfolio";

const ease = [0.32, 0.72, 0, 1] as const;

export function SystemActivity() {
  return (
    <section id="github" className="relative py-32 md:py-40 px-6 border-t border-border/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Open Source
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-[-0.03em] text-balance">
              GitHub <span className="italic text-accent">ecosystem.</span>
            </h2>
          </div>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            <Github className="size-4" /> @vijay2git <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 glass-bronze rounded-2xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-full bg-gradient-to-br from-accent to-gold grid place-items-center font-display text-2xl text-background">
                V
              </div>
              <div>
                <p className="font-display text-xl text-foreground">vijay2git</p>
                <p className="font-mono text-[11px] text-gold">github.com/vijay2git</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 text-pretty">
              A research archive of retrieval engines, predictive platforms, civic tools, and protocol experiments.
              Each repository represents a production system.
            </p>

            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Language Distribution
            </p>
            <div className="space-y-3 mb-6">
              {LANGUAGES.map((l) => (
                <div key={l.name}>
                  <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1">
                    <span>{l.name}</span>
                    <span>{l.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-foreground/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2, ease }}
                      className="h-full rounded-full"
                      style={{ background: l.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">Active Repos</span>
                <span className="font-display text-lg text-foreground">06</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">Primary Focus</span>
                <span className="font-mono text-[10px] text-accent">AI · Retrieval · Web</span>
              </div>
            </div>

            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-between w-full h-11 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Full Profile <ArrowUpRight className="size-4" />
            </a>
          </motion.div>

          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <Globe className="size-3 text-accent" />
              Repository Network
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PROJECTS.map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl border border-border bg-surface/50 p-6 flex flex-col transition-colors hover:border-accent/40 hover:bg-surface/80"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Github className="size-3.5 text-muted-foreground" />
                      <span className="font-mono text-[10px] text-muted-foreground">vijay2git /</span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[8px] font-mono uppercase tracking-[0.2em] text-accent mb-3 self-start">
                    {p.environment}
                  </span>
                  
                  <p className="font-display text-2xl text-foreground mb-2">{p.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-1">
                    {p.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-accent" /> {p.stack[0]}
                    </span>
                    <span className="inline-flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" /> {12 + i * 3}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="size-3" /> {2 + i}
                      </span>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
