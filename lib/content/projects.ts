/**
 * معرض الأعمال — محتوى حقيقي من ملفات المشاريع.
 * لإضافة مشروع: ضع صوره في public/work/<slug>/ ثم أضف عنصراً هنا.
 */

export type Block =
  | { t: "browser"; src: string; url: string; caption?: string; light?: boolean }
  | { t: "image"; src: string; caption?: string; ratio?: string; contain?: boolean; bg?: string }
  | { t: "duo"; srcs: [string, string]; caption?: string; ratio?: string; bg?: string }
  | { t: "pages"; srcs: string[]; caption?: string }
  | { t: "logo"; src: string; caption?: string; bg: string }
  /** الموقع على الحاسوب وبجانبه الجوال — للمنصات والمتاجر */
  | { t: "devices"; desk: string; mobile: string; url: string; caption?: string; light?: boolean };

export type Category = "web" | "store" | "identity" | "software";
export const categoryLabels: Record<Category | "all", string> = {
  all: "كل الأعمال",
  web: "مواقع إلكترونية",
  store: "متاجر إلكترونية",
  identity: "هويات وملفات تعريفية",
  software: "أنظمة ومنصات",
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
    slug: "rvios-store",
    name: "RVIOS Store",
    latin: "منصة المتاجر الإلكترونية",
    client: "منتج من RVIOS",
    location: "اليمن والسعودية والخليج",
    year: "2026",
    tags: ["منصة SaaS", "متاجر إلكترونية", "18 قالبًا"],
    categories: ["software", "store"],
    mat: "#140B0C",
    dark: true,
    accent: "#E0303A",
    cover: `${W}/rvios-store/home.webp`,
    coverUrl: "store.rvios.com",
    summary:
      "منصة تبني للتاجر متجرًا إلكترونيًا كاملًا في دقائق: يختار قالبًا يليق ببضاعته، ويحصل على رابط واحد يشاركه، وتصله الطلبات منظّمة في لوحة تحكم عزم سمارت.",
    challenge:
      "أغلب التجار في المنطقة يبيعون عبر واتساب وإنستغرام: صور متفرقة، وأسعار تُكتب في كل محادثة، وطلبات تضيع بين الرسائل. والمنصات العالمية مكلفة، ولا تدعم الدفع المحلي ولا العربية كما ينبغي.",
    approach:
      "صمّمنا منصة عربية أولًا، بثمانية عشر قالبًا لكل منها هيكل وحركة وإحساس مختلف، لا ألوان مختلفة فقط. يبدأ المتجر مجانًا برابط name.rvios.store، ويترقّى إلى نطاق خاص وقوالب مميّزة. الطلبات تُحفظ قبل أن يفتح العميل واتساب، والدفع بالتحويل المحلي (الكريمي، جيب) مع إيصال يراجعه التاجر، وكل شيء يُدار من هاتفه.",
    deliverables: [
      "18 قالب متجر بهوية مستقلة",
      "رابط فرعي فوري ونطاق خاص للباقات المدفوعة",
      "سلة وطلبات تُحفظ قبل واتساب",
      "دفع بالتحويل المحلي مع إيصال",
      "تقييمات حقيقية من المشترين",
      "ربط كامل بلوحة تحكم عزم سمارت",
    ],
    url: "https://store.rvios.com",
    blocks: [
      { t: "devices", desk: `${W}/rvios-store/home.webp`, mobile: `${W}/rvios-store/mobile.webp`, url: "store.rvios.com", caption: "الواجهة الرئيسية على الحاسوب والجوال" },
      { t: "browser", src: `${W}/rvios-store/home-2.webp`, url: "store.rvios.com", caption: "كل متجر يعمل على الحاسوب والجوال، ويُدار من الهاتف" },
      { t: "browser", src: `${W}/rvios-store/templates.webp`, url: "store.rvios.com/templates", caption: "معرض القوالب — معاينة حية لكل قالب قبل اختياره" },
      { t: "browser", src: `${W}/rvios-store/create.webp`, url: "store.rvios.com/create", caption: "إنشاء المتجر: القالب، ثم الباقة، ثم بيانات المتجر" },
    ],
  },
  {
    slug: "azmsmart",
    name: "AzmSmart",
    latin: "نظام إدارة الأعمال",
    client: "منتج من RVIOS",
    location: "اليمن والسعودية والخليج",
    year: "2026",
    tags: ["نظام ERP", "لوحة تحكم", "SaaS متعدد الشركات"],
    categories: ["software"],
    mat: "#120C0B",
    dark: true,
    accent: "#C1272D",
    cover: `${W}/azmsmart/dashboard.webp`,
    coverUrl: "azm.rvios.com",
    summary:
      "نظام واحد يدير الشركة كلها: المتجر الإلكتروني والطلبات والمخزون، والعملاء والفواتير، والمشاريع والمهام، والفريق وصلاحياته — بواجهة عربية فخمة على الحاسوب والجوال.",
    challenge:
      "الشركات الصغيرة والمتوسطة تدير أعمالها بين جداول Excel ومجموعات واتساب وبرامج متفرقة لا يكلّم بعضها بعضًا. النتيجة أرقام لا تتطابق، وقرارات تُتخذ بلا صورة كاملة.",
    approach:
      "بنينا نظامًا متعدد الشركات على خادم موحّد: كل شركة معزولة ببياناتها، وكل عضو يرى ما تسمح به صلاحياته. المتجر الإلكتروني على منصة RVIOS Store متصل به مباشرة، فالطلب الذي يصل من المتجر يظهر فورًا في الطلبات والتقارير والمخزون. ولمن يريد أن يرى قبل أن يشترك، عرض توضيحي كامل ببيانات واقعية يُفتح بنقرة.",
    deliverables: [
      "لوحة تحكم بمؤشرات حيّة",
      "المتجر والطلبات والمخزون والتقييمات",
      "العملاء والفواتير بكل حالاتها",
      "المشاريع والمهام والاجتماعات",
      "الفريق والأدوار والصلاحيات",
      "تقارير قابلة للتصدير إلى Excel",
    ],
    note: "جرّب العرض التوضيحي الكامل دون تسجيل من azm.rvios.com/demo",
    url: "https://azm.rvios.com/demo",
    blocks: [
      { t: "devices", desk: `${W}/azmsmart/dashboard.webp`, mobile: `${W}/azmsmart/mobile.webp`, url: "azm.rvios.com/dashboard", caption: "نظرة عامة على المتجر — الحاسوب والجوال" },
      { t: "browser", src: `${W}/azmsmart/orders.webp`, url: "azm.rvios.com/orders", caption: "الطلبات: الحالة، والدفع، والعميل، في جدول واحد" },
      { t: "browser", src: `${W}/azmsmart/products.webp`, url: "azm.rvios.com/products", caption: "المنتجات والمخزون والأسعار" },
      { t: "browser", src: `${W}/azmsmart/reports.webp`, url: "azm.rvios.com/reports", caption: "التقارير: المبيعات والزيارات يومًا بيوم، قابلة للتصدير" },
      { t: "browser", src: `${W}/azmsmart/invoices.webp`, url: "azm.rvios.com/invoices", caption: "الفواتير بكل حالاتها: مدفوعة، جزئية، متأخرة" },
      { t: "browser", src: `${W}/azmsmart/projects.webp`, url: "azm.rvios.com/projects", caption: "المشاريع والمهام ومراحل التسليم" },
    ],
  },
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
    slug: "dar-alshal",
    name: "دار الشال",
    latin: "Dar Al-Shal",
    client: "متجر على منصة RVIOS Store",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["متجر إلكتروني", "قالب ميزون", "أزياء رجالية"],
    categories: ["store", "web"],
    mat: "#ECE8E1",
    dark: false,
    accent: "#141312",
    cover: `${W}/dar-alshal/home.webp`,
    coverUrl: "dar-alshal.rvios.store",
    coverLight: true,
    summary:
      "متجر أزياء رجالية فاخرة — معاطف وشالات كشمير تُخاط وتُطرّز يدويًا — بواجهة هادئة تُبرز القطعة كما تُعرض في دار أزياء.",
    challenge:
      "يحتاج المتجر واجهة تشبه بضاعته وتعمل على الجوال قبل الحاسوب، وطلبات تصل منظّمة بدل رسائل متفرقة — دون تكلفة بناء متجر من الصفر.",
    approach:
      "بُني المتجر على قالب «ميزون» في منصة RVIOS Store: هيكل الصفحة وحركتها مصمّمان لنوع البضاعة نفسه، والمنتجات والأقسام والأسعار من لوحة التحكم، والطلب يُحفظ قبل أن يتواصل العميل عبر واتساب.",
    deliverables: ["متجر بقالب ميزون", "أقسام: معاطف، قمصان، أحذية، إكسسوار", "خيارات المقاس لكل قطعة", "طلب عبر واتساب"],
    note: "متجر نموذجي يعرض قالب «ميزون» كما يراه زبائن المتجر.",
    url: "https://store.rvios.com/s/dar-alshal",
    blocks: [
      { t: "devices", desk: `${W}/dar-alshal/home.webp`, mobile: `${W}/dar-alshal/mobile.webp`, url: "dar-alshal.rvios.store", caption: "الواجهة على الحاسوب والجوال", light: true },
      { t: "browser", src: `${W}/dar-alshal/products.webp`, url: "dar-alshal.rvios.store", caption: "المنتجات والأقسام", light: true },
    ],
  },
  {
    slug: "nabd-sports",
    name: "نبض الرياضة",
    latin: "Nabd Sports",
    client: "متجر على منصة RVIOS Store",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["متجر إلكتروني", "قالب نبض", "معدات رياضية"],
    categories: ["store", "web"],
    mat: "#0C0C0C",
    dark: true,
    accent: "#FF2D3D",
    cover: `${W}/nabd-sports/home.webp`,
    coverUrl: "nabd-sports.rvios.store",
    summary:
      "متجر أحذية وملابس ومعدات رياضية أصلية، بواجهة جريئة وحركة سريعة تشبه إيقاع التمرين.",
    challenge:
      "يحتاج المتجر واجهة تشبه بضاعته وتعمل على الجوال قبل الحاسوب، وطلبات تصل منظّمة بدل رسائل متفرقة — دون تكلفة بناء متجر من الصفر.",
    approach:
      "بُني المتجر على قالب «نبض» في منصة RVIOS Store: هيكل الصفحة وحركتها مصمّمان لنوع البضاعة نفسه، والمنتجات والأقسام والأسعار من لوحة التحكم، والطلب يُحفظ قبل أن يتواصل العميل عبر واتساب.",
    deliverables: ["متجر بقالب نبض", "أقسام: أحذية، ملابس، معدات", "شارات الخصم والأكثر طلبًا", "واجهة الجوال أولًا"],
    note: "متجر نموذجي يعرض قالب «نبض» كما يراه زبائن المتجر.",
    url: "https://store.rvios.com/s/nabd-sports",
    blocks: [
      { t: "devices", desk: `${W}/nabd-sports/home.webp`, mobile: `${W}/nabd-sports/mobile.webp`, url: "nabd-sports.rvios.store", caption: "الواجهة على الحاسوب والجوال" },
      { t: "browser", src: `${W}/nabd-sports/products.webp`, url: "nabd-sports.rvios.store", caption: "المنتجات والأقسام" },
    ],
  },
  {
    slug: "al-reef",
    name: "مطعم الريف",
    latin: "Al-Reef Kitchen",
    client: "متجر على منصة RVIOS Store",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["متجر إلكتروني", "قالب مائدة", "مطاعم وأكل"],
    categories: ["store", "web"],
    mat: "#1A1310",
    dark: true,
    accent: "#F2A33A",
    cover: `${W}/al-reef/home.webp`,
    coverUrl: "al-reef.rvios.store",
    summary:
      "متجر لمطعم يطبخ على الحطب: قائمة بصور شهية، وأصناف وإضافات، وطلب يصل للمطبخ منظّمًا.",
    challenge:
      "يحتاج المتجر واجهة تشبه بضاعته وتعمل على الجوال قبل الحاسوب، وطلبات تصل منظّمة بدل رسائل متفرقة — دون تكلفة بناء متجر من الصفر.",
    approach:
      "بُني المتجر على قالب «مائدة» في منصة RVIOS Store: هيكل الصفحة وحركتها مصمّمان لنوع البضاعة نفسه، والمنتجات والأقسام والأسعار من لوحة التحكم، والطلب يُحفظ قبل أن يتواصل العميل عبر واتساب.",
    deliverables: ["متجر بقالب مائدة", "قائمة طعام بأقسام", "أصناف وإضافات لكل وجبة", "طلب سريع من الجوال"],
    note: "متجر نموذجي يعرض قالب «مائدة» كما يراه زبائن المتجر.",
    url: "https://store.rvios.com/s/al-reef",
    blocks: [
      { t: "devices", desk: `${W}/al-reef/home.webp`, mobile: `${W}/al-reef/mobile.webp`, url: "al-reef.rvios.store", caption: "الواجهة على الحاسوب والجوال" },
      { t: "browser", src: `${W}/al-reef/products.webp`, url: "al-reef.rvios.store", caption: "المنتجات والأقسام" },
    ],
  },
  {
    slug: "reem-sweets",
    name: "حلويات ريم",
    latin: "Reem Sweets",
    client: "متجر على منصة RVIOS Store",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["متجر إلكتروني", "قالب سكّر", "حلويات منزلية"],
    categories: ["store", "web"],
    mat: "#FDEFEF",
    dark: false,
    accent: "#E0284F",
    cover: `${W}/reem-sweets/home.webp`,
    coverUrl: "reem-sweets.rvios.store",
    coverLight: true,
    summary:
      "متجر لمطبخ منزلي يخبز بالطلب يوميًا: كيك وكوكيز ودونات بواجهة مرحة بألوان الحلوى.",
    challenge:
      "يحتاج المتجر واجهة تشبه بضاعته وتعمل على الجوال قبل الحاسوب، وطلبات تصل منظّمة بدل رسائل متفرقة — دون تكلفة بناء متجر من الصفر.",
    approach:
      "بُني المتجر على قالب «سكّر» في منصة RVIOS Store: هيكل الصفحة وحركتها مصمّمان لنوع البضاعة نفسه، والمنتجات والأقسام والأسعار من لوحة التحكم، والطلب يُحفظ قبل أن يتواصل العميل عبر واتساب.",
    deliverables: ["متجر بقالب سكّر", "أقسام: كيك، كوكيز، دونات", "أسعار قبل الخصم وبعده", "طلب بالتوصيل في اليوم نفسه"],
    note: "متجر نموذجي يعرض قالب «سكّر» كما يراه زبائن المتجر.",
    url: "https://store.rvios.com/s/reem-sweets",
    blocks: [
      { t: "devices", desk: `${W}/reem-sweets/home.webp`, mobile: `${W}/reem-sweets/mobile.webp`, url: "reem-sweets.rvios.store", caption: "الواجهة على الحاسوب والجوال", light: true },
      { t: "browser", src: `${W}/reem-sweets/products.webp`, url: "reem-sweets.rvios.store", caption: "المنتجات والأقسام", light: true },
    ],
  },
  {
    slug: "tech-plus",
    name: "تقنية بلس",
    latin: "Tech Plus",
    client: "متجر على منصة RVIOS Store",
    location: "المملكة العربية السعودية",
    year: "2026",
    tags: ["متجر إلكتروني", "قالب فولت", "إلكترونيات"],
    categories: ["store", "web"],
    mat: "#05070B",
    dark: true,
    accent: "#C6FF3D",
    cover: `${W}/tech-plus/home.webp`,
    coverUrl: "tech-plus.rvios.store",
    summary:
      "متجر سماعات وساعات ذكية بضمان حقيقي، بواجهة تقنية داكنة تُبرز المنتج ومواصفاته.",
    challenge:
      "يحتاج المتجر واجهة تشبه بضاعته وتعمل على الجوال قبل الحاسوب، وطلبات تصل منظّمة بدل رسائل متفرقة — دون تكلفة بناء متجر من الصفر.",
    approach:
      "بُني المتجر على قالب «فولت» في منصة RVIOS Store: هيكل الصفحة وحركتها مصمّمان لنوع البضاعة نفسه، والمنتجات والأقسام والأسعار من لوحة التحكم، والطلب يُحفظ قبل أن يتواصل العميل عبر واتساب.",
    deliverables: ["متجر بقالب فولت", "أقسام: صوتيات، ساعات، إكسسوار", "تفاصيل ومواصفات لكل منتج", "شارات الجديد والأكثر مبيعًا"],
    note: "متجر نموذجي يعرض قالب «فولت» كما يراه زبائن المتجر.",
    url: "https://store.rvios.com/s/tech-plus",
    blocks: [
      { t: "devices", desk: `${W}/tech-plus/home.webp`, mobile: `${W}/tech-plus/mobile.webp`, url: "tech-plus.rvios.store", caption: "الواجهة على الحاسوب والجوال" },
      { t: "browser", src: `${W}/tech-plus/products.webp`, url: "tech-plus.rvios.store", caption: "المنتجات والأقسام" },
    ],
  },
  {
    slug: "shield-guard",
    name: "Shield Guard",
    latin: "Ransomware Defender",
    client: "مشروع تخرج — قسم تكنولوجيا المعلومات",
    location: "المملكة العربية السعودية",
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
