"use client";

import { motion } from "framer-motion";
import { NeuralNetwork3D } from "./NeuralNetwork3D";
import { RESEARCH_TIMELINE, CAPABILITIES } from "@/data/portfolio";
import { 
  Brain, Cpu, Layers, Workflow, Network, Bot, Cloud,
  Sparkles, Clock, Code, Server, Zap
} from "lucide-react";
import { CinematicBackground } from "./CinematicBackground";

const ICON_MAP: Record<string, any> = {
  Brain, Cpu, Layers, Workflow, Network, Bot, Cloud
};

const ease = [0.32, 0.72, 0, 1] as const;

export function EngineeringCapabilities() {
  return (
    <section id="capabilities" className="relative py-32 md:py-48 px-6 border-t border-border/60 overflow-hidden">
      <CinematicBackground variant="research-lab" />
      <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-background/10 via-background/30 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / AI Command Center
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-[-0.03em] text-balance">
              Engineering <span className="italic text-accent">expertise.</span>
            </h2>
          </div>
          <p className="hidden md:block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Core Systems
          </p>
        </div>

        {/* Experience Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: Clock,
              label: "Experience",
              value: "3+",
              unit: "Years",
              detail: "Full stack & AI systems",
            },
            {
              icon: Code,
              label: "Active Focus",
              value: "RAG",
              unit: "& Agents",
              detail: "Retrieval & orchestration",
            },
            {
              icon: Server,
              label: "Stack",
              value: "Full",
              unit: "Stack",
              detail: "Frontend to infrastructure",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="glass-bronze rounded-2xl p-6 flex items-center gap-5"
            >
              <div className="size-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <item.icon className="size-6 text-accent" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {item.label}
                </p>
                <p className="font-display text-2xl tracking-[-0.02em] text-foreground">
                  {item.value} <span className="text-accent text-lg">{item.unit}</span>
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {CAPABILITIES.map((cap, i) => {
            const Icon = ICON_MAP[cap.icon] || Cpu;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="glass-bronze p-8 rounded-2xl group hover:border-accent/30 transition-all duration-500"
              >
                <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                  <Icon className="size-6 text-accent" />
                </div>
                <h3 className="text-xl font-display mb-3 text-foreground group-hover:text-accent transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-2xl p-8 border border-emerald/20 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald/20 blur-2xl rounded-full" />
              <div className="relative size-20 rounded-full border border-emerald/50 flex items-center justify-center">
                <Sparkles className="size-8 text-emerald" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-display text-2xl mb-2 text-foreground">Next-Gen Systems Architecture</h4>
              <p className="text-sm text-muted-foreground max-w-[50ch]">
                Currently specialized in developing high-performance RAG architectures and multi-agent coordination frameworks for enterprise-grade AI integration.
              </p>
            </div>
            <a href="#contact" className="px-6 py-3 rounded-full bg-emerald text-emerald-foreground text-sm font-medium hover:scale-105 transition-transform shrink-0">
              Request briefing
            </a>
          </motion.div>
        </div>

        {/* Timeline / Trajectory */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="mb-10">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
                / Research Trajectory
              </p>
              <h3 className="font-display text-4xl md:text-5xl tracking-[-0.03em] text-balance">
                The engineering <span className="italic text-accent">journey.</span>
              </h3>
            </div>
            <NeuralNetwork3D className="w-full aspect-square max-w-[320px] mb-8" />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="relative pl-12 border-l border-border/60">
              <div className="space-y-16">
                {RESEARCH_TIMELINE.map((phase, i) => (
                  <motion.div
                    key={phase.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[54px] top-1 size-6 rounded-full bg-background border-2 border-accent grid place-items-center">
                      <span className="size-2 rounded-full bg-accent" />
                    </span>

                    <div className="glass-bronze rounded-2xl p-6 md:p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">
                          Phase · {phase.year}
                        </span>
                        <span className="font-display text-3xl text-foreground">
                          {phase.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {phase.domains.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-mono uppercase tracking-[0.15em] text-accent"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
