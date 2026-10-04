import type { NextConfig } from "next";
import { AZMSMART_URL, STOREOS_URL } from "./lib/content/links";

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
