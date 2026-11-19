# FROZZ BODYART — Web oficial

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.
Sin base de datos: todo el contenido está en `/data`.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck  # chequeo de TypeScript
```

## Páginas

| Página | Ruta | Contenido |
| --- | --- | --- |
| Inicio | `/es` | Hero, especialidades y accesos al resto del sitio (solo lo esencial) |
| Artista | `/es/artista` | Manifiesto, biografía y recorrido, testimonios, prensa |
| Procedimientos | `/es/body-modification` | Especialidades + seguridad y cuidados (cada una tiene su página) |
| Trabajos | `/es/trabajos` | Portfolio con filtros |
| Giras y eventos | `/es/giras` | Mapa de ciudades, conferencias y talleres |
| Reservas | `/es/reservas` | Turno de simulación en un solo formulario |
| Contacto | `/es/contacto` | Instagram, WhatsApp, invitaciones |

El menú se arma desde `nav` en `data/site.ts`.

## Qué editar y dónde

| Qué | Archivo |
| --- | --- |
| Marca, WhatsApp, Instagram, email, ciudad base, año EST., URL pública | `data/site.ts` |
| Fotos del Hero, Manifesto, About, Contact | `data/media.ts` |
| Procedimientos (textos, cuidados, riesgos, FAQ, galería) | `data/procedures.ts` |
| Portfolio (fotos / videos y filtros) | `data/portfolio.ts` |
| Ciudades del mapa y fechas | `data/tour.ts` |
| Conferencias, workshops, eventos | `data/events.ts` |
| Disponibilidad y horarios de la reserva DEMO | `data/booking.ts` |
| Manifesto, About, Journey, Safety, testimonios, prensa | `data/content.ts` |
| Textos de interfaz (menú, títulos de sección, botones, formularios) por idioma | `data/i18n/ui.ts` |
| Imágenes de referencia y sus créditos | `data/references.ts` · `data/references.json` |

## Idiomas

El sitio está en **español** (idioma principal), con versiones en **inglés y portugués**: `/es`, `/en`, `/pt`.

- Al entrar a `/`, `app/page.tsx` elige el idioma según el navegador (o la última elección del visitante, guardada en una cookie).
- El selector ES / EN / PT está en la navbar, el menú mobile y el footer, y conserva la sección actual.
- Los textos traducibles usan `l("español", "english", "português")`. TypeScript marca cualquier traducción faltante.
- Todo el texto visible, incluidos los titulares y los nombres de los procedimientos, está traducido. Solo la marca (FROZZ BODYART) queda igual.
- Para agregar un idioma: sumarlo en `lib/i18n.ts`, completar su diccionario en `data/i18n/ui.ts` y los campos `l(...)` de `/data`.

## Imágenes de referencia (temporales)

Mientras no estén las fotos de Rou, el sitio muestra fotos con licencia libre de **Wikimedia Commons** (`public/images/ref/`).
**No son trabajos de Rou Viraca**: cada una lleva la etiqueta "REF" y sus créditos (autor y licencia CC) se listan en el footer, como exigen las licencias.

- Una foto real (`src`) reemplaza automáticamente a la referencia en ese lugar.
- Para quitar todas las referencias de una vez: `useReferenceImages: false` en `data/references.ts`.
- **Reemplazarlas por material propio antes de publicar el sitio.**

### Reemplazar fotografías

1. Copiá la foto real a `public/images/...` (por ejemplo `public/images/hero/rou-hero.jpg`).
2. En el archivo de datos, cambiá `src: null` por `src: "/images/hero/rou-hero.jpg"`.

Mientras `src` sea `null`, se muestra un placeholder que indica qué foto va en ese lugar.
Para un video corto, usá `video: "/videos/archivo.mp4"` (y opcionalmente `poster`).

### Reglas de contenido

- Usar solo fotos y trabajos reales de Rou Viraca.
- Los testimonios y la prensa están marcados como `placeholder: true` hasta cargar contenido real.
- En `tour.ts`, los destinos con status `"projected"` nunca se presentan como realizados
  ni suman en los contadores.
- La reserva es una **solicitud**: se envía por WhatsApp y queda pendiente de confirmación por el artista.

## Deploy en Vercel

`vercel.json` fuerza el framework **Next.js**. En el panel de Vercel (Settings → Build and Deployment) no debe haber
overrides de Build Command ni de Output Directory.
