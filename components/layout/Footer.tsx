"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { pages, site } from "@/data/site";
import { referenceConfig, references } from "@/data/references";
import { waLink } from "@/lib/whatsapp";
import { useUI } from "./UIProvider";
import { useLocale } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { openInvite } = useUI();
  const { t, href } = useLocale();
  const [credits, setCredits] = useState(false);
  const year = new Date().getFullYear();

  const links = [
    { label: "Instagram", href: site.contact.instagram.url, external: true },
    { label: "WhatsApp", href: waLink(), external: true },
    { label: t.nav.booking, href: href(pages.booking) },
    { label: t.nav.works, href: href(pages.works) },
    { label: t.nav.tour, href: href(pages.tour) },
    { label: t.nav.contact, href: href(pages.contact) },
  ];

  const refs = Object.values(references);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink pt-16 md:pt-24">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl">FROZZ BODYART</p>
            <p className="label mt-3">{t.brand.tagline}</p>
            <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug text-bone/70">&ldquo;{t.brand.claim}&rdquo;</p>
          </div>

          <nav className="md:col-span-4" aria-label={t.common.menu}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-sm uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone">
                      {l.label}
                      <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <span className="label">{t.common.language}</span>
              <LanguageSwitcher />
            </div>
          </nav>

          <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end">
            <Link href={href(pages.booking)} className="btn-red w-full md:w-auto">
              {t.contact.book}
            </Link>
            <button type="button" onClick={openInvite} className="btn-ghost w-full md:w-auto">
              {t.contact.inviteShort}
            </button>
          </div>
        </div>
      </div>

      {/* Wordmark gigante recortado por la barra inferior */}
      <div className="relative mt-16 h-[17vw] select-none overflow-hidden pt-[2vw] md:mt-24" aria-hidden>
        <p className="display text-outline whitespace-nowrap text-center text-[25vw] leading-none">FROZZ</p>
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Créditos de imágenes de referencia (licencias CC) */}
      {referenceConfig.useReferenceImages && refs.length > 0 && (
        <div className="container-x relative border-t border-white/[0.06]">
          <button type="button" onClick={() => setCredits((v) => !v)} aria-expanded={credits} className="flex w-full items-center justify-between gap-4 py-4 text-left">
            <span className="text-[10px] uppercase tracking-[0.24em] text-bone-dim">
              {t.common.credits} <span className="ml-2 border border-white/15 px-1.5 py-0.5 text-[8px]">Ref</span>
            </span>
            <ChevronDown size={14} className={`text-bone-dim transition-transform ${credits ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {credits && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="max-w-3xl pb-4 text-xs leading-relaxed text-bone-muted">{t.common.refNote}</p>
                <ul className="grid gap-x-8 gap-y-1.5 pb-6 text-[11px] leading-relaxed text-bone-dim sm:grid-cols-2 lg:grid-cols-3">
                  {refs.map((r) => (
                    <li key={r.src}>
                      <a href={r.source} target="_blank" rel="noopener noreferrer" className="text-bone/60 underline-offset-2 hover:text-bone hover:underline">
                        {r.title}
                      </a>{" "}
                      — {r.author} ·{" "}
                      {r.licenseUrl ? (
                        <a href={r.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                          {r.license}
                        </a>
                      ) : (
                        r.license
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="container-x relative flex flex-col gap-2 border-t border-white/[0.06] py-6 text-[10px] uppercase tracking-[0.24em] text-bone-dim sm:flex-row sm:justify-between">
        <span>
          © {year} FROZZ BODYART · {site.artist}
        </span>
        <span>{site.base.country} / {t.hero.worldwide}</span>
      </div>
    </footer>
  );
}
