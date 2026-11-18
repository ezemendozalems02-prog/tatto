/**
 * Idiomas del sitio. Para agregar uno nuevo:
 * 1. Sumalo a `locales` (+ nombre e Intl).
 * 2. Completá su diccionario en data/i18n/ui.ts y los campos `L` de /data.
 *    TypeScript marca todo lo que falte traducir.
 */
export const locales = ["es", "en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = { es: "Español", en: "English", pt: "Português" };
export const localeShort: Record<Locale, string> = { es: "ES", en: "EN", pt: "PT" };
export const intlLocale: Record<Locale, string> = { es: "es-AR", en: "en-US", pt: "pt-BR" };
export const ogLocale: Record<Locale, string> = { es: "es_AR", en: "en_US", pt: "pt_BR" };

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Texto traducido a todos los idiomas. */
export type L = Record<Locale, string>;
/** Atajo para textos traducidos: l(español, inglés, portugués). */
export const l = (es: string, en: string, pt: string): L => ({ es, en, pt });

export const isLocale = (v: string | undefined | null): v is Locale => !!v && (locales as readonly string[]).includes(v);

/** Resuelve un texto traducible (o devuelve el string tal cual). */
export function tr(v: L | string, lang: Locale): string {
  return typeof v === "string" ? v : v[lang] ?? v[defaultLocale];
}

/** Antepone el idioma a una ruta interna: ("/#booking", "en") → "/en#booking". */
export function localize(path: string, lang: Locale) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path.startsWith("#")) return `/${lang}${path}`;
  if (path === "/" || path === "") return `/${lang}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Cambia el idioma de una ruta ya localizada, conservando el resto. */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
