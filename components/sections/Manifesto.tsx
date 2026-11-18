"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import SplitText from "@/components/animations/SplitText";
import Parallax from "@/components/animations/Parallax";
import { DrawLine, Reveal } from "@/components/animations/Reveal";
import Photo from "@/components/ui/Photo";
import { manifesto } from "@/data/content";
import { media } from "@/data/media";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Manifesto() {
  const { t, tr } = useLocale();
  return (
    <>
      <section id="manifesto" className="relative overflow-hidden bg-ink py-28 md:py-44">
        <div className="container-x">
          <div className="mb-10 flex items-center gap-4 md:mb-16">
            <span className="label-red">01</span>
            <DrawLine className="w-10 md:w-16" />
            <span className="label">Manifesto — The art behind the body</span>
          </div>

          <SplitText
            className="display text-giant"
            lines={["Art is not", { text: "limited", className: "text-outline-red pl-[8vw]" }, "by the body."]}
            stagger={0.08}
          />

          <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-10">
            {/* Imagen asimétrica */}
            <div className="relative md:col-span-5 md:col-start-1">
              <Parallax className="aspect-[4/5] w-full md:w-[88%]" amount={60}>
                <Photo media={media.manifesto} sizes="(min-width:768px) 40vw, 100vw" />
              </Parallax>
              <span className="absolute -bottom-4 left-6 h-8 w-px bg-blood md:-bottom-8 md:h-16" />
              <p className="label mt-8 md:mt-12">{t.manifesto.fig}</p>
            </div>

            {/* Texto que se ilumina */}
            <div className="md:col-span-7 md:col-start-6 md:pt-24">
              <ScrubText key={tr(manifesto.body)} text={tr(manifesto.body)} />

              <div className="mt-20 space-y-0 md:mt-28">
                {manifesto.statements.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.08} className="group border-t border-white/10 py-6 md:py-8">
                    <div className="flex items-baseline gap-6 md:gap-10">
                      <span className="w-8 font-serif text-xl italic text-blood-hot">{s.n}</span>
                      <p className="display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.05] text-bone/85 transition-colors duration-500 group-hover:text-bone">{tr(s.text)}</p>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-white/10" />
              </div>
            </div>
          </div>
        </div>

        <span className="pointer-events-none absolute -right-[4vw] top-24 hidden select-none font-display text-[22vw] leading-none text-white/[0.02] lg:block" aria-hidden>
          MANIFESTO
        </span>
      </section>

      <FullQuote />
    </>
  );
}

/** Palabras que pasan de tenues a plenas siguiendo el scroll. */
function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-serif text-[clamp(1.7rem,3.3vw,3.1rem)] leading-[1.18] tracking-[-0.01em]" aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const { lang } = useLocale();
  const highlight = manifesto.highlight[lang].test(children);
  return (
    <motion.span aria-hidden style={{ opacity }} className={highlight ? "italic text-blood-hot" : ""}>
      {children}{" "}
    </motion.span>
  );
}

function FullQuote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1]);
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink" aria-label="Cita">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Photo media={media.manifestoFull} sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,#050505_90%)]" />

      <motion.p className="display pointer-events-none absolute left-0 top-[12%] whitespace-nowrap text-[18vw] leading-none text-white/[0.04]" style={{ x }} aria-hidden>
        Beyond the limits
      </motion.p>

      <div className="container-x relative z-10 text-center">
        <Reveal>
          <span className="mx-auto mb-10 block h-16 w-px bg-blood md:h-24" />
        </Reveal>
        <SplitText
          as="blockquote"
          className="mx-auto max-w-[16ch] font-serif text-[clamp(2.4rem,7vw,7rem)] italic leading-[1.02]"
          lines={[manifesto.fullQuote]}
          stagger={0.05}
        />
        <Reveal delay={0.6}>
          <p className="label mt-10">FROZZ BODYART — Manifesto</p>
        </Reveal>
      </div>
    </section>
  );
}
