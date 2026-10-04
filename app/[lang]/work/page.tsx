import type { Metadata } from "next";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise } from "@/components/ui/motion";
import { WorkIndex } from "@/components/work/WorkIndex";
import { Closing } from "@/components/layout/Closing";
import type { StageCfg } from "@/lib/stage/glass";
import { content } from "@/lib/content";
import { alt, langOf } from "@/lib/i18n/page";

const T = {
  ar: {
    title: "الأعمال",
    desc: "مشاريع صمّمتها وطوّرتها RVIOS: هويات وملفات تعريفية ومواقع لشركات في السعودية، وبرمجيات للأمن السيبراني.",
    head: ["أعمال تتحدث", "عن أصحابها."],
    lead: (n: number) => `هويات وملفات تعريفية ومواقع لشركات في المملكة العربية السعودية، وبرمجيات بنيناها من الصفر. ${n} مشاريع، لكل منها قصة.`,
    closing: ["مشروعك التالي", "قد يكون هنا."],
  },
  en: {
    title: "Work",
    desc: "Projects designed and developed by RVIOS: identities, company profiles and websites for Saudi companies, plus cybersecurity software.",
    head: ["Work that speaks", "for its owners."],
    lead: (n: number) => `Identities, company profiles and websites for companies in Saudi Arabia, and software we built from scratch. ${n} projects, each with a story.`,
    closing: ["Your next project", "could be here."],
  },
};

const HERO: StageCfg = { d: { x: -2.15, y: 0.3, s: 0.72 }, m: { x: 0, y: 1.6, s: 0.5 } };

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: T[lang].title, description: T[lang].desc, alternates: alt(lang, "/work") };
}

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const lang = await langOf(params);
  const t = T[lang];
  return (
    <>
      <Scene id="work-hero" cfg={HERO} className="flex min-h-[92svh] flex-col justify-end px-[var(--pad)] pt-[46vh] pb-[12vh] lg:justify-center lg:pt-32">
        <div className="mx-auto w-full max-w-[1480px]">
          <span className="label">{t.title}</span>
          <Lines immediate as="h1" className="h1 mt-6" lines={[t.head[0], <span key="m" className="text-mist">{t.head[1]}</span>]} />
          <Rise immediate delay={0.5}>
            <p data-rise className="lead mt-8 max-w-[46ch] text-mist">{t.lead(content(lang).projects.length)}</p>
          </Rise>
        </div>
      </Scene>
      <Scene id="work-index" theme="paper" className="px-[var(--pad)] py-[clamp(90px,14vh,150px)]">
        <div className="mx-auto max-w-[1480px]"><WorkIndex /></div>
      </Scene>
      <Closing lines={t.closing} />
    </>
  );
}
