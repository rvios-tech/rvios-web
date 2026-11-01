export type ServiceVisual =
  | { kind: "image"; src: string; url: string; caption: string; light?: boolean }
  | { kind: "devices"; scenes: DeviceScene[]; caption: string }
  | { kind: "maintenance"; caption: string };

/** شاشة مشروع على الحاسوب والجوال معًا */
export type DeviceScene = { desk: string; mobile: string; url: string; light?: boolean };

const shot = (slug: string, url: string, light?: boolean): DeviceScene => ({ desk: `/work/${slug}/home.webp`, mobile: `/work/${slug}/mobile.webp`, url, light });
export const SYSTEM_SCENES: DeviceScene[] = [{ desk: "/work/azmsmart/dashboard.webp", mobile: "/work/azmsmart/mobile.webp", url: "azm.rvios.com/dashboard" }];
export const STORE_SCENES: DeviceScene[] = [
  shot("dar-alshal", "dar-alshal.rvios.store", true),
  shot("nabd-sports", "nabd-sports.rvios.store"),
  shot("al-reef", "al-reef.rvios.store"),
  shot("reem-sweets", "reem-sweets.rvios.store", true),
  shot("tech-plus", "tech-plus.rvios.store"),
];

export type Service = {
  slug: string;
  n: string;
  /** الاسم الكامل */
  title: string;
  /** الصيغة المختصرة للقوائم */
  label: string;
  latin: string;
  short: string;
  long: string;
  includes: string[];
  stack: string[];
  forWho: string;
  visual: ServiceVisual;
};

export const services: Service[] = [
  {
    slug: "websites",
    n: "01",
    title: "تصميم وتطوير المواقع الإلكترونية",
    label: "المواقع الإلكترونية",
    latin: "Websites",
    short: "من الهوية والواجهة حتى قاعدة البيانات ولوحة التحكم — موقع متكامل يبنيه فريق واحد.",
    long:
      "نتولى موقعك كاملاً: نصمّم تجربة الاستخدام والواجهات بما يعكس علامتك، ثم نطوّر الواجهة الأمامية والخلفية وقاعدة البيانات ولوحة التحكم التي تدير منها المحتوى بنفسك. والنتيجة موقع سريع وآمن ومتوافق مع محركات البحث، مبني ليكبر مع عملك لا ليُعاد بناؤه بعد عام.",
    includes: [
      "تصميم UI/UX ونموذج تفاعلي قبل التطوير",
      "واجهة أمامية سريعة ومتجاوبة بالكامل",
      "واجهة خلفية وقاعدة بيانات وواجهات API",
      "لوحة تحكم لإدارة المحتوى",
      "تهيئة لمحركات البحث وسرعة التحميل",
      "العربية والإنجليزية عند الحاجة",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    forWho: "الشركات والعلامات التي تريد موقعاً يمثلها ويعمل كأداة حقيقية، لا مجرد واجهة تعريفية.",
    visual: { kind: "image", src: "/work/madar/home.webp", url: "madarwaafaq.com", caption: "من أعمالنا — مدار وآفاق" },
  },
  {
    slug: "web-systems",
    n: "02",
    title: "بناء الأنظمة وتطبيقات الويب",
    label: "الأنظمة وتطبيقات الويب",
    latin: "Web Systems & Apps",
    short: "أنظمة داخلية ولوحات تحكم وبوابات عملاء، مبنية على طريقة عمل شركتك.",
    long:
      "حين لا يناسبك برنامج جاهز، نبني لك نظاماً يعمل كما تعمل شركتك: إدارة طلبات، حضور وانصراف، بوابات عملاء، لوحات مؤشرات، وأتمتة للمهام المتكررة. نبدأ بتحليل سير العمل، ثم نصمّم الصلاحيات والتقارير، ونبني نظاماً يعمل من المتصفح على أي جهاز دون تثبيت.",
    includes: [
      "تحليل سير العمل وتصميم هيكل النظام",
      "أدوار وصلاحيات متعددة للمستخدمين",
      "لوحات مؤشرات وتقارير قابلة للتصدير",
      "تكامل مع خدمات خارجية عبر API",
      "تطبيق ويب قابل للتثبيت (PWA)",
      "توثيق وتدريب لفريقك",
    ],
    stack: ["Next.js", "NestJS", "Supabase", "PostgreSQL", "PWA"],
    forWho: "الشركات التي تدير عملها بجداول متفرقة ورسائل واتساب، وتحتاج نظاماً واحداً واضحاً.",
    visual: { kind: "devices", scenes: SYSTEM_SCENES, caption: "من منتجاتنا — نظام AzmSmart على الحاسوب والجوال" },
  },
  {
    slug: "stores",
    n: "03",
    title: "تصميم وتطوير المتاجر الإلكترونية",
    label: "المتاجر الإلكترونية",
    latin: "Online Stores",
    short: "متجر يبيع فعلاً: تجربة شراء سلسة، إدارة منتجات وطلبات، ودفع وشحن مربوطان من اليوم الأول.",
    long:
      "نصمّم متجرك حول طريقة شراء عملائك لا حول قالب جاهز: صفحات منتجات تُقنع، وسلة ودفع بخطوات أقل، وتجربة ممتازة على الجوال. ونبني خلفه لوحة تدير منها المنتجات والمخزون والطلبات والعروض، مع ربط بوسائل الدفع والشحن وواتساب. وإن أردت البدء بسرعة، نطلق متجرك على منصتنا RVIOS StoreOS ثم نطوّره معك.",
    includes: [
      "تصميم واجهة متجر بهوية علامتك",
      "صفحات منتجات وتصنيفات وبحث وفلاتر",
      "سلة ودفع إلكتروني وخيارات شحن",
      "لوحة إدارة للمنتجات والمخزون والطلبات",
      "كوبونات وعروض وسلات متروكة",
      "ربط الطلبات مع واتساب وأنظمة المحاسبة",
    ],
    stack: ["Next.js", "RVIOS StoreOS", "Stripe", "PostgreSQL", "WhatsApp API"],
    forWho: "العلامات والتجار الذين يريدون متجراً يمثلهم ويبيع، لا صفحة منتجات مكررة من آلاف المتاجر.",
    visual: { kind: "devices", scenes: STORE_SCENES, caption: "متاجر قائمة على منصة RVIOS Store — على الحاسوب والجوال" },
  },
  {
    slug: "landing-pages",
    n: "04",
    title: "تصميم وتطوير صفحات الهبوط",
    label: "صفحات الهبوط",
    latin: "Landing Pages",
    short: "صفحات مبنية حول هدف واحد: أن يتحول الزائر إلى عميل.",
    long:
      "صفحة الهبوط ليست موقعاً مصغراً. نبنيها حول عرض واحد ورسالة واحدة وخطوة واحدة مطلوبة من الزائر، بتصميم يقوده المحتوى المقنع، وسرعة تحميل عالية، وربط كامل بأدوات التتبع والإعلانات حتى تعرف بالضبط ما الذي يحقق النتائج.",
    includes: [
      "رسالة وعنوان يركّزان على العرض",
      "تصميم للجوال أولاً",
      "نماذج تسجيل وربط مع واتساب أو CRM",
      "Meta Pixel وGoogle Analytics وTag Manager",
      "نسخ بديلة لاختبار A/B",
      "إطلاق سريع يناسب مواعيد الحملات",
    ],
    stack: ["Next.js", "Tailwind", "GA4", "Meta Pixel", "GTM"],
    forWho: "الحملات الإعلانية، إطلاق المنتجات، الفعاليات، وكل عرض تريد أن تقيس نتائجه بدقة.",
    visual: { kind: "image", src: "/work/afs/home.webp", url: "afsksa.com", caption: "من أعمالنا — مؤسسة أحمد فايز الشمري" },
  },
  {
    slug: "maintenance",
    n: "05",
    title: "صيانة وتطوير المواقع والأنظمة",
    label: "الصيانة والتطوير",
    latin: "Maintenance & Growth",
    short: "تحديث ومراقبة وحماية وتطوير مستمر، حتى يبقى موقعك ونظامك سريعاً وآمناً ويكبر معك.",
    long:
      "الموقع أو النظام لا ينتهي يوم الإطلاق. نتابع أداءه وأمانه ونسخه الاحتياطية، ونحدّث تقنياته ومحتواه، ونضيف الميزات التي يحتاجها عملك وهو ينمو. ونستلم أيضاً مواقع وأنظمة بُنيت عند غيرنا لنصلح مشكلاتها ونحسّن سرعتها وتجربتها.",
    includes: [
      "مراقبة التوفر والأداء",
      "نسخ احتياطي دوري واستعادة مُختبرة",
      "تحديثات أمنية وتقنية منتظمة",
      "تحسين السرعة ونتائج البحث",
      "إضافة ميزات وصفحات جديدة",
      "تقرير شهري واضح بما تم",
    ],
    stack: ["Vercel", "Cloudflare", "Lighthouse", "Search Console"],
    forWho: "أصحاب المواقع القائمة الذين يريدون شريكاً تقنياً دائماً بدل البحث عن مطوّر عند كل مشكلة.",
    visual: { kind: "maintenance", caption: "لوحة متابعة الصيانة — عرض توضيحي" },
  },
];
