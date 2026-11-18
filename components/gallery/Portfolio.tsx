"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import Photo from "@/components/ui/Photo";
import SectionHead from "@/components/ui/SectionHead";
import { workFilters, works, type Work, type WorkCategory } from "@/data/portfolio";
import { site } from "@/data/site";
import { cn, pad2 } from "@/lib/utils";
import Lightbox from "./Lightbox";
import { useLocale } from "@/components/layout/LocaleProvider";

const aspect: Record<Work["shape"], string> = {
  tall: "aspect-[3/4.4]",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/11]",
  square: "aspect-square",
};

export const categoryLabel = (c: WorkCategory) => workFilters.find((f) => f.id === c)?.label ?? c;

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof workFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLocale();

  const list = useMemo(() => (filter === "all" ? works : works.filter((w) => w.category === filter)), [filter]);
  const count = (id: string) => (id === "all" ? works.length : works.filter((w) => w.category === id).length);

  return (
    <section id="works" className="relative bg-ink py-28 md:py-44">
      <div className="container-x">
        <SectionHead
          index="04"
          label="Portfolio — Selected works"
          title={["Selected", { text: "Works", className: "pl-[12vw] text-outline" }]}
          aside={<p className="display text-2xl leading-tight md:text-3xl">No limits.<br />No rules.<br /><span className="text-blood-hot">Just art.</span></p>}
        />

        {/* Filtros */}
        <div className="sticky top-[64px] z-20 -mx-4 mt-16 border-y border-white/[0.07] bg-ink/85 px-4 backdrop-blur-lg sm:-mx-6 sm:px-6 md:static md:mx-0 md:mt-24 md:border-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-3 md:gap-2" role="tablist" aria-label={t.works.filterAria}>
            {workFilters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative shrink-0 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                    on ? "text-bone" : "text-bone/45 hover:text-bone",
                  )}
                >
                  {on && <motion.span layoutId="filter-bg" className="absolute inset-0 border border-blood bg-blood/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">
                    {f.label} <sup className="ml-0.5 text-[8px] text-blood-hot">{pad2(count(f.id))}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="mt-8 columns-1 gap-4 sm:columns-2 md:mt-12 md:gap-6 lg:columns-3"
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            {list.map((w, i) => (
              <motion.button
                key={w.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.35) }}
                onClick={() => setOpen(i)}
                className="group relative mb-4 block w-full break-inside-avoid text-left md:mb-6"
                data-cursor="View"
                aria-label={`${t.works.view} ${w.title}`}
              >
                <div className={cn("relative w-full overflow-hidden", aspect[w.shape])}>
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]">
                    <Photo media={w} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" showHint={!w.src} hideBadge={false} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
                  {w.video && (
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 backdrop-blur"><Play size={14} /></span>
                  )}
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 transition-all duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <div>
                      <p className="label-red">{categoryLabel(w.category)}</p>
                      <p className="display mt-1 text-2xl leading-none">{w.title}</p>
                    </div>
                    <span className="display text-sm text-bone/60">{w.id.replace("w", "")}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-bone-muted">{t.works.more}</p>
          <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {t.works.follow} {site.contact.instagram.handle}
          </a>
        </div>
      </div>

      <Lightbox items={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
