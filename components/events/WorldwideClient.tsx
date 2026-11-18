"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Counter from "@/components/animations/Counter";
import { Reveal } from "@/components/animations/Reveal";
import Photo from "@/components/ui/Photo";
import SectionHead from "@/components/ui/SectionHead";
import { tour, tourStats } from "@/data/tour";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

type Props = { dots: string; stops: { id: string; x: number; y: number }[]; width: number; height: number };

export default function WorldwideClient({ dots, stops, width, height }: Props) {
  const [active, setActive] = useState(tour[0].id);
  const { t, tr } = useLocale();
  const tx = t;
  const pos = useMemo(() => Object.fromEntries(stops.map((s) => [s.id, s])), [stops]);
  const stats = tourStats();
  const current = tour.find((t) => t.id === active)!;

  // Arcos desde la base hacia cada destino
  const base = tour[0];
  const arcs = tour.slice(1).map((t) => {
    const a = pos[base.id];
    const b = pos[t.id];
    const mx = (a.x + b.x) / 2;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const my = Math.min(a.y, b.y) - Math.max(16, dist * 0.35);
    return { id: t.id, d: `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`, status: t.status };
  });

  return (
    <section id="worldwide" className="relative overflow-hidden bg-ink-800 py-28 md:py-44">
      <div className="container-x">
        <SectionHead
          index="05"
          label="International — Worldwide artist"
          title={["Worldwide.", { text: "One artist.", className: "text-outline" }, { text: "Different worlds.", className: "text-outline" }]}
          titleClassName="text-huge"
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          {/* MAPA */}
          <Reveal className="relative lg:col-span-8">
            <div className="relative border border-white/[0.06] bg-ink">
              <svg viewBox={`0 40 ${width} ${height - 40}`} className="h-auto w-full" role="img" aria-label={t.worldwide.mapAria}>
                <path d={dots} stroke="#2b2b2b" strokeWidth={2.4} strokeLinecap="round" fill="none" />

                {arcs.map((a, i) => (
                  <motion.path
                    key={a.id}
                    d={a.d}
                    fill="none"
                    stroke={a.status === "past" ? "#d10b19" : "#ff1728"}
                    strokeWidth={a.id === active ? 1.6 : 1}
                    strokeDasharray={a.status === "past" ? undefined : "4 5"}
                    strokeOpacity={a.id === active ? 1 : 0.55}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.4 + i * 0.3 }}
                  />
                ))}

                {tour.map((t) => {
                  const p = pos[t.id];
                  const on = t.id === active;
                  const past = t.status === "past";
                  return (
                    <g key={t.id} className="cursor-pointer" onMouseEnter={() => setActive(t.id)} onClick={() => setActive(t.id)}>
                      <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
                      {past && <circle cx={p.x} cy={p.y} r={4} fill="#ff1728" className="animate-pulseDot" style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }} />}
                      <circle cx={p.x} cy={p.y} r={on ? 5 : 3.5} fill={past ? "#ff1728" : "#050505"} stroke="#ff1728" strokeWidth={past ? 0 : 1.4} style={{ transition: "r .3s" }} />
                    </g>
                  );
                })}

                {/* etiqueta de la ciudad activa */}
                <AnimatePresence mode="wait">
                  <motion.g key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <line x1={pos[active].x} y1={pos[active].y} x2={pos[active].x + 26} y2={pos[active].y - 26} stroke="#f5f5f5" strokeOpacity={0.5} strokeWidth={0.8} />
                    <text x={pos[active].x + 30} y={pos[active].y - 30} fill="#f5f5f5" fontSize={15} letterSpacing={2} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                      {tr(current.city)}
                    </text>
                    <text x={pos[active].x + 30} y={pos[active].y - 14} fill="#ff1728" fontSize={8} letterSpacing={2.2} style={{ textTransform: "uppercase" }}>
                      {current.status === "past" ? tr(current.date) : `${tr(current.date)} · ${t.worldwide.toConfirm}`}
                    </text>
                  </motion.g>
                </AnimatePresence>
              </svg>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-bone-muted md:px-6">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blood-hot" /> {t.worldwide.done}</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-blood-hot" /> {t.worldwide.projectedLegend}</span>
              </div>
            </div>

            {/* CONTADORES — sólo datos reales */}
            <div className="mt-10 grid grid-cols-3 border-t border-white/10">
              {[
                { n: stats.countries, l: t.worldwide.countries },
                { n: stats.cities, l: t.worldwide.cities },
                { n: stats.upcoming, l: t.worldwide.upcoming },
              ].map((s, i) => (
                <div key={s.l} className={cn("pt-6", i > 0 && "border-l border-white/10 pl-4 md:pl-8")}>
                  <Counter to={s.n} className="display text-5xl leading-none md:text-7xl" />
                  <p className="label mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* LISTA DE DESTINOS */}
          <div className="lg:col-span-4">
            <div role="list" className="border-t border-white/10">
              {tour.map((t, i) => {
                const on = t.id === active;
                return (
                  <Reveal key={t.id} delay={i * 0.06}>
                    <div role="listitem">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(t.id)}
                        onFocus={() => setActive(t.id)}
                        onClick={() => setActive(t.id)}
                        className={cn("group w-full border-b border-white/10 py-5 text-left transition-colors", on && "bg-white/[0.02]")}
                        aria-pressed={on}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className={cn("display text-3xl leading-none transition-colors md:text-4xl", on ? "text-bone" : "text-bone/50 group-hover:text-bone")}>{tr(t.city)}</span>
                          <span className="text-[10px] uppercase tracking-[0.24em] text-bone-muted">{t.countryCode}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em]">
                          <span className={t.status === "past" ? "text-blood-hot" : "border border-blood-hot/60 px-1.5 py-0.5 text-blood-hot"}>
                            {t.status === "past" ? tx.worldwide.done : t.status === "confirmed" ? tx.worldwide.confirmed : tx.worldwide.projected}
                          </span>
                          <span className="text-bone-muted">{tr(t.date)}</span>
                        </div>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                              <div className="flex gap-4 pt-4">
                                {t.photo && (
                                  <div className="relative aspect-square w-20 shrink-0">
                                    <Photo media={t.photo} sizes="80px" showHint={false} />
                                  </div>
                                )}
                                <div className="text-sm leading-relaxed text-bone-muted">
                                  <p>{tr(t.type)}</p>
                                  {t.event && <p className="text-bone">{t.event}</p>}
                                  <p>{tr(t.country)}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-bone-dim">
              {tx.worldwide.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
