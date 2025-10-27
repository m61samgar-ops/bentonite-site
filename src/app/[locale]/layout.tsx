// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";

// زبان‌های سایت
export const LOCALES = [
  "fa", "en", "ru", "es", "fr", "de", "tr", "ar", "zh", "ja", "ko",
] as const;
export type Locale = typeof LOCALES[number];

// صفحات استاتیک برای هر زبان
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// (اختیاری) متادیتای سراسری؛ اگر بخواهی اینجا هم می‌توان گذاشت
export const metadata: Metadata = {
  title: { default: "رعد و برق مهراب", template: "%s | رعد و برق مهراب" },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // برای next-intl v3
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
