"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { site } from "@/data/site";
import { inviteMessage, waLink, type InviteRequest } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

const empty: InviteRequest = { name: "", organization: "", country: "", city: "", type: "", date: "", message: "", contact: "" };

export default function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [data, setData] = useState<InviteRequest>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof InviteRequest, boolean>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const { lang, t } = useLocale();
  const i = t.invite;

  const set = (k: keyof InviteRequest) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setSent(null);
      setData(empty);
      setErrors({});
    }, 600);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const required: (keyof InviteRequest)[] = ["name", "organization", "country", "city", "type", "contact"];
    const errs: typeof errors = {};
    required.forEach((k) => !data[k].trim() && (errs[k] = true));
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const url = waLink(inviteMessage(data, lang));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal open={open} onClose={close} label="Invite FROZZ to your event">
      <div className="p-6 pt-20 md:p-12 md:pt-16">
        <p className="label-red">{i.kicker}</p>
        <h2 className="display mt-4 text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.9]">
          Invite FROZZ<br />
          <span className="text-outline">to your event.</span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-bone-muted">
          {i.lead}
        </p>

        {sent ? (
          <div className="mt-12 border border-white/10 p-8">
            <span className="flex h-12 w-12 items-center justify-center bg-blood"><Check size={22} /></span>
            <h3 className="display mt-6 text-4xl">{i.readyTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-muted">
              {i.readyText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={sent} target="_blank" rel="noopener noreferrer" className="btn-red">{t.common.openWhatsApp} <ArrowRight size={14} /></a>
              {site.contact.email && (
                <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent(i.emailSubject + " — " + data.organization)}`} className="btn-ghost">{t.common.sendEmail}</a>
              )}
              <button type="button" onClick={close} className="btn-ghost">{t.common.close}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            <Field label={`${i.name} *`} error={errors.name}><input className="field" value={data.name} onChange={set("name")} autoComplete="name" /></Field>
            <Field label={`${i.organization} *`} error={errors.organization}><input className="field" value={data.organization} onChange={set("organization")} autoComplete="organization" /></Field>
            <Field label={`${i.country} *`} error={errors.country}><input className="field" value={data.country} onChange={set("country")} autoComplete="country-name" /></Field>
            <Field label={`${i.city} *`} error={errors.city}><input className="field" value={data.city} onChange={set("city")} autoComplete="address-level2" /></Field>
            <Field label={`${i.type} *`} error={errors.type} full group>
              <div className="mt-2 flex flex-wrap gap-2">
                {i.types.map((ty) => (
                  <button
                    type="button"
                    key={ty}
                    onClick={() => set("type")({ target: { value: ty } })}
                    aria-pressed={data.type === ty}
                    className={cn(
                      "border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors",
                      data.type === ty ? "border-blood bg-blood text-bone" : "border-white/15 text-bone/70 hover:border-white/40 hover:text-bone",
                    )}
                  >
                    {ty}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={i.date}><input className="field" value={data.date} onChange={set("date")} placeholder={i.datePh} /></Field>
            <Field label={`${i.contact} *`} error={errors.contact}><input className="field" value={data.contact} onChange={set("contact")} autoComplete="email" /></Field>
            <Field label={i.message} full>
              <textarea className="field min-h-[110px] resize-y" value={data.message} onChange={set("message")} placeholder={i.messagePh} />
            </Field>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-relaxed text-bone-dim">{i.hint}</p>
              <button type="submit" className="btn-red">{i.submit} <ArrowRight size={14} /></button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

function Field({ label, error, full, group, children }: { label: string; error?: boolean; full?: boolean; group?: boolean; children: React.ReactNode }) {
  const Tag = group ? "div" : "label";
  const { t } = useLocale();
  return (
    <Tag className={cn("block", full && "sm:col-span-2")} {...(group ? { role: "group", "aria-label": label } : {})}>
      <span className={cn("field-label", error && "!text-blood-hot")}>{label}</span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-blood-hot">{t.common.required}</span>}
    </Tag>
  );
}
