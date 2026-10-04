import type { Metadata } from "next";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise } from "@/components/ui/motion";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Closing } from "@/components/layout/Closing";
import type { StageCfg } from "@/lib/stage/glass";
import { alt, langOf } from "@/lib/i18n/page";

const T = {
  ar: {
    title: "المدونة",
    desc: "مقالات RVIOS عن إدارة الأعمال، تطوير المواقع، التجارة الإلكترونية، والتسويق الرقمي.",
    head: ["أفكار عن بناء", "الأعمال رقمياً."],
    lead: "ما نتعلمه من بناء المواقع والأنظمة والمتاجر، مكتوباً لأصحاب الأعمال وصنّاع القرار والمطورين.",
    closing: ["لديك فكرة؟", "لنبنِها معاً."],
  },
  en: {
    title: "Journal",
    desc: "RVIOS articles on business management, web development, e-commerce and digital marketing.",
    head: ["Ideas on building", "businesses digitally."],
    lead: "What we learn from building websites, systems and stores — written for business owners, decision makers and developers.",
    closing: ["Have an idea?", "Let's build it together."],
  },
};

const HERO: StageCfg = { d: { x: -2.25, y: 0.2, s: 0.66 }, m: { x: 0, y: 1.7, s: 0.45 }, glow: 0.85 };

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: T[lang].title, description: T[lang].desc, alternates: alt(lang, "/blog") };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = await langOf(params);
  const t = T[lang];
  return (
    <>
      <Scene id="blog-hero" cfg={HERO} className="flex min-h-[80svh] flex-col justify-end px-[var(--pad)] pt-[44vh] pb-[10vh] lg:justify-center lg:pt-32">
        <div className="mx-auto w-full max-w-[1480px]">
          <span className="label">{t.title}</span>
          <Lines immediate as="h1" className="h1 mt-6" lines={[t.head[0], <span key="m" className="text-mist">{t.head[1]}</span>]} />
          <Rise immediate delay={0.5}><p data-rise className="lead mt-8 max-w-[46ch] text-mist">{t.lead}</p></Rise>
        </div>
      </Scene>
      <Scene id="blog-list" theme="paper" className="px-[var(--pad)] py-[clamp(90px,14vh,150px)]">
        <div className="mx-auto max-w-[1480px]"><BlogIndex /></div>
      </Scene>
      <Closing lines={t.closing} />
    </>
  );
}
