import { AZMSMART_URL, STOREOS_URL } from "./links";
import { waHref, type RegionContact } from "./contact";
import type { Lang } from "@/lib/i18n/config";

export const site = {
  /** الاسم الرسمي — بالإنجليزية، وبالعربية في `nameAr` */
  name: "RVIOS Technology For Design, Develop and Digital Solutions",
  nameAr: "ريفيوس للتصميم والتطوير والحلول الرقمية",
  short: "RVIOS",
  shortAr: "ريفيوس",
  // العنوان الذي يُخدَم منه الموقع فعلًا (rvios.com يحوّل إليه) — الروابط الأساسية وخريطة
  // الموقع والبيانات المنظّمة تشير إليه، فلا يرى جوجل رابطًا أساسيًّا يحوّل لغيره
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rvios.com").replace(/\/+$/, ""),
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
    legal: "ريفيوس للتصميم والتطوير والحلول الرقمية",
    title: "ريفيوس RVIOS — تصميم وتطوير المواقع والمتاجر والأنظمة والحلول الرقمية",
    description:
      "ريفيوس (RVIOS) للتصميم والتطوير والحلول الرقمية: تصميم مواقع إلكترونية، وإنشاء متاجر إلكترونية، وبرمجة أنظمة وتطبيقات ويب وجوال، وتصميم هويات بصرية وصفحات هبوط، وصيانة وتحسين للظهور في محركات البحث — في السعودية واليمن والخليج. ومن منتجاتنا منصة RVIOS StoreOS ونظام AzmSmart.",
    wa: "مرحباً RVIOS، أود الحديث عن مشروع",
  },
  en: {
    tagline: "We build systems. We engineer solutions. We empower businesses.",
    legal: "RVIOS Technology For Design, Develop and Digital Solutions",
    title: "RVIOS — Web Design, E-commerce, Software & Digital Solutions",
    description:
      "RVIOS Technology For Design, Develop and Digital Solutions: website design and development, online stores, custom systems, web and mobile apps, brand identity, landing pages, maintenance and SEO — across Saudi Arabia, Yemen and the Gulf. Our products include the RVIOS StoreOS e-commerce platform and the AzmSmart business system.",
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

/**
 * كلمات البحث التي نستهدفها — للبيانات الوصفية. جوجل لا يرتّب بها مباشرة، لكنها تحدّد
 * لغة الموقع وموضوعه لمحرّكات أخرى (Bing، Yandex) وأدوات التحليل. المحتوى نفسه يحملها أيضًا.
 */
export const keywordsOf: Record<Lang, string[]> = {
  ar: [
    "ريفيوس", "RVIOS", "ريفيوس للتصميم والتطوير والحلول الرقمية",
    "تصميم مواقع", "تصميم مواقع إلكترونية", "تطوير مواقع", "برمجة مواقع", "شركة تصميم مواقع", "أفضل شركة تصميم مواقع",
    "تصميم مواقع في السعودية", "تصميم مواقع الرياض", "تصميم مواقع جدة", "تصميم مواقع الدمام", "تصميم مواقع في اليمن", "تصميم مواقع صنعاء",
    "تصميم متجر إلكتروني", "إنشاء متجر إلكتروني", "متجر إلكتروني", "منصة متاجر إلكترونية", "متجر إلكتروني مجاني", "بيع أونلاين",
    "تطوير تطبيقات الويب", "برمجة أنظمة", "برمجة نظام خاص", "نظام إدارة أعمال", "نظام ERP", "نظام محاسبي", "نظام مخزون", "نظام إدارة مبيعات", "نظام CRM",
    "تطبيقات جوال", "برمجة تطبيقات", "لوحة تحكم", "نظام SaaS",
    "تصميم صفحات هبوط", "تصميم هوية بصرية", "تصميم شعار", "تصميم ملف تعريفي", "تصميم بروفايل شركة",
    "صيانة مواقع", "دعم فني للمواقع", "استضافة مواقع", "تحسين محركات البحث", "سيو", "SEO", "تسويق رقمي",
    "حلول رقمية", "تحول رقمي", "حلول تقنية للشركات", "شركة برمجة", "شركة تقنية",
    "عزم سمارت", "AzmSmart", "RVIOS StoreOS",
  ],
  en: [
    "RVIOS", "RVIOS Technology", "RVIOS Technology For Design, Develop and Digital Solutions",
    "web design", "website design", "website development", "web development company", "web design agency",
    "web design Saudi Arabia", "web design Riyadh", "web design Jeddah", "web design Dammam", "web design Yemen",
    "e-commerce website", "online store design", "create an online store", "e-commerce platform", "free online store",
    "custom software development", "web application development", "business management system", "ERP system", "inventory system",
    "CRM system", "SaaS platform", "dashboard development", "mobile app development",
    "landing page design", "brand identity design", "logo design", "company profile design",
    "website maintenance", "web hosting", "SEO services", "search engine optimization", "digital marketing",
    "digital solutions", "digital transformation", "software company", "technology company",
    "AzmSmart", "RVIOS StoreOS",
  ],
};
