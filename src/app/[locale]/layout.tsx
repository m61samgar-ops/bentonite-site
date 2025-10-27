// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { Vazirmatn, Inter } from "next/font/google";
import "../globals.css";

// زبان‌ها
export const locales = ["fa","en","ru","es","fr","de","tr","ar","zh","ja","ko"] as const;

// فونت‌ها
const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-fa",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

// برای SSG هر زبان
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// --- SEO (بر اساس فایل قبلی تو منتقل شد) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehrab-power.com"),
  title: {
    default: "رعد و برق مهراب | تولیدکننده بنتونیت صنعت برق",
    template: "%s | رعد و برق مهراب",
  },
  description:
    "رعد و برق مهراب — تولیدکننده تخصصی بنتونیت مهندسی برای صنعت برق: هدایت کنترل‌شده، کیفیت پایدار، ارسال سریع، پشتیبانی فنی.",
  keywords: [
    "بنتونیت صنعت برق",
    "بنتونیت سدیمی",
    "Earthing Backfill",
    "بنتونیت HV",
    "رعد و برق مهراب",
  ],
  openGraph: {
    type: "website",
    siteName: "رعد و برق مهراب",
    title: "رعد و برق مهراب | تولیدکننده بنتونیت صنعت برق",
    description:
      "تأمین پایدار بنتونیت مهندسی برای پست‌های فشارقوی و شبکه‌های قدرت.",
    url: "https://www.mehrab-power.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "رعد و برق مهراب",
    description: "تولیدکننده بنتونیت مهندسی برای صنعت برق",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ست کردن locale برای این درخواست
  unstable_setRequestLocale(locale);

  // لود پیام‌های i18n
  let messages: Record<string, any>;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${vazir.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-fa bg-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
