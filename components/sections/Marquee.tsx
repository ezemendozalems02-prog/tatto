"use client";

import { procedures } from "@/data/procedures";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Marquee() {
  const { t, tr } = useLocale();
  const items = [...procedures.map((p) => tr(p.name)), t.hero.worldwide];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((x) => (
        <span key={x} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,4vw,3.4rem)] leading-none md:px-10">{x}</span>
          <span className="h-2 w-2 rotate-45 bg-blood md:h-2.5 md:w-2.5" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-ink-800 py-5 md:py-7" aria-hidden>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
