"use client";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value
    };
    setLoading(true);
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(body) });
    setLoading(false);
    alert(res.ok ? "پیام شما ارسال شد." : "خطا در ارسال");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">تماس با ما</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" placeholder="نام" className="w-full border rounded-lg p-3" required />
        <input name="email" placeholder="ایمیل" type="email" className="w-full border rounded-lg p-3" required />
        <textarea name="message" placeholder="پیام شما" className="w-full border rounded-lg p-3 h-32" required />
        <button className="px-5 py-3 rounded-xl bg-blue-600 text-white" disabled={loading}>
          {loading ? "درحال ارسال..." : "ارسال"}
        </button>
      </form>
    </main>
  );
}
