import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="grid place-items-center size-8 rounded-full bg-gradient-to-br from-accent to-gold text-[10px] font-bold text-background">
                V
              </span>
              <span className="font-display text-xl text-foreground">Vijayaraghavan</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-[36ch] leading-relaxed">
              AI Engineer & Full Stack Developer building intelligent systems, 
              production SaaS platforms, and scalable architectures.
            </p>
          </div>
          
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
              / Connect
            </p>
            <ul className="space-y-3">
              {[
                { label: "GitHub", href: "https://github.com/vijay2git", icon: Github },
                { label: "LinkedIn", href: "https://linkedin.com/in/vijayaraghavan", icon: Linkedin },
                { label: "Email", href: "mailto:vijay200625@gmail.com", icon: Mail },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
              / System
            </p>
            <div className="space-y-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-emerald flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-emerald animate-pulse" />
                  Available
                </span>
              </div>
              <div className="flex justify-between">
                <span>Stack</span>
                <span>Next.js · React · AI</span>
              </div>
              <div className="flex justify-between">
                <span>Region</span>
                <span>Remote · UTC+5:30</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60">
          <span>&copy; 2026 Vijayaraghavan · All rights reserved</span>
          <span className="flex items-center gap-2">
            Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
