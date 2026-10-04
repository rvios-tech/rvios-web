"use client";
import { Scene } from "@/components/stage/Scene";
import { FillWords, Rise } from "@/components/ui/motion";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";

const T = {
  ar: {
    label: "من نحن",
    side: "استوديو تقني يصمّم المنتجات الرقمية ويبنيها ويشغّلها.",
    text: "نحن RVIOS Technologies. نصمّم ونبني المنتجات الرقمية للشركات والعلامات الطموحة. لا نبدأ من قالب جاهز، بل من عملك وجمهورك وهدفك؛ ثم نصمّم ونطوّر ونُطلق، ونبقى شريكك التقني بعد الإطلاق حتى يكبر ما بنيناه معاً.",
    pillars: [
      { t: "الفهم قبل التصميم", d: "نحلل عملك وجمهورك قبل أن نرسم أول شاشة." },
      { t: "هندسة تدوم", d: "كود نظيف وآمن وقابل للتوسع، لا يُعاد بناؤه بعد عام." },
      { t: "شراكة بعد الإطلاق", d: "صيانة وتطوير مستمر، وفريق تعرفه ويعرف مشروعك." },
    ],
    where: "نعمل مع شركات وعلامات في اليمن والمملكة العربية السعودية.",
    link: "شاهد الأعمال",
  },
  en: {
    label: "About us",
    side: "A technology studio that designs, builds and runs digital products.",
    text: "We are RVIOS Technologies. We design and build digital products for ambitious companies and brands. We never start from a template — we start from your business, your audience and your goal. Then we design, engineer and launch, and stay on as your technology partner long after launch.",
    pillars: [
      { t: "Understanding first", d: "We study your business and audience before drawing a single screen." },
      { t: "Engineering that lasts", d: "Clean, secure, scalable code that won't need rebuilding in a year." },
      { t: "Partners after launch", d: "Ongoing maintenance and growth, by a team that knows your product." },
    ],
    where: "We work with companies and brands across Yemen and Saudi Arabia.",
    link: "See our work",
  },
};

export function Statement() {
  const t = T[useLang()];
  return (
    <Scene id="about" theme="paper" className="px-[var(--pad)] py-[clamp(110px,18vh,200px)]">
      <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_2.6fr]">
        <Rise className="flex flex-col gap-8">
          <span data-rise className="label">{t.label}</span>
          <p data-rise className="serif hidden max-w-[16ch] text-[26px] leading-snug text-ink lg:block">{t.side}</p>
        </Rise>
        <div>
          <FillWords className="serif text-[clamp(28px,3.3vw,54px)] leading-[1.45] text-ink" text={t.text} />
          <Rise className="mt-16 grid gap-8 border-t border-hair-ink pt-10 md:grid-cols-3" stagger={0.1}>
            {t.pillars.map((p, i) => (
              <div data-rise key={p.t}>
                <span className="latin text-[12px] text-gold">0{i + 1}</span>
                <h3 className="serif mt-2 text-[24px] text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] text-ink/60">{p.d}</p>
              </div>
            ))}
          </Rise>
          <Rise className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-hair-ink pt-6 text-[15px] text-ink/60">
            <span data-rise>{t.where}</span>
            <L data-rise href="/work" className="link-line text-ink">{t.link}</L>
          </Rise>
        </div>
      </div>
    </Scene>
  );
}
