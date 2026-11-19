/**
 * ─────────────────────────────────────────────────────────────
 *  FROZZ BODYART — CONFIGURACIÓN CENTRAL
 *  Todo lo editable de la marca vive acá. Cambiá un valor y
 *  se actualiza en toda la web (navbar, footer, CTAs, SEO, WhatsApp).
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  brand: "FROZZ BODYART",
  brandShort: "FROZZ",
  artist: "Rou Viraca",
  tagline: "International Body Modification Artist",
  claim: "Beyond the limits of body art.",

  /** Año de inicio de la marca. `null` = se muestra "EST. —" hasta confirmarlo. */
  established: null as number | null,

  /** Ciudad base. Editable. */
  base: {
    city: "Buenos Aires",
    country: "Argentina",
    label: "Argentina / Worldwide",
  },

  /** URL pública definitiva (usada en SEO, sitemap y Open Graph). */
  url: "https://frozzbodyart.com",

  contact: {
    instagram: {
      handle: "@frozz_bodyart",
      url: "https://www.instagram.com/frozz_bodyart/",
    },
    whatsapp: {
      /** Formato visible. */
      display: "+54 11 2302-1099",
      /**
       * Formato internacional para wa.me (sin +, espacios ni guiones).
       * En Argentina los celulares llevan un 9 después del 54: 54 9 11 ...
       */
      number: "5491123021099",
    },
    /** Email editable. `null` = se oculta en la web hasta definirlo. */
    email: null as string | null,
  },

  keywords: [
    "Body Modification Artist",
    "Body Modification Argentina",
    "Tongue Split Artist",
    "Scarification Artist",
    "Subdermal Implants",
    "Body Art",
    "Body Modification Worldwide",
  ],
} as const;

/** Páginas del sitio. El texto de cada link está en data/i18n/ui.ts → nav. */
export const nav = [
  { key: "home", href: "/" },
  { key: "artist", href: "/artista" },
  { key: "bodyMod", href: "/body-modification" },
  { key: "works", href: "/trabajos" },
  { key: "tour", href: "/giras" },
  { key: "booking", href: "/reservas" },
  { key: "contact", href: "/contacto" },
] as const;

export type NavKey = (typeof nav)[number]["key"];

/** Ruta de cada página, para links internos: pages.booking → "/reservas". */
export const pages = Object.fromEntries(nav.map((n) => [n.key, n.href])) as Record<NavKey, string>;

export const estLabel = () => (site.established ? `EST. ${site.established}` : "EST. —");
