import type { Media } from "./media";
import { ref, type RefKey } from "./references";
import { l, type L } from "@/lib/i18n";

/**
 * PORTFOLIO — TRABAJOS SELECCIONADOS
 *
 * Cargar acá SOLO trabajos reales de Rou Viraca (Instagram @frozz_bodyart
 * o material propio). Cada ítem acepta foto (`src`) o video corto (`video`).
 * Mientras tanto se muestran imágenes de referencia (`ref`), marcadas como tales.
 *
 * `shape` controla la proporción en la grilla masonry:
 *  "tall" vertical 3:4.4 · "portrait" 4:5 · "wide" 16:11 · "square" 1:1
 */

export type WorkCategory = "body-mod" | "tattoo" | "scarification" | "implants" | "other";

export type Work = Media & {
  id: string;
  title: L;
  category: WorkCategory;
  shape: "tall" | "portrait" | "wide" | "square";
  /** Descripción traducida. `null` = "a completar". */
  description: L | null;
  year?: string;
};

export const workFilters: { id: "all" | WorkCategory; label: L }[] = [
  { id: "all", label: l("Todos", "All", "Todos") },
  { id: "body-mod", label: l("Modificación", "Body Mod", "Modificação") },
  { id: "tattoo", label: l("Tatuaje", "Tattoo", "Tatuagem") },
  { id: "scarification", label: l("Escarificación", "Scarification", "Escarificação") },
  { id: "implants", label: l("Implantes", "Implants", "Implantes") },
  { id: "other", label: l("Otros", "Other", "Outros") },
];

const w = (id: string, title: L, category: WorkCategory, shape: Work["shape"], hint: string, refKey?: RefKey): Work => ({
  id,
  title,
  category,
  shape,
  hint,
  description: null,
  src: null,
  alt: title,
  ref: refKey ? ref(refKey) : undefined,
});

export const works: Work[] = [
  w("w01", l("Lengua bífida", "Tongue Split", "Língua bifurcada"), "body-mod", "tall", "Tongue split · primer plano", "tongue-split-1"),
  w("w02", l("Geometría en cicatriz", "Scar Geometry", "Geometria em cicatriz"), "scarification", "wide", "Escarificación · pieza horizontal", "scar-back"),
  w("w03", l("Relieve subdérmico", "Subdermal Relief", "Relevo subdérmico"), "implants", "portrait", "Implante · perfil", "horn-implants"),
  w("w04", l("Trabajo en oreja", "Ear Work", "Trabalho na orelha"), "body-mod", "square", "Ear pointing · detalle", "ear-procedure"),
  w("w05", l("Estudio en tinta", "Ink Study", "Estudo em tinta"), "tattoo", "portrait", "Tatuaje · pieza vertical", "tattoo-catrina"),
  w("w06", l("Proceso", "Process", "Processo"), "other", "wide", "Video corto / backstage · horizontal", "session-dark"),
  w("w07", l("Cicatrizado", "Healed", "Cicatrizado"), "scarification", "tall", "Escarificación cicatrizada · vertical", "scar-vine"),
  w("w08", l("Trabajo en lóbulo", "Lobe Work", "Trabalho no lóbulo"), "body-mod", "square", "Lobuloplastia · resultado", "stretched-lobe"),
  w("w09", l("Forma dérmica", "Dermal Form", "Forma dérmica"), "implants", "wide", "Implante · composición horizontal", "implant-beads"),
  w("w10", l("Blackwork", "Blackwork", "Blackwork"), "tattoo", "tall", "Tatuaje · blackwork vertical", "face-skull-tattoo"),
  w("w11", l("Detalle de bífida", "Split Detail", "Detalhe da bifurcação"), "body-mod", "portrait", "Tongue split · movimiento", "tongue-split-2"),
  w("w12", l("Convención", "Convention", "Convenção"), "other", "square", "Evento / convención", "convention-crowd"),
];
