/**
 * بيانات التواصل حسب دولة الزائر — المصدر الوحيد للرقم ورابط واتساب والعنوان.
 *
 * كيف تصل الدولة إلى الصفحة دون أن تُخزَّن صفحة دولة لزائر من أخرى:
 *   ١. `proxy.ts` يقرأ دولة الزائر من ترويسة يضيفها المستضيف نفسه (GeoIP عنده)
 *      ويحفظ المنطقة في كوكي `REGION_COOKIE` — في الطلب نفسه.
 *   ٢. الـHTML واحد لكل الزوّار (ثابت وقابل للتخزين المؤقت بأمان): كل كتلة تواصل
 *      تُرسم بنسختيها، و`<ByRegion>` يغلّف كل نسخة بـ`data-only`.
 *   ٣. سكربت صغير في <head> يضع المنطقة على <html> قبل الرسم الأول، وقاعدة CSS
 *      تخفي النسخة الأخرى — فلا وميض، ولا رقم دون رابطه: الرقم ورابط الاتصال
 *      ورابط واتساب في الكتلة نفسها فيتبدّلون معًا.
 *
 * تحديد الدولة بالعنوان تقريبي (VPN، شبكات الجوال): `?region=sa` أو `?region=ye`
 * يثبّت المنطقة يدويًا في كوكي `REGION_PIN_COOKIE` لسنة.
 */
import type { Lang } from "@/lib/i18n/config";

export type Region = "sa" | "ye";

export interface RegionContact {
  /** أرقام فقط بالصيغة الدولية — لـ wa.me و tel: */
  whatsapp: string;
  /** كما يُعرض للزائر */
  display: string;
  location: Record<Lang, string>;
  /** مثال الرقم في حقل الهاتف بنموذج التواصل */
  phoneHint: string;
}

export const CONTACTS: Record<Region, RegionContact> = {
  sa: {
    whatsapp: "966551341301",
    display: "+966 551341301",
    location: { ar: "المملكة العربية السعودية", en: "Saudi Arabia" },
    phoneHint: "+966",
  },
  ye: {
    whatsapp: "967739008083",
    display: "+967 739008083",
    location: { ar: "اليمن", en: "Yemen" },
    phoneHint: "+967",
  },
};

export const REGIONS = Object.keys(CONTACTS) as Region[];

/** خارج السعودية — ومنها حين لا تُعرف الدولة — الرقم اليمني */
export const DEFAULT_REGION: Region = "ye";

/** رمز الدولة (ISO-3166 alpha-2) ← المنطقة */
export const regionOfCountry = (cc: string | null | undefined): Region =>
  cc?.toUpperCase() === "SA" ? "sa" : "ye";

export const isRegion = (v: string | null | undefined): v is Region => !!v && v in CONTACTS;

export const REGION_COOKIE = "rv-region";
export const REGION_PIN_COOKIE = "rv-region-pin";

export const waHref = (c: RegionContact, text?: string) =>
  `https://wa.me/${c.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telHref = (c: RegionContact) => `tel:+${c.whatsapp}`;

/** يضع المنطقة على <html> قبل الرسم الأول (من الكوكي، وإلا الافتراضية) */
export const regionScript = `try{var m=document.cookie.match(/(?:^|; )${REGION_COOKIE}=([a-z]+)/),r=m&&m[1];document.documentElement.dataset.region=${JSON.stringify(REGIONS)}.indexOf(r)>-1?r:${JSON.stringify(DEFAULT_REGION)}}catch(e){}`;

/**
 * يخفي كل نسخة لا تطابق منطقة الصفحة. بلا سمة على <html> (سكربت معطّل) تظهر
 * المنطقة الافتراضية وحدها.
 */
export const regionCss = [
  "[data-only]{display:contents}",
  ...REGIONS.map((r) =>
    r === DEFAULT_REGION
      ? `html[data-region]:not([data-region="${r}"]) [data-only="${r}"]{display:none!important}`
      : `html:not([data-region="${r}"]) [data-only="${r}"]{display:none!important}`,
  ),
].join("");
