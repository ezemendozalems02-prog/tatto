import type { Media } from "./media";
import { ref } from "./references";
import { l, type L } from "@/lib/i18n";

/**
 * WORLDWIDE — RECORRIDO INTERNACIONAL
 *
 * status:
 *  - "past"      → participación ya realizada (cuenta para los contadores)
 *  - "confirmed" → fecha futura confirmada
 *  - "projected" → destino proyectado, sujeto a confirmación (NUNCA se presenta como realizado)
 *
 * Coordenadas: [longitud, latitud]
 */

export type TourStop = {
  id: string;
  city: L;
  country: L;
  countryCode: string;
  coords: [number, number];
  status: "past" | "confirmed" | "projected";
  /** Texto libre traducido: "Base", "Marzo 2027", "Fecha a confirmar". */
  date: L;
  type: L;
  event?: string;
  photo?: Media;
};

const TBC = l("Fecha a confirmar", "Date to be confirmed", "Data a confirmar");
const GUEST = l("Guest / Body Modification", "Guest / Body Modification", "Guest / Body Modification");

export const tour: TourStop[] = [
  {
    id: "bue",
    city: l("Buenos Aires", "Buenos Aires", "Buenos Aires"),
    country: l("Argentina", "Argentina", "Argentina"),
    countryCode: "AR",
    coords: [-58.3816, -34.6037],
    status: "past",
    date: l("Base", "Home base", "Base"),
    type: l("Estudio / Body Modification", "Studio / Body Modification", "Estúdio / Body Modification"),
    photo: { src: null, alt: "Buenos Aires", hint: "Foto en Buenos Aires", ref: ref("session-back-2") },
  },
  {
    id: "mvd",
    city: l("Montevideo", "Montevideo", "Montevidéu"),
    country: l("Uruguay", "Uruguay", "Uruguai"),
    countryCode: "UY",
    coords: [-56.1645, -34.9011],
    status: "past",
    date: TBC,
    type: GUEST,
    photo: { src: null, alt: "Montevideo", hint: "Foto en Montevideo" },
  },
  {
    id: "sao",
    city: l("São Paulo", "São Paulo", "São Paulo"),
    country: l("Brasil", "Brazil", "Brasil"),
    countryCode: "BR",
    coords: [-46.6333, -23.5505],
    status: "past",
    date: TBC,
    type: GUEST,
    photo: { src: null, alt: "São Paulo", hint: "Foto en São Paulo", ref: ref("convention-stage") },
  },
  {
    id: "jpn",
    city: l("Japón", "Japan", "Japão"),
    country: l("Japón", "Japan", "Japão"),
    countryCode: "JP",
    coords: [139.6917, 35.6895],
    status: "projected",
    date: l("Marzo 2027", "March 2027", "Março 2027"),
    type: l("Destino proyectado · sujeto a confirmación", "Projected destination · subject to confirmation", "Destino projetado · sujeito a confirmação"),
    photo: { src: null, alt: "Japan", hint: "Imagen del destino / evento" },
  },
];

/** Contadores calculados SOLO con datos reales (status "past"). */
export const tourStats = () => {
  const past = tour.filter((t) => t.status === "past");
  return {
    countries: new Set(past.map((t) => t.countryCode)).size,
    cities: new Set(past.map((t) => t.id)).size,
    upcoming: tour.filter((t) => t.status !== "past").length,
  };
};
