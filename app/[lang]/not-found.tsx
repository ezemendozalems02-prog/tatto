"use client";

import Link from "next/link";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function NotFound() {
  const { t, href } = useLocale();
  return (
    <section className="flex min-h-[100svh] items-center bg-ink">
      <div className="container-x">
        <p className="label-red">Error 404</p>
        <h1 className="display mt-6 text-giant">
          Lost in<br />
          <span className="text-outline">transformation.</span>
        </h1>
        <p className="mt-8 max-w-md text-bone-muted">{t.notFound.text}</p>
        <Link href={href("/")} className="btn-red mt-10">
          {t.notFound.home}
        </Link>
      </div>
    </section>
  );
}
