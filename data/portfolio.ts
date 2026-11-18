import type { Media } from "./media";
import { ref, type RefKey } from "./references";
import type { L } from "@/lib/i18n";

/**
 * PORTFOLIO — SELECTED WORKS
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
  title: string;
  category: WorkCategory;
  shape: "tall" | "portrait" | "wide" | "square";
  /** Descripción traducida. `null` = "a completar". */
  description: L | null;
  year?: string;
};

export const workFilters: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "body-mod", label: "Body Mod" },
  { id: "tattoo", label: "Tattoo" },
  { id: "scarification", label: "Scarification" },
  { id: "implants", label: "Implants" },
  { id: "other", label: "Other" },
];

const w = (id: string, title: string, category: WorkCategory, shape: Work["shape"], hint: string, refKey?: RefKey): Work => ({
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
  w("w01", "Tongue Split", "body-mod", "tall", "Tongue split · primer plano", "tongue-split-1"),
  w("w02", "Scar Geometry", "scarification", "wide", "Escarificación · pieza horizontal", "scar-back"),
  w("w03", "Subdermal Relief", "implants", "portrait", "Implante · perfil", "horn-implants"),
  w("w04", "Ear Work", "body-mod", "square", "Ear pointing · detalle", "ear-procedure"),
  w("w05", "Ink Study", "tattoo", "portrait", "Tatuaje · pieza vertical", "tattoo-catrina"),
  w("w06", "Process", "other", "wide", "Video corto / backstage · horizontal", "session-dark"),
  w("w07", "Healed", "scarification", "tall", "Escarificación cicatrizada · vertical", "scar-vine"),
  w("w08", "Lobe Work", "body-mod", "square", "Lobuloplastia · resultado", "stretched-lobe"),
  w("w09", "Dermal Form", "implants", "wide", "Implante · composición horizontal", "implant-beads"),
  w("w10", "Blackwork", "tattoo", "tall", "Tatuaje · blackwork vertical", "face-skull-tattoo"),
  w("w11", "Split Detail", "body-mod", "portrait", "Tongue split · movimiento", "tongue-split-2"),
  w("w12", "Convention", "other", "square", "Evento / convención", "convention-crowd"),
];
