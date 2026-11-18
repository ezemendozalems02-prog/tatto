import { procedures } from "@/data/procedures";

export default function Marquee() {
  const items = [...procedures.map((p) => p.name), "Worldwide"];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,4vw,3.4rem)] leading-none md:px-10">{t}</span>
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
