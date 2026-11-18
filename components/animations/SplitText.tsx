"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type Line = string | { text: string; className?: string };

type Props = {
  lines: Line[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Si se pasa, anima cuando `play` es true en lugar de al entrar en viewport. */
  play?: boolean;
};

const ease = [0.76, 0, 0.24, 1] as const;

const word: Variants = {
  hidden: { y: "130%" },
  show: (d: number) => ({ y: "0%", transition: { duration: 1.1, ease, delay: d } }),
};

/**
 * Text reveal por palabras con máscara.
 * El contenedor es el que se observa (no cada palabra, que arranca
 * recortada por su máscara y nunca "intersectaría"); las palabras
 * heredan el estado vía variants con un retraso escalonado.
 */
export default function SplitText({ lines, as: Tag = "h2", className, lineClassName = "", delay = 0, stagger = 0.06, play }: Props) {
  let wordIndex = 0;
  const controlled = typeof play === "boolean";
  const label = lines.map((l) => (typeof l === "string" ? l : l.text)).join(" ");

  return (
    <Tag className={className} aria-label={label}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...(controlled ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, amount: 0.2 } })}
      >
        {lines.map((line, li) => {
          const text = typeof line === "string" ? line : line.text;
          const cls = typeof line === "string" ? "" : line.className ?? "";
          const words = text.split(" ");
          return (
            <span key={li} className={`block ${lineClassName} ${cls}`}>
              {words.map((w, wi) => {
                const i = wordIndex++;
                return (
                  <span key={wi} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
                    <motion.span className="inline-block will-change-transform" variants={word} custom={delay + i * stagger}>
                      {w}
                    </motion.span>
                    {wi < words.length - 1 && <span>&nbsp;</span>}
                  </span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
