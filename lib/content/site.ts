import { AZMSMART_URL, STOREOS_URL } from "./links";
import { waHref, type RegionContact } from "./contact";
import type { Lang } from "@/lib/i18n/config";

export const site = {
  name: "RVIOS Technologies",
  short: "RVIOS",
  url: "https://rvios.com",
  email: "rviostech@gmail.com",
  // الرقم وواتساب والعنوان حسب دولة الزائر: lib/content/contact.ts
  social: [
    { label: "Instagram", href: "https://instagram.com/0xo_0o" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rayash-albureihi-0ba32a404" },
  ],
};

export const siteText = {
  ar: {
    tagline: "نبني الأنظمة. نطوّر الحلول. نمكّن الأعمال.",
    description:
      "RVIOS Technologies — نصمّم ونطوّر المواقع الإلكترونية والأنظمة وتطبيقات الويب والمتاجر الإلكترونية وصفحات الهبوط، ونتولى صيانتها وتطويرها. ومن منتجاتنا RVIOS StoreOS وAzmSmart وAZM.",
    wa: "مرحباً RVIOS، أود الحديث عن مشروع",
  },
  en: {
    tagline: "We build systems. We engineer solutions. We empower businesses.",
    description:
      "RVIOS Technologies designs and develops websites, web systems and apps, online stores and landing pages — and keeps them maintained and growing. Our products include RVIOS StoreOS, AzmSmart and AZM.",
    wa: "Hello RVIOS, I'd like to talk about a project",
  },
} satisfies Record<Lang, Record<string, string>>;

const navLabels = {
  ar: { services: "الخدمات", work: "الأعمال", blog: "المدونة", contact: "تواصل" },
  en: { services: "Services", work: "Work", blog: "Journal", contact: "Contact" },
};

/** روابط الرأس بالترتيب — AzmSmart وStoreOS تفتحان موقعيهما: الخدمات، الأعمال، AzmSmart، RVIOS StoreOS، المدونة، تواصل */
export const navOf = (lang: Lang) => {
  const n = navLabels[lang];
  return [
    { href: "/services", label: n.services },
    { href: "/work", label: n.work },
    { href: AZMSMART_URL, label: "AzmSmart", latin: true },
    { href: STOREOS_URL, label: "RVIOS StoreOS", latin: true },
    { href: "/blog", label: n.blog },
    { href: "/contact", label: n.contact },
  ];
};

/** رابط واتساب برسالة افتتاحية — `c` من `<ByRegion>` فيتبع الرابطُ الرقمَ المعروض */
export const waLink = (c: RegionContact, lang: Lang, text?: string) => waHref(c, text ?? siteText[lang].wa);
