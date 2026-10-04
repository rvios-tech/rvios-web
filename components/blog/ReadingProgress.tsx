"use client";
import { useEffect, useRef } from "react";

export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(target);
    const on = () => {
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)))})`;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [target]);
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-right scale-x-0 bg-gold" />;
}
