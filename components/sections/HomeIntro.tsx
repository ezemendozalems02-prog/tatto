"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/animations/SplitText";
import { DrawLine, Reveal, RevealItem } from "@/components/animations/Reveal";
import { useLocale } from "@/components/layout/LocaleProvider";
import { manifesto } from "@/data/content";
import { offeredProcedures } from "@/data/procedures";
import { pages } from "@/data/site";
import { cn } from "@/lib/utils";

/** Lo esencial de la home: quién es FROZZ, qué hace y a dónde seguir. */
export default function HomeIntro() {
  const { t, tr, href } = useLocale();
  const h = t.home;
  const next = [
    { href: pages.works, text: h.next.works },
    { href: pages.tour, text: h.next.tour },
    { href: pages.booking, text: h.next.booking, accent: true },
  ];

  return (
    <>
      <section id="intro" className="relative scroll-mt-16 bg-ink py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <DrawLine className="w-10 md:w-16" />
              <span className="label">{t.manifesto.label}</span>
            </div>
            <SplitText className="display text-huge" lines={[h.introTitle[0], { text: h.introTitle[1], className: "text-outline" }, { text: h.introTitle[2], className: "text-blood-hot" }]} />
          </div>
          <div className="lg:col-span-5 lg:pt-20">
            <Reveal>
              <p className="font-serif text-2xl leading-snug md:text-[1.75rem]">{tr(manifesto.body)}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href={href(pages.artist)} className="btn-ghost group mt-8">
                {h.more} <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-800 py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <DrawLine className="w-10 md:w-16" />
                <span className="label">{h.specialtiesLabel}</span>
              </div>
              <SplitText className="display text-huge" lines={[h.specialtiesTitle[0], { text: h.specialtiesTitle[1], className: "text-outline" }]} />
            </div>
            <Link href={href(pages.bodyMod)} className="btn-ghost self-start md:self-auto">
              {h.allProcedures} <ArrowUpRight size={14} />
            </Link>
          </div>

          <ul className="mt-12 border-t border-white/10 md:mt-16">
            {offeredProcedures.map((p, i) => (
              <RevealItem key={p.slug} delay={i * 0.04}>
                <Link
                  href={href(`${pages.bodyMod}/${p.slug}`)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-white/10 py-5 md:grid-cols-[4rem_1fr_1.2fr_auto] md:gap-8 md:py-7"
                >
                  <span className="display text-lg text-bone/30 transition-colors group-hover:text-blood-hot md:text-xl">{p.number}</span>
                  <span className="display text-3xl leading-none transition-colors group-hover:text-blood-hot md:text-5xl">{tr(p.name)}</span>
                  <span className="hidden text-sm leading-relaxed text-bone-muted md:block">{tr(p.short)}</span>
                  <ArrowUpRight size={18} className="text-bone/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-bone" />
                </Link>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="container-x">
          <p className="label mb-8">{h.exploreLabel}</p>
          <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {next.map((c) => (
              <Link
                key={c.href}
                href={href(c.href)}
                className={cn("group relative flex min-h-[220px] flex-col justify-between p-6 transition-colors md:min-h-[280px] md:p-10", c.accent ? "bg-blood hover:bg-blood-hot" : "bg-ink hover:bg-ink-800")}
              >
                <ArrowUpRight size={24} strokeWidth={1.4} className="self-end transition-transform duration-500 group-hover:rotate-45" />
                <span>
                  <span className="display block text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95]">{c.text[0]}</span>
                  <span className={cn("mt-3 block text-sm", c.accent ? "text-bone/85" : "text-bone-muted")}>{c.text[1]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
