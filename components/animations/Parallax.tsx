"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Parallax suave: el contenido se desplaza `amount` px a lo largo del
 * recorrido del contenedor por el viewport. Usa sólo transform.
 */
export default function Parallax({ children, amount = 80, className = "", scale = 1 }: { children: ReactNode; amount?: number; className?: string; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-12%_0]" style={{ y, scale }}>
        {children}
      </motion.div>
    </div>
  );
}
