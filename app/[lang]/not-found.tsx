"use client";
import { Scene } from "@/components/stage/Scene";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";

const CFG: StageCfg = { d: { x: 0, y: 0.7, s: 0.7, tilt: 0.5 }, m: { x: 0, y: 1, s: 0.45 }, glow: 0.6 };
const T = {
  ar: { h: "هذه الصفحة غير موجودة.", p: "ربما نُقل الرابط، أو كُتب بشكل خاطئ.", back: "العودة للرئيسية" },
  en: { h: "This page doesn't exist.", p: "The link may have moved, or been mistyped.", back: "Back to home" },
};

export default function NotFound() {
  const t = T[useLang()];
  return (
    <Scene id="404" cfg={CFG} className="flex min-h-svh flex-col items-center justify-end px-[var(--pad)] pb-[16vh] text-center">
      <p className="latin text-[13px] tracking-[0.4em] text-gold">404</p>
      <h1 className="h1 mt-5">{t.h}</h1>
      <p className="lead mt-4 text-mist">{t.p}</p>
      <L href="/" className="btn btn-ruby mt-9">{t.back}</L>
    </Scene>
  );
}
