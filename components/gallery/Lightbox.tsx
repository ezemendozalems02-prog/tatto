"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Photo from "@/components/ui/Photo";
import { workFilters, type Work } from "@/data/portfolio";
import { pad2 } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

type Props = { items: Work[]; index: number | null; onClose: () => void; onIndex: (i: number) => void };

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const [dir, setDir] = useState(0);
  const { t, tr } = useLocale();
  const open = index !== null && !!items[index];

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const item = open ? items[index!] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col bg-ink/[0.97] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="dialog"
          aria-modal="true"
          aria-label={tr(item.title)}
        >
          <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
            <span className="display text-xl tabular-nums">
              {pad2(index! + 1)} <span className="text-bone/30">/ {pad2(items.length)}</span>
            </span>
            <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot hover:bg-blood" aria-label={t.common.close}>
              <X size={18} strokeWidth={1.4} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? "12%" : "-12%", opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? "-12%" : "12%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                className="relative h-full max-h-[72vh] w-full max-w-[1100px] touch-pan-y"
              >
                <Photo media={item} sizes="90vw" />
              </motion.div>
            </AnimatePresence>

            <button type="button" onClick={() => go(-1)} className="absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot hover:bg-blood md:flex" aria-label={t.common.prev}>
              <ArrowLeft size={18} strokeWidth={1.4} />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot hover:bg-blood md:flex" aria-label={t.common.next}>
              <ArrowRight size={18} strokeWidth={1.4} />
            </button>
          </div>

          <div className="container-x flex shrink-0 flex-col gap-4 py-6 md:flex-row md:items-end md:justify-between md:py-8">
            <div>
              <p className="label-red">{tr(workFilters.find((f) => f.id === item.category)?.label ?? "")}</p>
              <h3 className="display mt-1 text-4xl leading-none md:text-5xl">{tr(item.title)}</h3>
              <p className="mt-2 max-w-xl text-sm text-bone-muted">{item.description ? tr(item.description) : t.works.pending}</p>
              {item.ref && !item.src && (
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                  {t.common.refBadge} · {item.ref.author} · {item.ref.license}
                </p>
              )}
            </div>
            <div className="flex gap-2 md:hidden">
              <button type="button" onClick={() => go(-1)} className="flex h-12 flex-1 items-center justify-center border border-white/15" aria-label={t.common.prev}><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => go(1)} className="flex h-12 flex-1 items-center justify-center border border-white/15" aria-label={t.common.next}><ArrowRight size={16} /></button>
            </div>
            <p className="hidden text-[10px] uppercase tracking-[0.3em] text-bone-dim md:block">{t.works.keys}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
