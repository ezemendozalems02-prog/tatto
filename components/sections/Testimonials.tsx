"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import Photo from "@/components/ui/Photo";
import { testimonials } from "@/data/content";
import { pad2 } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

/** Slider horizontal con arrastre, botones y teclado. */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);
  const { t, tr } = useLocale();

  const measure = useCallback(() => {
    if (!track.current || !viewport.current) return;
    setMax(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = () => {
    const card = track.current?.children[0] as HTMLElement | undefined;
    return card ? card.offsetWidth + 16 : 400;
  };

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, i));
    setIndex(clamped);
    animate(x, -Math.min(max, clamped * step()), { type: "spring", stiffness: 220, damping: 32 });
  };

  const onDragEnd = () => {
    const i = Math.round(-x.get() / step());
    goTo(i);
  };

  const hasPlaceholders = testimonials.some((x) => x.placeholder);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink-800 py-28 md:py-44">
      <div className="container-x">
        <SectionHead
          label={t.testimonials.label}
          title={[t.testimonials.title[0], { text: t.testimonials.title[1], className: "text-outline" }]}
          titleClassName="text-huge"
          aside={
            hasPlaceholders ? (
              <p className="border border-dashed border-white/20 p-4 text-xs leading-relaxed text-bone-muted">
                <span className="label-red mb-1 block">{t.testimonials.placeholderTitle}</span>
                {t.testimonials.placeholderText}
              </p>
            ) : undefined
          }
        />

        <div ref={viewport} className="mt-16 md:mt-24">
          <motion.div
            ref={track}
            className="flex cursor-grab gap-4 active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -max, right: 0 }}
            dragElastic={0.08}
            onDragEnd={onDragEnd}
            data-cursor={t.common.drag}
          >
            {testimonials.map((item, i) => (
              <article key={i} className="relative flex min-h-[420px] w-[86vw] shrink-0 select-none flex-col justify-between border border-white/[0.08] bg-ink p-7 sm:w-[60vw] md:p-10 lg:w-[38vw] xl:w-[30vw]">
                {item.placeholder && <span className="absolute right-5 top-5 border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.24em] text-bone-dim">{t.testimonials.placeholderTitle}</span>}
                <div>
                  <span className="font-serif text-7xl leading-none text-blood">&ldquo;</span>
                  <p className="mt-2 font-serif text-2xl leading-snug text-bone/90 md:text-[1.7rem]">{tr(item.text)}</p>
                </div>
                <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                  {item.photo && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Photo media={item.photo} sizes="48px" showHint={false} />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="display text-xl leading-none">{item.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-bone-muted">{item.city}</p>
                  </div>
                  <p className="label-red">{tr(item.procedure)}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-4">
            <span className="display text-xl tabular-nums">{pad2(index + 1)}</span>
            <div className="relative h-px max-w-xs flex-1 bg-white/10">
              <motion.span className="absolute inset-y-0 left-0 bg-blood" animate={{ width: `${((index + 1) / testimonials.length) * 100}%` }} transition={{ duration: 0.6 }} />
            </div>
            <span className="display text-xl tabular-nums text-bone/30">{pad2(testimonials.length)}</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className="flex h-12 w-12 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot hover:bg-blood disabled:opacity-25 disabled:hover:bg-transparent" aria-label={t.common.prev}>
              <ArrowLeft size={18} strokeWidth={1.4} />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} disabled={index === testimonials.length - 1} className="flex h-12 w-12 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot hover:bg-blood disabled:opacity-25 disabled:hover:bg-transparent" aria-label={t.common.next}>
              <ArrowRight size={18} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
