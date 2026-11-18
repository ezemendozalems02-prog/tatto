import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import Photo from "@/components/ui/Photo";
import Faq from "@/components/ui/Faq";
import SplitText from "@/components/animations/SplitText";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { getProcedure, offeredProcedures } from "@/data/procedures";
import { safety } from "@/data/content";
import { site } from "@/data/site";
import { ui } from "@/data/i18n/ui";
import { isLocale, localize, locales, tr } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";

type Params = { lang: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((lang) => offeredProcedures.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProcedure(slug);
  if (!p || !isLocale(lang)) return {};
  const title = `${p.fullName} — ${tr(p.kicker, lang)}`;
  const path = `/body-modification/${p.slug}`;
  return {
    title,
    description: `${tr(p.short, lang)} ${ui[lang].meta.procedureSuffix} ${site.artist}, ${site.tagline}.`,
    alternates: { canonical: `/${lang}${path}`, languages: languageAlternates(path) },
    openGraph: { title: `${title} | ${site.brand}`, description: tr(p.short, lang), url: `/${lang}${path}` },
  };
}

export default async function ProcedurePage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const p = getProcedure(slug);
  if (!p || !p.offered || !isLocale(lang)) notFound();

  const t = ui[lang].procedure;
  const L = (v: Parameters<typeof tr>[0]) => tr(v, lang);
  const idx = offeredProcedures.findIndex((x) => x.slug === p.slug);
  const prev = offeredProcedures[(idx - 1 + offeredProcedures.length) % offeredProcedures.length];
  const next = offeredProcedures[(idx + 1) % offeredProcedures.length];
  const bookHref = localize(`/?procedure=${p.slug}#booking`, lang);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.fullName,
    alternateName: L(p.kicker),
    description: L(p.short),
    provider: { "@id": `${site.url}/#business` },
    areaServed: "Worldwide",
    url: `${site.url}/${lang}/body-modification/${p.slug}`,
    inLanguage: lang,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* HERO */}
      <header className="relative min-h-[100svh] overflow-hidden bg-ink pt-28 md:pt-36">
        <div className="absolute inset-0 md:left-[45%]">
          <Photo media={p.cover} priority sizes="(min-width:768px) 55vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30 md:bg-gradient-to-r md:from-ink md:via-ink/40 md:to-transparent" />
        </div>

        <div className="container-x relative flex min-h-[calc(100svh-9rem)] flex-col justify-end pb-16 md:justify-center md:pb-0">
          <Link href={localize("/#body-mod", lang)} className="mb-10 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.24em] text-bone-muted transition-colors hover:text-bone">
            <ArrowLeft size={14} /> {t.back}
          </Link>
          <p className="display text-[clamp(5rem,16vw,14rem)] leading-[0.8] text-outline">{p.number}</p>
          <SplitText as="h1" className="display -mt-4 text-giant md:-mt-8" lines={[p.name]} />
          <p className="label-red mt-6">{L(p.kicker)}</p>
          <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-bone/90 md:text-3xl">{L(p.short)}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={bookHref} className="btn-red">
              {t.request} <ArrowRight size={14} />
            </Link>
            <a href="#aftercare" className="btn-ghost">
              {t.aftercareBtn}
            </a>
          </div>
        </div>
      </header>

      {/* INTRO + FICHA */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label mb-8">{t.s1}</p>
            <div className="space-y-6">
              {p.intro.map((x, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className={i === 0 ? "font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.2]" : "max-w-2xl text-[16px] leading-relaxed text-bone-muted"}>{L(x)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <p className="label mb-8">{t.general}</p>
            <dl className="border-t border-white/10">
              {p.facts.map((f, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 border-b border-white/10 py-4">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-bone-muted">{L(f.label)}</dt>
                  <dd className="text-sm text-bone">{L(f.value)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-ink-800 py-24 md:py-36" aria-label={t.galleryAria}>
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-huge">Gallery</h2>
            <p className="label hidden md:block">
              {t.real} · {site.contact.instagram.handle}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {p.gallery.map((g, i) => (
              <MaskReveal
                key={i}
                delay={i * 0.1}
                className={
                  i % 3 === 0
                    ? "relative aspect-[4/5] md:col-span-7 md:aspect-[16/12]"
                    : i % 3 === 1
                      ? "relative aspect-[4/5] md:col-span-5 md:mt-24"
                      : "relative aspect-[4/5] md:col-span-5 md:col-start-4 md:aspect-[4/4.4]"
                }
              >
                <Photo media={g} sizes="(min-width:768px) 50vw, 100vw" />
              </MaskReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x">
          <p className="label mb-6">{t.s2}</p>
          <h2 className="display text-huge">How it works</h2>
          <ol className="mt-14 grid gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {p.process.map((s, i) => (
              <li key={i} className="bg-ink p-6 md:p-8">
                <span className="display text-5xl text-outline-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-6 text-2xl">{L(s.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-muted">{L(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RIESGOS + CUIDADOS */}
      <section id="aftercare" className="scroll-mt-20 bg-ink-800 py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="label mb-6">{t.s3}</p>
            <h2 className="display text-big">
              {t.risks1}
              <br />
              <span className="text-outline">{t.risks2}</span>
            </h2>
            <ul className="mt-10 border-t border-white/10">
              {p.considerations.map((c, i) => (
                <li key={i} className="flex gap-4 border-b border-white/10 py-5 text-[15px] leading-relaxed text-bone/80">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-blood" /> {L(c)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-6">{t.s4}</p>
            <h2 className="display text-big">
              {t.care1}
              <br />
              <span className="text-outline">{t.care2}</span>
            </h2>
            <ul className="mt-10 border-t border-white/10">
              {p.aftercare.map((c, i) => (
                <li key={i} className="flex gap-4 border-b border-white/10 py-5 text-[15px] leading-relaxed text-bone/80">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-blood" /> {L(c)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-bone-dim">{t.careNote}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label mb-6">{t.s5}</p>
            <h2 className="display text-big">
              {ui[lang].safety.faq1}
              <br />
              <span className="text-outline">{ui[lang].safety.faq2}</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={p.faq.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
          </div>
        </div>

        <div className="container-x mt-20">
          <div className="flex flex-col gap-5 border border-blood/40 bg-blood/[0.04] p-6 md:flex-row md:p-10">
            <ShieldCheck size={28} strokeWidth={1.2} className="shrink-0 text-blood-hot" />
            <p className="text-sm leading-relaxed text-bone/75">{L(safety.disclaimer)}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink py-24 md:py-36">
        <div className="container-x text-center">
          <p className="label-red">{t.ctaKicker}</p>
          <h2 className="display mx-auto mt-6 max-w-5xl text-giant">Request a consultation</h2>
          <Link href={bookHref} className="btn-red mt-12">
            {t.request} · {p.name} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* PREV / NEXT */}
      <nav className="grid border-t border-white/[0.07] bg-ink sm:grid-cols-2" aria-label={t.otherAria}>
        <Link href={localize(`/body-modification/${prev.slug}`, lang)} className="group border-b border-white/[0.07] p-6 transition-colors hover:bg-white/[0.02] sm:border-b-0 sm:border-r md:p-12">
          <span className="label flex items-center gap-2">
            <ArrowLeft size={12} /> {ui[lang].common.prev}
          </span>
          <span className="display mt-3 block text-4xl transition-colors group-hover:text-blood-hot md:text-6xl">{prev.name}</span>
        </Link>
        <Link href={localize(`/body-modification/${next.slug}`, lang)} className="group p-6 text-right transition-colors hover:bg-white/[0.02] md:p-12">
          <span className="label flex items-center justify-end gap-2">
            {ui[lang].common.next} <ArrowRight size={12} />
          </span>
          <span className="display mt-3 block text-4xl transition-colors group-hover:text-blood-hot md:text-6xl">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
