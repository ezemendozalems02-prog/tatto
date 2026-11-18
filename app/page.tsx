import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { LOCALE_COOKIE, pickLocale } from "@/lib/i18n";

/**
 * Raíz del sitio ("/"). Elige el idioma del visitante (cookie o
 * Accept-Language) y redirige a "/es", "/en" o "/pt".
 *
 * Antes esto lo hacía middleware.ts (Edge Function), pero Vercel tiene un
 * bug conocido y sin solución confirmada donde el middleware falla al
 * invocarse por un módulo interno (@swc/helpers) que no empaqueta bien en
 * ciertas combinaciones de Next.js — ver MIDDLEWARE_INVOCATION_FAILED.
 * Una página de servidor normal no usa Edge Function y evita el problema.
 */
export default async function RootRedirect() {
  const [headerList, cookieStore] = await Promise.all([headers(), cookies()]);
  const lang = pickLocale(headerList.get("accept-language") ?? "", cookieStore.get(LOCALE_COOKIE)?.value);
  redirect(`/${lang}`);
}
