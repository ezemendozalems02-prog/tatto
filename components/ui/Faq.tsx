"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="border-b border-white/10">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className="border-t border-white/10">
            <h4>
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={cn("text-lg transition-colors md:text-xl", on ? "text-bone" : "text-bone/75 group-hover:text-bone")}>{it.q}</span>
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500", on ? "rotate-45 border-blood bg-blood" : "border-white/20")}>
                  <Plus size={16} strokeWidth={1.4} />
                </span>
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-bone-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
