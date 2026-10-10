import type { NextConfig } from "next";

/* القيم مُعرَّفة هنا مباشرةً لأن next.config.ts يُجمَّع منفصلاً عن المشروع
   ولا يستطيع حلّ imports داخلية من lib/‏. المصدر الأصلي: lib/content/links.ts */
const trim = (u: string) => u.replace(/\/+$/, "");
const STOREOS_URL = trim(process.env.NEXT_PUBLIC_STOREOS_URL ?? "http://store.rvios.com");
const AZMSMART_URL = trim(process.env.NEXT_PUBLIC_AZMSMART_URL ?? "http://azm.rvios.com");

/**
 * Security headers for every page. CSP: scripts/styles from this origin (Next's inline bootstrap
 * needs 'unsafe-inline'); network calls only to this origin and the backend — so even injected
 * script can't post a session token to a foreign server via fetch; no plugins, no foreign framing.
 * Images allow any https (merchant/product URLs). Dev adds eval + HMR websockets.
 */
const originOf = (u?: string) => { try { return u ? new URL(u).origin : ""; } catch { return ""; } };
/** Google Analytics / وسم Google — ما يحتاجه gtag.js في CSP */
const GOOGLE_SCRIPT = "https://www.googletagmanager.com";
const GOOGLE_CONNECT = ["https://www.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"];

function securityHeaders(connect: string[], framing: "none" | "self") {
  const prod = process.env.NODE_ENV === "production";
  const self = framing === "self" ? "'self'" : "'none'";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${GOOGLE_SCRIPT}${prod ? "" : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "media-src 'self' blob: https:",
    "worker-src 'self' blob:",
    `connect-src 'self' ${connect.filter(Boolean).join(" ")}${prod ? "" : " ws: wss: http://localhost:*"}`,
    `frame-src ${self}`,
    `frame-ancestors ${self}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(prod ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Frame-Options", value: framing === "self" ? "SAMEORIGIN" : "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    ...(prod ? [{ key: "Strict-Transport-Security", value: "max-age=63072000" }] : []),
  ];
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders([originOf(process.env.NEXT_PUBLIC_UNIFIED_API_URL), ...GOOGLE_CONNECT], "none") }];
  },
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
