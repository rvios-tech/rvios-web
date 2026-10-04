import { content } from "@/lib/content";
import type { Lang } from "@/lib/i18n/config";

export const topicsOf = (lang: Lang) => {
  const { services, products } = content(lang);
  return [
    ...services.map((s) => ({ value: s.slug, label: s.label })),
    ...products.map((p) => ({ value: p.slug, label: p.name })),
    { value: "other", label: lang === "ar" ? "شيء آخر" : "Something else" },
  ];
};
export const budgetsOf = (lang: Lang) =>
  lang === "ar"
    ? ["لم أحدد بعد", "أقل من $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "أكثر من $15,000"]
    : ["Not sure yet", "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "Over $15,000"];
export const timelinesOf = (lang: Lang) =>
  lang === "ar" ? ["عاجل، خلال شهر", "من شهر إلى ثلاثة", "مرن"] : ["Urgent, within a month", "1–3 months", "Flexible"];

export type ContactInput = {
  name: string; company?: string; email: string; phone?: string;
  topics: string[]; budget?: string; timeline?: string; message: string; website?: string; lang?: Lang;
};

const MSG = {
  ar: { name: "اكتب اسمك من فضلك", email: "البريد الإلكتروني غير صحيح", message: "أخبرنا بتفاصيل أكثر قليلاً (10 أحرف على الأقل)", topics: "اختر خدمة أو منتجاً واحداً على الأقل" },
  en: { name: "Please enter your name", email: "That email doesn't look right", message: "Tell us a little more (at least 10 characters)", topics: "Choose at least one service or product" },
};

export function validate(d: Partial<ContactInput>, lang: Lang = "ar") {
  const m = MSG[lang];
  const e: Partial<Record<keyof ContactInput, string>> = {};
  if (!d.name || d.name.trim().length < 2) e.name = m.name;
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = m.email;
  if (!d.message || d.message.trim().length < 10) e.message = m.message;
  if (!d.topics?.length) e.topics = m.topics;
  return e;
}
