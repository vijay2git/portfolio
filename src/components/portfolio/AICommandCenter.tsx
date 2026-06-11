"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Clock, GitCommit, Globe2, Cpu, Signal } from "lucide-react";

/**
 * Live Bento — a dense, asymmetric editorial grid of live readouts:
 * IST clock, current shipping focus, uptime ticker, system pulse, stack stats.
 * Everything is computed client-side; no backend required.
 */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}


function formatIST(d: Date) {
  const t = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
  return t;
}

function Sparkline({ points }: { points: number[] }) {
  const W = 200;
  const H = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((p - min) / (max - min || 1)) * H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-10">
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.2" />
    </svg>
  );
}

const tile =
  "relative rounded-2xl border border-border/70 bg-surface/40 backdrop-blur-md p-6 overflow-hidden group";

export function AICommandCenter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const now = useNow();
  const [pulse, setPulse] = useState<number[]>(() =>
    Array.from({ length: 32 }, () => 30 + Math.random() * 40),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setPulse((p) => [...p.slice(1), 25 + Math.random() * 55]);
    }, 1100);
    return () => window.clearInterval(id);
  }, []);
  
  if (!mounted) return null;

  return (
    <section id="ai-center" className="relative py-24 md:py-32 px-6 border-t border-border/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Live Telemetry
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em] leading-[0.95] text-balance max-w-[20ch]">
              The studio, <span className="italic text-accent">in real time</span>.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald" />
            </span>
            Live · 6 streams
          </div>
        </div>

        {/* 6-column bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[minmax(140px,auto)]">
          {/* Clock — large */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`${tile} md:col-span-3 md:row-span-2 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                <Clock className="size-3.5 text-accent" /> Local · IST
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" }) : "—"}
              </span>
            </div>
            <div>
              <p className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-[-0.04em] chrome-text">
                {now ? formatIST(now) : "--:--:--"}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                Asia / Kolkata · UTC+5:30 · Working hours
              </p>
            </div>
          </motion.div>


          {/* Now shipping */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className={`${tile} md:col-span-3`}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <GitCommit className="size-3.5 text-accent" /> Now shipping
            </span>
            <p className="mt-4 font-display text-2xl md:text-3xl tracking-[-0.02em] text-foreground leading-snug">
              Retrieval infra & a typed RAG core in production.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["TypeScript", "Vector Search", "Postgres", "AWS"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full border border-border text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Uptime */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`${tile} md:col-span-2`}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <Signal className="size-3.5 text-accent" /> Uptime · 30d
            </span>
            <p className="mt-3 font-display text-5xl tracking-[-0.03em] text-foreground">
              99.98<span className="text-accent">%</span>
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              Last incident · 12d ago
            </p>
          </motion.div>

          {/* Pulse */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`${tile} md:col-span-2`}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <Activity className="size-3.5 text-accent" /> Build pulse
            </span>
            <p className="mt-3 font-display text-3xl text-foreground">
              {Math.round(pulse[pulse.length - 1])}
              <span className="text-base text-muted-foreground ml-1">req/s</span>
            </p>
            <div className="mt-2">
              <Sparkline points={pulse} />
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`${tile} md:col-span-2`}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <Globe2 className="size-3.5 text-accent" /> Operating from
            </span>
            <p className="mt-3 font-display text-3xl tracking-[-0.02em] text-foreground">
              Remote · IN
            </p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              Working with teams in NA, EU, APAC
            </p>
          </motion.div>

          {/* Runtime stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`${tile} md:col-span-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                <Cpu className="size-3.5 text-accent" /> Runtime stack distribution
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">06 production systems</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { k: "Frontend", v: "React · Next" },
                { k: "Backend", v: "Node · Python" },
                { k: "Data", v: "Postgres · Mongo · Redis" },
                { k: "Infra", v: "AWS · Edge" },
                { k: "AI", v: "RAG · Vector" },
                { k: "Ops", v: "CI · IaC" },
              ].map((s, i) => (
                <div key={s.k} className="border-l border-border/60 pl-3">
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                    0{i + 1}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{s.k}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
