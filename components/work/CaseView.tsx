import { L as Link } from "@/components/i18n/L";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise, Parallax } from "@/components/ui/motion";
import { Browser } from "@/components/ui/Browser";
import { CaseBlock } from "@/components/work/CaseBlocks";
import { Closing } from "@/components/layout/Closing";
import { content, type Project } from "@/lib/content";
import type { Lang } from "@/lib/i18n/config";

const T = {
  ar: { client: "العميل", loc: "الموقع", year: "السنة", did: "ما قدّمناه", work: "الأعمال", challenge: "التحدي", approach: "ما فعلناه", next: "المشروع التالي", sep: "، " },
  en: { client: "Client", loc: "Location", year: "Year", did: "What we did", work: "Work", challenge: "The challenge", approach: "What we did", next: "Next project", sep: ", " },
};

export function CaseView({ p, lang }: { p: Project; lang: Lang }) {
  const t = T[lang];
  const { projects } = content(lang);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const tone = p.dark ? "text-ivory" : "text-ink";
  const soft = p.dark ? "text-ivory/60" : "text-ink/60";
  const hair = p.dark ? "border-ivory/15" : "border-ink/15";
  const meta: [string, string][] = [[t.client, p.client], [t.loc, p.location], [t.year, p.year], [t.did, p.tags.join(t.sep)]];

  return (
    <>
      {/* ——— الغلاف بلون هوية العميل ——— */}
      <Scene id="case-hero" theme="mat" dark={p.dark} className={`overflow-hidden px-[var(--pad)] pt-[clamp(140px,22vh,220px)] ${tone}`} style={{ background: p.mat }}>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 50% at 50% 70%, ${p.accent}33, transparent 70%)` }} />
        <div className="relative mx-auto max-w-[1480px]">
          <Rise immediate>
            <p data-rise className={`text-[14px] ${soft}`}>
              <Link href="/work" className="link-line">{t.work}</Link>
              <span className="mx-3 opacity-50">/</span>{p.tags[0]}
            </p>
          </Rise>
          <Lines immediate as="h1" className={`${lang === "ar" && !/[\u0600-\u06FF]/.test(p.name) ? "h1 !font-[family-name:var(--font-yapari)] !text-[clamp(44px,6vw,104px)]" : "display"} mt-8`} lines={[p.name]} delay={0.1} />
          {p.latin && <p className={`latin mt-3 text-start text-[13px] tracking-[0.3em] ${soft}`}>{p.latin.toUpperCase()}</p>}
          <Rise immediate delay={0.4}>
            <p data-rise className={`lead mt-9 max-w-[52ch] ${soft}`}>{p.summary}</p>
            <dl data-rise className={`mt-10 grid grid-cols-2 gap-6 border-t pt-7 md:grid-cols-4 ${hair}`}>
              {meta.map(([k, v]) => (
                <div key={k}><dt className={`text-[12px] ${soft}`}>{k}</dt><dd className="mt-1.5 text-[15px] leading-relaxed">{v}</dd></div>
              ))}
            </dl>
          </Rise>
          <Parallax amount={6} className="relative mx-auto mt-[7vh] max-w-[1240px] translate-y-[8%]">
            <Browser src={p.cover} url={p.coverUrl} light={p.coverLight} priority sizes="(max-width:1300px) 94vw, 1240px" />
          </Parallax>
        </div>
      </Scene>

      {/* ——— القصة ——— */}
      <Scene id="case-story" theme="paper" className="px-[var(--pad)] pt-[clamp(140px,22vh,240px)] pb-[clamp(90px,14vh,150px)]">
        <div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-2 lg:gap-[7vw]">
          <div>
            <span className="label">{t.challenge}</span>
            <Rise><p data-rise className="serif mt-7 text-[clamp(26px,2.3vw,36px)] leading-[1.55] text-ink">{p.challenge}</p></Rise>
          </div>
          <div>
            <span className="label">{t.approach}</span>
            <Rise>
              <p data-rise className="lead mt-7 text-ink/75">{p.approach}</p>
              <ul data-rise className="mt-10 grid gap-3 border-t border-hair-ink pt-7 sm:grid-cols-2">
                {p.deliverables.map((d) => <li key={d} className="flex items-baseline gap-3 text-[15px]"><i className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: p.accent }} />{d}</li>)}
              </ul>
              {p.note && <p data-rise className="mt-8 text-[14px] text-ink/55">{p.note}</p>}
              {p.url && <a data-rise href={p.url} target="_blank" rel="noopener" className="link-line latin mt-8 text-[15px]">{p.url.replace(/^https?:\/\/(www\.)?/, "")}</a>}
            </Rise>
          </div>
        </div>
      </Scene>

      {/* ——— مواد المشروع ——— */}
      <Scene id="case-gallery" theme="mat" dark={p.dark} className={`px-[var(--pad)] py-[clamp(100px,16vh,180px)] ${tone}`} style={{ background: p.mat }}>
        <div className="mx-auto grid max-w-[1480px] gap-[clamp(90px,14vh,160px)]">
          {p.blocks.map((b, i) => <CaseBlock key={i} b={b} dark={p.dark} />)}
        </div>
      </Scene>

      {/* ——— المشروع التالي ——— */}
      <Scene id="case-next" theme="paper" className="px-[var(--pad)] py-[clamp(90px,14vh,150px)]">
        <Link href={`/work/${next.slug}`} className="group mx-auto grid max-w-[1480px] items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="text-[14px] text-ink/50">{t.next}</span>
            <span className="h1 mt-3 block transition-opacity duration-500 group-hover:opacity-60">{next.name}</span>
            <span className="mt-3 block text-[15px] text-ink/55">{next.tags.join(t.sep)}</span>
          </div>
          <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[4px] md:w-[380px]" style={{ background: next.mat }}>
            <span className="absolute inset-[10%] transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out)] group-hover:scale-105">
              <Browser src={next.cover} url={next.coverUrl} light={next.coverLight} sizes="380px" />
            </span>
          </span>
        </Link>
      </Scene>

      <Closing light={p.accent} />
    </>
  );
}
