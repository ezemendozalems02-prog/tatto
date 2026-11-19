import Worldwide from "@/components/events/Worldwide";
import Events from "@/components/events/Events";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.tour, ui[lang].meta.tourTitle, ui[lang].meta.tourDescription) : {};
}

export default function TourPage() {
  return (
    <div className="pt-16">
      <Worldwide />
      <Events />
    </div>
  );
}
