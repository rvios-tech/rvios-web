"use client";
import { useEffect, useRef, useState } from "react";
import { GlassStage } from "@/lib/stage/glass";
import { stage } from "@/lib/stage/store";
import { LogoMark } from "@/components/ui/Logo";
import { useLang } from "@/components/i18n/LangProvider";
import { reducedMotion } from "@/lib/gsap";
import { isFirstVisit } from "@/lib/session";
import { getTheme, onTheme } from "@/lib/theme";

/** المسرح ثلاثي الأبعاد — لوحة WebGL ثابتة خلف كل الصفحات، تبقى بين التنقلات */
export function Stage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const lang = useLang();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let s: GlassStage | null = null;
    let off = () => {};
    try {
      s = new GlassStage(ref.current!, { reduced: reducedMotion(), introDelay: isFirstVisit() ? 1.9 : 0.1, theme: getTheme(), lang });
      stage.attach(s);
      off = onTheme((t) => s?.setTheme(t));
    } catch {
      setFailed(true);
    }
    return () => { off(); stage.detach(); s?.dispose(); };
  }, [lang]);

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
