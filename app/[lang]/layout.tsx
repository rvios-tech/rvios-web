import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { GA_IDS, analyticsOn, gtagInit } from "@/lib/content/analytics";
import { notFound } from "next/navigation";
import "../globals.css";
import { Stage } from "@/components/stage/Stage";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { LangProvider } from "@/components/i18n/LangProvider";
import { site, siteText } from "@/lib/content/site";
import { CONTACTS, regionCss, regionScript } from "@/lib/content/contact";
import { dirOf, hasLocale, locales } from "@/lib/i18n/config";

/** خط العناوين العربية الكبيرة — متغير بمحور «long» لامتداد الكشائد */
const zain = localFont({ src: "../fonts/ZainMobileSwashes-VF.woff2", variable: "--font-zain", display: "swap", weight: "400", fallback: [], adjustFontFallback: false });
/** خط العناوين الإنجليزية الكبيرة */
const yapari = localFont({ src: "../fonts/YapariTrial-Bold.woff2", variable: "--font-yapari", display: "swap", weight: "700", fallback: ["system-ui", "sans-serif"] });
/** خط النصوص */
const thm = localFont({
  src: [
    { path: "../fonts/ThmanyahSerifText-Medium.woff2", weight: "500" },
    { path: "../fonts/ThmanyahSerifText-Bold.woff2", weight: "700" },
  ],
  variable: "--font-thm", display: "swap", fallback: ["Georgia", "serif"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = siteText[lang];
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${t.tagline}`, template: `%s | ${site.short}` },
    description: t.description,
    openGraph: { type: "website", locale: lang === "ar" ? "ar_YE" : "en_US", siteName: site.name, title: site.name, description: t.description },
    twitter: { card: "summary_large_image", title: site.name, description: t.description },
    alternates: { canonical: `/${lang}`, languages: { ar: "/ar", en: "/en", "x-default": "/ar" } },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0D0D" },
    { media: "(prefers-color-scheme: light)", color: "#EFEBE0" },
  ],
};

/** يضبط الثيم قبل الرسم الأول لمنع الوميض */
const themeScript = `try{var t=localStorage.getItem('rv-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

/**
 * بيانات المنظمة لمحرّكات البحث — الرقمان معًا، كلٌّ بدولته (`areaServed`)، كما يعرضهما
 * الموقع لزوّار كل دولة. `<` مهرَّب فلا يغلق نصٌّ وسم السكربت.
 */
const orgJsonLd = (lang: "ar" | "en") =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        // الشعار المربّع — يظهر في لوحة المعرفة بجوجل
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: site.short,
        url: `${site.url}/`,
        logo: { "@type": "ImageObject", url: `${site.url}/brand/rvios-logo.png`, width: 512, height: 512 },
        email: site.email,
        sameAs: site.social.map((s) => s.href),
        contactPoint: [
          { "@type": "ContactPoint", contactType: "customer service", telephone: `+${CONTACTS.sa.whatsapp}`, areaServed: "SA", availableLanguage: ["ar", "en"] },
          { "@type": "ContactPoint", contactType: "customer service", telephone: `+${CONTACTS.ye.whatsapp}`, areaServed: "YE", availableLanguage: ["ar", "en"] },
        ],
      },
      {
        // اسم الموقع الذي يعرضه جوجل فوق الرابط في النتائج
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.short,
        alternateName: site.name,
        url: `${site.url}/`,
        inLanguage: lang,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  }).replace(/</g, "\\u003c");

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} dir={dirOf(lang)} data-theme="dark" suppressHydrationWarning className={`${zain.variable} ${yapari.variable} ${thm.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* منطقة الزائر (رقم التواصل) قبل الرسم الأول — lib/content/contact.ts */}
        <script dangerouslySetInnerHTML={{ __html: regionScript }} />
        <style dangerouslySetInnerHTML={{ __html: regionCss }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgJsonLd(lang) }} />
      </head>
      <body>
        {analyticsOn && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_IDS[0]}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">{gtagInit()}</Script>
          </>
        )}
        <LangProvider lang={lang}>
          <Stage />
          <SmoothScroll />
          <Preloader />
          <Header />
          <main>{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}
