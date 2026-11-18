"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, localeShort, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";

/**
 * ES / EN / PT. Conserva la página, la sección (#hash) y los parámetros,
 * y recuerda la elección en una cookie (la usa el middleware).
 */
export default function LanguageSwitcher({ className, large, onSwitch }: { className?: string; large?: boolean; onSwitch?: () => void }) {
  const { lang, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const go = (to: Locale) => {
    if (to === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
    onSwitch?.();
    router.push(`${switchLocalePath(pathname, to)}${window.location.search}${window.location.hash}`, { scroll: false });
  };

  return (
    <div className={cn("flex items-center", className)} role="group" aria-label={t.common.language}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 h-3 w-px bg-white/15" aria-hidden />}
          <button
            type="button"
            onClick={() => go(l)}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={l === lang ? "true" : undefined}
            className={cn(
              "px-1.5 py-2 font-semibold uppercase transition-colors",
              large ? "text-sm tracking-[0.2em]" : "text-[10px] tracking-[0.2em]",
              l === lang ? "text-blood-hot" : "text-bone/45 hover:text-bone",
            )}
          >
            {localeShort[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
