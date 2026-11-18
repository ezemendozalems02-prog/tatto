import type { MetadataRoute } from "next";
import { offeredProcedures } from "@/data/procedures";
import { site } from "@/data/site";
import { locales } from "@/lib/i18n";

/** Una entrada por idioma y ruta, con sus alternativas hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/body-modification", priority: 0.8, freq: "monthly" },
    ...offeredProcedures.map((p) => ({ path: `/body-modification/${p.slug}`, priority: 0.7, freq: "monthly" as const })),
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
