"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado SOLO en desktop con puntero fino.
 * - Punto rojo que sigue al mouse + anillo con inercia.
 * - Elementos con data-cursor="Texto" muestran una etiqueta.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select, label"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 92 : hover ? 54 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]" style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}>
      <motion.div className="fixed left-0 top-0" style={{ x: rx, y: ry }}>
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out"
          style={{
            width: size,
            height: size,
            borderColor: label ? "transparent" : hover ? "rgba(255,23,40,0.8)" : "rgba(245,245,245,0.35)",
            backgroundColor: label ? "#d10b19" : "transparent",
          }}
        >
          {label && <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-bone">{label}</span>}
        </div>
      </motion.div>
      <motion.div className="fixed left-0 top-0" style={{ x, y }}>
        <div className="h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood-hot" style={{ opacity: label ? 0 : 1 }} />
      </motion.div>
    </div>
  );
}
