import type { L } from "@/lib/i18n";
import { l } from "@/lib/i18n";
import { ref, type RefImage } from "./references";

/**
 * Fotografías del sitio.
 *
 * CÓMO REEMPLAZAR:
 * 1. Copiá la foto real en /public/images/... (por ejemplo /public/images/hero/rou-hero.jpg)
 * 2. Poné la ruta en `src`. La foto real reemplaza automáticamente a la
 *    imagen de referencia (`ref`). Sin `src` ni `ref`, se muestra un
 *    placeholder editorial que indica qué foto va en ese lugar.
 *
 * Nunca usar fotos de otros artistas ni personas generadas por IA como
 * si fueran de Rou.
 */

export type Media = {
  /** Ruta dentro de /public o `null` mientras no exista la foto real. */
  src: string | null;
  alt: string | L;
  /** Texto que se ve en el placeholder para saber qué foto falta. */
  hint: string;
  /** Imagen de referencia temporal (ver data/references.ts). */
  ref?: RefImage;
  /** Opcional: video corto (mp4/webm en /public/videos). */
  video?: string | null;
  poster?: string | null;
};

export const media = {
  hero: {
    src: null,
    alt: l("Rou Viraca, artista de body modification", "Rou Viraca, body modification artist", "Rou Viraca, artista de body modification"),
    hint: "Retrato principal de Rou Viraca · vertical · alto contraste",
    ref: ref("hero-mask"),
  },
  manifesto: {
    src: null,
    alt: l("Detalle artístico de una modificación corporal", "Artistic detail of a body modification", "Detalhe artístico de uma modificação corporal"),
    hint: "Detalle artístico · textura de piel / trabajo en macro",
    ref: ref("implant-head"),
  },
  manifestoFull: {
    src: null,
    alt: l("Trabajo en el estudio", "Work in the studio", "Trabalho no estúdio"),
    hint: "Foto horizontal de Rou trabajando · luz dramática",
    ref: ref("session-dark"),
  },
  artist: {
    src: null,
    alt: l("Retrato editorial de Rou Viraca", "Editorial portrait of Rou Viraca", "Retrato editorial de Rou Viraca"),
    hint: "Retrato editorial de Rou · formato vertical grande",
    ref: ref("portrait-face-tattoo"),
  },
  artistSecondary: {
    src: null,
    alt: l("Rou Viraca en un evento", "Rou Viraca at an event", "Rou Viraca em um evento"),
    hint: "Rou en estudio o evento · detalle",
    ref: ref("artists-sleeve"),
  },
  contact: {
    src: null,
    alt: "Rou Viraca",
    hint: "Foto de cierre · Rou mirando a cámara",
    ref: ref("session-arm"),
  },
} satisfies Record<string, Media>;
