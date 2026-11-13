"use client";
import { useLang } from "@/components/i18n/LangProvider";

/** القوالب الحقيقية على الجوال — ثلاثة أعمدة تنساب بعكس بعضها */
const COLS = [
  ["dahab", "noir", "sukkar", "khatwa", "zahr", "bayt"],
  ["essential", "maison", "nada", "qita", "turath", "asal"],
  ["volt", "satr", "maida", "nabd", "waraq", "marah"],
];
const NAMES: Record<string, { ar: string; en: string }> = {
  dahab: { ar: "ذهب", en: "Dahab" }, noir: { ar: "نوار", en: "Noir" }, sukkar: { ar: "سُكّر", en: "Sukkar" }, khatwa: { ar: "خطوة", en: "Khatwa" },
  zahr: { ar: "زهر", en: "Zahr" }, bayt: { ar: "بيت", en: "Bayt" }, essential: { ar: "أساسي", en: "Essential" }, maison: { ar: "ميزون", en: "Maison" },
  nada: { ar: "ندى", en: "Nada" }, qita: { ar: "قِطع", en: "Qita" }, turath: { ar: "تراث", en: "Turath" }, asal: { ar: "عسل", en: "Asal" },
  volt: { ar: "فولت", en: "Volt" }, satr: { ar: "سَتر", en: "Satr" }, maida: { ar: "مائدة", en: "Maida" }, nabd: { ar: "نبض", en: "Nabd" },
  waraq: { ar: "ورق", en: "Waraq" }, marah: { ar: "مرح", en: "Marah" },
};

const T = {
  ar: { order: "طلب جديد #2049", orderSub: "٤٥٬٠٠٠ ر.ي · قيد التأكيد", verified: "متجر موثّق", fee: "٠٪ عمولة", feeSub: "أموالك لك" },
  en: { order: "New order #2049", orderSub: "YER 45,000 · pending", verified: "Verified store", fee: "0% commission", feeSub: "Your sales stay yours" },
};

/**
 * جدار القوالب: ١٨ قالبًا حقيقيًا في ثلاثة أعمدة تنساب ببطء، فوقها بطاقات زجاجية لما يحدث في المتجر
 * (طلب جديد، متجر موثّق، بلا عمولة). يتوقف الانسياب عند مرور المؤشر وفي «تقليل الحركة».
 */
export function StoreShowcase() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="sw" aria-label={lang === "ar" ? "قوالب متاجر RVIOS Store" : "RVIOS Store templates"} role="img">
      <div className="sw-wall">
        {COLS.map((col, c) => (
          <div key={c} className={`sw-col ${c === 1 ? "up" : "down"}`} style={{ ["--dur" as string]: `${46 + c * 8}s` }}>
            {[...col, ...col].map((id, k) => (
              <figure key={`${id}${k}`} className="sw-ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/work/rvios-store/tpl/${id}-mob.webp`} alt="" loading={k < 3 ? "eager" : "lazy"} decoding="async" />
                <figcaption>{NAMES[id][lang]}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      <div className="sw-chip c1 glass">
        <i className="sw-dot" />
        <span><b>{t.order}</b><small>{t.orderSub}</small></span>
      </div>
      <div className="sw-chip c2 glass">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>
        <b>{t.verified}</b>
      </div>
      <div className="sw-chip c3 glass">
        <b className="sw-big">0%</b>
        <span><b>{t.fee}</b><small>{t.feeSub}</small></span>
      </div>
    </div>
  );
}
