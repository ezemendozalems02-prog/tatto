import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Anton, Inter, Instrument_Serif } from "next/font/google";
import "../globals.css";
import UIProvider from "@/components/layout/UIProvider";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { INTRO_KEY } from "@/lib/constants";
import { languageAlternates } from "@/lib/seo";
import { isLocale, locales, ogLocale, tr, type Locale } from "@/lib/i18n";
import { site } from "@/data/site";
import { offeredProcedures } from "@/data/procedures";
import { ui } from "@/data/i18n/ui";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = ui[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.title, template: `%s | ${site.brand}` },
    description: t.description,
    keywords: [...site.keywords],
    authors: [{ name: site.artist }],
    creator: site.artist,
    alternates: { canonical: `/${lang}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      url: `${site.url}/${lang}`,
      siteName: site.brand,
      title: t.title,
      description: t.description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    robots: { index: true, follow: true },
    category: "art",
  };
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

function jsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#artist`,
        name: site.artist,
        alternateName: site.brandShort,
        jobTitle: "Body Modification Artist",
        url: site.url,
        sameAs: [site.contact.instagram.url],
        worksFor: { "@id": `${site.url}/#business` },
        knowsAbout: ["Body Modification", ...offeredProcedures.map((p) => tr(p.fullName, lang))],
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${site.url}/#business`,
        name: site.brand,
        description: ui[lang].meta.description,
        url: `${site.url}/${lang}`,
        telephone: site.contact.whatsapp.display.replace(/\s|-/g, ""),
        sameAs: [site.contact.instagram.url],
        founder: { "@id": `${site.url}/#artist` },
        address: { "@type": "PostalAddress", addressLocality: site.base.city, addressCountry: "AR" },
        areaServed: [{ "@type": "Country", name: "Argentina" }, { "@type": "Place", name: "Worldwide" }],
        availableLanguage: ["es", "en", "pt"],
        makesOffer: offeredProcedures.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: tr(p.fullName, lang), url: `${site.url}/${lang}/body-modification/${p.slug}` },
        })),
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.brand, inLanguage: lang },
    ],
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca el preloader como visto ANTES del primer pintado (sin parpadeo) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("${INTRO_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      </head>
      <body className="grain">
        <LocaleProvider lang={lang}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-blood focus:px-4 focus:py-2">
            {ui[lang].common.skip}
          </a>
          <UIProvider>
            <Preloader />
            <Cursor />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </UIProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
