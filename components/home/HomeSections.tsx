"use client";
import Image from "next/image";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise, Curtain } from "@/components/ui/motion";
import { Steps } from "@/components/ui/Steps";
import { processOf } from "@/lib/content/process";
import { AppShowcase } from "@/components/home/AppShowcase";
import { StoreShowcase } from "@/components/home/StoreShowcase";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";
import { content, formatDate } from "@/lib/content";
import { APK_URL, STOREOS_URL } from "@/lib/content/links";

/* رموز خطية رفيعة لكل منتج */
export const glyphs: Record<string, React.ReactNode> = {
  storeos: <path d="M8 18h32l-3 22H11zM16 18v-4a8 8 0 0116 0v4" />,
  app: <><rect x="14" y="6" width="20" height="36" rx="5" /><path d="M21 36h6M19 16h10M19 22h6" /></>,
  custom: <path d="M10 38l6-2 20-20-4-4-20 20-2 6zM28 12l4 4M8 42h32" />,
};

const PRODUCTS_HEAD: StageCfg = { d: { x: 0, y: -6, s: 1.2 }, glow: 0.25 };
const PRODUCTS: StageCfg = { d: { x: 0, y: -0.1, s: 1.3 }, m: { x: 0, y: -9, s: 0.5 }, glow: 0.95 };
const APP: StageCfg = { d: { x: 2.1, y: 0.05, s: 0.95 }, m: { x: 0, y: -9, s: 0.5 }, light: "#E0B062", glow: 0.9 };
const STORE: StageCfg = { d: { x: -2.15, y: -0.2, s: 0.9 }, m: { x: 0, y: -9, s: 0.5 }, glow: 0.85 };

const T = {
  ar: {
    pLabel: "منتجات RVIOS", pHead: ["أدوات نبنيها", "ونشغّلها بأنفسنا."],
    pLead: "إلى جانب مشاريع عملائنا، نبني منتجاتنا الخاصة للتجارة وإدارة الأعمال، ونطوّرها كل يوم.",
    sHead: ["متجرك الإلكتروني،", "بتصميم يبيع عنك."],
    sLead: "افتح متجرك على RVIOS Store بقالب من ثمانية عشر قالبًا احترافيًا — لكل قالب هيكله وحركته وإحساسه — برابط خاص ودومين إن شئت، وطلبات تُحفظ ثم تصلك على واتساب وفي تطبيق RVIOS.",
    sPoints: ["رابط خاص فوري، ودومينك على الباقات المدفوعة", "الدفع عند الاستلام والكريمي وجيب وجوالي", "متجرك يُدار من جوالك ومن لوحة التحكم"],
    sStats: [["١٨", "قالبًا احترافيًا"], ["٠٪", "عمولة على مبيعاتك"], ["دقائق", "حتى يعمل متجرك"]],
    sCta: "افتح متجرك مجانًا",
    sAlt: "تصفّح القوالب",
    aHead: ["متجرك كله", "في جيبك."],
    aLead: "تطبيق RVIOS: افتح متجرك من جوالك، واختر قالبه بمعاينة حية بشكل الجوال والمتصفح، وصمّمه بلمساتك، وتابع كل طلب لحظة وصوله.",
    aPoints: ["معاينة حية للقوالب الثمانية عشر", "تصميم المتجر وصور المنتجات من الجوال", "إشعار فوري مع كل طلب جديد", "الباقات والدفع بالكريمي وجيب وجوالي"],
    aCta: "حمّل التطبيق لأندرويد",
    aMore: "تفاصيل التطبيق",
    process: "طريقة العمل", processHead: ["من الفكرة", "إلى الإطلاق."],
    blog: "المدونة", blogHead: ["أفكار عن بناء الأعمال رقمياً."], blogAll: "كل المقالات",
  },
  en: {
    pLabel: "RVIOS products", pHead: ["Tools we build", "and run ourselves."],
    pLead: "Alongside client work, we build our own products for commerce and business management — and improve them every day.",
    sHead: ["Your online store,", "designed to sell for you."],
    sLead: "Open your store on RVIOS Store with one of eighteen professional templates — each with its own structure, motion and feel — your own link or domain, and orders saved then sent to you on WhatsApp and in the RVIOS app.",
    sPoints: ["Instant store link, your own domain on paid plans", "Cash on delivery and local transfers built in", "Run it from your phone and the dashboard"],
    sStats: [["18", "pro templates"], ["0%", "commission on sales"], ["Minutes", "to go live"]],
    sCta: "Open your store free",
    sAlt: "Browse templates",
    aHead: ["Your whole store", "in your pocket."],
    aLead: "The RVIOS app: open your store from your phone, pick its template with a live phone and desktop preview, design it your way, and follow every order the moment it arrives.",
    aPoints: ["Live preview of all 18 templates", "Store design and product photos from your phone", "Instant alert for every new order", "Plans and local payments built in"],
    aCta: "Download for Android",
    aMore: "About the app",
    process: "How we work", processHead: ["From idea", "to launch."],
    blog: "Journal", blogHead: ["Ideas on building businesses digitally."], blogAll: "All articles",
  },
};

export function Products() {
  const lang = useLang();
  const t = T[lang];
  const { products } = content(lang);
  const store = products.find((p) => p.slug === "storeos")!;
  const app = products.find((p) => p.slug === "app")!;
  return (
    <>
      <Scene id="products" cfg={PRODUCTS_HEAD} className="px-[var(--pad)] pt-[clamp(120px,20vh,220px)]">
        <div className="mx-auto max-w-[900px] text-center">
          <span className="label">{t.pLabel}</span>
          <Lines className="h1 mt-6" lines={t.pHead} />
          <Rise><p data-rise className="lead mx-auto mt-6 max-w-[48ch] text-mist">{t.pLead}</p></Rise>
        </div>
      </Scene>
      <Scene id="products-cards" cfg={PRODUCTS} className="grid min-h-svh items-center px-[var(--pad)] py-[12vh]">
        <Rise className="mx-auto grid w-full max-w-[1480px] gap-5 md:grid-cols-3" stagger={0.12}>
          {products.map((p) => (
            <L data-rise key={p.slug} href={p.href} className="glass group flex min-h-[420px] flex-col rounded-[26px] p-9 transition-transform duration-700 [transition-timing-function:var(--ease-out)] hover:-translate-y-2">
              <svg viewBox="0 0 48 48" className="h-12 w-12 fill-none stroke-[1.2]" style={{ stroke: p.tone }} aria-hidden="true">{glyphs[p.slug]}</svg>
              <h3 dir="ltr" className="yap mt-auto text-start text-[clamp(28px,2.5vw,40px)] leading-none rtl:text-end">{p.name}</h3>
              <p className="mt-4 text-[15px]" style={{ color: p.tone }}>{p.role}</p>
              <p className="mt-3 text-[15px] text-mist">{p.desc}</p>
              <span className="link-line mt-8 self-start text-[14px]">{p.cta}</span>
            </L>
          ))}
        </Rise>
      </Scene>

      {/* المنصة ثم التطبيق */}
      <Scene id="storeos" cfg={STORE} className="px-[var(--pad)] py-[clamp(90px,14vh,160px)]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="label latin">{store.name}</span>
            <Lines className="h2 mt-6" lines={t.sHead} />
            <Rise>
              <p data-rise className="lead mt-6 max-w-[46ch] text-mist">{t.sLead}</p>
              <ul data-rise className="mt-8 grid gap-3 text-[15px]">
                {t.sPoints.map((f) => (
                  <li key={f} className="flex items-baseline gap-4"><i className="h-1.5 w-1.5 flex-none rounded-full bg-ruby" />{f}</li>
                ))}
              </ul>
              <div data-rise className="sw-stats">
                {t.sStats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
              </div>
              <div data-rise className="mt-9 flex flex-wrap gap-3">
                <L href={STOREOS_URL} className="btn btn-ruby">{t.sCta}</L>
                <L href={`${STOREOS_URL}/templates`} className="btn">{t.sAlt}</L>
              </div>
            </Rise>
          </div>
          <StoreShowcase />
        </div>
      </Scene>

      <Scene id="app" cfg={APP} className="px-[var(--pad)] py-[clamp(90px,14vh,160px)]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="label">{app.name}</span>
            <Lines className="h2 mt-6" lines={t.aHead} />
            <Rise>
              <p data-rise className="lead mt-6 max-w-[42ch] text-mist">{t.aLead}</p>
              <ul data-rise className="mt-8 grid gap-3 text-[15px]">
                {t.aPoints.map((f) => (
                  <li key={f} className="flex items-baseline gap-4"><i className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />{f}</li>
                ))}
              </ul>
              <div data-rise className="mt-9 flex flex-wrap gap-3">
                <a href={APK_URL} download className="btn btn-gold">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18a.38.38 0 10-.66-.38l-1.86 3.22a11.4 11.4 0 00-9.84 0L5.22 5.92a.38.38 0 10-.66.38L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" /></svg>
                  {t.aCta}
                </a>
                <L href={app.href} className="btn">{t.aMore}</L>
              </div>
            </Rise>
          </div>
          <AppShowcase />
        </div>
      </Scene>
    </>
  );
}

export function HomeProcess() {
  const lang = useLang();
  const t = T[lang];
  return (
    <Scene id="process" theme="paper" className="px-[var(--pad)] pt-[clamp(110px,16vh,180px)] pb-[clamp(80px,10vh,120px)]">
      <div className="mx-auto max-w-[1480px]">
        <span className="label">{t.process}</span>
        <Lines className="h1 mt-6" lines={t.processHead} />
        <div className="mt-[10vh]"><Steps items={processOf(lang)} /></div>
      </div>
    </Scene>
  );
}

export function Journal() {
  const lang = useLang();
  const t = T[lang];
  const { posts } = content(lang);
  return (
    <Scene id="journal" theme="paper" className="px-[var(--pad)] pt-[clamp(60px,8vh,100px)] pb-[clamp(110px,16vh,180px)]">
      <div className="mx-auto max-w-[1480px] border-t border-hair-ink pt-[clamp(60px,8vh,100px)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><span className="label">{t.blog}</span><Lines className="h2 mt-6" lines={t.blogHead} /></div>
          <L href="/blog" className="btn">{t.blogAll}</L>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <L key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <Curtain className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink/5">
                <Image src={p.cover} alt="" fill sizes="(max-width:900px) 100vw, 33vw" className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-105" />
              </Curtain>
              <p className="mt-6 text-[13px] text-ink/50">{p.category} — {formatDate(lang, p.date)}</p>
              <h3 className="serif mt-2 text-[26px] leading-[1.3] text-ink transition-opacity group-hover:opacity-70">{p.title}</h3>
            </L>
          ))}
        </div>
      </div>
    </Scene>
  );
}
