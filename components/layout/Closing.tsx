"use client";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise } from "@/components/ui/motion";
import { Lockup } from "@/components/ui/Logo";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";
import { navOf, site, siteText, waLink } from "@/lib/content/site";
import { content } from "@/lib/content";

const T = {
  ar: { lines: ["لنبنِ شيئاً", "يليق باسمك."], cta: "ابدأ مشروعك", wa: "راسلنا على واتساب", services: "الخدمات", products: "المنتجات", company: "الشركة" },
  en: { lines: ["Let's build something", "worthy of your name."], cta: "Start a project", wa: "Message us on WhatsApp", services: "Services", products: "Products", company: "Company" },
};

/** الخاتمة: الشعار الزجاجي يعود، دعوة للتواصل، والتذييل */
export function Closing({ lines, light }: { lines?: string[]; light?: string }) {
  const lang = useLang();
  const t = T[lang];
  const { services, products } = content(lang);
  const nav = navOf(lang);
  const cfg: StageCfg = { d: { x: 0, y: 1.7, s: 0.44 }, m: { x: 0, y: 1.95, s: 0.38 }, light, glow: 0.85 };
  return (
    <>
      <Scene id="closing" cfg={cfg} className="px-[var(--pad)] pb-8">
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="flex min-h-svh flex-col justify-end pt-[40vh] pb-[12vh]">
            <Lines as="h2" className="h1 text-center" lines={lines ?? t.lines} />
            <Rise className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <L data-rise href="/contact" className="btn btn-ruby">{t.cta}</L>
              <a data-rise href={waLink(lang)} target="_blank" rel="noopener" className="btn">{t.wa}</a>
            </Rise>
            <p className="mt-8 text-center">
              <a href={`mailto:${site.email}`} className="link-line latin text-lg text-mist hover:text-ivory">{site.email}</a>
            </p>
          </div>
        </div>
      </Scene>
      <Scene id="footer" className="px-[var(--pad)] pb-8">
        <div className="mx-auto w-full max-w-[1480px]">
          <footer className="grid gap-10 border-t border-hair pt-10 text-[14px] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Lockup />
              <p className="mt-5 max-w-[30ch] text-mist">{siteText[lang].tagline}</p>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="latin mt-4 inline-block text-mist transition-colors hover:text-ivory" dir="ltr">{site.whatsappDisplay}</a>
            </div>
            <div>
              <b className="mb-3 block text-[13px] font-medium text-gold">{t.services}</b>
              {services.map((s) => <L key={s.slug} href={`/services#${s.slug}`} className="block py-1 text-mist transition-colors hover:text-ivory">{s.label}</L>)}
            </div>
            <div>
              <b className="mb-3 block text-[13px] font-medium text-gold">{t.products}</b>
              {products.map((p) => <L key={p.slug} href={p.href} className="block py-1 text-mist transition-colors hover:text-ivory"><span dir="ltr">{p.name}</span></L>)}
            </div>
            <div>
              <b className="mb-3 block text-[13px] font-medium text-gold">{t.company}</b>
              {nav.filter((n) => n.href !== "/services" && !n.latin).map((n) => <L key={n.href} href={n.href} className="block py-1 text-mist transition-colors hover:text-ivory">{n.label}</L>)}
            </div>
          </footer>
          <div className="mt-10 flex flex-wrap justify-between gap-3 text-[12px] text-ivory/40">
            <span>© {new Date().getFullYear()} RVIOS Technologies — {siteText[lang].city}</span>
            <span className="flex gap-5">{site.social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener" className="latin hover:text-ivory">{s.label}</a>)}</span>
          </div>
        </div>
      </Scene>
    </>
  );
}
