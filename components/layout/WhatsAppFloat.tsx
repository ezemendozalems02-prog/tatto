"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/Brand";
import { waLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { useLocale } from "./LocaleProvider";
import { useUI } from "./UIProvider";

export default function WhatsAppFloat() {
  const { introDone } = useUI();
  const { t } = useLocale();
  return (
    <motion.a
      href={waLink(t.common.whatsappHello)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp · ${site.brand}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={introDone ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-4 right-4 z-[55] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-bone shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-blood-hot hover:bg-blood md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 rounded-full border border-blood-hot/60 animate-pulseDot [animation-duration:3s]" aria-hidden />
      <WhatsAppIcon size={22} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-bone px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        WhatsApp
      </span>
    </motion.a>
  );
}
