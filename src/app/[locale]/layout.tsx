import type { Metadata } from "next";
import "./../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Vazirmatn, Inter } from "next/font/google";
import { getMessages } from "@/i18n/request";

const vazir = Vazirmatn({ subsets: ["arabic","latin"], variable: "--font-fa", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-en", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "رعد و برق مهراب | تولیدکننده بنتونیت صنعت برق",
    template: "%s | رعد و برق مهراب"
  },
  description: "تولیدکننده تخصصی بنتونیت مهندسی برای صنعت برق."
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const locales = ["fa","en","ru","es","fr","de","tr","ar","zh","ja","ko"];
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages(locale);
  const dir = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${vazir.variable} ${inter.variable}`}>
      <body className="font-fa bg-slate-50">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
