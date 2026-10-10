import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, hasLocale, type Lang } from "@/lib/i18n/config";
import { isRegion, regionOfCountry, REGION_COOKIE, REGION_PIN_COOKIE, type Region } from "@/lib/content/contact";

/** يوجّه أي مسار بلا لغة إلى /ar أو /en حسب تفضيل الزائر */
function pick(req: NextRequest): Lang {
  const saved = req.cookies.get("lang")?.value;
  if (saved && hasLocale(saved)) return saved;
  const al = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const first = al.split(",")[0]?.trim() ?? "";
  if (first.startsWith("en")) return "en";
  return defaultLang;
}

/**
 * دولة الزائر من ترويسة يضيفها المستضيف بعد GeoIP عنده — لا من المتصفح:
 * Vercel ثم Cloudflare ثم CloudFront، و`x-country-code` لوسيط آخر يضبطه.
 * `null` حين لا تتوفّر (تطوير محلي) فتبقى المنطقة المحفوظة أو الافتراضية.
 */
const GEO_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "cloudfront-viewer-country", "x-country-code"];
function countryOf(req: NextRequest): string | null {
  for (const h of GEO_HEADERS) {
    const v = req.headers.get(h);
    if (v && /^[A-Za-z]{2}$/.test(v)) return v; // Cloudflare يرسل XX/T1 لغير المعروف
  }
  return null;
}

/**
 * منطقة رقم التواصل: المثبّتة يدويًا (`?region=`) أولًا، ثم المكتشفة. تُكتب في
 * كوكي يقرؤه سكربت <head> — والـHTML نفسه لا يتغيّر بالدولة، فالتخزين المؤقت
 * للصفحات لا يخلط رقم دولة بزائر من أخرى.
 */
function withRegion(req: NextRequest, res: NextResponse): NextResponse {
  const asked = req.nextUrl.searchParams.get("region");
  const secure = req.nextUrl.protocol === "https:";
  if (isRegion(asked)) {
    res.cookies.set(REGION_PIN_COOKIE, asked, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", secure });
  }
  const pinned = req.cookies.get(REGION_PIN_COOKIE)?.value;
  const cc = countryOf(req);
  const region: Region | null = isRegion(asked) ? asked : isRegion(pinned) ? pinned : cc ? regionOfCountry(cc) : null;
  // لا Set-Cookie ما لم تتغيّر القيمة: استجابة بلا كوكي تبقى قابلة للتخزين عند أي CDN
  if (region && req.cookies.get(REGION_COOKIE)?.value !== region) {
    res.cookies.set(REGION_COOKIE, region, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax", secure });
  }
  return res;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];
  if (seg && hasLocale(seg)) return withRegion(req, NextResponse.next());
  const url = req.nextUrl.clone();
  url.pathname = `/${pick(req)}${pathname === "/" ? "" : pathname}`;
  return withRegion(req, NextResponse.redirect(url));
}

// `[.]` لا `\.`: الشرطة المائلة كانت تسقط عند تحليل المطابِق فيصير `.*..*` — أي
// كل مسار — ولا يعمل الوسيط إلا على `/` (فلا توجيه للغة ولا كوكي للمنطقة).
export const config = {
  matcher: ["/((?!api|_next|images|favicon|icon|apple-icon|opengraph-image|sitemap[.]xml|robots[.]txt|.*[.].*).*)"],
};
