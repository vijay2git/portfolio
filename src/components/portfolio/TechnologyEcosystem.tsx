"use client";

import { motion } from "framer-motion";
import { TECH_CLUSTERS } from "@/data/portfolio";
import { useState } from "react";

const ease = [0.32, 0.72, 0, 1] as const;

export function TechnologyEcosystem() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  return (
    <section id="technology" className="relative py-32 md:py-48 px-6 border-t border-border/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-border/60 pb-10 mb-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
              / Technology Ecosystem
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-[-0.03em] text-balance">
              Knowledge <span className="italic text-accent">graph.</span>
            </h2>
          </div>
          <p className="hidden md:block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            05 clusters · {TECH_CLUSTERS.reduce((s, c) => s + c.technologies.length, 0)} technologies
          </p>
        </div>

        {/* Knowledge Graph Visualization */}
        <div className="relative">
          <svg viewBox="0 0 1000 500" className="w-full h-auto">
            <defs>
              <radialGradient id="cluster-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Connection lines between clusters */}
            {TECH_CLUSTERS.map((cluster) =>
              cluster.connections.map((targetId) => {
                const target = TECH_CLUSTERS.find((c) => c.id === targetId);
                if (!target) return null;
                const s = CLUSTER_POSITIONS[cluster.id];
                const t = CLUSTER_POSITIONS[targetId];
                if (!s || !t) return null;
                return (
                  <motion.line
                    key={`${cluster.id}-${targetId}`}
                    x1={s.x}
                    y1={s.y}
                    x2={t.x}
                    y2={t.y}
                    stroke={
                      activeCluster === cluster.id || activeCluster === target.id
                        ? cluster.color
                        : "oklch(0.65 0.015 75 / 0.15)"
                    }
                    strokeWidth={activeCluster === cluster.id || activeCluster === target.id ? 2 : 1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: activeCluster === null || activeCluster === cluster.id || activeCluster === target.id ? 0.6 : 0.1,
                    }}
                    transition={{ duration: 1.2, ease }}
                  />
                );
              }),
            )}

            {/* Cluster nodes */}
            {TECH_CLUSTERS.map((cluster, i) => {
              const pos = CLUSTER_POSITIONS[cluster.id];
              if (!pos) return null;
              const isActive = activeCluster === cluster.id;
              return (
                <motion.g
                  key={cluster.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                  onMouseEnter={() => setActiveCluster(cluster.id)}
                  onMouseLeave={() => setActiveCluster(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Glow */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 120 : 90}
                    fill={cluster.color}
                    opacity={isActive ? 0.12 : 0.06}
                  />
                  
                  {/* Main node */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 55 : 45}
                    fill={cluster.color}
                    opacity={isActive ? 0.25 : 0.15}
                    stroke={cluster.color}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  
                  {/* Inner ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 30 : 25}
                    fill={cluster.color}
                    opacity={isActive ? 0.4 : 0.25}
                  />

                  {/* Label */}
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="oklch(0.945 0.015 85)"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isActive ? 16 : 14,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cluster.label}
                  </text>

                  {/* Technology tags orbiting */}
                  {isActive && cluster.technologies.map((tech, ti) => {
                    const angle = (ti / cluster.technologies.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 80;
                    const tx = pos.x + Math.cos(angle) * radius;
                    const ty = pos.y + Math.sin(angle) * radius;
                    return (
                      <g key={tech}>
                        <line
                          x1={pos.x}
                          y1={pos.y}
                          x2={tx}
                          y2={ty}
                          stroke={cluster.color}
                          strokeWidth={0.5}
                          opacity={0.3}
                        />
                        <text
                          x={tx}
                          y={ty}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={cluster.color}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          {tech}
                        </text>
                      </g>
                    );
                  })}
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

const CLUSTER_POSITIONS: Record<string, { x: number; y: number }> = {
  frontend: { x: 200, y: 150 },
  backend: { x: 500, y: 100 },
  ai: { x: 800, y: 200 },
  data: { x: 600, y: 350 },
  infra: { x: 300, y: 380 },
};
