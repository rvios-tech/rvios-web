import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { Stage } from "@/components/stage/Stage";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { LangProvider } from "@/components/i18n/LangProvider";
import { site, siteText } from "@/lib/content/site";
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
    alternates: { canonical: `/${lang}`, languages: { ar: "/ar", en: "/en" } },
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

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} dir={dirOf(lang)} data-theme="dark" suppressHydrationWarning className={`${zain.variable} ${yapari.variable} ${thm.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
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
