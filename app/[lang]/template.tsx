"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { markMounted } from "@/lib/session";

/** انتقال هادئ بين الصفحات (لا يعمل في التحميل الأول) */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const navigated = markMounted();
    if (!navigated || reducedMotion()) return;
    const t = gsap.fromTo(ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", clearProps: "transform" });
    return () => { t.kill(); };
  }, []);
  return <div ref={ref}>{children}</div>;
}
