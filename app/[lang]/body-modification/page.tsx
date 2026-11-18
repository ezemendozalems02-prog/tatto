import type { Metadata } from "next";
import Specialties from "@/components/sections/Specialties";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/data/i18n/ui";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: ui[lang].meta.bodyModTitle,
    description: ui[lang].meta.bodyModDescription,
    alternates: { canonical: `/${lang}/body-modification`, languages: languageAlternates("/body-modification") },
  };
}

export default function BodyModificationIndex() {
  return (
    <div className="pt-16">
      <Specialties headIndex="—" />
    </div>
  );
}
