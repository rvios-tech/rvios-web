"use client";
import { useLang } from "@/components/i18n/LangProvider";

const T = {
  ar: {
    aria: "لوحة متابعة صيانة موقع — عرض توضيحي",
    site: "yourwebsite.com",
    status: "كل الأنظمة تعمل",
    kpis: [["التوفّر", "99.98%"], ["زمن الاستجابة", "180ms"], ["آخر نسخة احتياطية", "02:00"], ["تحديثات معلّقة", "0"]],
    chart: "التوفّر — آخر ٣٠ يومًا",
    log: "ما تم هذا الشهر",
    rows: [["تحديثات الأمان", "تم"], ["اختبار استعادة النسخة", "تم"], ["تحسين سرعة الصفحات", "تم"], ["التقرير الشهري", "قيد الإعداد"]],
  },
  en: {
    aria: "Website maintenance monitor — illustrative",
    site: "yourwebsite.com",
    status: "All systems operational",
    kpis: [["Uptime", "99.98%"], ["Response time", "180ms"], ["Last backup", "02:00"], ["Pending updates", "0"]],
    chart: "Uptime — last 30 days",
    log: "Done this month",
    rows: [["Security updates", "Done"], ["Backup restore test", "Done"], ["Page speed tuning", "Done"], ["Monthly report", "In progress"]],
  },
};

// ثلاثون يومًا ثابتة: يوم واحد متأثر (يُرى أن المتابعة تلتقط المشكلة) والبقية سليمة
const DAYS = Array.from({ length: 30 }, (_, i) => (i === 19 ? 62 : 88 + ((i * 7) % 12)));

/**
 * مشهد خدمة الصيانة: لوحة متابعة مصمّمة لها، لا لقطة من موقع — أرقامها توضيحية.
 * `compact` لإطار ارتفاعه ثابت (عرض الرئيسية): بلا سجل الأعمال، والمؤشرات في صف واحد.
 */
export function MaintenanceConsole({ compact = false }: { compact?: boolean }) {
  const t = T[useLang()];
  return (
    <div role="img" aria-label={t.aria} className="overflow-hidden rounded-[14px] bg-[#141312] text-[#FAF8ED] shadow-[0_50px_120px_-40px_rgba(0,0,0,.65),inset_0_0_0_1px_rgba(250,248,237,.08)]">
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-[clamp(16px,2.4vw,28px)] ${compact ? "py-2.5 sm:py-4" : "py-4"}`}>
        <span className="latin text-[13px] text-white/55" dir="ltr">{t.site}</span>
        <span className="flex items-center gap-2.5 text-[13px]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          {t.status}
        </span>
      </div>

      <div className={`grid gap-px bg-white/10 ${compact ? "grid-cols-4" : "grid-cols-2 lg:grid-cols-4"}`}>
        {t.kpis.map(([label, value]) => (
          <div key={label} className={`bg-[#141312] ${compact ? "px-2.5 py-3 sm:px-5 sm:py-5" : "px-[clamp(16px,2vw,24px)] py-5"}`}>
            <span className={`block text-white/50 ${compact ? "text-[10px] leading-tight sm:text-[12px]" : "text-[12px]"}`}>{label}</span>
            <b className={`latin mt-2 block font-bold ${compact ? "text-[14px] sm:text-[clamp(18px,1.8vw,24px)]" : "text-[clamp(20px,2.2vw,28px)]"}`} dir="ltr" style={{ textAlign: "start" }}>{value}</b>
          </div>
        ))}
      </div>

      <div className={`grid gap-px bg-white/10 ${compact ? "" : "md:grid-cols-[1.25fr_1fr]"}`}>
        <div className={`bg-[#141312] ${compact ? "p-3 sm:p-5" : "p-[clamp(16px,2.4vw,28px)]"}`}>
          <span className={`text-[12px] text-white/50 ${compact ? "hidden sm:inline" : ""}`}>{t.chart}</span>
          <div className={`flex items-end gap-[3px] ${compact ? "h-[clamp(44px,7vw,110px)] sm:mt-3" : "mt-5 h-[clamp(84px,10vw,128px)]"}`} dir="ltr" aria-hidden="true">
            {DAYS.map((h, i) => <i key={i} className={`flex-1 rounded-[2px] ${i === 19 ? "bg-[#C8A45D]" : "bg-emerald-400/75"}`} style={{ height: `${h}%` }} />)}
          </div>
        </div>
        {!compact && <div className="bg-[#141312] p-[clamp(16px,2.4vw,28px)]">
          <span className="text-[12px] text-white/50">{t.log}</span>
          <ul className="mt-4 grid gap-3 text-[14px]">
            {t.rows.map(([label, state], i) => (
              <li key={label} className="flex items-baseline justify-between gap-4 border-b border-white/[.07] pb-3 last:border-0 last:pb-0">
                <span>{label}</span>
                <em className={`flex-none text-[12px] not-italic ${i === t.rows.length - 1 ? "text-[#C8A45D]" : "text-emerald-400"}`}>{state}</em>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </div>
  );
}
