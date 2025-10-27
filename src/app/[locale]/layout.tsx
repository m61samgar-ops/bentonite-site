// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "../globals.css";
import { locales, getDir, type Locale } from "@/i18n";

// مسیرهای استاتیک برای هر زبان
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

// ---- props تایپ‌شده برای layout ----
type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

// ⚠️ خود layout کاملاً sync است؛ این‌جا پیام‌ها را لود نمی‌کنیم
const LocaleLayout: React.FC<LayoutProps> = ({ children, params }) => {
  const locale = params.locale;

  if (!locales.includes(locale)) notFound();

  // next-intl v4: تنظیم locale روی ریکوئست
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} dir={getDir(locale)}>
      <body className="font-fa bg-slate-50">
        {/* سرور کامپوننت async که پیام‌ها را می‌گیرد و Provider را می‌چیند */}
        <IntlServer locale={locale}>{children}</IntlServer>
      </body>
    </html>
  );
};

export default LocaleLayout;

/* ----------------- سرور کامپوننت برای گرفتن پیام‌ها ----------------- */

// این wrapper کوچک فقط برای عبور دادن یک سرور-کامپوننت async داخل layout sync است.
function IntlServer({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // این‌جا عمداً سرور-کامپوننت async را صدا می‌زنیم
  // @ts-expect-error Server Component being used in sync tree is intentional
  return <IntlServerImpl locale={locale}>{children}</IntlServerImpl>;
}

// سرور-کامپوننت async: پیام‌ها را می‌گیرد و Provider را رندر می‌کند
async function IntlServerImpl({
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
