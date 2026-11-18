"use client";

import { ArrowUpRight } from "lucide-react";
import { MaskReveal, Reveal, RevealItem } from "@/components/animations/Reveal";
import Photo from "@/components/ui/Photo";
import SectionHead from "@/components/ui/SectionHead";
import { press } from "@/data/content";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { pad2 } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Press() {
  const [feature, ...rest] = press;
  const { t, tr } = useLocale();

  return (
    <section id="press" className="relative bg-ink py-28 md:py-44">
      <div className="container-x">
        <SectionHead index="10" label="Press & Media" title={["Featured", { text: "/ Press /", className: "text-outline" }, "Media."]} titleClassName="text-huge" />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Nota destacada estilo revista */}
          <article className="lg:col-span-7">
            <MaskReveal className="relative aspect-[4/3] w-full">
              <Photo media={feature.media ?? { src: null, alt: "", hint: "Nota destacada" }} sizes="(min-width:1024px) 55vw, 100vw" />
              <span className="absolute left-0 top-0 bg-blood px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em]">{t.press.cover}</span>
            </MaskReveal>
            <Reveal className="mt-8">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-bone-muted">
                <span className="text-blood-hot">{tr(feature.kind)}</span>
                <span>{feature.outlet}</span>
                <span>{feature.date}</span>
              </div>
              <h3 className="display mt-4 text-[clamp(2rem,4.5vw,4rem)] leading-[0.92]">{tr(feature.title)}</h3>
              {feature.placeholder && <p className="mt-3 text-xs uppercase tracking-[0.2em] text-bone-dim">{t.press.reserved}</p>}
            </Reveal>
          </article>

          {/* Índice */}
          <div className="lg:col-span-5">
            <p className="label">{t.press.index}</p>
            <ul className="mt-6 border-t border-white/10">
              {rest.map((p, i) => {
                const Inner = (
                  <div className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 border-b border-white/10 py-6">
                    <span className="display text-xl text-bone/25">{pad2(i + 2)}</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-blood-hot">{tr(p.kind)} · <span className="text-bone-muted">{p.outlet}</span></p>
                      <p className="display mt-2 text-2xl leading-none transition-colors group-hover:text-blood-hot md:text-3xl">{tr(p.title)}</p>
                      {p.placeholder && <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-bone-dim">{t.common.soon}</p>}
                    </div>
                    <ArrowUpRight size={18} className="mt-1 text-bone/30 transition-all group-hover:rotate-45 group-hover:text-bone" />
                  </div>
                );
                return (
                  <RevealItem key={i} delay={i * 0.06}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer">{Inner}</a>
                    ) : (
                      Inner
                    )}
                  </RevealItem>
                );
              })}
            </ul>

            <Reveal className="mt-10 border border-white/10 p-6">
              <p className="label-red">{t.press.boxTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone-muted">{t.press.boxText}</p>
              <a
                href={waLink(t.press.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-6"
              >
                {t.press.inquiry} <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
