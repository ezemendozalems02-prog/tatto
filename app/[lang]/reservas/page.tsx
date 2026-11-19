import Booking from "@/components/booking/Booking";
import { ui } from "@/data/i18n/ui";
import { pages } from "@/data/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, pages.booking, ui[lang].meta.bookingTitle, ui[lang].meta.bookingDescription) : {};
}

export default function BookingPage() {
  return <Booking />;
}
