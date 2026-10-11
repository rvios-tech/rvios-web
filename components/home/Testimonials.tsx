"use client";

import { Scene } from "@/components/stage/Scene";
import { Lines, Rise } from "@/components/ui/motion";
import { L } from "@/components/i18n/L";
import { testimonialsOf } from "@/lib/content/testimonials";
import type { Lang } from "@/lib/i18n/config";

/** آراء العملاء — قبل الأسئلة الشائعة في الخدمات، وفي الصفحة الرئيسية قبل المدونة */
export function Testimonials({ lang }: { lang: Lang }) {
  const t = testimonialsOf[lang];
  return (
    <Scene id="testimonials" theme="paper" className="px-[var(--pad)] py-[clamp(90px,14vh,160px)]">
      <div className="mx-auto max-w-[1480px]">
        <span className="label">{t.label}</span>
        <Lines className="h2 mt-6" lines={[t.head[0], <span key="m" className="text-ink/45">{t.head[1]}</span>]} />
        <Rise className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8" stagger={0.12}>
          {t.items.map((x) => (
            <figure data-rise key={x.name} className="flex flex-col justify-between rounded-[14px] border border-hair-ink bg-white/40 p-[clamp(28px,4vw,48px)]">
              <div>
                <span aria-hidden="true" className="serif block text-[72px] leading-[.6] text-ruby">”</span>
                <blockquote className="serif mt-6 text-[clamp(19px,1.6vw,23px)] leading-[1.75] text-ink">{x.quote}</blockquote>
              </div>
              <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-hair-ink pt-6">
                <div>
                  <b className="block text-[17px] font-medium text-ink">{x.name}</b>
                  <span className="mt-1 block text-[14px] text-ink/55">{x.role}</span>
                </div>
                <L href={`/work/${x.project}`} className="link-line text-[14px] text-ink/70 hover:text-ink">{t.view}</L>
              </figcaption>
            </figure>
          ))}
        </Rise>
      </div>
    </Scene>
  );
}
