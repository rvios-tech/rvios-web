"use client";
import Image from "next/image";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise, Curtain } from "@/components/ui/motion";
import { Steps } from "@/components/ui/Steps";
import { processOf } from "@/lib/content/process";
import { Dashboard } from "@/components/azm/Dashboard";
import { PhoneStore } from "@/components/shop/PhoneStore";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";
import { content, formatDate } from "@/lib/content";
import { AZMSMART_URL, STOREOS_URL } from "@/lib/content/links";

/* رموز خطية رفيعة لكل منتج */
export const glyphs: Record<string, React.ReactNode> = {
  storeos: <path d="M8 18h32l-3 22H11zM16 18v-4a8 8 0 0116 0v4" />,
  azmsmart: <path d="M6 40h36M12 34V22M20 34V12M28 34v-8M36 34V16" />,
  azm: <><rect x="14" y="6" width="20" height="36" rx="5" /><path d="M21 36h6" /></>,
};

const PRODUCTS_HEAD: StageCfg = { d: { x: 0, y: -6, s: 1.2 }, glow: 0.25 };
const PRODUCTS: StageCfg = { d: { x: 0, y: -0.1, s: 1.3 }, m: { x: 0, y: -9, s: 0.5 }, glow: 0.95 };
const AZM: StageCfg = { d: { x: -1.9, y: 0.05, s: 1.05 }, m: { x: 0, y: -1.2, s: 0.55 }, light: "#E0B062", glow: 0.95 };
const STORE: StageCfg = { d: { x: -2.15, y: -0.2, s: 0.9 }, m: { x: 0, y: -9, s: 0.5 }, glow: 0.85 };

const T = {
  ar: {
    pLabel: "منتجات RVIOS", pHead: ["أدوات نبنيها", "ونشغّلها بأنفسنا."],
    pLead: "إلى جانب مشاريع عملائنا، نبني منتجاتنا الخاصة للتجارة وإدارة الأعمال، ونطوّرها كل يوم.",
    sHead: ["متجرك جاهز", "قبل أن تبرد قهوتك."],
    sLead: "أنشئ متجرك الإلكتروني بنفسك على RVIOS StoreOS، أدِر منتجاتك وطلباتك من مكان واحد، واستقبل الطلبات مباشرة عبر واتساب.",
    sPoints: ["رابط خاص لمتجرك، ويمكن ربط نطاقك", "باقة مجانية حتى 10 منتجات", "الشعار والألوان والتصنيفات بيدك"],
    sCta: "اكتشف RVIOS StoreOS",
    aHead: ["عملك ومتجرك،", "في نظام واحد."],
    aLead: "الطلب الذي يصل من متجرك يُخصم من المخزون، ويُسجَّل في المالية، ويظهر في ملف العميل تلقائياً. بلا إدخال مكرر ولا جداول متفرقة.",
    aCta: "استكشف AzmSmart",
    process: "طريقة العمل", processHead: ["من الفكرة", "إلى الإطلاق."],
    blog: "المدونة", blogHead: ["أفكار عن بناء الأعمال رقمياً."], blogAll: "كل المقالات",
  },
  en: {
    pLabel: "RVIOS products", pHead: ["Tools we build", "and run ourselves."],
    pLead: "Alongside client work, we build our own products for commerce and business management — and improve them every day.",
    sHead: ["Your store is live", "before your coffee cools."],
    sLead: "Build your online store yourself on RVIOS StoreOS, manage products and orders in one place, and receive orders straight to WhatsApp.",
    sPoints: ["Your own store link, with custom domains", "Free plan for up to 10 products", "Your logo, colours and categories"],
    sCta: "Discover RVIOS StoreOS",
    aHead: ["Your business and store,", "in one system."],
    aLead: "An order from your store is deducted from inventory, booked in finance and added to the customer's profile — automatically. No double entry, no scattered spreadsheets.",
    aCta: "Explore AzmSmart",
    process: "How we work", processHead: ["From idea", "to launch."],
    blog: "Journal", blogHead: ["Ideas on building businesses digitally."], blogAll: "All articles",
  },
};

export function Products() {
  const lang = useLang();
  const t = T[lang];
  const { products } = content(lang);
  const store = products.find((p) => p.slug === "storeos")!;
  const azm = products.find((p) => p.slug === "azmsmart")!;
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

      {/* RVIOS StoreOS أولاً ثم AzmSmart */}
      <Scene id="storeos" cfg={STORE} className="px-[var(--pad)] py-[clamp(90px,14vh,160px)]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="label latin">{store.name}</span>
            <Lines className="h2 mt-6" lines={t.sHead} />
            <Rise>
              <p data-rise className="lead mt-6 max-w-[42ch] text-mist">{t.sLead}</p>
              <ul data-rise className="mt-8 grid gap-3 text-[15px]">
                {t.sPoints.map((f) => (
                  <li key={f} className="flex items-baseline gap-4"><i className="h-1.5 w-1.5 flex-none rounded-full bg-ruby" />{f}</li>
                ))}
              </ul>
              <L data-rise href={STOREOS_URL} className="btn btn-ruby mt-9">{t.sCta}</L>
            </Rise>
          </div>
          <PhoneStore sceneCfg={STORE} />
        </div>
      </Scene>

      <Scene id="azmsmart" cfg={AZM} className="px-[var(--pad)] py-[clamp(90px,14vh,160px)]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="label latin">{azm.name}</span>
            <Lines className="h2 mt-6" lines={t.aHead} />
            <Rise><p data-rise className="lead mt-6 max-w-[42ch] text-mist">{t.aLead}</p>
              <L data-rise href={AZMSMART_URL} className="btn btn-gold mt-9">{t.aCta}</L></Rise>
          </div>
          <Dashboard />
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
