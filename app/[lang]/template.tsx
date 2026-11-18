"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Sólo animamos en navegaciones internas, nunca en la carga inicial
// (así el HTML del servidor es visible de inmediato: SEO + LCP).
let hasNavigated = false;

/** Transición entre páginas: cortina roja + fundido del contenido. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animate) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] bg-blood"
        initial={{ clipPath: "inset(0 0 0 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
