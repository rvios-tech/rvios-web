import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, hasLocale, type Lang } from "@/lib/i18n/config";

/** يوجّه أي مسار بلا لغة إلى /ar أو /en حسب تفضيل الزائر */
function pick(req: NextRequest): Lang {
  const saved = req.cookies.get("lang")?.value;
  if (saved && hasLocale(saved)) return saved;
  const al = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const first = al.split(",")[0]?.trim() ?? "";
  if (first.startsWith("en")) return "en";
  return defaultLang;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];
  if (seg && hasLocale(seg)) return;
  const url = req.nextUrl.clone();
  url.pathname = `/${pick(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon|icon|apple-icon|opengraph-image|sitemap.xml|robots.txt|.*\\..*).*)"],
};
