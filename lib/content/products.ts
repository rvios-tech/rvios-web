import { STOREOS_URL } from "./links";

export type Product = {
  slug: string;
  name: string;
  role: string;
  desc: string;
  href: string;
  cta: string;
  tone: string;
};

/** منظومة RVIOS للتجارة: المنصة، والتطبيق، والتصميم الخاص — منتج واحد بثلاثة أبواب */
export const products: Product[] = [
  {
    slug: "storeos",
    name: "RVIOS Store",
    role: "منصة المتاجر الإلكترونية",
    desc: "افتح متجرك مجانًا بقالب من ١٨ قالبًا احترافيًا، برابط خاص ودومين إن شئت، وطلبات منظّمة تصلك على واتساب — بلا عمولة على مبيعاتك.",
    href: STOREOS_URL,
    cta: "افتح متجرك مجانًا",
    tone: "#D8373D",
  },
  {
    slug: "app",
    name: "تطبيق RVIOS",
    role: "متجرك كله في جيبك",
    desc: "أنشئ متجرك من جوالك، واختر قالبه بمعاينة حية، وصمّمه، وأضف منتجاتك بصورها، وتابع طلباتك مع إشعار فوري لكل طلب.",
    href: `${STOREOS_URL}/app`,
    cta: "حمّل التطبيق",
    tone: "#E0B062",
  },
  {
    slug: "custom",
    name: "متجر بتصميم خاص",
    role: "لعلامتك وحدها",
    desc: "متجر يُصمَّم لعلامتك من الصفر — هويتك وتجربة شرائك وتكاملاتك — ويُدار من التطبيق ولوحة التحكم نفسيهما.",
    href: `${STOREOS_URL}/custom`,
    cta: "اطلب تصميمك",
    tone: "#C8A45D",
  },
];
