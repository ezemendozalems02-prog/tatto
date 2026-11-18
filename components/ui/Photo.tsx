"use client";

import Image from "next/image";
import type { Media } from "@/data/media";
import { referenceConfig } from "@/data/references";
import { useLocale } from "@/components/layout/LocaleProvider";
import { cn } from "@/lib/utils";

type Props = {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Muestra el texto de ayuda dentro del placeholder. */
  showHint?: boolean;
  imgClassName?: string;
  /** Oculta la etiqueta REF (para miniaturas muy chicas). */
  hideBadge?: boolean;
  /** Reposiciona la etiqueta REF. */
  badgeClassName?: string;
};

/** Devuelve la imagen a mostrar: foto real > referencia > nada. */
export function resolveSrc(media: Media) {
  if (media.src) return { src: media.src, isRef: false };
  if (referenceConfig.useReferenceImages && media.ref) return { src: media.ref.src, isRef: true };
  return null;
}

/**
 * Foto real si existe; si no, imagen de referencia marcada "REF"; si no,
 * un placeholder editorial que indica qué fotografía va en ese lugar.
 * El contenedor padre define el tamaño (usa `fill`).
 */
export default function Photo({ media, className, sizes = "100vw", priority, showHint = true, imgClassName, hideBadge, badgeClassName }: Props) {
  const { tr, t } = useLocale();
  const alt = tr(media.alt);

  if (media.video) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-ink-700", className)}>
        <video className={cn("h-full w-full object-cover", imgClassName)} src={media.video} poster={media.poster ?? undefined} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
      </div>
    );
  }

  const resolved = resolveSrc(media);
  if (resolved) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-ink-700", className)}>
        <Image
          src={resolved.src}
          alt={resolved.isRef ? `${alt} (${t.common.refBadge})` : alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", resolved.isRef && "grayscale-[35%] contrast-[1.05]", imgClassName)}
        />
        {resolved.isRef && referenceConfig.showBadge && !hideBadge && (
          <span
            className={cn("pointer-events-none absolute right-2 top-2 z-[2] border border-white/25 bg-ink/70 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-bone/70 backdrop-blur-sm", badgeClassName)}
            title={`${t.common.refBadge} · ${media.ref?.author} · ${media.ref?.license}`}
          >
            Ref
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink-800", className)} role="img" aria-label={media.hint}>
      <div className={cn("absolute inset-0", imgClassName)}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,#262626_0%,#111_40%,#070707_75%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,#fff_0_1px,transparent_1px_14px)]" />
        <span className="display pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none text-[clamp(8rem,38vw,36rem)] leading-none text-white/[0.035]">F</span>
        <span className="absolute left-0 top-0 h-[2px] w-16 bg-blood" />
      </div>
      <Crop className="left-3 top-3" />
      <Crop className="right-3 top-3 rotate-90" />
      <Crop className="bottom-3 right-3 rotate-180" />
      <Crop className="bottom-3 left-3 -rotate-90" />
      {showHint && (
        <div className="absolute bottom-5 left-5 right-5">
          <p className="max-w-[24ch] text-[9px] uppercase leading-relaxed tracking-[0.28em] text-white/35">
            <span className="text-blood-hot">● </span>Photo · {media.hint}
          </p>
        </div>
      )}
    </div>
  );
}

function Crop({ className }: { className?: string }) {
  return <span className={cn("pointer-events-none absolute h-3 w-3 border-l border-t border-white/25", className)} aria-hidden />;
}
