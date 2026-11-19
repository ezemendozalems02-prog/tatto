"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUI } from "./UIProvider";
import { useLocale } from "./LocaleProvider";
import { pad2 } from "@/lib/utils";

import { INTRO_KEY } from "@/lib/constants";

const MIN_MS = 1700;

/**
 * Preloader cinematográfico.
 * - Se muestra una sola vez por sesión (sessionStorage).
 * - Un script inline en <head> marca html[data-intro="seen"] antes del
 *   primer pintado, para que no haya parpadeo en visitas siguientes.
 * - El porcentaje avanza con el tiempo pero no llega a 100 hasta que la
 *   página terminó de cargar (no bloquea artificialmente).
 */
export default function Preloader() {
  const { setIntroDone } = useUI();
  const { t } = useLocale();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setIntroDone();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf = 0;
    let finished = false;
    const tick = (t: number) => {
      const timeP = Math.min(1, (t - start) / MIN_MS);
      const eased = 1 - Math.pow(1 - timeP, 3);
      const cap = loaded ? 100 : 92;
      const next = Math.min(cap, Math.round(eased * 100));
      setPct(next);
      if (next >= 100 && !finished) {
        finished = true;
        setTimeout(() => {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {}
          setShow(false);
          // El Hero empieza a revelarse mientras se abren las cortinas
          setIntroDone();
        }, 200);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Seguridad: nunca más de 4s aunque algún recurso tarde.
    const failsafe = setTimeout(() => (loaded = true), 4000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
    };
  }, [setIntroDone]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          data-preloader
          className="fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.95 }}
          aria-hidden
        >
          {/* Cortinas que se abren */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          <motion.div className="relative z-10 flex w-full flex-col items-center px-6" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
            <div className="relative">
              <motion.h1
                className="display glitch text-[clamp(4rem,16vw,13rem)] leading-[0.8] tracking-tight text-bone"
                data-text="FROZZ"
                initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(10px)" }}
                animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                FROZZ
              </motion.h1>
            </div>

            <motion.p
              className="mt-3 text-[11px] font-medium uppercase tracking-[0.9em] text-bone/70 md:text-xs"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.9em" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Bodyart
            </motion.p>

            {/* línea roja + porcentaje */}
            <div className="mt-10 w-[min(420px,78vw)]">
              <div className="relative h-px w-full bg-white/10">
                <span className="absolute inset-y-0 left-0 bg-blood-hot shadow-[0_0_12px_#ff1728]" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone-muted">
                <span>{t.brand.tagline}</span>
                <span className="display text-base tracking-normal text-bone tabular-nums">{pct === 100 ? "100" : pad2(pct)}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
