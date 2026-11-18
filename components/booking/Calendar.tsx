"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { bookingConfig } from "@/data/booking";
import { dayStatus, formatShort, monthGrid, monthName, nextAvailable, startOfDay, toKey, weekdayLong, weekdaysShort } from "@/lib/availability";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

type Props = { value: Date | null; onChange: (d: Date) => void };

export default function Calendar({ value, onChange }: Props) {
  const { lang, t } = useLocale();
  const c = t.calendar;
  // "today" se calcula en el cliente para evitar desfases de hidratación
  const [today, setToday] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const td = startOfDay(new Date());
    setToday(td);
    const first = value ?? nextAvailable(1, td)[0] ?? td;
    setView({ y: first.getFullYear(), m: first.getMonth() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestions = useMemo(() => (today ? nextAvailable(5, today) : []), [today]);
  const weekdays = useMemo(() => weekdaysShort(lang), [lang]);

  if (!today || !view) return <div className="h-[420px] animate-pulse bg-white/[0.02]" />;

  const cells = monthGrid(view.y, view.m);
  const minIdx = today.getFullYear() * 12 + today.getMonth();
  const curIdx = view.y * 12 + view.m;
  const canPrev = curIdx > minIdx;
  const canNext = curIdx < minIdx + bookingConfig.monthsAhead;
  const month = monthName(view.m, lang);

  const shift = (d: number) => {
    setDir(d);
    const date = new Date(view.y, view.m + d, 1);
    setView({ y: date.getFullYear(), m: date.getMonth() });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_240px] lg:gap-10">
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button type="button" onClick={() => shift(-1)} disabled={!canPrev} className="flex h-11 w-11 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/15" aria-label={c.prevMonth}>
            <ChevronLeft size={18} strokeWidth={1.4} />
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={`${view.y}-${view.m}`} initial={{ opacity: 0, y: dir * 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -dir * 10 }} transition={{ duration: 0.25 }} className="display text-3xl tracking-wide md:text-4xl" aria-live="polite">
              {month} <span className="text-bone/35">{view.y}</span>
            </motion.p>
          </AnimatePresence>
          <button type="button" onClick={() => shift(1)} disabled={!canNext} className="flex h-11 w-11 items-center justify-center border border-white/15 transition-colors hover:border-blood-hot disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/15" aria-label={c.nextMonth}>
            <ChevronRight size={18} strokeWidth={1.4} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 text-center">
          {weekdays.map((d) => (
            <span key={d} className="py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-bone-dim">
              {d}
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${view.y}-${view.m}`}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-7 gap-1"
            role="grid"
            aria-label={`${month} ${view.y}`}
          >
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const st = dayStatus(d, today);
              const avail = st === "available";
              const selected = value && toKey(value) === toKey(d);
              const isToday = toKey(d) === toKey(today);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!avail}
                  onClick={() => onChange(d)}
                  aria-pressed={!!selected}
                  aria-label={`${weekdayLong(d, lang)} ${d.getDate()} — ${avail ? c.yes : st === "full" ? c.full : c.no}`}
                  className={cn(
                    "relative flex aspect-square items-center justify-center text-sm transition-colors duration-200 md:text-base",
                    selected && "bg-blood font-semibold text-bone",
                    !selected && avail && "text-bone hover:bg-white/[0.06] hover:text-blood-hot",
                    !avail && "cursor-not-allowed text-bone/15",
                    st === "full" && "line-through decoration-white/20",
                  )}
                >
                  <span className="tabular-nums">{d.getDate()}</span>
                  {avail && !selected && <span className="absolute bottom-[18%] h-1 w-1 rounded-full bg-blood-hot" />}
                  {isToday && <span className="absolute inset-1 border border-white/20" />}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-bone-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blood-hot" /> {c.available}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-blood" /> {c.selected}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-bone/20 line-through">00</span> {c.unavailable}
          </span>
        </div>
      </div>

      <div>
        <p className="label-red">{c.nextDays}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {suggestions.map((d) => {
            const selected = value && toKey(value) === toKey(d);
            return (
              <button
                key={toKey(d)}
                type="button"
                onClick={() => {
                  onChange(d);
                  setView({ y: d.getFullYear(), m: d.getMonth() });
                }}
                className={cn("flex items-center justify-between border px-4 py-3 text-left transition-colors", selected ? "border-blood bg-blood/15" : "border-white/10 hover:border-white/40")}
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-bone-muted">{weekdayLong(d, lang)}</span>
                  <span className="display text-xl uppercase">{formatShort(d, lang)}</span>
                </span>
                <ChevronRight size={14} className="text-bone/40" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
