import { NextResponse } from "next/server";

// اگر SMTP داری بعداً Nodemailer اضافه می‌کنیم
export async function POST(req: Request) {
  const data = await req.json();
  // TODO: validate & send email / save to DB
  console.log("Contact form:", data);

  return NextResponse.json({ ok: true });
}
