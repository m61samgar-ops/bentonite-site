// @ts-nocheck
// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { locales, getDir, type Locale } from "@/i18n";

// صفحات استاتیک برای هر زبان
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "رعد و برق مهراب | تولیدکننده بنتونیت صنعت برق",
    template: "%s | رعد و برق مهراب",
  },
  description:
    "رعد و برق مهراب — تولیدکننده تخصصی بنتونیت مهندسی برای صنعت برق.",
};

// مهم: برای دور زدن اختلاف تایپ Next 15، امضا را any می‌گذاریم
export default async function LocaleLayout({
  children,
  params,
}: any) {
  // در برخی نسخه‌ها params ممکنه Promise باشه
  const p = await Promise.resolve(params);
  const locale = (p?.locale || "fa") as Locale;

  if (!locales.includes(locale)) notFound();

  // next-intl v4
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={getDir(locale)}>
      <body className="font-fa bg-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
