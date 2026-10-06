import { NextResponse } from "next/server";
import { validate, topicsOf, type ContactInput } from "@/lib/contact";

export async function POST(req: Request) {
  let data: Partial<ContactInput>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 }); }

  // حقل مخفي لصد الرسائل الآلية
  if (data.website) return NextResponse.json({ ok: true });

  const lang = data.lang === "en" ? "en" : "ar";
  const errors = validate(data, lang);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const topics = topicsOf(lang);
  const labels = (data.topics ?? []).map((t) => topics.find((x) => x.value === t)?.label ?? t).join("، ");
  const text = [
    `الاسم: ${data.name}`, `الشركة: ${data.company || "-"}`, `البريد: ${data.email}`, `الهاتف: ${data.phone || "-"}`,
    `الاهتمام: ${labels}`, `الميزانية: ${data.budget || "-"}`, `المدة: ${data.timeline || "-"}`, "", data.message,
  ].join("\n");

  // الإرسال عبر Resend إذا أُضيف المفتاح في متغيرات البيئة
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "RVIOS Website <noreply@rvios.com>",
        to: [process.env.CONTACT_TO_EMAIL || "rviostech@gmail.com"],
        reply_to: data.email,
        subject: `طلب جديد من ${data.name} — ${labels}`,
        text,
      }),
    });
    if (!r.ok) return NextResponse.json({ ok: false, error: "تعذر الإرسال، حاول لاحقاً" }, { status: 502 });
  } else {
    console.log("[contact]\n" + text);
  }
  return NextResponse.json({ ok: true });
}
