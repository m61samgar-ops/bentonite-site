// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { locales, getDir, Locale } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "رعد و برق مهراب | تولیدکننده بنتونیت صنعت برق",
    template: "%s | رعد و برق مهراب"
  },
  description:
    "رعد و برق مهراب — تولیدکننده تخصصی بنتونیت مهندسی برای صنعت برق."
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

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
