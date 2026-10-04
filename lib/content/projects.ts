/**
 * معرض الأعمال — محتوى حقيقي من ملفات المشاريع.
 * لإضافة مشروع: ضع صوره في public/work/<slug>/ ثم أضف عنصراً هنا.
 */

export type Block =
  | { t: "browser"; src: string; url: string; caption?: string; light?: boolean }
  | { t: "image"; src: string; caption?: string; ratio?: string; contain?: boolean; bg?: string }
  | { t: "duo"; srcs: [string, string]; caption?: string; ratio?: string; bg?: string }
  | { t: "pages"; srcs: string[]; caption?: string }
  | { t: "logo"; src: string; caption?: string; bg: string };

export type Category = "web" | "identity" | "software";
export const categoryLabels: Record<Category | "all", string> = {
  all: "كل الأعمال",
  web: "مواقع إلكترونية",
  identity: "هويات وملفات تعريفية",
  software: "برمجيات",
};

export type Project = {
  slug: string;
  name: string;
  latin?: string;
  client: string;
  location: string;
  year: string;
  tags: string[];
  categories: Category[];
  /** لون خلفية العرض المأخوذ من هوية العميل */
  mat: string;
  /** هل الخلفية داكنة (يحدد لون النص والرأس) */
  dark: boolean;
  /** لون الضوء المنكسر في الشعار الزجاجي عند فتح المشروع */
  accent: string;
  cover: string;
  coverUrl: string;
  coverLight?: boolean;
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  note?: string;
  url?: string;
  blocks: Block[];
};

const W = "/work";

export const projects: Project[] = [
  {
    slug: "madar-waafaq",
    name: "مدار وآفاق",
    latin: "Madar Waafaq",
    client: "شركة مدار وآفاق المحدودة",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["هوية بصرية", "ملف تعريفي", "موقع إلكتروني"],
    categories: ["identity", "web"],
    mat: "#2E2822",
    dark: true,
    accent: "#D9BC98",
    cover: `${W}/madar/home.webp`,
    coverUrl: "madarwaafaq.com",
    summary:
      "حضور مؤسسي كامل لشركة قابضة سعودية: الشعار والهوية، ملف تعريفي من 23 صفحة بلغتين، بطاقات العمل، وموقع إلكتروني من خمس صفحات.",
    challenge:
      "شركة قابضة ناشئة تعمل في العقارات والحلول المالية والاستشارات الإدارية وتطوير الأعمال وتنفيذ مشاريع البنية التحتية. كانت تحتاج حضوراً مؤسسياً متكاملاً يقدّمها للشركاء والجهات الحكومية بثقة من اليوم الأول، بلغة بصرية واحدة من الشعار حتى صندوق البريد.",
    approach:
      "بنينا الهوية على تباين هادئ بين البني العميق والبيج الرملي، وشعار يجمع القوس والنقطة في حركة واحدة. ثم حملنا الهوية إلى ملف تعريفي من 23 صفحة بالعربية والإنجليزية يغطي الرؤية والقيم والخدمات والقطاعات ومنهجية العمل، وإلى موقع إلكتروني بخمس صفحات صمّمنا تنقلاته في نموذج أولي تفاعلي قبل التطوير، بواجهة زجاجية فوق أفق الرياض.",
    deliverables: [
      "الشعار ودليل الهوية",
      "ملف تعريفي من 23 صفحة بلغتين",
      "بطاقات العمل",
      "نموذج أولي تفاعلي للموقع",
      "موقع من خمس صفحات",
      "بريد مؤسسي موثّق",
    ],
    url: "https://www.madarwaafaq.com",
    blocks: [
      { t: "browser", src: `${W}/madar/home.webp`, url: "madarwaafaq.com", caption: "الصفحة الرئيسية" },
      { t: "browser", src: `${W}/madar/about.webp`, url: "madarwaafaq.com/about", caption: "عن الشركة — بطاقة زجاجية فوق أفق الرياض" },
      { t: "image", src: `${W}/madar/prototype.webp`, ratio: "16/9", caption: "النموذج الأولي: خمس صفحات وتدفق التنقل بينها قبل كتابة أي سطر برمجي" },
      {
        t: "pages",
        srcs: [1, 2, 3, 5, 7, 8, 9, 10, 13, 17, 19, 23].map((p) => `${W}/madar/profile-${String(p).padStart(2, "0")}.webp`),
        caption: "الملف التعريفي — 23 صفحة بالعربية والإنجليزية",
      },
      { t: "duo", srcs: [`${W}/madar/card-front.webp`, `${W}/madar/card-back.webp`], ratio: "506/294", bg: "#E9E1D4", caption: "بطاقات العمل" },
      { t: "logo", src: `${W}/madar/logo.webp`, bg: "#F4EFE6", caption: "الشعار" },
    ],
  },
  {
    slug: "afs",
    name: "مؤسسة أحمد فايز الشمري",
    latin: "AFS Establishment",
    client: "مؤسسة أحمد فايز الشمري للمقاولات",
    location: "الدمام، المملكة العربية السعودية",
    year: "2026",
    tags: ["موقع إلكتروني", "ملف تعريفي بلغتين"],
    categories: ["web", "identity"],
    mat: "#0B1A2E",
    dark: true,
    accent: "#F29A1F",
    cover: `${W}/afs/home.webp`,
    coverUrl: "afsksa.com",
    summary:
      "موقع إلكتروني وملف تعريفي بالعربية والإنجليزية لمؤسسة سعودية في المقاولات وتطوير المشاريع والاستثمار، تعمل في ستة مجالات وتستهدف تسعة قطاعات.",
    challenge:
      "مؤسسة حديثة في الدمام لا يقف دورها عند التنفيذ، بل يبدأ من دراسة الفرصة وتمويلها ويمتد إلى التنفيذ والتشغيل. كان المطلوب أن يفهم الشريك هذا النطاق الواسع من النظرة الأولى، دون أن تبدو المؤسسة مجرد مقاول آخر.",
    approach:
      "بنينا الرسالة حول ثلاث عبارات: نبني الفرص، ننفذ المشاريع، نصنع القيمة. في الموقع، اسم المؤسسة بخط ضخم فوق مشهد صناعي حقيقي، وبطاقات زجاجية تلخّص المجالات الستة والقطاعات التسعة. وفي الملف التعريفي، 23 صفحة بنسختين عربية وإنجليزية بكحلي عميق ولمسات برتقالية من الشعار، تشرح المجالات ونموذج العمل من الفرصة إلى القيمة والتوجه الاستراتيجي.",
    deliverables: [
      "موقع إلكتروني بالعربية والإنجليزية",
      "ملف تعريفي عربي من 23 صفحة",
      "ملف تعريفي إنجليزي من 23 صفحة",
      "لغة بصرية موحدة بين الموقع والملف",
    ],
    url: "https://afsksa.com",
    blocks: [
      { t: "browser", src: `${W}/afs/home.webp`, url: "afsksa.com", caption: "الصفحة الرئيسية — نبني الفرص. ننفذ المشاريع. نصنع القيمة." },
      { t: "browser", src: `${W}/afs/about.webp`, url: "afsksa.com/about", caption: "من نحن — «نصنع الفرص»" },
      { t: "image", src: `${W}/afs/profile-overview.webp`, ratio: "1800/2208", bg: "#0B1A2E", caption: "الملف التعريفي بنسختيه العربية والإنجليزية — عشر صفحات مختارة من كل نسخة" },
      {
        t: "pages",
        srcs: [...[1, 3, 4, 6, 7, 15, 16, 17].map((p) => `${W}/afs/profile-ar-${String(p).padStart(2, "0")}.webp`), `${W}/afs/profile-en-01.webp`],
        caption: "صفحات من النسخة العربية، وغلاف النسخة الإنجليزية",
      },
      { t: "logo", src: `${W}/afs/logo.webp`, bg: "#F4F1EA", caption: "شعار المؤسسة" },
    ],
  },
  {
    slug: "tilal",
    name: "تلال للمقاولات",
    latin: "Tilal Contracting",
    client: "مؤسسة تلال للمقاولات العامة",
    location: "الدمام والمنطقة الشرقية، السعودية",
    year: "2026",
    tags: ["موقع إلكتروني", "معارض مشاريع"],
    categories: ["web"],
    mat: "#EFE8DA",
    dark: false,
    accent: "#F2A516",
    cover: `${W}/tilal/home.webp`,
    coverUrl: "tilal",
    coverLight: true,
    summary:
      "موقع لمؤسسة مقاولات في الدمام متخصصة في الهناجر والمستودعات والمظلات والسواتر وأعمال الترميم، يعرض عشرة تخصصات بصور حقيقية من مشاريعها.",
    challenge:
      "عميل المقاولات يريد أن يرى أعمالاً حقيقية قبل أن يتصل. المؤسسة لديها عشر سنوات من المشاريع وتخصصات كثيرة، لكن لم يكن هناك مكان واحد يعرضها منظمة ويحوّل الزائر إلى اتصال.",
    approach:
      "نظّمنا الموقع حول التخصصات العشرة: لكل تخصص قسم بمعرض صور حقيقية من المشاريع ووصف مختصر، وقائمة جانبية تنقل الزائر بينها بنقرة. وجعلنا التواصل حاضراً في كل شاشة: زر اتصال مباشر، وواتساب ثابت، وأرقام الخبرة والمشاريع في الواجهة.",
    deliverables: [
      "تصميم وتطوير الموقع",
      "عشرة أقسام للتخصصات مع معارض صور",
      "تواصل مباشر بالهاتف وواتساب",
      "واجهة متجاوبة للجوال",
    ],
    blocks: [
      { t: "browser", src: `${W}/tilal/home.webp`, url: "tilal", light: true, caption: "الصفحة الرئيسية" },
      { t: "browser", src: `${W}/tilal/services.webp`, url: "tilal/services", caption: "التخصصات: قائمة جانبية بعشرة تخصصات، ومعرض صور حقيقية لكل منها" },
    ],
  },
  {
    slug: "shield-guard",
    name: "Shield Guard",
    latin: "Ransomware Defender",
    client: "مشروع تخرج — قسم تكنولوجيا المعلومات، جامعة ذمار",
    location: "اليمن",
    year: "2025 – 2026",
    tags: ["برمجيات", "أمن سيبراني"],
    categories: ["software"],
    mat: "#101317",
    dark: true,
    accent: "#3B8FE0",
    cover: `${W}/shield/overview-light.webp`,
    coverUrl: "Shield Guard",
    coverLight: true,
    summary:
      "برنامج يحمي أنظمة Windows من هجمات الفدية: يكتشف سلوك التشفير الجماعي لحظة حدوثه، ويوقف العملية المهاجمة، ويستعيد الملفات المتضررة.",
    challenge:
      "برامج الحماية التقليدية تعتمد على بصمات الفيروسات المعروفة، فتتأخر أمام أي نسخة جديدة من فيروسات الفدية. وحين يبدأ التشفير فعلاً، تُفقد ملفات المستخدم خلال ثوانٍ.",
    approach:
      "بدل البحث عن بصمات، يراقب Shield Guard السلوك. محرك مكتوب بلغة C++ يرصد أي عملية تعدّل عدداً كبيراً من الملفات بنمط تشفير، فيوقفها فوراً، ثم يستعيد الملفات من نسخ احتياطية مستمرة ومن نسخ الظل في Windows. وتعرض الواجهة حالة الحماية، وسجل التهديدات، وقائمة البرامج الموثوقة، بوضعين فاتح وداكن.",
    deliverables: [
      "محرك كشف سلوكي بلغة C++",
      "إيقاف فوري للعمليات المشبوهة",
      "استعادة الملفات المتضررة",
      "سجل تهديدات بقاعدة بيانات SQLite",
      "قائمة البرامج الموثوقة",
      "واجهة بوضعين فاتح وداكن",
    ],
    note: "مشروع تخرج جماعي لفريق من خمسة طلاب، بمنهجية Agile، واختُبر في بيئة افتراضية معزولة.",
    blocks: [
      { t: "duo", srcs: [`${W}/shield/overview-dark.webp`, `${W}/shield/overview-light.webp`], ratio: "1100/664", bg: "#1A1E24", caption: "لوحة الحالة بالوضعين الداكن والفاتح" },
      { t: "image", src: `${W}/shield/threats-dark.webp`, ratio: "992/612", bg: "#0A0C0F", contain: true, caption: "سجل التهديدات: العمليات التي أوقفها المحرك والملفات التي استعادها" },
      { t: "duo", srcs: [`${W}/shield/whitelist-dark.webp`, `${W}/shield/whitelist-light.webp`], ratio: "440/500", bg: "#1A1E24", caption: "قائمة البرامج الموثوقة" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
