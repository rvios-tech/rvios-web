"use client";
import { L as Link } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import { Browser } from "@/components/ui/Browser";
import { Curtain, Parallax, Rise } from "@/components/ui/motion";
import type { Project } from "@/lib/content";

/** عرض مشروع كقطعة في معرض: لقطة العمل على خلفية بلون هوية العميل */
export function Exhibit({ p, index, total, flip = false }: { p: Project; index: number; total: number; flip?: boolean }) {
  const lang = useLang();
  const href = `/work/${p.slug}`;
  return (
    <article className="grid items-center gap-x-[5vw] gap-y-8 lg:grid-cols-12">
      <Curtain className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link href={href} aria-label={`${lang === "ar" ? "دراسة حالة" : "Case study"}: ${p.name}`} className="group relative block aspect-[5/4] overflow-hidden rounded-[4px] lg:aspect-[6/5]" style={{ background: p.mat }}>
          <span className="pointer-events-none absolute inset-0 opacity-70" style={{ background: `radial-gradient(70% 60% at 50% 40%, ${p.accent}2e, transparent 70%)` }} />
          <Parallax amount={7} className="absolute inset-0 grid place-items-center px-[7%]">
            <div className="w-full transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]">
              <Browser src={p.cover} url={p.coverUrl} light={p.coverLight} sizes="(max-width:1024px) 90vw, 50vw" />
            </div>
          </Parallax>
          <span className={`absolute bottom-5 end-6 text-[12px] ${p.dark ? "text-ivory/55" : "text-ink/55"}`}>{p.year}</span>
        </Link>
      </Curtain>

      <Rise className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <span data-rise className="latin block text-[12px] text-gold">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <h3 data-rise className="h2 mt-4">
          <Link href={href} className="transition-opacity hover:opacity-70">{p.name}</Link>
        </h3>
        {p.latin && <p data-rise className="latin mt-1 text-start text-[13px] tracking-[0.18em] opacity-45">{p.latin.toUpperCase()}</p>}
        <p data-rise className="mt-6 max-w-[46ch] text-[16px] leading-[1.9] opacity-70">{p.summary}</p>
        <p data-rise className="mt-6 text-[14px] opacity-60">{p.tags.join(lang === "ar" ? "، " : ", ")} — {p.location}</p>
        <Link data-rise href={href} className="link-line mt-8 text-[15px]">{lang === "ar" ? "دراسة الحالة" : "Case study"}</Link>
      </Rise>
    </article>
  );
}
