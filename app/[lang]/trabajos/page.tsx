import Portfolio from "@/components/gallery/Portfolio";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.works, ui[lang].meta.worksTitle, ui[lang].meta.worksDescription) : {};
}

export default function WorksPage() {
  return (
    <div className="pt-16">
      <Portfolio />
    </div>
  );
}
