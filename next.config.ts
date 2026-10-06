import type { NextConfig } from "next";

/* القيم مُعرَّفة هنا مباشرةً لأن next.config.ts يُجمَّع منفصلاً عن المشروع
   ولا يستطيع حلّ imports داخلية من lib/‏. المصدر الأصلي: lib/content/links.ts */
const trim = (u: string) => u.replace(/\/+$/, "");
const STOREOS_URL = trim(process.env.NEXT_PUBLIC_STOREOS_URL ?? "http://store.rvios.com");
const AZMSMART_URL = trim(process.env.NEXT_PUBLIC_AZMSMART_URL ?? "http://azm.rvios.com");

const nextConfig: NextConfig = {
  /**
   * صفحتا المنتجين انتقلتا إلى موقعيهما: StoreOS إلى واجهة منصة المتاجر،
   * وAzmSmart إلى صفحته الترحيبية في النظام نفسه. الروابط القديمة (مشاركات،
   * محرّكات بحث) تُحوَّل ولا تسقط.
   */
  async redirects() {
    return [
      { source: "/:lang(ar|en)/storeos", destination: STOREOS_URL, permanent: false },
      { source: "/:lang(ar|en)/azmsmart", destination: AZMSMART_URL, permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
