"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Cpu, Database, Network } from "lucide-react";

export function SystemMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 64,
    network: 128,
    latency: 24,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.floor(30 + Math.random() * 40),
        memory: Math.floor(55 + Math.random() * 15),
        network: Math.floor(100 + Math.random() * 50),
        latency: Math.floor(15 + Math.random() * 15),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto px-6 mt-16">
      <MetricCard
        label="Neural Load"
        value={`${metrics.cpu}%`}
        icon={<Cpu className="size-4" />}
        progress={metrics.cpu}
        color="var(--accent)"
      />
      <MetricCard
        label="Context Memory"
        value={`${metrics.memory}GB`}
        icon={<Database className="size-4" />}
        progress={metrics.memory}
        color="var(--gold)"
      />
      <MetricCard
        label="Network Activity"
        value={`${metrics.network}Mb/s`}
        icon={<Network className="size-4" />}
        progress={(metrics.network / 200) * 100}
        color="var(--emerald)"
      />
      <MetricCard
        label="System Latency"
        value={`${metrics.latency}ms`}
        icon={<Activity className="size-4" />}
        progress={(1 - metrics.latency / 60) * 100}
        color="var(--titanium)"
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  progress,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-bronze p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{icon}</span>
        <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-display font-medium leading-none tracking-tight">
          {value}
        </span>
      </div>
      <div className="h-1 w-full bg-border rounded-full overflow-hidden mt-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      
      {/* Subtle scan line inside card */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-white animate-scan" style={{ animationDuration: '4s' }} />
      </div>
    </motion.div>
  );
}
