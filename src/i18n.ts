// src/i18n.ts
export const locales = [
  "fa", // فارسی
  "en", // English
  "ru", // Русский
  "es", // Español
  "fr", // Français
  "de", // Deutsch
  "tr", // Türkçe
  "ar", // العربية
  "zh", // 中文
  "ja", // 日本語
  "ko"  // 한국어
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const rtlLocales: Locale[] = ["fa", "ar"];
export const getDir = (locale: Locale) =>
  rtlLocales.includes(locale) ? "rtl" : "ltr";
