"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, ChevronDown, ChevronRight, Sparkles, Factory, ShieldCheck, Truck, Timer, FileText, PlayCircle, Star, Globe2 } from "lucide-react";
import Link from "next/link";

export default function Home({ t, dir, locale }: { t: any; dir: "rtl"|"ltr"; locale: string; }) {

  const router = useRouter();
  const locales = ["fa","en","ru","es","fr","de","tr","ar","zh","ja","ko"];

  return (
    <div className="min-h-screen bg-slate-50" dir={dir}>
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
            <select
              value={locale}
              onChange={(e)=> router.push(`/${e.target.value}`)}
              className="bg-slate-800 text-slate-100 rounded-lg px-2 py-1 border border-white/10 focus:outline-none"
              aria-label="language"
            >
              {locales.map(l => (
                <option key={l} value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ... بقیه‌ی سکشن‌ها، اما متن‌ها از t(...) خوانده شوند ... */}
    </div>
  );
}
