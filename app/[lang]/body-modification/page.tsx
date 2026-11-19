import Specialties from "@/components/sections/Specialties";
import Safety from "@/components/sections/Safety";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.bodyMod, ui[lang].meta.bodyModTitle, ui[lang].meta.bodyModDescription) : {};
}

export default function BodyModificationIndex() {
  return (
    <div className="pt-16">
      <Specialties />
      <Safety />
    </div>
  );
}
