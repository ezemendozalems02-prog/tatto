import type { MetadataRoute } from "next";
import { offeredProcedures } from "@/data/procedures";
import { nav, pages, site } from "@/data/site";
import { locales } from "@/lib/i18n";

/** Una entrada por idioma y ruta, con sus alternativas hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    ...nav.map((n) => ({ path: n.href === "/" ? "" : n.href, priority: n.href === "/" ? 1 : 0.8, freq: n.href === "/" ? ("weekly" as const) : ("monthly" as const) })),
    ...offeredProcedures.map((p) => ({ path: `${pages.bodyMod}/${p.slug}`, priority: 0.7, freq: "monthly" as const })),
  ];
  return paths.flatMap(({ path, priority, freq }) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}
