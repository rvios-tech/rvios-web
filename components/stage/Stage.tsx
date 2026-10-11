"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { GlassStage } from "@/lib/stage/glass";
import { stage } from "@/lib/stage/store";
import { LogoMark } from "@/components/ui/Logo";
import { useLang } from "@/components/i18n/LangProvider";
import { reducedMotion } from "@/lib/gsap";
import { isFirstVisit } from "@/lib/session";
import { getTheme, onTheme } from "@/lib/theme";

/** صفحات القراءة (المدونة) بلا مسرح ثلاثي الأبعاد: أخفّ وأسرع، والقارئ جاء ليقرأ */
export const isReadingPath = (path: string | null) => !!path && /\/blog(\/|$)/.test(path);

/**
 * المسرح ثلاثي الأبعاد — لوحة WebGL ثابتة خلف الصفحات، تبقى بين التنقلات. three.js تُحمَّل
 * عند الحاجة فقط (استيراد ديناميكي) فلا تثقل أول تحميل، ولا تُحمَّل أصلًا في المدونة.
 */
export function Stage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const lang = useLang();
  const reading = isReadingPath(usePathname());
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reading) return;
    let s: GlassStage | null = null;
    let off = () => {};
    let dead = false;
    void (async () => {
      try {
        const { GlassStage } = await import("@/lib/stage/glass");
        if (dead || !ref.current) return;
        s = new GlassStage(ref.current, { reduced: reducedMotion(), introDelay: isFirstVisit() ? 1.9 : 0.1, theme: getTheme(), lang });
        stage.attach(s);
        off = onTheme((t) => s?.setTheme(t));
      } catch {
        setFailed(true);
      }
    })();
    return () => { dead = true; off(); stage.detach(); s?.dispose(); };
  }, [lang, reading]);

  if (reading) return null;

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 block h-full w-full" />
      {failed && (
        <div className="fixed inset-0 z-0 grid place-items-center" aria-hidden="true">
          <div className="absolute h-[40vh] w-[60vw] rounded-full bg-red/30 blur-[120px]" />
          <LogoMark className="relative w-[34vw] text-ruby/80" />
        </div>
      )}
    </>
  );
}
