import { locales } from "./i18n";

/** hreflang para una ruta (sin el prefijo de idioma). */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/es${path}`,
  };
}
