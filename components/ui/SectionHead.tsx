import SplitText from "@/components/animations/SplitText";
import { DrawLine, Reveal } from "@/components/animations/Reveal";
import type { ReactNode } from "react";

type Line = string | { text: string; className?: string };

/** Encabezado editorial común: etiqueta + título partido. */
export default function SectionHead({
  index,
  label,
  title,
  aside,
  className = "",
  titleClassName = "text-giant",
}: {
  index?: string;
  label: string;
  title: Line[];
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={className}>
      <div className="mb-8 flex items-center gap-4 md:mb-12">
        {index && <span className="label-red">{index}</span>}
        <DrawLine className="w-10 md:w-16" />
        <span className="label">{label}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-y-10">
        <SplitText lines={title} className={`display lg:col-span-12 ${titleClassName}`} />
        {aside && (
          <Reveal delay={0.3} className="lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10">
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
