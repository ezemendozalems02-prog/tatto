import type { Media } from "./media";
import { ref } from "./references";
import { l, type L } from "@/lib/i18n";

/**
 * CONFERENCES · WORKSHOPS · INTERNATIONAL EVENTS
 *
 * Agregá eventos reales en `items` con este formato:
 * {
 *   name: "Nombre del evento",
 *   city: "Ciudad", country: "País",
 *   date: "Mes Año",
 *   description: l("…", "…", "…"),
 *   role: "Speaker / Workshop / Guest artist",
 *   media: { src: "/images/events/....jpg", alt: "...", hint: "" },
 *   upcoming: true | false,
 * }
 */

export type EventItem = {
  name: string;
  city: string;
  country: string;
  date: string;
  description: L;
  role: string;
  media?: Media;
  upcoming?: boolean;
};

export type EventBlock = {
  id: "conferences" | "workshops" | "international";
  number: string;
  title: string;
  lead: L;
  points: L[];
  cover: Media;
  items: EventItem[];
};

export const eventBlocks: EventBlock[] = [
  {
    id: "conferences",
    number: "01",
    title: "Conferences",
    lead: l(
      "Charlas y presentaciones sobre body modification, proceso artístico, trayectoria y cultura.",
      "Talks and presentations on body modification, artistic process, career and culture.",
      "Palestras e apresentações sobre body modification, processo artístico, trajetória e cultura.",
    ),
    points: [
      l("Historia y cultura del body mod", "Body mod history and culture", "História e cultura do body mod"),
      l("Proceso creativo y ética del oficio", "Creative process and craft ethics", "Processo criativo e ética do ofício"),
      l("Experiencia y trayectoria", "Experience and career", "Experiência e trajetória"),
    ],
    cover: { src: null, alt: l("Charla", "Talk", "Palestra"), hint: "Rou en escenario / charla", ref: ref("session-back-2") },
    items: [],
  },
  {
    id: "workshops",
    number: "02",
    title: "Workshops",
    lead: l(
      "Espacios de formación e intercambio profesional para artistas y estudios.",
      "Training and professional exchange for artists and studios.",
      "Espaços de formação e intercâmbio profissional para artistas e estúdios.",
    ),
    points: [
      l("Modalidad presencial", "In person", "Presencial"),
      l("Grupos reducidos", "Small groups", "Grupos reduzidos"),
      l("Temáticas a definir con cada organizador", "Topics defined with each organizer", "Temas definidos com cada organizador"),
    ],
    cover: { src: null, alt: "Workshop", hint: "Workshop · grupo / demostración", ref: ref("artists-sleeve") },
    items: [],
  },
  {
    id: "international",
    number: "03",
    title: "International Events",
    lead: l(
      "Convenciones, exposiciones, encuentros y participaciones como guest artist.",
      "Conventions, exhibitions, gatherings and guest artist appearances.",
      "Convenções, exposições, encontros e participações como guest artist.",
    ),
    points: [
      l("Convenciones", "Conventions", "Convenções"),
      l("Exposiciones y demostraciones", "Exhibitions and demonstrations", "Exposições e demonstrações"),
      l("Guest spots internacionales", "International guest spots", "Guest spots internacionais"),
    ],
    cover: { src: null, alt: l("Convención internacional", "International convention", "Convenção internacional"), hint: "Convención · stand o escenario", ref: ref("convention-crowd") },
    items: [],
  },
];
