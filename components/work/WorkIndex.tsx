"use client";
import { useMemo, useState } from "react";
import { Exhibit } from "./Exhibit";
import { content, type Category } from "@/lib/content";
import { useLang } from "@/components/i18n/LangProvider";
import { ScrollTrigger } from "@/lib/gsap";

const keys = ["all", "web", "identity", "software"] as const;

/** فهرس الأعمال مع تصفية نصية هادئة */
export function WorkIndex() {
  const lang = useLang();
  const { categoryLabels, projects } = content(lang);
  const [cat, setCat] = useState<(typeof keys)[number]>("all");
  const list = useMemo(() => (cat === "all" ? projects : projects.filter((p) => p.categories.includes(cat as Category))), [cat, projects]);
  const count = (k: (typeof keys)[number]) => (k === "all" ? projects.length : projects.filter((p) => p.categories.includes(k as Category)).length);

  const choose = (k: (typeof keys)[number]) => {
    setCat(k);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
      <div className="flex flex-wrap gap-x-9 gap-y-3 border-b border-hair-ink pb-5" role="group" aria-label={lang === "ar" ? "تصفية الأعمال" : "Filter work"}>
        {keys.map((k) => (
          <button key={k} className="tab" aria-pressed={k === cat} onClick={() => choose(k)}>
            {categoryLabels[k]} <sup className="latin text-[10px] opacity-60">{count(k)}</sup>
          </button>
        ))}
      </div>
      <div key={cat} className="mt-[10vh] grid gap-[clamp(90px,16vh,170px)]">
        {list.map((p, i) => <Exhibit key={p.slug} p={p} index={i} total={list.length} flip={i % 2 === 1} />)}
      </div>
    </>
  );
}
