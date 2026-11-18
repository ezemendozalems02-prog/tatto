"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { localize, tr, type L, type Locale } from "@/lib/i18n";
import { ui, type UI } from "@/data/i18n/ui";

type Ctx = { lang: Locale; t: UI; tr: (v: L | string) => string; href: (path: string) => string };

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const trL = useCallback((v: L | string) => tr(v, lang), [lang]);
  const href = useCallback((p: string) => localize(p, lang), [lang]);
  return <LocaleCtx.Provider value={{ lang, t: ui[lang], tr: trL, href }}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  const c = useContext(LocaleCtx);
  if (!c) throw new Error("useLocale fuera de LocaleProvider");
  return c;
}
