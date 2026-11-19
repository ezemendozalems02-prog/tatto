import type { Metadata } from "next";
import { isLocale, locales } from "./i18n";

/** hreflang para una ruta (sin el prefijo de idioma). */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/es${path}`,
  };
}

/** Metadata de una página interna: título, descripción, canonical y hreflang. */
export function pageMetadata(lang: string, path: string, title: string, description: string): Metadata {
  if (!isLocale(lang)) return {};
  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages: languageAlternates(path) },
    openGraph: { title, description, url: `/${lang}${path}` },
  };
}
