"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: w }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-bronze z-[60]"
    />
  );
}
