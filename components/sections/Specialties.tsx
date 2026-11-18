"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import Photo from "@/components/ui/Photo";
import SectionHead from "@/components/ui/SectionHead";
import { offeredProcedures, type Procedure } from "@/data/procedures";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

/**
 * Grilla editorial asimétrica. Cada posición tiene su propio span,
 * proporción y desplazamiento vertical, para romper la repetición.
 */
const layout = [
  { wrap: "md:col-span-7", aspect: "aspect-[4/5] md:aspect-[16/12]", offset: "" },
  { wrap: "md:col-span-5 md:mt-40", aspect: "aspect-[4/5]", offset: "" },
  { wrap: "md:col-span-5 md:col-start-1 md:-mt-10", aspect: "aspect-[4/5] md:aspect-[4/5.4]", offset: "" },
  { wrap: "md:col-span-6 md:col-start-7 md:mt-24", aspect: "aspect-[4/5] md:aspect-[16/13]", offset: "" },
  { wrap: "md:col-span-6 md:col-start-2", aspect: "aspect-[4/5] md:aspect-[16/12]", offset: "" },
  { wrap: "md:col-span-4 md:col-start-9 md:mt-32", aspect: "aspect-[4/5]", offset: "" },
];

export default function Specialties({ headIndex = "03" }: { headIndex?: string }) {
  const { t } = useLocale();
  return (
    <section id="body-mod" className="relative bg-ink-800 py-28 md:py-44">
      <div className="container-x">
        <SectionHead
          index={headIndex}
          label="Specialties"
          title={["Body Modification", { text: "The art of", className: "text-outline" }, { text: "transformation.", className: "text-outline" }]}
          aside={
            <p className="text-sm leading-relaxed text-bone-muted">
              {t.specialties.aside}
            </p>
          }
        />

        <div className="mt-20 grid gap-16 md:mt-32 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {offeredProcedures.map((p, i) => (
            <Card key={p.slug} p={p} l={layout[i % layout.length]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ p, l, index }: { p: Procedure; l: (typeof layout)[number]; index: number }) {
  const alignRight = index % 2 === 1;
  const { t, tr, href } = useLocale();
  return (
    <Reveal className={cn("relative", l.wrap)} delay={0.05}>
      <Link href={href(`/body-modification/${p.slug}`)} className="group block" data-cursor="Explore" aria-label={`${p.name} — ${t.specialties.explore}`}>
        <div className={cn("relative overflow-hidden", l.aspect)}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]">
            <Photo media={p.cover} sizes="(min-width:768px) 50vw, 100vw" />
          </div>
          {/* capa roja sutil */}
          <div className="absolute inset-0 bg-blood mix-blend-multiply opacity-0 transition-opacity duration-700 group-hover:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* nombre completo en hover (siempre visible en mobile) */}
          <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
            <div className="overflow-hidden">
              <p className="label-red translate-y-0 transition-transform duration-700 ease-out md:translate-y-full md:group-hover:translate-y-0">{tr(p.kicker)}</p>
            </div>
            <div className="overflow-hidden">
              <p className="display mt-1 text-2xl leading-none text-bone md:translate-y-[110%] md:text-4xl md:transition-transform md:duration-700 md:ease-out md:group-hover:translate-y-0">
                {p.fullName}
              </p>
            </div>
          </div>
        </div>

        {/* número editorial superpuesto */}
        <span
          className={cn(
            "display pointer-events-none absolute -top-10 text-[5.5rem] leading-none text-outline transition-colors duration-500 group-hover:[-webkit-text-stroke-color:#ff1728] md:-top-16 md:text-[9rem]",
            alignRight ? "right-2 md:-right-4" : "left-2 md:-left-6",
          )}
          aria-hidden
        >
          {p.number}
        </span>

        <div className="mt-6 grid grid-cols-[1fr_auto] items-start gap-6">
          <div>
            <h3 className="display text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.9]">{p.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-muted">{tr(p.short)}</p>
          </div>
          <span className="mt-1 flex items-center gap-2 border-b border-white/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 group-hover:border-blood-hot group-hover:text-blood-hot">
            {t.specialties.explore} <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
