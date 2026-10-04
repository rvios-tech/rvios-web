"use client";
import { useRef } from "react";
import { Scene } from "@/components/stage/Scene";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";
import { stage } from "@/lib/stage/store";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import { isFirstVisit } from "@/lib/session";

const CFG: StageCfg = { d: { x: 0, y: 0.3, s: 0.5 }, m: { x: 0, y: 0.6, s: 0.4 }, glow: 0.5, hero: true };

const T = {
  ar: {
    kicker: "RVIOS Technologies",
    l1: "نبني الأنظمة.",
    l2: "نطوّر الحلول. نمكّن الأعمال.",
    lead: "نصمّم ونطوّر المواقع الإلكترونية والأنظمة والمتاجر وصفحات الهبوط، ونبني منتجاتنا الخاصة لإدارة الأعمال والتجارة.",
    cta: "ابدأ مشروعك",
    alt: "شاهد أعمالنا",
    cities: "صنعاء — الرياض — الدمام",
    scroll: "مرّر للاكتشاف",
    tap: "انقر على الشاشة للتبديل",
    caps: [
      { t: "المواقع الإلكترونية", d: "مواقع تمثّل علامتك وتعمل كأداة حقيقية لعملك." },
      { t: "متاجر RVIOS StoreOS", d: "متجرك جاهز في دقائق، وطلباتك تصل عبر واتساب." },
      { t: "أنظمة ولوحات تحكم", d: "AzmSmart — المبيعات والمخزون والمالية في لوحة واحدة." },
    ],
  },
  en: {
    kicker: "RVIOS Technologies",
    l1: "We build systems.",
    l2: "We engineer solutions. We empower businesses.",
    lead: "We design and develop websites, web systems, online stores and landing pages — and build our own products for business and commerce.",
    cta: "Start a project",
    alt: "See our work",
    cities: "Sana'a — Riyadh — Dammam",
    scroll: "Scroll to explore",
    tap: "Tap the screen to switch",
    caps: [
      { t: "Websites", d: "Sites that represent your brand and work as real business tools." },
      { t: "Stores on RVIOS StoreOS", d: "Your store live in minutes, with orders arriving on WhatsApp." },
      { t: "Systems & dashboards", d: "AzmSmart — sales, inventory and finance in one dashboard." },
    ],
  },
};

/**
 * البطل: لابتوب ثلاثي الأبعاد بشاشة حية، والشعار الزجاجي يطفو فوق لوحة مفاتيحه.
 * التمرير مثبّت: يقترب المشهد وتتبدل الشاشة بين موقع ومتجر ولوحة تحكم، ثم يتحرر الشعار.
 */
export function HomeHero() {
  const lang = useLang();
  const t = T[lang];
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const h1 = el.querySelector<HTMLElement>("[data-swash]")!;
    if (reducedMotion()) { stage.hero(0); return; }
    const d = isFirstVisit() ? 2.3 : 0.4;
    gsap.from(el.querySelectorAll(".mask > span"), { yPercent: 115, rotate: 2, duration: 1.6, stagger: 0.12, ease: "expo.out", delay: d });
    gsap.from(el.querySelectorAll("[data-rise]"), { opacity: 0, y: 20, duration: 1.4, stagger: 0.1, ease: "expo.out", delay: d + 0.5 });
    gsap.from(el.querySelector("[data-line]"), { scaleX: 0, duration: 1.8, ease: "expo.inOut", delay: d + 0.2 });
    // امتداد الكشائد في خط Zain: تتنفس الحروف ثم تستقر
    gsap.fromTo(h1, { "--long": 0 }, { "--long": 420, duration: 2.2, ease: "expo.inOut", delay: d + 0.4, yoyo: true, repeat: 1, repeatDelay: 0.2 });

    const mob = innerWidth <= 900;
    const tl = gsap.timeline({ defaults: { ease: "none" } });
    tl.to(el.querySelector("[data-intro]"), { opacity: 0, y: -80, duration: 0.14 }, 0.03)
      .to(h1, { "--long": 700, duration: 0.14 }, 0.02)
      .to(el.querySelector("[data-foot]"), { opacity: 0, duration: 0.08 }, 0.02);
    const caps = el.querySelectorAll<HTMLElement>("[data-cap]");
    const spans: [number, number][] = [[0.2, 0.45], [0.47, 0.72], [0.74, 0.94]];
    caps.forEach((c, i) => {
      const [a, b] = spans[i];
      tl.fromTo(c, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.05 }, a)
        .to(c, { opacity: 0, y: -30, duration: 0.04 }, b - 0.04);
    });
    tl.to(el.querySelector("[data-prog-wrap]"), { opacity: 1, duration: 0.04 }, 0.17);
    tl.fromTo(el.querySelector("[data-prog]"), { scaleX: 0 }, { scaleX: 1, duration: 0.74 }, 0.2);
    tl.to(el.querySelector("[data-prog-wrap]"), { opacity: 0, duration: 0.04 }, 0.94);
    tl.set({}, {}, 1);

    ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top",
      end: () => "+=" + innerHeight * (mob ? 2.2 : 2.6),
      scrub: 0.6,
      animation: tl,
      onUpdate: (st) => stage.hero(st.progress),
    });
    return () => stage.hero(0);
  }, { scope: ref });

  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    stage.nextScreen();
  };

  return (
    <Scene id="hero" cfg={CFG}>
      <div ref={ref} onClick={onClick} className="relative h-svh min-h-[640px] cursor-pointer overflow-hidden">
        <div data-intro className="absolute inset-0 flex flex-col justify-end px-[var(--pad)] pb-[max(12vh,96px)] lg:justify-center lg:pb-0">
          <div className="mx-auto grid w-full max-w-[1480px] lg:grid-cols-[1.05fr_1fr]">
            <div className="lg:pt-[6vh]">
              <span data-rise className="label latin">{t.kicker}</span>
              <h1 className="mt-5">
                <span data-swash className="mask hero-title swash"><span>{t.l1}</span></span>
                <span className="mask hero-sub mt-2"><span className="opacity-60">{t.l2}</span></span>
              </h1>
              <p data-rise className="mt-7 max-w-[44ch] text-[16px] text-mist">{t.lead}</p>
              <div data-rise className="mt-8 flex flex-wrap gap-3">
                <L href="/contact" className="btn btn-ruby">{t.cta}</L>
                <L href="/work" className="btn">{t.alt}</L>
              </div>
            </div>
          </div>
        </div>

        {/* تعليقات الشاشة أثناء التمرير */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[max(6vh,36px)] px-[var(--pad)]">
          <div className="relative mx-auto h-[92px] max-w-[640px] text-center">
            {t.caps.map((c, i) => (
              <div key={c.t} data-cap className="absolute inset-0 opacity-0">
                <p className="text-[12px] tracking-[0.2em] text-gold"><span className="latin">0{i + 1} / 03</span></p>
                <p className="h3 mt-1">{c.t}</p>
                <p className="mt-1 text-[14px] text-mist">{c.d}</p>
              </div>
            ))}
          </div>
          <div data-prog-wrap className="mx-auto mt-4 opacity-0 h-px max-w-[220px] overflow-hidden bg-ivory/15">
            <i data-prog className="block h-full origin-[var(--o)] bg-gold [--o:right] ltr:[--o:left]" />
          </div>
        </div>

        <div data-foot className="absolute inset-x-0 bottom-0 hidden px-[var(--pad)] pb-[max(3.5vh,20px)] lg:block">
          <div className="mx-auto flex max-w-[1480px] items-center gap-6 text-[12px] text-ivory/50">
            <span data-rise>{t.cities}</span>
            <i data-line className="h-px flex-1 origin-[var(--o)] bg-ivory/15 [--o:right] ltr:[--o:left]" />
            <span data-rise>{t.tap}</span>
            <span data-rise className="flex items-center gap-3">
              {t.scroll}
              <span className="relative block h-7 w-px overflow-hidden bg-ivory/15"><i className="absolute inset-x-0 top-0 h-1/2 bg-ivory/80 [animation:drip_2s_var(--ease)_infinite]" /></span>
            </span>
          </div>
        </div>
      </div>
    </Scene>
  );
}
