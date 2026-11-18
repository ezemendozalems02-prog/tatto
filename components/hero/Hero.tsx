"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import SplitText from "@/components/animations/SplitText";
import { useUI } from "@/components/layout/UIProvider";
import { media } from "@/data/media";
import { estLabel, site } from "@/data/site";
import { useLocale } from "@/components/layout/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { introDone } = useUI();
  const { href } = useLocale();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink" aria-label="FROZZ BODYART">
      {/* FOTO PROTAGONISTA */}
      <motion.div
        className="absolute inset-0 md:left-[38%] md:right-[4.5rem]"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={introDone ? { clipPath: "inset(0 0 0% 0)" } : {}}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      >
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <Photo media={media.hero} priority sizes="(min-width: 768px) 60vw, 100vw" showHint={false} badgeClassName="!top-auto bottom-[30%] md:bottom-24" />
        </motion.div>
        {/* degradados de lectura */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40 md:via-transparent md:to-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/40 to-transparent md:block" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        {/* marco y detalle rojo */}
        <span className="absolute bottom-[18%] right-0 hidden h-[28%] w-[2px] bg-blood md:block" />
        {!media.hero.src && !media.hero.ref && (
          <p className="absolute right-5 top-28 max-w-[22ch] text-right text-[9px] uppercase leading-relaxed tracking-[0.28em] text-white/30 md:top-32">
            <span className="text-blood-hot">●</span> Photo · {media.hero.hint}
          </p>
        )}
      </motion.div>

      {/* CONTENIDO */}
      <motion.div className="container-x relative z-10 flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0" style={{ y: titleY, opacity: fade }}>
        <motion.div {...appear(0.55)} className="mb-6 flex items-center gap-4 md:mb-10">
          <span className="h-px w-10 bg-blood md:w-16" />
          <span className="label !text-bone/80">{site.tagline}</span>
        </motion.div>

        <h1 className="display relative text-[27vw] leading-[0.78] md:text-mega" aria-label="FROZZ BODYART">
          {/* FROZZ por encima: el contorno de BODYART pasa por detrás de las letras */}
          <SplitText as="span" lines={["FROZZ"]} play={introDone} delay={0.2} className="relative z-10 block" />
          <SplitText
            as="span"
            lines={[{ text: "BODYART", className: "text-outline" }]}
            play={introDone}
            delay={0.35}
            className="relative z-0 -mt-[0.06em] block pl-[0.6em] text-[0.56em] md:pl-[1.1em] md:text-[0.5em]"
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-end lg:gap-14">
          <motion.div {...appear(0.85)} className="max-w-sm">
            <p className="font-serif text-2xl italic leading-tight text-bone md:text-3xl">&ldquo;{site.claim}&rdquo;</p>
            <p className="mt-4 text-[13px] leading-relaxed text-bone-muted">
              {site.artist} — Body Modification Artist.<br />
              {site.base.label}.
            </p>
          </motion.div>
          <motion.div {...appear(1)} className="flex flex-col gap-3 sm:flex-row">
            <Link href={href("/#works")} className="btn-ghost group whitespace-nowrap">
              Explore my work
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link href={href("/#booking")} className="btn-red group whitespace-nowrap">
              Book an experience
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* COMPOSICIÓN VERTICAL */}
      <motion.div
        className="absolute bottom-0 right-0 top-0 z-10 hidden w-[4.5rem] items-center justify-center border-l border-white/[0.07] md:flex"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.1 }}
      >
        <p className="writing-vertical rotate-180 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.5em] text-bone/50">
          Body Modification <span className="text-blood-hot">/</span> Body Art <span className="text-blood-hot">/</span> Worldwide <span className="text-blood-hot">/</span> {estLabel()}
        </p>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.a
        href="#manifesto"
        className="absolute bottom-6 left-4 z-10 flex items-center gap-4 sm:left-6 md:bottom-10 md:left-10 lg:left-14"
        {...appear(1.3)}
      >
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 bg-blood-hot animate-scrollLine" />
        </span>
        <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-bone/70">
          Scroll to discover <ArrowDown size={12} />
        </span>
      </motion.a>

      {/* COORDENADAS — detalle editorial */}
      <motion.p className="absolute bottom-10 right-24 z-10 hidden text-right text-[10px] uppercase leading-relaxed tracking-[0.3em] text-bone/40 lg:block" {...appear(1.4)}>
        34.6037° S — 58.3816° W<br />
        {site.base.city} · Worldwide
      </motion.p>
    </section>
  );
}
