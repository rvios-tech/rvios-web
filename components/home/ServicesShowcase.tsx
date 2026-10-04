"use client";
import { useRef, useState } from "react";
import { Scene } from "@/components/stage/Scene";
import { Browser } from "@/components/ui/Browser";
import { Dashboard } from "@/components/azm/Dashboard";
import { PhoneStore } from "@/components/shop/PhoneStore";
import { L } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import type { StageCfg } from "@/lib/stage/glass";
import { content, type Service } from "@/lib/content";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const CFG: StageCfg = { d: { x: -1.9, y: 0.12, s: 1.08, tilt: 0.05 }, m: { x: 0, y: 1.75, s: 0.4 }, glow: 0.8 };

function Visual({ s }: { s: Service }) {
  if (s.visual.kind === "dashboard") return <Dashboard chips={false} tilt={false} />;
  if (s.visual.kind === "store") return <div className="flex justify-center"><div className="origin-center scale-[.34] sm:scale-[.5] lg:scale-[.66]"><PhoneStore /></div></div>;
  return <Browser src={s.visual.src} url={s.visual.url} light={s.visual.light} sizes="(max-width:900px) 92vw, 46vw" />;
}

/** قسم مثبّت: خمس خدمات، ولكل خدمة عمل حقيقي يظهر في إطار زجاجي أمام الشعار المتوهج */
export function ServicesShowcase() {
  const lang = useLang();
  const { services } = content(lang);
  const [i, setI] = useState(0);
  const cur = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const pick = (n: number) => { if (n !== cur.current) { cur.current = n; setI(n); } };

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current, pin: true, start: "top top",
      end: () => "+=" + innerHeight * (innerWidth <= 900 ? 2.6 : 3.3),
      onUpdate: (st) => pick(Math.min(services.length - 1, Math.floor(st.progress * services.length))),
    });
  }, { scope: ref });

  return (
    <Scene id="services" cfg={CFG}>
      <div ref={ref} className="flex h-svh min-h-[640px] flex-col justify-center px-[var(--pad)] pt-24 pb-10">
        <div className="mx-auto grid w-full max-w-[1480px] items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-[6vw]">
          <div className="order-2 lg:order-1">
            <span className="label">{lang === "ar" ? "الخدمات" : "Services"}</span>
            <ul className="mt-7">
              {services.map((sv, n) => (
                <li key={sv.slug} className="border-b border-hair first:border-t">
                  <button
                    onMouseEnter={() => pick(n)} onFocus={() => pick(n)} onClick={() => pick(n)}
                    aria-expanded={n === i}
                    className="flex w-full items-baseline gap-5 py-[clamp(10px,1.7vh,18px)] text-start"
                  >
                    <span className={`latin text-[12px] transition-colors duration-500 ${n === i ? "text-gold" : "text-ivory/30"}`}>{sv.n}</span>
                    <span className={`serif text-[clamp(24px,2.5vw,40px)] leading-[1.2] transition-[color,opacity] duration-500 text-ivory ${n === i ? "" : "opacity-30"}`}>{lang === "ar" ? sv.title : sv.label}</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--ease-out)] ${n === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[46ch] pb-2 ps-[46px] text-[15px] text-mist">{sv.short}</p>
                      <L href={`/services#${sv.slug}`} className="link-line mb-5 ms-[46px] text-[14px]">{lang === "ar" ? "تفاصيل الخدمة" : "Service details"}</L>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[16/10] w-full">
              {services.map((sv, n) => (
                <div
                  key={sv.slug}
                  aria-hidden={n !== i}
                  className="absolute inset-0 flex items-center transition-[clip-path,transform] duration-[1100ms] [transition-timing-function:var(--ease)]"
                  style={{
                    clipPath: n === i ? "inset(0% 0% 0% 0%)" : n < i ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
                    transform: n === i ? "none" : "scale(1.03)",
                    zIndex: n === i ? 2 : 1,
                  }}
                >
                  <div className="w-full"><Visual s={sv} /></div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex justify-between text-[13px] text-ivory/45">
              <span key={i} className="[animation:rise_.8s_var(--ease-out)]">{services[i].visual.caption}</span>
              <span className="latin">{String(i + 1).padStart(2, "0")} — {String(services.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
