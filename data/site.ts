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

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "Artist", href: "/#artist" },
  { label: "Body Mod", href: "/#body-mod" },
  { label: "Works", href: "/#works" },
  { label: "Worldwide", href: "/#worldwide" },
  { label: "Events", href: "/#events" },
  { label: "Booking", href: "/#booking" },
  { label: "Contact", href: "/#contact" },
] as const;

export const estLabel = () => (site.established ? `EST. ${site.established}` : "EST. —");
