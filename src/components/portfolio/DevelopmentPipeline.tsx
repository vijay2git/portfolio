"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, GitBranch, Code, Rocket, TrendingUp,
  ChevronRight, ArrowRight
} from "lucide-react";
import { PROCESS_STEPS } from "@/data/portfolio";

const ease = [0.32, 0.72, 0, 1] as const;

const ICON_MAP: Record<string, any> = {
  Search, GitBranch, Code, Rocket, TrendingUp
};

export function DevelopmentPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-32 md:py-40 px-6 border-t border-border/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Development Workflow
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-[-0.03em] text-balance">
              From concept <span className="italic text-accent">to scale.</span>
            </h2>
          </div>
          <p className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            5-phase methodology
          </p>
        </div>

        {/* Process Steps - Horizontal Flow */}
        <div className="mb-20">
          <div className="flex items-center justify-between overflow-x-auto pb-4 mask-edges">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = ICON_MAP[step.icon] || Code;
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              return (
                <div key={step.step} className="flex items-center">
                  <motion.button
                    onClick={() => setActiveStep(i)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-500 min-w-[120px] ${
                      isActive
                        ? "bg-accent/10 border border-accent/30"
                        : "hover:bg-foreground/[0.02]"
                    }`}
                  >
                    <div className={`size-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : isPast
                          ? "bg-accent/20 text-accent"
                          : "bg-foreground/5 text-muted-foreground"
                    }`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="text-center">
                      <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                        isActive ? "text-accent" : "text-muted-foreground"
                      }`}>
                        {step.step}
                      </p>
                      <p className={`font-display text-sm mt-0.5 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </motion.button>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className={`w-12 h-px mx-2 transition-colors duration-500 ${
                      isPast ? "bg-accent/40" : "bg-border"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className="glass-bronze rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">
                    Phase {PROCESS_STEPS[activeStep].step}
                  </span>
                  <ChevronRight className="size-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {PROCESS_STEPS[activeStep].title}
                  </span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl tracking-[-0.03em] text-foreground mb-6">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-[48ch]">
                  {PROCESS_STEPS[activeStep].description}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  {activeStep < PROCESS_STEPS.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-bronze text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      Next Phase <ArrowRight className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                <div className="relative glass rounded-2xl p-8 border border-border/60">
                  <div className="space-y-4">
                    {getPhaseDetails(activeStep).map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div className="size-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function getPhaseDetails(step: number): string[] {
  const details: Record<number, string[]> = {
    0: [
      "Stakeholder interviews & requirements gathering",
      "Technical constraint analysis",
      "User research & journey mapping",
      "Competitive landscape review",
      "Success metrics definition",
    ],
    1: [
      "System architecture design",
      "Data model & schema planning",
      "API contract definition",
      "Infrastructure topology mapping",
      "Security & compliance review",
    ],
    2: [
      "Iterative sprint-based development",
      "Production-grade code standards",
      "Comprehensive test coverage",
      "CI/CD pipeline integration",
      "Code review & quality gates",
    ],
    3: [
      "Zero-downtime deployment strategies",
      "Infrastructure as Code (IaC)",
      "Monitoring & observability setup",
      "Performance baseline establishment",
      "Rollback & recovery procedures",
    ],
    4: [
      "Performance optimization & profiling",
      "Auto-scaling configuration",
      "Cost optimization analysis",
      "Architectural evolution planning",
      "Documentation & knowledge transfer",
    ],
  };
  return details[step] || details[0];
}
