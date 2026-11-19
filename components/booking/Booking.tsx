"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import SplitText from "@/components/animations/SplitText";
import { DrawLine, Reveal } from "@/components/animations/Reveal";
import { WhatsAppIcon } from "@/components/icons/Brand";
import { useLocale } from "@/components/layout/LocaleProvider";
import { otherConsultation } from "@/data/booking";
import { offeredProcedures } from "@/data/procedures";
import { formatLong, slotsFor } from "@/lib/availability";
import { cn } from "@/lib/utils";
import { bookingMessage, waLink } from "@/lib/whatsapp";
import Calendar from "./Calendar";

const options = [...offeredProcedures.map((p) => ({ slug: p.slug, name: p.name })), otherConsultation];

type Form = { procedure: string; name: string; whatsapp: string; details: string; consent: boolean };
type Errors = Partial<Record<"procedure" | "date" | "name" | "whatsapp" | "consent", string>>;
const emptyForm: Form = { procedure: "", name: "", whatsapp: "", details: "", consent: false };

export default function Booking() {
  const { lang, t, tr } = useLocale();
  const b = t.booking;
  const [form, setForm] = useState<Form>(emptyForm);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  // Preselección desde la página de un procedimiento: /[lang]/reservas?procedure=slug
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("procedure");
    if (slug && options.some((o) => o.slug === slug)) setForm((f) => ({ ...f, procedure: slug }));
  }, []);

  const slots = useMemo(() => (date ? slotsFor(date) : []), [date]);
  const hasSlots = slots.some((s) => s.available);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!form.procedure) e.procedure = b.errProcedure;
    if (!date || !time) e.date = b.errDate;
    if (form.name.trim().length < 2) e.name = b.errName;
    if (form.whatsapp.replace(/\D/g, "").length < 8) e.whatsapp = b.errPhone;
    if (!form.consent) e.consent = b.errConsent;
    setErrors(e);
    if (Object.keys(e).length || !date || !time) return;

    const proc = options.find((o) => o.slug === form.procedure)!;
    const url = waLink(
      bookingMessage({ procedure: tr(proc.name), dateLabel: formatLong(date, lang), time, name: form.name.trim(), whatsapp: form.whatsapp.trim(), details: form.details }, lang),
    );
    setDone(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setDone(null);
    setForm(emptyForm);
    setDate(null);
    setTime(null);
    setErrors({});
  };

  return (
    <section id="booking" className="relative bg-ink-800 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-x">
        <div className="mb-8 flex items-center gap-4 md:mb-10">
          <DrawLine className="w-10 md:w-16" />
          <span className="label">{b.label}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SplitText key={lang} className="display text-huge lg:col-span-7" lines={[b.title[0], { text: b.title[1], className: "text-blood-hot" }]} />
          <Reveal className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-bone-muted">{b.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 border border-white/[0.08] bg-ink md:mt-14">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center bg-blood">
                <Check size={26} />
              </span>
              <p className="label-red mt-6">{b.sentKicker}</p>
              <h3 className="display mt-3 text-[clamp(2.2rem,5vw,4rem)] leading-[0.9]">
                {b.thanks}, {form.name.trim().split(" ")[0]}.
              </h3>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-bone-muted">{b.sentText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={done} target="_blank" rel="noopener noreferrer" className="btn-red">
                  <WhatsAppIcon size={16} /> {t.common.openWhatsApp}
                </a>
                <button type="button" onClick={reset} className="btn-ghost">
                  {b.newRequest}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="grid lg:grid-cols-2">
              <div className="border-b border-white/[0.08] p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="field-label">{b.date}</p>
                <Calendar
                  value={date}
                  onChange={(d) => {
                    setDate(d);
                    setTime(null);
                  }}
                />
              </div>

              <div className="space-y-7 p-5 sm:p-8">
                <Field label={b.procedure} err={errors.procedure}>
                  <select className="field appearance-none bg-transparent" value={form.procedure} onChange={(e) => set("procedure", e.target.value)}>
                    <option value="" className="bg-ink">
                      {b.choose}
                    </option>
                    {options.map((o) => (
                      <option key={o.slug} value={o.slug} className="bg-ink">
                        {tr(o.name)}
                      </option>
                    ))}
                  </select>
                </Field>

                <div>
                  <p className={cn("field-label", errors.date && "!text-blood-hot")}>
                    {b.time}
                    {date && <span className="ml-2 normal-case tracking-normal text-bone">· {formatLong(date, lang)}</span>}
                  </p>
                  {!date ? (
                    <p className="mt-2 text-sm text-bone-dim">{b.pickDate}</p>
                  ) : !hasSlots ? (
                    <p className="mt-2 text-sm text-bone-dim">{b.noTimes}</p>
                  ) : (
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {slots.map((s) => {
                        const on = time === s.time;
                        return (
                          <button
                            key={s.time}
                            type="button"
                            disabled={!s.available}
                            onClick={() => {
                              setTime(s.time);
                              setErrors((e) => ({ ...e, date: undefined }));
                            }}
                            aria-pressed={on}
                            className={cn(
                              "h-11 border text-sm tabular-nums transition-colors",
                              on && "border-blood bg-blood text-bone",
                              !on && s.available && "border-white/15 hover:border-white/50",
                              !s.available && "cursor-not-allowed border-white/5 text-bone/20 line-through",
                            )}
                          >
                            {s.time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.date && <span className="mt-1 block text-[11px] text-blood-hot">{errors.date}</span>}
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <Field label={b.name} err={errors.name}>
                    <input className="field" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  </Field>
                  <Field label={b.whatsapp} err={errors.whatsapp}>
                    <input className="field" type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} autoComplete="tel" placeholder={b.whatsappPh} />
                  </Field>
                </div>

                <Field label={b.details}>
                  <textarea className="field min-h-[72px] resize-y" rows={2} value={form.details} onChange={(e) => set("details", e.target.value)} placeholder={b.detailsPh} />
                </Field>

                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="peer sr-only" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-blood-hot",
                      form.consent ? "border-blood bg-blood" : errors.consent ? "border-blood-hot" : "border-white/30",
                    )}
                  >
                    {form.consent && <Check size={13} />}
                  </span>
                  <span className={cn("text-[13px] leading-relaxed", errors.consent ? "text-blood-hot" : "text-bone-muted")}>{b.consent}</span>
                </label>

                <div>
                  <button type="submit" className="btn-red w-full">
                    <WhatsAppIcon size={16} /> {b.submit}
                  </button>
                  <p className="mt-3 text-[11px] leading-relaxed text-bone-dim">{b.demoNote}</p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, err, children }: { label: string; err?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={cn("field-label", err && "!text-blood-hot")}>{label}</span>
      {children}
      {err && <span className="mt-1 block text-[11px] text-blood-hot">{err}</span>}
    </label>
  );
}
