"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import SplitText from "@/components/animations/SplitText";
import { DrawLine, Reveal } from "@/components/animations/Reveal";
import { WhatsAppIcon } from "@/components/icons/Brand";
import { useLocale } from "@/components/layout/LocaleProvider";
import { otherConsultation } from "@/data/booking";
import { offeredProcedures } from "@/data/procedures";
import { site } from "@/data/site";
import { formatLong, slotsFor } from "@/lib/availability";
import { cn, pad2 } from "@/lib/utils";
import { bookingMessage, waLink } from "@/lib/whatsapp";
import Calendar from "./Calendar";

const options = [
  ...offeredProcedures.map((p) => ({ slug: p.slug, name: p.slug === "tattoo-body-art" ? "Tattoo" : p.name, kicker: p.kicker, number: p.number })),
  { ...otherConsultation, number: pad2(offeredProcedures.length + 1) },
];

type Info = { name: string; country: string; city: string; email: string; whatsapp: string; details: string; adult: boolean; evaluation: boolean };
const emptyInfo: Info = { name: "", country: "", city: "", email: "", whatsapp: "", details: "", adult: false, evaluation: false };

export default function Booking() {
  const { lang, t, tr } = useLocale();
  const b = t.booking;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [procedure, setProcedure] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [info, setInfo] = useState<Info>(emptyInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof Info, string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  // Preselección desde páginas de procedimiento: /[lang]?procedure=slug#booking
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("procedure");
    if (slug && options.some((o) => o.slug === slug)) {
      setProcedure(slug);
      setStep((s) => (s === 0 ? 1 : s));
    }
  }, []);

  const proc = options.find((o) => o.slug === procedure);
  const slots = useMemo(() => (date ? slotsFor(date) : []), [date]);
  const hs = b.hs ? ` ${b.hs}` : "";

  const canNext = [!!procedure, !!date, !!time, true, true][step];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateInfo = () => {
    const e: typeof errors = {};
    if (info.name.trim().length < 3) e.name = b.errName;
    if (!info.country.trim()) e.country = b.errRequired;
    if (!info.city.trim()) e.city = b.errRequired;
    if (!/^\S+@\S+\.\S+$/.test(info.email)) e.email = b.errEmail;
    if (info.whatsapp.replace(/\D/g, "").length < 8) e.whatsapp = b.errPhone;
    if (!info.adult) e.adult = b.errRequired;
    if (!info.evaluation) e.evaluation = b.errRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onInfoSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validateInfo()) go(4);
  };

  const request = () => {
    if (!proc || !date || !time) return;
    const url = waLink(
      bookingMessage(
        {
          procedure: proc.name,
          dateLabel: formatLong(date, lang),
          time,
          name: info.name,
          country: info.country,
          city: info.city,
          email: info.email,
          whatsapp: info.whatsapp,
          details: info.details,
        },
        lang,
      ),
    );
    setDone(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setDone(null);
    setStep(0);
    setProcedure(null);
    setDate(null);
    setTime(null);
    setInfo(emptyInfo);
    setErrors({});
  };

  const setField = (k: keyof Info) => (e: { target: { value: string } }) => {
    setInfo((i) => ({ ...i, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-ink-800 py-28 md:py-44">
      <div className="container-x">
        <div className="mb-10 flex items-center gap-4 md:mb-16">
          <span className="label-red">09</span>
          <DrawLine className="w-10 md:w-16" />
          <span className="label">{b.label}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitText className="display text-giant lg:col-span-8" lines={["Your body.", { text: "Your decision.", className: "text-outline" }, { text: "Your experience.", className: "text-blood-hot" }]} />
          <Reveal className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-bone-muted">
              {b.intro1}
              <span className="text-bone">{b.introStrong}</span>
              {b.intro2}
            </p>
          </Reveal>
        </div>

        <div ref={top} className="mt-16 scroll-mt-24 border border-white/[0.08] bg-ink md:mt-24">
          {/* Progreso */}
          <div className="grid grid-cols-5 border-b border-white/[0.08]">
            {b.steps.map((s, i) => {
              const reached = i <= step || !!done;
              const clickable = !done && i < step;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!clickable}
                  onClick={() => clickable && go(i)}
                  className={cn("relative px-2 py-4 text-left transition-colors md:px-6 md:py-6", i > 0 && "border-l border-white/[0.08]", clickable && "hover:bg-white/[0.02]")}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className={cn("display block text-xl leading-none md:text-3xl", reached ? "text-bone" : "text-bone/20")}>{pad2(i + 1)}</span>
                  <span className={cn("mt-1 hidden text-[10px] uppercase tracking-[0.22em] sm:block", i === step ? "text-blood-hot" : "text-bone-muted")}>{s}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-blood transition-transform duration-700 ease-cine" style={{ transform: `scaleX(${reached ? 1 : 0})` }} />
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Panel */}
            <div className="min-h-[520px] p-5 sm:p-8 md:p-12">
              <AnimatePresence mode="wait" custom={dir}>
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="flex h-16 w-16 items-center justify-center bg-blood">
                      <Check size={28} />
                    </motion.span>
                    <p className="label-red mt-8">{b.sentKicker}</p>
                    <h3 className="display mt-3 text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">
                      {b.thanks}, {info.name.split(" ")[0]}.
                    </h3>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bone-muted">
                      {b.sent1}
                      <span className="text-bone">{b.sentStrong1}</span>
                      {b.sent2}
                      <span className="text-bone">{b.sentStrong2}</span>
                      {b.sent3}
                    </p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <a href={done} target="_blank" rel="noopener noreferrer" className="btn-red">
                        <WhatsAppIcon size={16} /> {t.common.openWhatsApp}
                      </a>
                      <button type="button" onClick={reset} className="btn-ghost">
                        {b.newRequest}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -dir * 40 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-8 flex items-baseline gap-4 md:mb-10">
                      <span className="label-red">
                        {b.step} {pad2(step + 1)}
                      </span>
                      <h3 className="display text-3xl leading-none md:text-5xl">{b.stepTitles[step]}</h3>
                    </div>

                    {step === 0 && (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {options.map((o) => {
                          const on = procedure === o.slug;
                          return (
                            <button
                              key={o.slug}
                              type="button"
                              onClick={() => {
                                setProcedure(o.slug);
                                setTimeout(() => go(1), 220);
                              }}
                              aria-pressed={on}
                              className={cn(
                                "group relative flex min-h-[112px] flex-col justify-between overflow-hidden border p-5 text-left transition-colors duration-300",
                                on ? "border-blood bg-blood text-bone" : "border-white/10 hover:border-white/40",
                              )}
                            >
                              <span className={cn("text-[10px] uppercase tracking-[0.24em]", on ? "text-bone/80" : "text-bone-muted")}>
                                {o.number} · {tr(o.kicker)}
                              </span>
                              <span className="display text-2xl leading-none md:text-3xl">{o.name}</span>
                              <ArrowRight size={16} className={cn("absolute right-5 top-5 transition-all duration-300", on ? "opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60")} />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {step === 1 && (
                      <Calendar
                        value={date}
                        onChange={(d) => {
                          setDate(d);
                          setTime(null);
                        }}
                      />
                    )}

                    {step === 2 && date && (
                      <div>
                        <p className="text-sm text-bone-muted">
                          {b.timesFor} <span className="text-bone">{formatLong(date, lang)}</span>
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                          {slots.map((s) => {
                            const on = time === s.time;
                            return (
                              <button
                                key={s.time}
                                type="button"
                                disabled={!s.available}
                                onClick={() => setTime(s.time)}
                                aria-pressed={on}
                                className={cn(
                                  "flex h-20 flex-col items-center justify-center border transition-colors md:h-24",
                                  on && "border-blood bg-blood",
                                  !on && s.available && "border-white/10 hover:border-white/50",
                                  !s.available && "cursor-not-allowed border-white/5 text-bone/20",
                                )}
                              >
                                <span className={cn("display text-3xl tabular-nums", !s.available && "line-through")}>{s.time}</span>
                                <span className="text-[9px] uppercase tracking-[0.2em] opacity-70">{s.available ? b.available : b.busy}</span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-6 flex items-center gap-2 text-xs text-bone-dim">
                          <Clock size={13} /> {b.tzNote}
                        </p>
                      </div>
                    )}

                    {step === 3 && (
                      <form id="info-form" onSubmit={onInfoSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                        <F label={`${b.fullName} *`} err={errors.name} full>
                          <input className="field" value={info.name} onChange={setField("name")} autoComplete="name" />
                        </F>
                        <F label={`${b.country} *`} err={errors.country}>
                          <input className="field" value={info.country} onChange={setField("country")} autoComplete="country-name" />
                        </F>
                        <F label={`${b.city} *`} err={errors.city}>
                          <input className="field" value={info.city} onChange={setField("city")} autoComplete="address-level2" />
                        </F>
                        <F label={`${b.email} *`} err={errors.email}>
                          <input className="field" type="email" value={info.email} onChange={setField("email")} autoComplete="email" inputMode="email" />
                        </F>
                        <F label={`${b.whatsapp} *`} err={errors.whatsapp}>
                          <input className="field" type="tel" value={info.whatsapp} onChange={setField("whatsapp")} autoComplete="tel" placeholder="+54 9 11 ..." inputMode="tel" />
                        </F>
                        <F label={b.procedure} full>
                          <select className="field appearance-none bg-transparent" value={procedure ?? ""} onChange={(e) => setProcedure(e.target.value)}>
                            {options.map((o) => (
                              <option key={o.slug} value={o.slug} className="bg-ink">
                                {o.name}
                              </option>
                            ))}
                          </select>
                        </F>
                        <F label={b.details} full>
                          <textarea className="field min-h-[100px] resize-y" value={info.details} onChange={setField("details")} placeholder={b.detailsPh} />
                        </F>
                        <div className="space-y-4 sm:col-span-2">
                          <Check2
                            checked={info.adult}
                            err={errors.adult}
                            onChange={(v) => {
                              setInfo((i) => ({ ...i, adult: v }));
                              setErrors((e) => ({ ...e, adult: undefined }));
                            }}
                          >
                            {b.adult1}
                            <strong className="text-bone">{b.adultStrong}</strong>.
                          </Check2>
                          <Check2
                            checked={info.evaluation}
                            err={errors.evaluation}
                            onChange={(v) => {
                              setInfo((i) => ({ ...i, evaluation: v }));
                              setErrors((e) => ({ ...e, evaluation: undefined }));
                            }}
                          >
                            {b.eval1}
                            <strong className="text-bone">{b.evalStrong}</strong>
                            {b.eval2}
                          </Check2>
                        </div>
                      </form>
                    )}

                    {step === 4 && proc && date && time && (
                      <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
                        {[
                          [b.sumProcedure, proc.name],
                          [b.sumDate, formatLong(date, lang)],
                          [b.sumTime, `${time}${hs}`],
                          [b.sumName, info.name],
                          [b.sumLocation, `${info.city}, ${info.country}`],
                          [b.sumContact, `${info.email} · ${info.whatsapp}`],
                        ].map(([k, v]) => (
                          <div key={k} className="bg-ink p-5">
                            <p className="label">{k}</p>
                            <p className="mt-2 break-words text-lg text-bone">{v}</p>
                          </div>
                        ))}
                        {info.details && (
                          <div className="bg-ink p-5 sm:col-span-2">
                            <p className="label">{b.sumDetails}</p>
                            <p className="mt-2 whitespace-pre-line text-sm text-bone-muted">{info.details}</p>
                          </div>
                        )}
                        <div className="bg-ink p-5 sm:col-span-2">
                          <p className="text-xs leading-relaxed text-bone-dim">
                            {b.summaryNote1} ({site.contact.whatsapp.display}) {b.summaryNote2}
                            <span className="text-bone">{b.summaryStrong}</span>
                            {b.summaryNote3}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resumen lateral */}
            <aside className="hidden border-l border-white/[0.08] p-8 lg:block">
              <p className="label-red">{b.yourRequest}</p>
              <dl className="mt-6 space-y-5">
                <Sum k={b.sumProcedure} v={proc?.name} />
                <Sum k={b.sumDate} v={date ? formatLong(date, lang) : undefined} />
                <Sum k={b.sumTime} v={time ?? undefined} />
                <Sum k={b.sumName} v={info.name || undefined} />
              </dl>
              <div className="mt-10 border-t border-white/10 pt-5 text-[11px] leading-relaxed text-bone-dim">
                <span className="mb-2 inline-block border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.24em] text-bone-muted">Demo</span>
                <p>{b.demoNote}</p>
              </div>
            </aside>
          </div>

          {/* Navegación */}
          {!done && (
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] p-4 md:px-12 md:py-6">
              <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-ghost !px-4 disabled:pointer-events-none disabled:opacity-0">
                <ArrowLeft size={14} /> {b.back}
              </button>
              {step < 3 && (
                <button type="button" onClick={() => go(step + 1)} disabled={!canNext} className="btn-red disabled:cursor-not-allowed disabled:bg-ink-600 disabled:text-bone/30">
                  {b.continue} <ArrowRight size={14} />
                </button>
              )}
              {step === 3 && (
                <button type="submit" form="info-form" className="btn-red">
                  {b.review} <ArrowRight size={14} />
                </button>
              )}
              {step === 4 && (
                <button type="button" onClick={request} className="btn-red">
                  {b.request} <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Sum({ k, v }: { k: string; v?: string }) {
  return (
    <div>
      <dt className="label">{k}</dt>
      <dd className={cn("mt-1 text-[15px]", v ? "text-bone" : "text-bone/20")}>{v ?? "—"}</dd>
    </div>
  );
}

function F({ label, err, full, children }: { label: string; err?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className={cn("field-label", err && "!text-blood-hot")}>{label}</span>
      {children}
      {err && <span className="mt-1 block text-[11px] text-blood-hot">{err}</span>}
    </label>
  );
}

function Check2({ checked, onChange, err, children }: { checked: boolean; onChange: (v: boolean) => void; err?: string; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-4">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-blood-hot",
          checked ? "border-blood bg-blood" : err ? "border-blood-hot" : "border-white/30",
        )}
      >
        {checked && <Check size={13} />}
      </span>
      <span className={cn("text-sm leading-relaxed", err ? "text-blood-hot" : "text-bone-muted")}>{children}</span>
    </label>
  );
}
