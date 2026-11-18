"use client";

import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MapPin } from "lucide-react";
import SplitText from "@/components/animations/SplitText";
import { DrawLine, Reveal } from "@/components/animations/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/Brand";
import { useUI } from "@/components/layout/UIProvider";
import Photo from "@/components/ui/Photo";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function Contact() {
  const { openInvite } = useUI();
  const { t, href } = useLocale();

  const items = [
    { icon: <InstagramIcon size={18} />, label: "Instagram", value: site.contact.instagram.handle, href: site.contact.instagram.url },
    { icon: <WhatsAppIcon size={18} />, label: "WhatsApp", value: site.contact.whatsapp.display, href: waLink(t.common.whatsappHello) },
    { icon: <Mail size={18} strokeWidth={1.4} />, label: t.contact.email, value: site.contact.email ?? t.contact.tbd, href: site.contact.email ? `mailto:${site.contact.email}` : undefined },
    { icon: <MapPin size={18} strokeWidth={1.4} />, label: t.contact.base, value: `${site.base.city}, ${site.base.country}` },
    { icon: <Globe2 size={18} strokeWidth={1.4} />, label: t.contact.invitations, value: t.contact.invitationsValue, onClick: openInvite },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pb-20 pt-28 md:pb-32 md:pt-44">
      <div className="absolute inset-0 opacity-40">
        <Photo media={media.contact} sizes="100vw" showHint={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="container-x relative">
        <div className="mb-10 flex items-center gap-4 md:mb-16">
          <span className="label-red">11</span>
          <DrawLine className="w-10 md:w-16" />
          <span className="label">Contact — Let&apos;s connect</span>
        </div>

        <SplitText className="display text-giant" lines={["Let's create", { text: "something", className: "text-outline pl-[10vw]" }, { text: "different.", className: "text-blood-hot" }]} stagger={0.07} />

        <div className="mt-16 flex flex-col gap-3 sm:flex-row md:mt-20">
          <Link href={href("/#booking")} className="btn-red">Book a consultation <ArrowUpRight size={14} /></Link>
          <button type="button" onClick={openInvite} className="btn-ghost">Invite FROZZ to your event</button>
        </div>

        <div className="mt-20 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5 md:mt-28">
          {items.map((it, i) => {
            const body = (
              <>
                <span className="text-blood-hot">{it.icon}</span>
                <span className="label mt-6 block">{it.label}</span>
                <span className="mt-2 block break-words text-lg text-bone transition-colors group-hover:text-blood-hot">{it.value}</span>
                {(it.href || it.onClick) && <ArrowUpRight size={16} className="absolute right-5 top-6 text-bone/30 transition-all group-hover:rotate-45 group-hover:text-bone" />}
              </>
            );
            const cls = "group relative block h-full border-b border-white/10 py-6 pr-10 text-left sm:px-5 lg:border-b-0 lg:border-r lg:py-8 lg:first:pl-0 lg:last:border-r-0";
            return (
              <Reveal key={it.label} delay={i * 0.06}>
                {it.href ? (
                  <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{body}</a>
                ) : it.onClick ? (
                  <button type="button" onClick={it.onClick} className={`${cls} w-full`}>{body}</button>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
