"use client";

import { useState } from "react";
import { Dock } from "@/components/portfolio/Dock";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Hero } from "@/components/portfolio/Hero";
import { TechnologyEcosystem } from "@/components/portfolio/TechnologyEcosystem";
import { ProjectLaboratory } from "@/components/portfolio/ProjectLaboratory";
import { EngineeringCapabilities } from "@/components/portfolio/EngineeringCapabilities";
import { SystemActivity } from "@/components/portfolio/SystemActivity";
import { DevelopmentPipeline } from "@/components/portfolio/DevelopmentPipeline";
import { ContactTerminal } from "@/components/portfolio/ContactTerminal";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { MagneticCursor } from "@/components/portfolio/MagneticCursor";
import { StatusTicker } from "@/components/portfolio/StatusTicker";
import { TrustCredibility } from "@/components/portfolio/TrustCredibility";
import { GlobalBackdrop } from "@/components/portfolio/GlobalBackdrop";
import { Toaster } from "@/components/ui/sonner";

export default function HomePage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  
  return (
    <SmoothScroll>
      <GlobalBackdrop />
      <ScrollProgress />
      <MagneticCursor />
      <Dock onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main className="relative">
        <Hero />
        <StatusTicker />
        <ProjectLaboratory />
        <EngineeringCapabilities />
        <TechnologyEcosystem />
        <DevelopmentPipeline />
        <TrustCredibility />
        <SystemActivity />
        <ContactTerminal />
        <Footer />
      </main>

      <Toaster theme="dark" position="bottom-right" />
    </SmoothScroll>
  );
}
