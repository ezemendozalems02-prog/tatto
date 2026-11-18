"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { useUI } from "@/components/layout/UIProvider";
import Photo from "@/components/ui/Photo";
import SectionHead from "@/components/ui/SectionHead";
import { eventBlocks } from "@/data/events";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Events() {
  const { openInvite } = useUI();
  const [hover, setHover] = useState(0);
  const { t, tr } = useLocale();

  return (
    <section id="events" className="relative bg-ink py-28 md:py-44">
      <div className="container-x">
        <SectionHead
          index="06"
          label="Conferences & Workshops"
          title={["Beyond", "the studio."]}
          aside={
            <p className="display text-2xl leading-tight md:text-3xl">
              Sharing knowledge.<br />
              <span className="text-blood-hot">Building culture.</span>
            </p>
          }
        />

        {/* Acordeón editorial: en desktop la columna activa se expande */}
        <div className="mt-16 flex flex-col gap-4 md:mt-24 lg:h-[680px] lg:flex-row lg:gap-3">
          {eventBlocks.map((b, i) => {
            const on = hover === i;
            const upcoming = b.items.filter((e) => e.upcoming);
            const past = b.items.filter((e) => !e.upcoming);
            return (
              <Reveal
                key={b.id}
                delay={i * 0.1}
                className={cn(
                  "group relative min-h-[520px] overflow-hidden border border-white/[0.07] transition-[flex-grow] duration-[900ms] ease-out lg:min-h-0",
                  on ? "lg:flex-[2.4]" : "lg:flex-1",
                )}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
              >
                <div className={cn("absolute inset-0 transition-transform duration-[1.4s] ease-out", on && "lg:scale-105")}>
                  <Photo media={b.cover} sizes="(min-width:1024px) 50vw, 100vw" showHint={false} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />

                <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="display text-7xl leading-none text-outline md:text-8xl">{b.number}</span>
                    {!b.cover.src && !b.cover.ref && <span className="max-w-[16ch] text-right text-[9px] uppercase tracking-[0.24em] text-white/30">● Photo · {b.cover.hint}</span>}
                  </div>

                  <div>
                    <h3 className="display text-[clamp(2.4rem,4vw,4rem)] leading-[0.9]">{b.title}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone/80">{tr(b.lead)}</p>

                    <div className={cn("grid transition-all duration-700 ease-out", on ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0")}>
                      <div className="overflow-hidden">
                        <ul className="mt-6 space-y-2">
                          {b.points.map((p, pi) => (
                            <li key={pi} className="flex items-center gap-3 text-sm text-bone-muted">
                              <span className="h-px w-4 bg-blood" /> {tr(p)}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 border-t border-white/10 pt-4">
                          <p className="label-red">{t.events.upcoming}</p>
                          {upcoming.length ? (
                            <ul className="mt-2 space-y-2">
                              {upcoming.map((e) => (
                                <li key={e.name} className="text-sm">
                                  <span className="text-bone">{e.name}</span> <span className="text-bone-muted">· {e.city}, {e.country} · {e.date}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-2 text-sm text-bone-muted">
                              {t.events.tba} <span className="text-bone">@frozz_bodyart</span> {t.events.tbaEnd}
                            </p>
                          )}
                          {past.length > 0 && (
                            <ul className="mt-4 space-y-1">
                              {past.map((e) => (
                                <li key={e.name} className="text-xs text-bone-muted">
                                  {e.date} — {e.name}, {e.city} · {e.role}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal className="mt-16 md:mt-24">
          <button
            type="button"
            onClick={openInvite}
            className="group relative flex w-full flex-col items-start gap-6 overflow-hidden border border-white/10 p-6 text-left transition-colors duration-500 hover:border-blood md:flex-row md:items-center md:justify-between md:p-12"
            data-cursor="Invite"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-blood transition-transform duration-700 ease-cine group-hover:scale-x-100" />
            <span className="relative">
              <span className="label block transition-colors group-hover:text-bone">{t.events.ctaKicker}</span>
              <span className="display mt-3 block text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">Invite FROZZ to your event</span>
            </span>
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-white/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-bone md:h-24 md:w-24">
              <ArrowUpRight size={28} strokeWidth={1.2} />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
