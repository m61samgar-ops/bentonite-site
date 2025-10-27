// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
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

// نکته مهم: layout نباید async باشد
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) notFound();

  // تنظیم locale روی ریکوئست (next-intl v3)
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} dir={getDir(locale)}>
      <body className="font-fa bg-slate-50">
        {/* Server Component داخلی که async است: پیام‌ها را می‌گیرد */}
        {/* @ts-expect-error Async Server Component */}
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

// — Server Component async برای گرفتن پیام‌ها — //
async function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
