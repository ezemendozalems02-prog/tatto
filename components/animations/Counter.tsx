"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { pad2 } from "@/lib/utils";

export default function Counter({ to, className = "", duration = 1.8 }: { to: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {pad2(value)}
    </span>
  );
}
