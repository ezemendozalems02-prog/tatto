import { intlLocale, type Locale } from "./i18n";
import { bookingConfig } from "@/data/booking";
import { pad2 } from "./utils";

/** Fecha local → "YYYY-MM-DD" sin desfases de zona horaria. */
export const toKey = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Hash determinístico simple para que la "agenda ocupada" demo sea estable. */
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export type DayStatus = "available" | "full" | "closed" | "past" | "blocked";

export function dayStatus(date: Date, today = startOfDay(new Date())): DayStatus {
  const d = startOfDay(date);
  const key = toKey(d);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + bookingConfig.minNoticeDays);

  if (d < minDate) return "past";
  if (bookingConfig.blockedDates.includes(key)) return "blocked";
  if (bookingConfig.blockedRanges.some((r) => key >= r.from && key <= r.to)) return "blocked";
  if (!bookingConfig.workingDays.includes(d.getDay())) return "closed";
  if (hash(key) < bookingConfig.demoBusyRatio) return "full";
  return "available";
}

export function slotsFor(date: Date) {
  const key = toKey(date);
  const base = bookingConfig.slotsByWeekday[date.getDay()] ?? bookingConfig.slots;
  return base.map((time) => ({
    time,
    available: hash(`${key}-${time}`) >= bookingConfig.demoBusySlotRatio,
  }));
}

export function nextAvailable(count: number, from = startOfDay(new Date())) {
  const out: Date[] = [];
  const cursor = new Date(from);
  for (let i = 0; i < 120 && out.length < count; i++) {
    if (dayStatus(cursor, from) === "available") out.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** Grilla de un mes que arranca en lunes. `null` = celda vacía. */
export function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= days; i++) cells.push(new Date(year, month, i));
  while (cells.length % 7) cells.push(null);
  return cells;
}


const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Nombre del mes ("Noviembre", "November", "Novembro"). */
export const monthName = (m: number, lang: Locale) => cap(new Intl.DateTimeFormat(intlLocale[lang], { month: "long" }).format(new Date(2026, m, 1)));

/** Iniciales de días empezando en lunes. */
export const weekdaysShort = (lang: Locale) =>
  Array.from({ length: 7 }, (_, i) => cap(new Intl.DateTimeFormat(intlLocale[lang], { weekday: "short" }).format(new Date(2026, 0, 5 + i))).replace(".", "").slice(0, 3));

export const weekdayLong = (d: Date, lang: Locale) => cap(new Intl.DateTimeFormat(intlLocale[lang], { weekday: "long" }).format(d));

export const formatLong = (d: Date, lang: Locale) =>
  cap(new Intl.DateTimeFormat(intlLocale[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d));

export const formatShort = (d: Date, lang: Locale) => new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "short" }).format(d).replace(".", "");
