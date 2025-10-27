// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

// --- SEO پایه ---
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
    locale: "fa_IR",
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

export const viewport: Viewport = { themeColor: "#2563eb" };

// ⚠️ این لایه فقط children را برمی‌گرداند؛ html/body اینجا نیست
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
