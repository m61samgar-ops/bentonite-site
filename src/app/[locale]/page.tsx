"use client";
import { useTranslations, useLocale } from "next-intl";
import Home from "@/sections/Home";

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
  return <Home t={t} dir={dir} locale={locale} />;
}
