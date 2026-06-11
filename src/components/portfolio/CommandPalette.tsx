"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect } from "react";
import { Briefcase, Github, Mail, User, Layers, ArrowUpRight, Terminal, Download, Globe } from "lucide-react";
import { EMAIL, GITHUB_PROFILE, PROJECTS } from "@/data/portfolio";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (hash: string) => () => {
    onOpenChange(false);
    const el = document.querySelector(hash);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  const visit = (url: string) => () => {
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search projects, sections, or commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Projects">
          {PROJECTS.map((p) => (
            <CommandItem key={p.id} onSelect={visit(p.repo)}>
              <Globe className="mr-2 size-4 text-accent" />
              <span>{p.name}</span>
              <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                {p.tagline}
              </span>
              <ArrowUpRight className="ml-auto size-3 opacity-50" />
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={go("#projects")}>
            <Briefcase className="mr-2 size-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={go("#capabilities")}>
            <Layers className="mr-2 size-4" /> Expertise
          </CommandItem>
          <CommandItem onSelect={go("#technology")}>
            <Terminal className="mr-2 size-4" /> Technology
          </CommandItem>
          <CommandItem onSelect={go("#process")}>
            <Terminal className="mr-2 size-4" /> Process
          </CommandItem>
          <CommandItem onSelect={go("#results")}>
            <User className="mr-2 size-4" /> Results
          </CommandItem>
          <CommandItem onSelect={go("#contact")}>
            <Mail className="mr-2 size-4" /> Contact
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="External">
          <CommandItem onSelect={visit(GITHUB_PROFILE)}>
            <Github className="mr-2 size-4" /> GitHub Profile
            <ArrowUpRight className="ml-auto size-3 opacity-50" />
          </CommandItem>
          <CommandItem onSelect={visit(`mailto:${EMAIL}`)}>
            <Mail className="mr-2 size-4" /> Send Email
            <ArrowUpRight className="ml-auto size-3 opacity-50" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
