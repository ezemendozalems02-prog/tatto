import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n";

/** Elige idioma: cookie (elección del visitante) → navegador → español. */
function pickLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const header = req.headers.get("accept-language") ?? "";
  const prefs = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const p of prefs) if ((locales as readonly string[]).includes(p.lang)) return p.lang as Locale;
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  try {
    const { pathname, search } = req.nextUrl;
    const first = pathname.split("/")[1];
    if (isLocale(first)) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  } catch {
    // Ante cualquier fallo inesperado (header malformado, etc.), no tirar
    // un 500: redirigir al idioma por defecto es mejor que romper el sitio.
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  // Todo menos assets, internos de Next y archivos con extensión (robots.txt, sitemap.xml, imágenes…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
