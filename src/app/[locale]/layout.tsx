import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
// تمام لوکال‌هایی که سایتت دارد
export const LOCALES = [
  "fa","en","ru","es","fr","de","tr","ar","zh","ja","ko",
] as const;

// تا برای همه‌ی زبان‌ها صفحه به‌صورت استاتیک ساخته شود
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// ❗️امضای درست layout: حتماً params.locale را بگیر
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // اگر زبان خارج از لیست بود 404 بده
  if (!LOCALES.includes(locale as any)) notFound();

  // به next-intl بگو این درخواست با چه localeای است
setRequestLocale(locale);

  // پیام‌های مترجم (json) را لود کن
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // جهت صفحه را روی یک رپر تنظیم کن (چون html در روت‌لی‌اوت است)
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={dir}>{children}</div>
    </NextIntlClientProvider>
  );
}
