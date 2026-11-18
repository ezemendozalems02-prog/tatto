"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, type MouseEvent } from "react";
import { nav, site } from "@/data/site";
import { pad2 } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/Brand";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "./LocaleProvider";

const ease = [0.76, 0, 0.24, 1] as const;

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { lang, t, href } = useLocale();

  /**
   * En la home: mientras el menú todavía cubre la pantalla, liberamos el
   * bloqueo de scroll y saltamos instantáneamente a la sección; luego la
   * cortina del menú se levanta y la revela. (Un smooth scroll largo se
   * interrumpe durante la animación de salida del menú.)
   */
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    const el = id ? document.getElementById(id) : null;
    if (pathname !== `/${lang}` || !el) return onClose();
    e.preventDefault();
    document.documentElement.style.overflow = "";
    el.scrollIntoView({ behavior: "instant", block: "start" });
    history.replaceState(null, "", `#${id}`);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0% 0)" }}
          transition={{ duration: 0.8, ease }}
          role="dialog"
          aria-modal="true"
          aria-label={t.common.menu}
        >
          <div className="container-x flex h-[76px] items-center justify-between">
            <span className="display text-2xl">FROZZ</span>
            <LanguageSwitcher large className="ml-auto mr-4" onSwitch={onClose} />
            <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-white/15" aria-label={t.common.closeMenu}>
              <X size={18} strokeWidth={1.4} />
            </button>
          </div>

          <span className="pointer-events-none absolute -right-6 top-24 select-none font-display text-[42vh] leading-none text-white/[0.025]">F</span>

          <nav className="container-x flex flex-1 flex-col justify-center">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-white/[0.07]">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.05 }}
                  >
                    <Link href={href(item.href)} onClick={(e) => go(e, item.href)} className="group flex items-baseline gap-4 py-2.5 sm:py-3">
                      <span className="label-red w-6">{pad2(i + 1)}</span>
                      <span className="display text-[clamp(2.1rem,9.5vw,4.5rem)] leading-[1] transition-colors group-hover:text-blood-hot">{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex flex-col gap-4 pb-8 pt-6 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href={href("/#booking")} onClick={(e) => go(e, "/#booking")} className="btn-red w-full sm:w-auto">
              Book an experience
            </Link>
            <div className="flex items-center gap-6 text-bone-muted">
              <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-bone">
                <InstagramIcon size={16} /> {site.contact.instagram.handle}
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-bone" aria-label="WhatsApp">
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
