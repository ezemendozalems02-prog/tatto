import { site } from "@/data/site";
import { ui } from "@/data/i18n/ui";
import type { Locale } from "./i18n";

/** Link a WhatsApp con mensaje prellenado. */
export function waLink(message?: string, number: string = site.contact.whatsapp.number) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Une bloques de texto con una línea en blanco entre ellos, omitiendo los vacíos. */
const blocks = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join("\n\n");
const lines = (...l: string[]) => l.join("\n");

export type BookingRequest = {
  procedure: string;
  dateLabel: string;
  time: string;
  name: string;
  whatsapp: string;
  details: string;
};

/** Mensaje de solicitud de turno, en el idioma del visitante. */
export function bookingMessage(r: BookingRequest, lang: Locale) {
  const m = ui[lang].booking.msg;
  const hs = ui[lang].booking.hs;
  return blocks(
    m.hello,
    lines(`*${m.request}*`, `• ${m.procedure}: ${r.procedure}`, `• ${m.date}: ${r.dateLabel}`, `• ${m.time}: ${r.time}${hs ? " " + hs : ""}`),
    lines(`*${m.data}*`, `• ${m.name}: ${r.name}`, `• ${m.whatsapp}: ${r.whatsapp}`),
    r.details.trim() && lines(`*${m.details}*`, r.details.trim()),
    m.confirm,
  );
}

export type InviteRequest = {
  name: string;
  organization: string;
  country: string;
  city: string;
  type: string;
  date: string;
  message: string;
  contact: string;
};

export function inviteMessage(r: InviteRequest, lang: Locale) {
  const m = ui[lang].invite.msg;
  return blocks(
    m.hello,
    lines(`*${m.invitation}*`, `• ${m.type}: ${r.type}`, `• ${m.org}: ${r.organization}`, `• ${m.place}: ${r.city}, ${r.country}`, `• ${m.date}: ${r.date.trim() || m.tbd}`),
    lines(`*${m.contact}*`, `• ${m.name}: ${r.name}`, `• ${m.reach}: ${r.contact}`),
    r.message.trim() && lines(`*${m.message}*`, r.message.trim()),
  );
}
