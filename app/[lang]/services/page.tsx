import type { Metadata } from "next";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise, Curtain } from "@/components/ui/motion";
import { Browser } from "@/components/ui/Browser";
import { Steps } from "@/components/ui/Steps";
import { processOf } from "@/lib/content/process";
import { Faq } from "@/components/ui/Faq";
import { Dashboard } from "@/components/azm/Dashboard";
import { PhoneStore } from "@/components/shop/PhoneStore";
import { Closing } from "@/components/layout/Closing";
import { L } from "@/components/i18n/L";
import type { StageCfg } from "@/lib/stage/glass";
import { content, type Service } from "@/lib/content";
import { alt, langOf } from "@/lib/i18n/page";
import type { Lang } from "@/lib/i18n/config";

const T = {
  ar: {
    title: "الخدمات",
    desc: "تصميم وتطوير المواقع الإلكترونية، بناء الأنظمة وتطبيقات الويب، تصميم وتطوير المتاجر الإلكترونية وصفحات الهبوط، وصيانة وتطوير المواقع والأنظمة.",
    head: ["خدمات تُبنى", "على مقاس عملك."],
    lead: "خمس خدمات يقدّمها فريق واحد، من أول فكرة حتى ما بعد الإطلاق.",
    forWho: "لمن هذه الخدمة؟ ",
    ask: "اطلب هذه الخدمة",
    modelsLabel: "طرق العمل معنا",
    modelsHead: ["ثلاث طرق،", "واختيار واحد يناسبك."],
    fits: "مناسب لـ: ",
    models: [
      { t: "مشروع بنطاق محدد", d: "نحدد معاً ما سيُبنى ومتى يُسلَّم، وتحصل على عرض واضح قبل البدء.", l: "المواقع، الأنظمة، المتاجر، صفحات الهبوط" },
      { t: "صيانة شهرية", d: "اشتراك مستمر يغطي المراقبة والتحديثات والتحسينات كل شهر.", l: "المواقع والأنظمة القائمة" },
      { t: "شراكة تطوير", d: "فريقنا امتداد لفريقك: ساعات تطوير شهرية لمنتج يتطور باستمرار.", l: "المنتجات الرقمية والأنظمة" },
    ],
    processHead: ["من الفكرة إلى الإطلاق."],
    faqLabel: "أسئلة شائعة",
    faqHead: ["قبل أن", "نبدأ معاً."],
    faq: [
      { q: "كم تستغرق مدة تنفيذ المشروع؟", a: "تعتمد على النطاق: صفحة الهبوط أسرع بكثير من نظام متكامل. بعد جلسة الفهم الأولى نرسل لك جدولاً زمنياً مقسماً إلى مراحل." },
      { q: "كيف تُحدَّد التكلفة؟", a: "لا نعتمد أسعاراً ثابتة لأن كل مشروع مختلف. نحدد النطاق معاً، ثم نرسل عرضاً مفصلاً بما سيُسلَّم وتكلفته قبل أي التزام." },
      { q: "هل سأتمكن من تعديل المحتوى بنفسي؟", a: "نعم. كل موقع ومتجر نبنيه يأتي بلوحة تحكم لإدارة المحتوى، ونشرح لفريقك طريقة استخدامها." },
      { q: "هل تستلمون مواقع أو أنظمة بناها غيركم؟", a: "نعم، ضمن خدمة الصيانة والتطوير. نبدأ بمراجعة تقنية ثم نقترح خطة للإصلاح والتحسين." },
      { q: "من يملك الكود والتصاميم بعد التسليم؟", a: "أنت. نسلّمك الكود المصدري وملفات التصميم وحسابات الاستضافة باسمك." },
    ],
  },
  en: {
    title: "Services",
    desc: "Website design and development, systems and web applications, online stores, landing pages, and ongoing maintenance and growth for websites and systems.",
    head: ["Services built", "around your business."],
    lead: "Five services delivered by one team — from the first idea to long after launch.",
    forWho: "Who is it for? ",
    ask: "Request this service",
    modelsLabel: "Ways to work with us",
    modelsHead: ["Three models,", "one that fits you."],
    fits: "Best for: ",
    models: [
      { t: "Fixed-scope project", d: "We agree on what gets built and when it ships, with a clear proposal before we start.", l: "Websites, systems, stores, landing pages" },
      { t: "Monthly maintenance", d: "An ongoing plan covering monitoring, updates and improvements every month.", l: "Existing websites and systems" },
      { t: "Development partnership", d: "Our team as an extension of yours: monthly development hours for an evolving product.", l: "Digital products and systems" },
    ],
    processHead: ["From idea to launch."],
    faqLabel: "FAQ",
    faqHead: ["Before we", "start together."],
    faq: [
      { q: "How long does a project take?", a: "It depends on scope — a landing page is much faster than a full system. After our discovery session we send a timeline broken into phases." },
      { q: "How is pricing decided?", a: "We don't use fixed prices because every project is different. We define the scope together, then send a detailed proposal of deliverables and cost before any commitment." },
      { q: "Can I edit the content myself?", a: "Yes. Every website and store we build comes with a dashboard to manage content, and we walk your team through it." },
      { q: "Do you take over sites or systems built by others?", a: "Yes, as part of our maintenance service. We start with a technical audit, then propose a plan to fix and improve." },
      { q: "Who owns the code and designs after delivery?", a: "You do. We hand over the source code, design files and hosting accounts in your name." },
    ],
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: T[lang].title, description: T[lang].desc, alternates: alt(lang, "/services") };
}

const HERO: StageCfg = { d: { x: -2.15, y: 0.3, s: 0.72 }, m: { x: 0, y: 1.6, s: 0.5 } };
const DARK: StageCfg = { d: { x: -1.95, y: 0, s: 1.05 }, m: { x: 0, y: 1.9, s: 0.45 }, glow: 0.8 };

function ServiceBlock({ s, dark, lang }: { s: Service; dark: boolean; lang: Lang }) {
  const t = T[lang];
  const visual =
    s.visual.kind === "dashboard" ? <Dashboard chips={false} />
    : s.visual.kind === "store" ? <div className="py-6"><PhoneStore /></div>
    : <Browser src={s.visual.src} url={s.visual.url} light={s.visual.light} sizes="(max-width:1024px) 92vw, 48vw" />;
  return (
    <Scene id={s.slug} theme={dark ? "dark" : "paper"} cfg={dark ? DARK : undefined} className="px-[var(--pad)] py-[clamp(100px,16vh,170px)]">
      <div className="mx-auto grid max-w-[1480px] items-center gap-[6vw] gap-y-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="latin text-[13px] text-gold">{s.n} — {s.latin}</span>
          <Lines className="h2 mt-5" lines={[s.title]} />
          <Rise>
            <p data-rise className="lead mt-7 max-w-[54ch] opacity-75">{s.long}</p>
            <ul data-rise className="mt-10 grid gap-x-8 gap-y-3.5 text-[15px] sm:grid-cols-2">
              {s.includes.map((x) => <li key={x} className="flex items-baseline gap-3"><i className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />{x}</li>)}
            </ul>
            <p data-rise className="latin mt-9 text-start text-[13px] tracking-wide opacity-50">{s.stack.join("  /  ")}</p>
            <p data-rise className="mt-9 max-w-[54ch] border-s border-gold/70 ps-5 text-[15px] opacity-75"><b className="opacity-100">{t.forWho}</b>{s.forWho}</p>
            <L data-rise href={`/contact?topic=${s.slug}`} className={`btn mt-10 ${dark ? "btn-ruby" : ""}`}>{t.ask}</L>
          </Rise>
        </div>
        <div>
          <Curtain>{visual}</Curtain>
          <p className="mt-4 text-[13px] opacity-45">{s.visual.caption}</p>
        </div>
      </div>
    </Scene>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = await langOf(params);
  const t = T[lang];
  const { services } = content(lang);
  return (
    <>
      <Scene id="services-hero" cfg={HERO} className="flex min-h-svh flex-col justify-end px-[var(--pad)] pt-[46vh] pb-[10vh] lg:justify-center lg:pt-32">
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="max-w-[860px]">
            <span className="label">{t.title}</span>
            <Lines immediate as="h1" className="h1 mt-6" lines={[t.head[0], <span key="m" className="text-mist">{t.head[1]}</span>]} />
            <Rise immediate delay={0.5}>
              <p data-rise className="lead mt-8 max-w-[46ch] text-mist">{t.lead}</p>
              <ol data-rise className="mt-10 grid max-w-[600px] border-t border-hair">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-hair">
                    <a href={`#${s.slug}`} className="group flex items-baseline gap-5 py-3.5">
                      <span className="latin text-[12px] text-gold">{s.n}</span>
                      <span className="serif text-[22px] transition-opacity group-hover:opacity-60">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Rise>
          </div>
        </div>
      </Scene>

      {services.map((s, i) => <ServiceBlock key={s.slug} s={s} dark={i % 2 === 1} lang={lang} />)}

      <Scene id="models" theme="paper" className="px-[var(--pad)] py-[clamp(100px,16vh,170px)]">
        <div className="mx-auto max-w-[1480px]">
          <span className="label">{t.modelsLabel}</span>
          <Lines className="h2 mt-6" lines={t.modelsHead} />
          <Rise className="mt-16 grid border-t border-hair-ink md:grid-cols-3" stagger={0.1}>
            {t.models.map((m, i) => (
              <div data-rise key={m.t} className={`py-10 md:px-10 ${i ? "md:border-s md:border-hair-ink" : "md:ps-0"}`}>
                <h3 className="h3">{m.t}</h3>
                <p className="mt-4 text-[16px] text-ink/65">{m.d}</p>
                <p className="mt-8 text-[13px] text-ink/45">{t.fits}{m.l}</p>
              </div>
            ))}
          </Rise>
        </div>
      </Scene>

      <Scene id="services-process" theme="paper" className="px-[var(--pad)] pb-[clamp(100px,14vh,160px)]">
        <div className="mx-auto max-w-[1480px] border-t border-hair-ink pt-[clamp(80px,12vh,140px)]">
          <Lines className="h2" lines={t.processHead} />
          <div className="mt-16"><Steps items={processOf(lang)} /></div>
        </div>
      </Scene>

      <Scene id="services-faq" className="px-[var(--pad)] py-[clamp(100px,16vh,170px)]">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div><span className="label">{t.faqLabel}</span><Lines className="h2 mt-6" lines={t.faqHead} /></div>
          <Faq items={t.faq} />
        </div>
      </Scene>

      <Closing />
    </>
  );
}
