import Contact from "@/components/sections/Contact";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.contact, ui[lang].meta.contactTitle, ui[lang].meta.contactDescription) : {};
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}
