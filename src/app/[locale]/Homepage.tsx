// src/app/[locale]/Homepage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Search, ShoppingCart, ChevronDown, ChevronRight, Sparkles, Factory,
  ShieldCheck, Truck, Timer, FileText, PlayCircle, Star, Globe2
} from "lucide-react";

const LANGS = [
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" }
];

const MenuItem = ({
  title,
  items = [],
}: {
  title: string;
  items?: { title: string; links: string[] }[];
}) => (
  <div className="group relative">
    <button className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/5 transition">
      <span>{title}</span>
      <ChevronDown className="w-4 h-4 opacity-70" />
    </button>
    {items.length > 0 && (
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute right-0 mt-2 w-[700px] bg-white/95 backdrop-blur border border-slate-200 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6">
        {items.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li
                  key={l}
                  className="flex items-center text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600 bg-white/70 backdrop-blur">
    {children}
  </span>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="p-6 rounded-2xl bg-white/10 border border-white/10 text-white">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm opacity-80 mt-1">{label}</p>
  </div>
);

const ProductCard = ({ title, tags = [] }: { title: string; tags?: string[] }) => (
  <div className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition overflow-hidden">
    <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="w-24 h-24 rounded-xl bg-white shadow-inner border border-slate-200 grid place-content-center">
        <Factory className="w-10 h-10 text-slate-500" />
      </div>
    </div>
    <div className="p-4 space-y-3">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
      <div className="flex items-center justify-between pt-2">
        <button className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-black">جزئیات</button>
        <button className="px-3 py-2 rounded-xl bg-amber-500 text-white text-sm hover:bg-amber-600 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" /> افزودن به سبد
        </button>
      </div>
    </div>
    <div className="absolute top-3 left-3">
      <span className="px-2 py-1 text-[10px] rounded-md bg-blue-600 text-white shadow">Power-Grade</span>
    </div>
  </div>
);

export default function Homepage() {
  const t = useTranslations();                 // ترجمه‌ها
  const router = useRouter();
  const params = useParams() as { locale: string };
  const locale = params?.locale || "fa";
  const dir = typeof document !== "undefined"
    ? document.documentElement.dir || "rtl"
    : (["fa","ar"].includes(locale) ? "rtl" : "ltr");

  return (
    <div className="min-h-screen bg-slate-50" dir={dir}>
      {/* Schema.org - Organization (SEO) */}
      <script
        type="application/ld+json"
        // توجه: url و logo را بعداً با دامنه و آیکون واقعی جایگزین کن
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "رعد و برق مهراب",
            url: "https://www.mehrab-power.com",
            logo: "/icon.png",
            brand: "Raad & Bargh Mehrab",
            description:
              "تولیدکننده تخصصی بنتونیت مهندسی برای صنعت برق با تمرکز بر هدایت کنترل‌شده و کیفیت پایدار.",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+98-21-00000000",
                contactType: "sales",
                areaServed: "IR",
                availableLanguage: ["fa", "en", "ru", "es", "fr", "de", "tr", "ar", "zh", "ja", "ko"]
              }
            ]
          })
        }}
      />

      {/* Topbar */}
      <div className="bg-slate-900 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 opacity-80">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001 • ISO 14001 • ISO 45001</span>
            </div>
            <div className="hidden md:flex items-center gap-2 opacity-80">
              <Timer className="w-4 h-4" />
              <span>72h Express Shipment</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe2 className="w-4 h-4" />
            {/* سوییچر زبان: تغییر مسیر به /{locale} */}
            <select
              value={locale}
              onChange={(e) => router.push(`/${e.target.value}`)}
              className="bg-slate-800 text-slate-100 rounded-lg px-2 py-1 border border-white/10 focus:outline-none"
              aria-label="Language"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 grid place-content-center text-white font-bold shadow-lg">
              ⚡
            </div>
            <div>
              <p className="font-semibold leading-tight">رعد و برق مهراب</p>
              <p className="text-xs text-slate-500">تولیدکننده بنتونیت مهندسی برای صنعت برق</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm text-slate-700">
            <MenuItem
              title={dir === "rtl" ? t("products") : "Products"}
              items={[
                { title: dir === "rtl" ? "بر اساس کاربرد" : "By Application", links: ["زمین‌سازی وینگ", "خاک‌پوش حفاظتی", "هدایت کنترل‌شده", "ایزولاسیون رطوبتی"] },
                { title: dir === "rtl" ? "بر اساس گرید" : "By Grade", links: ["سدیمی", "کلسیمی", "نانو-بنتونیت", "HV-Grade"] },
                { title: dir === "rtl" ? "اسناد فنی" : "Technical Docs", links: ["TDS", "MSDS", "گواهی آنالیز", "کاتالوگ PDF"] }
              ]}
            />
            <MenuItem
              title={dir === "rtl" ? "راهکارها" : "Solutions"}
              items={[
                { title: dir === "rtl" ? "صنعت برق" : "Power", links: ["پست فشارقوی", "خطوط انتقال", "نیروگاه"] },
                { title: dir === "rtl" ? "زیرساخت" : "Infrastructure", links: ["ریل و مترو", "نفت و گاز", "معدن"] },
                { title: dir === "rtl" ? "سفارشی‌سازی" : "Customization", links: ["فرمولاسیون اختصاصی", "Private Label"] }
              ]}
            />
            <Link href={`/${locale}/about`} className="px-3 py-2 rounded-xl hover:bg-slate-100">{t("about")}</Link>
            <Link href={`/${locale}/blog`} className="px-3 py-2 rounded-xl hover:bg-slate-100">{t("blog")}</Link>
            <Link href={`/${locale}/contact`} className="px-3 py-2 rounded-xl hover:bg-slate-100">{t("contact")}</Link>
          </nav>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none relative">
              <input
                className="w-full lg:w-64 rounded-xl border border-slate-300 bg-white/80 px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button className="relative p-2 rounded-xl border border-slate-300 bg-white/70 hover:bg-white" aria-label={dir==='rtl'?'سبد خرید':'Cart'}>
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-amber-500 text-white rounded-full px-1">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{t("heroTitle")}</h1>
            <p className="mt-4 text-slate-600 text-lg">{t("heroSub")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-5 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 shadow-lg">
                <Sparkles className="w-5 h-5" /> {t("ctaPrimary")}
              </button>
              <button className="px-5 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 flex items-center gap-2">
                <FileText className="w-5 h-5" /> {t("ctaSecondary")}
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> ASTM & IEC compliant</div>
              <div className="flex items-center gap-2"><Truck className="w-5 h-5" /> Global shipping</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl p-4">
              <div className="aspect-video rounded-2xl bg-slate-200 grid place-content-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-amber-500/20" />
                <PlayCircle className="w-16 h-16 text-white drop-shadow" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-100 border border-slate-200" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 10%, #60a5fa 0, transparent 35%), radial-gradient(circle at 80% 90%, #fbbf24 0, transparent 35%)"}}/>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("whyUs")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <ShieldCheck className="w-6 h-6" />, title: dir==='rtl'?'کیفیت پایدار':'Consistent Quality', desc: dir==='rtl'?'کنترل فرآیند و ردیابی بچ تولید':'Process control & batch traceability' },
              { icon: <Factory className="w-6 h-6" />, title: dir==='rtl'?'تولید صنعتی':'Industrial Scale', desc: dir==='rtl'?'ظرفیت تأمین پروژه‌های بزرگ':'Capacity for large projects' },
              { icon: <Truck className="w-6 h-6" />, title: dir==='rtl'?'ارسال سریع':'Fast Logistics', desc: dir==='rtl'?'پوشش داخلی و بین‌المللی':'Domestic & international coverage' },
              { icon: <Sparkles className="w-6 h-6" />, title: dir==='rtl'?'فرمولاسیون اختصاصی':'Custom Formulation', desc: dir==='rtl'?'براساس شرایط خاک و پروژه':'Based on soil & project specs' }
            ].map((f,i)=>(
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 grid place-content-center mb-3">{f.icon}</div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm opacity-80 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Stat value="120K t/y" label={dir==='rtl'?'ظرفیت سالانه':'Annual Capacity'} />
            <Stat value=">98%" label={dir==='rtl'?'رضایت مشتری':'Customer Satisfaction'} />
            <Stat value="40+" label={dir==='rtl'?'کشور مقصد':'Export Countries'} />
            <Stat value="24/7" label={dir==='rtl'?'پشتیبانی فنی':'Tech Support'} />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t("products")}</h2>
            <button className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm">
              {dir==='rtl'?'مشاهده همه':'View All'}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <ProductCard title={dir==='rtl'?'بنتونیت سدیمی HV':'Sodium Bentonite HV'} tags={[dir==='rtl'?'هدایت کنترل‌شده':'Controlled Conductivity','IEC Grid','Low Moisture']} />
            <ProductCard title={dir==='rtl'?'بنتونیت کلسیمی':'Calcium Bentonite'} tags={[dir==='rtl'?'پایداری ابعادی':'Dimensional Stability','Low Swell']} />
            <ProductCard title={dir==='rtl'?'نانو-بنتونیت':'Nano-Bentonite'} tags={[dir==='rtl'?'کارایی بالا':'High Efficiency','Fine Mesh']} />
            <ProductCard title={dir==='rtl'?'مخلوط سفارشی':'Custom Blend'} tags={[dir==='rtl'?'براساس پروژه':'Per Project','Private Label']} />
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-12 bg-gradient-to-br from-slate-100 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("applications")}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[dir==='rtl'?'پست‌های فشارقوی':'High-Voltage Substations', dir==='rtl'?'نوار زمین‌سازی':'Earthing Backfill', dir==='rtl'?'خطوط انتقال':'Transmission Lines'].map((a,i)=>(
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="h-40 bg-slate-200" />
                <div className="p-4">
                  <p className="font-semibold">{a}</p>
                  <p className="text-sm text-slate-600 mt-1">{dir==='rtl'?'بهبود مقاومت مخصوص خاک و حفاظت تجهیزات برقی.':'Improve soil resistivity and protect electrical assets.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("clients")}</h2>
        {/* وسط‌چین واقعی روی گرید */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(
              <div key={i} className="h-16 w-full max-w-[180px] rounded-xl border border-slate-200 bg-white grid place-content-center text-slate-400 text-sm">
                Logo {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t("insights")}</h2>
            <Link href={`/${locale}/blog`} className="px-4 py-2 rounded-xl border border-white/20 text-white bg-white/5 hover:bg-white/10 text-sm">
              {dir==='rtl'?'مشاهده بلاگ':'Visit Blog'}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[1,2,3].map(i=>(
              <article key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 text-white">
                <div className="h-36 bg-gradient-to-tr from-blue-500/30 to-amber-500/30" />
                <div className="p-4">
                  <p className="font-semibold">{dir==='rtl'?`راهنمای انتخاب بنتونیت برای پست ${i}`:`Choosing Bentonite for Substations ${i}`}</p>
                  <p className="text-sm text-white/80 mt-1">{dir==='rtl'?'بررسی معیارهای کلیدی: هدایت، رطوبت، مش بندی.':'Key criteria: conductivity, moisture, mesh size.'}</p>
                  <div className="flex items-center gap-1 mt-3 text-amber-300">
                    {[1,2,3,4,5].map(s=><Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 grid place-content-center text-white font-bold">⚡</div>
              <div>
                <p className="font-semibold leading-tight text-white">رعد و برق مهراب</p>
                <p className="text-xs text-slate-400">Advanced Earthing Materials</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              {dir==='rtl'?'تولیدکننده تخصصی بنتونیت برای کاربردهای صنعتی و برق.':'Specialized bentonite manufacturer for power & industrial applications.'}
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">{dir==='rtl'?'محصولات':'Products'}</p>
            <ul className="space-y-2 text-sm">
              <li>HV Sodium</li>
              <li>Calcium</li>
              <li>Nano</li>
              <li>Custom Blend</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">{dir==='rtl'?'منابع':'Resources'}</p>
            <ul className="space-y-2 text-sm">
              <li>TDS</li>
              <li>MSDS</li>
              <li>Catalog</li>
              <li>Certifications</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">{dir==='rtl'?'تماس':'Contact'}</p>
            <ul className="space-y-2 text-sm">
              <li>{dir==='rtl'?'ایران، منطقه صنعتی':'Industrial Zone, IR'}</li>
              <li>sales@mehrab-power.com</li>
              <li>+98 21 0000 0000</li>
            </ul>
            <div className="mt-3 text-xs opacity-70">© {new Date().getFullYear()} رعد و برق مهراب</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
