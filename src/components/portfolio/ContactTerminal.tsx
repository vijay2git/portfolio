"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github, Mail, Terminal, Clock, Globe } from "lucide-react";
import { EMAIL, GITHUB_PROFILE } from "@/data/portfolio";
import { toast } from "sonner";
import { CodeMatrix3D } from "./CodeMatrix3D";

const ease = [0.32, 0.72, 0, 1] as const;

export function ContactTerminal() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const message = String(fd.get("message") ?? "");
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Project Inquiry from " + name,
    )}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Email client opened. Send the message to complete.");
    }, 600);
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 border-t border-border/60 overflow-hidden">
      <CodeMatrix3D className="absolute inset-0 -z-10 opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none -z-5" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-bronze text-[10px] font-mono tracking-[0.2em] uppercase text-gold mb-6">
            <Terminal className="size-3" />
            / Get In Touch
          </span>
          <h2 className="font-display text-6xl md:text-8xl tracking-[-0.04em] leading-[0.9] text-balance">
            Let&apos;s build <span className="italic text-accent">something.</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground max-w-[48ch] mx-auto text-pretty">
            Open for AI projects, full-stack builds, and technical consulting.
            Response time: typically within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-bronze rounded-2xl p-8"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-glow" />
                Direct Channel
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="font-display text-xl md:text-2xl text-foreground hover:text-accent transition-colors inline-flex items-center gap-3 group"
              >
                <Mail className="size-5 opacity-50" /> {EMAIL}
                <ArrowUpRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-bronze rounded-2xl p-8"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" />
                Open Source
              </p>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl md:text-2xl text-foreground hover:text-accent transition-colors inline-flex items-center gap-3 group"
              >
                <Github className="size-5 opacity-50" /> github.com/vijay2git
                <ArrowUpRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-bronze rounded-2xl p-6">
                <Clock className="size-4 text-accent mb-3" />
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Response Time
                </p>
                <p className="text-sm text-foreground">&lt; 24 hours</p>
              </div>
              <div className="glass-bronze rounded-2xl p-6">
                <Globe className="size-4 text-accent mb-3" />
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Timezone
                </p>
                <p className="text-sm text-foreground">UTC+5:30 · Remote</p>
              </div>
            </motion.div>

            <div className="pt-6 border-t border-border/60">
              <div className="flex items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald" />
                </span>
                <p className="text-sm text-muted-foreground">
                  Available for new projects
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-bronze rounded-2xl p-8"
          >
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border/60">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-accent-2/80" />
              <span className="size-2.5 rounded-full bg-emerald/80" />
              <Terminal className="size-3.5 ml-3 text-muted-foreground" />
              <span className="font-mono text-[11px] text-muted-foreground">
                contact@vijayaraghavan ~ %
              </span>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Project Details" name="message" type="textarea" required />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className="w-full h-14 rounded-full bg-accent text-accent-foreground font-medium text-sm uppercase tracking-[0.25em] hover:bg-gold hover:text-background transition-colors disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  <Terminal className="size-4" />
                  {sending ? "Opening channel..." : "Send Message"}
                </span>
              </motion.button>
              <p className="text-center font-mono text-[10px] text-muted-foreground/60">
                Opens your email client with the message pre-filled
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors";
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">
        {">"} {label}
      </span>
      {type === "textarea" ? (
        <textarea name={name} required={required} rows={4} className={cls} placeholder="Tell me about your project..." />
      ) : (
        <input name={name} type={type} required={required} className={cls} placeholder=" " />
      )}
    </label>
  );
}
