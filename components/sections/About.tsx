"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Parallax from "@/components/animations/Parallax";
import SplitText from "@/components/animations/SplitText";
import { DrawLine, MaskReveal, Reveal } from "@/components/animations/Reveal";
import Photo from "@/components/ui/Photo";
import { about, journey } from "@/data/content";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function About() {
  const { t, tr } = useLocale();
  return (
    <section id="artist" className="relative bg-ink py-28 md:py-44">
      <div className="container-x">
        <div className="mb-10 flex items-center gap-4 md:mb-16">
          <DrawLine className="w-10 md:w-16" />
          <span className="label">{t.about.label}</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Retrato */}
          <div className="relative lg:col-span-6">
            <MaskReveal className="relative">
              <Parallax className="aspect-[4/5] w-full" amount={70}>
                <Photo media={media.artist} sizes="(min-width:1024px) 50vw, 100vw" />
              </Parallax>
            </MaskReveal>
            <div className="absolute -bottom-10 -right-2 hidden w-[42%] border-8 border-ink md:block lg:-right-16">
              <Parallax className="aspect-[3/4] w-full" amount={40}>
                <Photo media={media.artistSecondary} sizes="20vw" showHint={false} />
              </Parallax>
            </div>
            <p className="display absolute -left-2 top-6 text-[clamp(3rem,7vw,6rem)] leading-none text-outline md:-left-6" aria-hidden>
              ROU
            </p>
          </div>

          {/* Texto */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <SplitText className="display text-huge" lines={[t.about.title[0], { text: t.about.title[1], className: "text-blood-hot" }, t.about.title[2]]} />

            <Reveal delay={0.2}>
              <p className="mt-10 font-serif text-2xl leading-snug text-bone md:text-[1.9rem]">{tr(about.lead)}</p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p className={cn("text-[15px] leading-relaxed", tr(p).startsWith("[") ? "border-l border-dashed border-white/20 pl-4 text-bone-dim" : "text-bone-muted")}>{tr(p)}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-3">
              {about.pillars.map((p, i) => (
                <Reveal key={i} delay={0.1 * i} className="border-t border-white/10 py-5 sm:pr-4">
                  <p className="label-red">{tr(p.label)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/80">{tr(p.text)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 flex items-center gap-4">
              <span className="display text-xl">{site.artist}</span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="label">{site.base.country} / {t.hero.worldwide}</span>
            </Reveal>
          </div>
        </div>

        <Journey />
      </div>
    </section>
  );
}

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { t, tr } = useLocale();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <div className="mt-32 md:mt-52">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitText className="display text-huge" lines={[t.about.journey[0], { text: t.about.journey[1], className: "text-outline" }]} />
        <Reveal>
          <p className="max-w-xs text-sm leading-relaxed text-bone-muted">{t.about.journeyNote}</p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-16 md:mt-24">
        {/* línea base + progreso */}
        <span className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 md:left-1/2" />
        <motion.span className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-blood md:left-1/2" style={{ scaleY: scrollYProgress }} />

        <ol className="space-y-14 md:space-y-0">
          {journey.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li key={i} className="relative grid pl-12 md:grid-cols-2 md:pl-0">
                <span
                  className={cn(
                    "absolute left-[5px] top-2 h-[13px] w-[13px] rotate-45 border md:left-1/2 md:-ml-[6.5px]",
                    m.status === "next" ? "border-blood-hot bg-ink" : "border-blood bg-blood",
                  )}
                />
                <Reveal className={cn("md:py-10", right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right")}>
                  <p className={cn("display text-5xl leading-none md:text-6xl", m.status === "next" ? "text-outline-red" : "text-bone/90")}>{m.year}</p>
                  <h3 className="display mt-3 text-2xl tracking-wide md:text-3xl">{tr(m.title)}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed text-bone-muted md:max-w-sm", !right && "md:ml-auto")}>{tr(m.text)}</p>
                  {m.status === "next" && <p className="label-red mt-3">{t.about.subjectToConfirmation}</p>}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
