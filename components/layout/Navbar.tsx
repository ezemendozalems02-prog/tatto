"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, pages, site } from "@/data/site";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "./LocaleProvider";
import { useUI } from "./UIProvider";

/** true si `pathname` es esa página o una subpágina suya. */
export function isActive(pathname: string, lang: string, href: string) {
  const full = href === "/" ? `/${lang}` : `/${lang}${href}`;
  return href === "/" ? pathname === full : pathname === full || pathname.startsWith(`${full}/`);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { introDone } = useUI();
  const { lang, t, href } = useLocale();
  const isHome = pathname === `/${lang}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          solid ? "border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className={cn("container-x flex items-center justify-between transition-[height] duration-500", solid ? "h-[64px]" : "h-[76px] md:h-[88px]")} aria-label={t.common.menu}>
          <Link href={href("/")} className="group flex items-baseline gap-2" aria-label={site.brand}>
            <span className="display text-2xl leading-none tracking-wide md:text-[28px]">FROZZ</span>
            <span className={cn("text-[9px] font-semibold uppercase tracking-[0.5em] text-bone-muted transition-all duration-500", solid ? "max-w-0 overflow-hidden opacity-0 md:max-w-[120px] md:opacity-100" : "max-w-[120px]")}>
              Bodyart
            </span>
            <span className="ml-1 h-1.5 w-1.5 translate-y-[-2px] bg-blood transition-transform duration-500 group-hover:rotate-45" />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => {
              const on = isActive(pathname, lang, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={href(item.href)}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-[10.5px] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                      on ? "text-bone" : "text-bone/55 hover:text-bone",
                    )}
                  >
                    {t.nav[item.key]}
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 bg-blood-hot"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:flex" />
            <Link href={href(pages.booking)} className="btn-red hidden !px-5 !py-3 sm:inline-flex">
              {t.nav.book}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex h-11 w-11 flex-col items-end justify-center gap-[7px] xl:hidden"
              aria-label={t.common.openMenu}
              aria-expanded={open}
            >
              <span className="h-px w-7 bg-bone transition-all duration-300 group-hover:w-5" />
              <span className="h-px w-5 bg-blood-hot transition-all duration-300 group-hover:w-7" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
