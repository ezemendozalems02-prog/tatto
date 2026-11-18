"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; children: ReactNode };

/** Aparición al entrar en viewport. */
export function Reveal({ delay = 0, y = 36, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Igual que Reveal pero renderiza un <li> (para listas válidas). */
export function RevealItem({ delay = 0, y = 36, children, ...rest }: HTMLMotionProps<"li"> & { delay?: number; y?: number; children: ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </motion.li>
  );
}

/** Línea que se dibuja horizontalmente. */
export function DrawLine({ className = "", delay = 0, origin = "left" }: { className?: string; delay?: number; origin?: "left" | "right" }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px bg-blood ${className}`}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
    />
  );
}

/** Imagen que se descubre con una cortina. */
export function MaskReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
