"use client";

import { motion } from "framer-motion";
import { Quote, Award, Target, TrendingUp, Users } from "lucide-react";
import { METRICS, TESTIMONIALS } from "@/data/portfolio";

const ease = [0.32, 0.72, 0, 1] as const;

export function TrustCredibility() {
  return (
    <section id="results" className="relative py-32 md:py-48 px-6 border-t border-border/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Results & Trust
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-[-0.03em] text-balance">
              Built to <span className="italic text-accent">deliver.</span>
            </h2>
          </div>
          <p className="hidden md:block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Impact metrics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="glass-bronze rounded-2xl p-8 text-center group hover:border-accent/30 transition-all duration-500"
            >
              <p className="font-display text-5xl md:text-6xl tracking-[-0.03em] chrome-text">
                {m.value}<span className="text-accent">{m.suffix}</span>
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Case Study Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              icon: Target,
              title: "RAG Architecture",
              metric: "Sub-100ms",
              label: "retrieval latency",
              description: "Built production-grade retrieval infrastructure processing 50K+ documents with 94% relevance accuracy.",
            },
            {
              icon: TrendingUp,
              title: "Property Intelligence",
              metric: "92%",
              label: "pricing accuracy",
              description: "Real-time valuation platform reducing turnaround from 48 hours to instant predictions.",
            },
            {
              icon: Award,
              title: "Civic Automation",
              metric: "60%",
              label: "faster resolution",
              description: "NLP-powered complaint classification and routing across 15 categories with 91% accuracy.",
            },
          ].map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-bronze rounded-2xl p-8 group hover:border-accent/30 transition-all duration-500"
            >
              <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <study.icon className="size-6 text-accent" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-2">
                {study.title}
              </p>
              <p className="font-display text-4xl tracking-[-0.03em] chrome-text mb-1">
                {study.metric}
              </p>
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-4">
                {study.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {study.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
                / Client Feedback
              </p>
              <h3 className="font-display text-3xl md:text-4xl tracking-[-0.03em] text-balance">
                What they <span className="italic text-accent">say.</span>
              </h3>
            </div>
            <Users className="size-5 text-muted-foreground hidden md:block" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="glass-bronze rounded-2xl p-8 flex flex-col"
              >
                <Quote className="size-8 text-accent/40 mb-4" />
                <p className="text-base text-foreground/90 leading-relaxed flex-1 text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-6 border-t border-border/60">
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    {t.context}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
