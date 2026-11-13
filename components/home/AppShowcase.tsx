"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTilt } from "@/components/ui/useTilt";
import { useLang } from "@/components/i18n/LangProvider";

/** لقطات تطبيق RVIOS الحقيقية (public/work/rvios-app) */
const SHOTS = [
  { src: "/work/rvios-app/home.webp", ar: "لوحة متجرك", en: "Your store" },
  { src: "/work/rvios-app/templates.webp", ar: "١٨ قالبًا", en: "18 templates" },
  { src: "/work/rvios-app/design.webp", ar: "صمّم متجرك", en: "Design it" },
  { src: "/work/rvios-app/orders.webp", ar: "الطلبات", en: "Orders" },
];

/**
 * ثلاثة هواتف متراكبة بلقطات التطبيق — الأوسط يتبدّل كل ثلاث ثوانٍ، والجانبيان يميلان خلفه.
 * يتبع المؤشر بميل خفيف، ويتوقف التبديل حين يمرّ المؤشر فوقه.
 */
export function AppShowcase() {
  const lang = useLang();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, 8);

  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((x) => (x + 1) % SHOTS.length), 3200);
    return () => clearInterval(t);
  }, [hold]);

  const at = (k: number) => SHOTS[(i + k + SHOTS.length) % SHOTS.length];
  const phone = (s: (typeof SHOTS)[number], cls: string, priority = false) => (
    <div className={`app-phone ${cls}`}>
      <div className="app-screen">
        <Image key={s.src} src={s.src} alt={s[lang]} fill sizes="(max-width: 768px) 60vw, 300px" className="app-shot" priority={priority} />
      </div>
    </div>
  );

  return (
    <div className="app-show" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div ref={ref} className="app-stack" role="img" aria-label={lang === "ar" ? "لقطات من تطبيق RVIOS" : "RVIOS app screenshots"}>
        {phone(at(-1), "side left")}
        {phone(at(1), "side right")}
        {phone(at(0), "front", true)}
      </div>
      <div className="app-dots">
        {SHOTS.map((s, k) => (
          <button key={s.src} onClick={() => setI(k)} className={k === i ? "on" : ""} aria-label={s[lang]}>
            <span>{s[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
