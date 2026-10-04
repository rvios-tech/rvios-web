"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navOf, site, siteText } from "@/lib/content/site";
import { Lockup } from "@/components/ui/Logo";
import { useLang } from "@/components/i18n/LangProvider";
import { swapLang, withLang } from "@/lib/i18n/config";
import { getTheme, onTheme, setTheme, type Theme } from "@/lib/theme";
import { getLenis } from "./SmoothScroll";

const T = {
  ar: { cta: "ابدأ مشروعك", menu: "القائمة", close: "إغلاق", home: "الرئيسية", toLight: "الوضع الفاتح", toDark: "الوضع الداكن", other: "English", otherShort: "EN", sections: "الأقسام" },
  en: { cta: "Start a project", menu: "Menu", close: "Close", home: "Home", toLight: "Light mode", toDark: "Dark mode", other: "العربية", otherShort: "ع", sections: "Sections" },
};

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.5]" aria-hidden="true">
      {theme === "dark" ? (
        <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" strokeLinejoin="round" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** رأس زجاجي: الشعار، الروابط، ثم تبديل الثيم واللغة وزر المشروع. يختفي عند النزول ويتلوّن حسب القسم تحته */
export function Header() {
  const lang = useLang();
  const t = T[lang];
  const nav = navOf(lang);
  const pathname = usePathname() || `/${lang}`;
  const [tone, setTone] = useState<"stage" | "light" | "dark">("stage");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => { setThemeState(getTheme()); return onTheme(setThemeState); }, []);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last.current + 4);
      if (y < last.current - 4 || y < 300) setHidden(false);
      last.current = y;
      const els = document.elementsFromPoint(window.innerWidth / 2, 44);
      const sec = els.map((e) => e.closest("[data-tone]")).find(Boolean) as HTMLElement | undefined;
      setTone((sec?.dataset.tone as "stage" | "light" | "dark") ?? "stage");
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const l = getLenis();
    if (open) { l?.stop(); document.body.style.overflow = "hidden"; }
    else { l?.start(); document.body.style.overflow = ""; }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  const rel = pathname.replace(/^\/(ar|en)(?=\/|$)/, "") || "/";
  const isOn = (href: string) => (href === "/" ? rel === "/" : rel.startsWith(href));
  // لون الرأس: داكن فوق الأقسام الفاتحة
  const ink = !open && (tone === "light" || (tone === "stage" && theme === "light"));
  const other = lang === "ar" ? "en" : "ar";
  const switchLang = () => { document.cookie = `lang=${other};path=/;max-age=31536000;samesite=lax`; };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const link = (n: (typeof nav)[number]) => (
    <Link key={n.href} href={withLang(lang, n.href)} className="group relative py-2 text-[14px]">
      <span dir={n.latin ? "ltr" : undefined} className={`transition-opacity duration-300 ${isOn(n.href) ? "opacity-100" : "opacity-65 group-hover:opacity-100"}`}>{n.label}</span>
      <i className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-opacity ${isOn(n.href) ? "opacity-100" : "opacity-0"}`} />
    </Link>
  );

  const controls = (
    <>
      <button onClick={toggleTheme} className="ibtn" aria-label={theme === "dark" ? t.toLight : t.toDark} title={theme === "dark" ? t.toLight : t.toDark}>
        <ThemeIcon theme={theme} />
      </button>
      <Link href={swapLang(pathname, other)} onClick={switchLang} hrefLang={other} className="ibtn text-[13px] font-bold" aria-label={t.other} title={t.other}>
        <span className={other === "en" ? "latin tracking-wider" : ""}>{t.otherShort}</span>
      </Link>
    </>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-[var(--pad)] pt-4 transition-transform duration-700 [transition-timing-function:var(--ease-out)] ${hidden && !open ? "-translate-y-[130%]" : ""}`}
      >
        <div
          className={`mx-auto flex h-[68px] max-w-[1480px] items-center justify-between gap-6 rounded-full ps-6 pe-3 transition-[background,border-color,box-shadow,color] duration-500 lg:ps-8 ${
            ink ? "text-[#171717]" : "text-[#FAF8ED]"
          } ${
            scrolled && !open
              ? ink
                ? "border border-[#171717]/10 bg-[#FCFBF7]/72 shadow-[0_20px_50px_-30px_rgba(23,23,23,.4)] backdrop-blur-xl"
                : "border border-[#FAF8ED]/10 bg-[#0E0D0D]/45 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_20px_60px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Link href={`/${lang}`} aria-label={`RVIOS — ${t.home}`} className="shrink-0"><Lockup /></Link>
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label={t.sections}>{nav.slice(0, 5).map(link)}</nav>
          <div className="flex items-center gap-2">
            {controls}
            <Link href={withLang(lang, "/contact")} className={`btn ms-1 hidden h-11 px-6 text-[14px] sm:inline-flex ${ink ? "" : "btn-ruby"}`}>{t.cta}</Link>
            <button className="ibtn lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? t.close : t.menu}>
              <span className="grid w-5 gap-[6px]">
                <i className={`h-px bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <i className={`h-px bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        className={`mat-dark fixed inset-0 z-40 flex flex-col justify-between bg-[#0E0D0D] px-[var(--pad)] pt-32 pb-10 text-ivory transition-[clip-path,visibility] duration-[900ms] [transition-timing-function:var(--ease)] ${
          open ? "visible [clip-path:inset(0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label={t.menu}>
          <ol className="grid gap-1">
            {[{ href: "/", label: t.home, latin: false }, ...nav].map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <Link
                  href={withLang(lang, n.href)}
                  className={`h2 block !leading-[1.3] transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-out)] text-ivory ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <span dir={n.latin ? "ltr" : undefined} className={isOn(n.href) ? "" : "opacity-45"}>{n.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid gap-4 border-t border-hair pt-6 text-sm text-mist">
          <Link href={withLang(lang, "/contact")} className="btn btn-ruby justify-self-start">{t.cta}</Link>
          <a href={`mailto:${site.email}`} className="latin text-ivory">{site.email}</a>
          <span>{siteText[lang].city}</span>
        </div>
      </div>
    </>
  );
}
