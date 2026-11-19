import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Press from "@/components/sections/Press";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.artist, ui[lang].meta.artistTitle, ui[lang].meta.artistDescription) : {};
}

export default function ArtistPage() {
  return (
    <div className="pt-16">
      <Manifesto />
      <About />
      <Testimonials />
      <Press />
    </div>
  );
}
