"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal, RevealItem } from "@/components/animations/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Faq from "@/components/ui/Faq";
import { safety } from "@/data/content";
import { offeredProcedures } from "@/data/procedures";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Safety() {
  const { t, tr, href } = useLocale();
  return (
    <section id="safety" className="relative bg-ink py-28 md:py-44">
      <div className="container-x">
        <SectionHead label={t.safety.label} title={[t.safety.title[0], { text: t.safety.title[1], className: "text-outline" }]} />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-serif text-2xl leading-snug md:text-[1.75rem]">{tr(safety.lead)}</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10">
                <p className="label-red">{t.safety.perProcedure}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {offeredProcedures.map((p) => (
                    <Link key={p.slug} href={href(`/body-modification/${p.slug}#aftercare`)} className="group inline-flex items-center gap-1 border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-bone/70 transition-colors hover:border-blood-hot hover:text-bone">
                      {tr(p.name)} <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {safety.pillars.map((p, i) => (
              <RevealItem key={p.n} delay={i * 0.04} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 py-7 md:grid-cols-[6rem_1fr_1.3fr] md:gap-8 md:py-9">
                <span className="display text-3xl leading-none text-bone/25 transition-colors duration-500 group-hover:text-blood-hot md:text-5xl">{p.n}</span>
                <h3 className="display text-2xl leading-none md:text-3xl">{tr(p.title)}</h3>
                <p className="col-start-2 text-[15px] leading-relaxed text-bone-muted md:col-start-3">{tr(p.text)}</p>
              </RevealItem>
            ))}
          </ol>
        </div>

        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="display text-big">{t.safety.faq1}<br /><span className="text-outline">{t.safety.faq2}</span></h3>
          </div>
          <div className="lg:col-span-8">
            <Faq items={safety.faq.map((f) => ({ q: tr(f.q), a: tr(f.a) }))} />
          </div>
        </div>

        <Reveal className="mt-20 flex flex-col gap-5 border border-blood/40 bg-blood/[0.04] p-6 md:flex-row md:items-start md:p-10">
          <ShieldCheck size={28} strokeWidth={1.2} className="shrink-0 text-blood-hot" />
          <p className="text-sm leading-relaxed text-bone/75">{tr(safety.disclaimer)}</p>
        </Reveal>
      </div>
    </section>
  );
}
