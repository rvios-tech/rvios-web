"use client";
import { useRef, useState } from "react";
import { stage } from "@/lib/stage/store";
import { useTilt } from "@/components/ui/useTilt";
import type { StageCfg } from "@/lib/stage/glass";
import { useLang } from "@/components/i18n/LangProvider";

const swatches = [
  { c: "#9E2226", n: { ar: "أحمر", en: "Red" } },
  { c: "#1F6B52", n: { ar: "أخضر", en: "Green" } },
  { c: "#2B4596", n: { ar: "أزرق", en: "Blue" } },
  { c: "#B07A2A", n: { ar: "ذهبي", en: "Gold" } },
];
const T = {
  ar: { aria: "معاينة متجر على RVIOS StoreOS", name: "متجر السعيد للعطور", badge: "متجر موثّق", cats: ["الكل", "عطور شرقية", "بخور", "هدايا"], wa: "إتمام الطلب عبر واتساب", try: "جرّب لون متجرك", initial: "س", items: ["العود الملكي", "مسك أبيض", "عنبر فاخر", "طقم هدايا"] },
  en: { aria: "Store preview on RVIOS StoreOS", name: "Al-Saeed Perfumes", badge: "Verified", cats: ["All", "Oriental", "Incense", "Gifts"], wa: "Checkout on WhatsApp", try: "Try your store colour", initial: "S", items: ["Royal Oud", "White Musk", "Fine Amber", "Gift Set"] },
};
const u = (id: string) => `https://images.unsplash.com/${id}?w=400&q=70&auto=format&fit=crop`;
const items = [
  ["العود الملكي", "$45", "photo-1541643600914-78b084683601"],
  ["مسك أبيض", "$28", "photo-1592945403244-b3fbafd7f539"],
  ["عنبر فاخر", "$52", "photo-1594035910387-fea47794261f"],
  ["طقم هدايا", "$70", "photo-1587017539504-67cfbddac569"],
];

/** معاينة متجر على RVIOS StoreOS — اختيار اللون يغيّر المتجر وضوء الشعار الزجاجي معاً */
export function PhoneStore({ sceneCfg }: { sceneCfg?: StageCfg }) {
  const lang = useLang();
  const t = T[lang];
  const [s, setS] = useState(swatches[0]);
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, 12);
  const pick = (w: (typeof swatches)[number]) => {
    setS(w);
    if (sceneCfg) stage.apply({ ...sceneCfg, light: w.c === "#9E2226" ? undefined : w.c });
  };

  return (
    <div className="grid place-items-center gap-8">
      <div ref={ref} className="phone" role="img" aria-label={t.aria}>
        <div className="scr">
          <div className="latin flex justify-between px-[22px] pt-3 pb-1.5 text-[10px] font-medium"><span>9:41</span><span>5G</span></div>
          <div className="latin mx-3 mb-2 rounded-[9px] bg-[#EFEDE3] p-[5px] text-center text-[9px] text-[#777]">store.rvios.com/alsaeed</div>
          <div className="relative mx-3 h-24 rounded-[14px] transition-colors duration-500" style={{ background: s.c }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={u("photo-1523293182086-7651a899d37f")} className="h-full w-full rounded-[14px] object-cover opacity-85 mix-blend-multiply" />
            <span className="serif absolute -bottom-4 start-3.5 grid h-11 w-11 place-items-center rounded-[13px] border-[3px] border-[#FFFDF6] text-[20px] text-white transition-colors duration-500" style={{ background: s.c }}>{t.initial}</span>
          </div>
          <div className="flex items-center justify-between px-3.5 pt-[22px] pb-1">
            <b className="serif text-[16px]">{t.name}</b>
            <em className="rounded-full px-2 py-0.5 text-[9px] not-italic" style={{ color: s.c, background: `${s.c}1f` }}>{t.badge}</em>
          </div>
          <div className="flex gap-1.5 overflow-hidden px-3 pt-1.5 pb-2 text-[10px]">
            {t.cats.map((c, i) => (
              <span key={c} className="rounded-full px-2.5 py-1 whitespace-nowrap transition-colors duration-500" style={i === 0 ? { background: s.c, color: "#fff" } : { background: "#EFEDE3" }}>{c}</span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-2 gap-[7px] px-3">
            {items.map(([, p, id], k) => { const n = t.items[k]; return (
              <div key={n} className="flex flex-col overflow-hidden rounded-xl bg-[#F3F1E7]">
                <i className="min-h-14 flex-1 bg-[#ddd] bg-cover bg-center" style={{ backgroundImage: `url(${u(id)})` }} />
                <div className="flex justify-between px-[7px] py-[5px] text-[9.5px]"><span>{n}</span><b className="latin font-medium">{p}</b></div>
              </div>
            ); })}
          </div>
          <div className="mx-3 mt-2 mb-3 rounded-[13px] bg-ink p-2.5 text-center text-white">{t.wa}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-mist" role="group" aria-label={t.try}>
        <span>{t.try}</span>
        {swatches.map((w) => (
          <button key={w.c} aria-label={w.n[lang]} aria-pressed={w.c === s.c} onClick={() => pick(w)}
            className="h-[26px] w-[26px] rounded-full transition-[box-shadow,transform] duration-300 hover:scale-110"
            style={{ background: w.c, boxShadow: w.c === s.c ? "0 0 0 2px var(--bg), 0 0 0 3.5px var(--fg)" : "0 0 0 2px var(--bg)" }} />
        ))}
      </div>
    </div>
  );
}
