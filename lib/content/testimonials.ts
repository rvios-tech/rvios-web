/**
 * آراء العملاء — بأسمائهم الحقيقية ومشاريعهم في معرض الأعمال.
 * ⚠ النصوص تُعتمد من العميل نفسه قبل النشر: لا ننسب لأحد كلامًا لم يقله.
 */
import type { Lang } from "@/lib/i18n/config";

export type Testimonial = { name: string; role: string; company: string; project: string; quote: string };

export const testimonialsOf: Record<Lang, { label: string; head: [string, string]; view: string; items: Testimonial[] }> = {
  ar: {
    label: "قالوا عنّا",
    head: ["كلمة عملائنا", "بعد التسليم."],
    view: "شاهد المشروع",
    items: [
      {
        name: "سعود القحطاني",
        role: "مدير شركة مدار وآفاق",
        company: "شركة مدار وآفاق المحدودة",
        project: "madar-waafaq",
        quote:
          "كنا شركة ناشئة نحتاج أن نظهر أمام الشركاء والجهات الحكومية بثقة من اليوم الأول. تسلّمنا من RVIOS الهوية والملف التعريفي بلغتين والموقع، وكل قطعة تتكلم اللغة نفسها. الالتزام بالمواعيد والاهتمام بالتفاصيل فاق ما توقعناه.",
      },
      {
        name: "أحمد فايز الشمري",
        role: "مدير مؤسسة أحمد فايز الشمري",
        company: "مؤسسة أحمد فايز الشمري للمقاولات",
        project: "afs",
        quote:
          "أعجبني أن الفريق فهم نطاق عملنا قبل أن يصمّم: لسنا مقاولًا فقط، نحن نبني الفرصة من أولها. الموقع والملف التعريفي بالعربية والإنجليزية يشرحان ذلك من النظرة الأولى، وصرنا نرسلهما لكل شريك جديد بثقة.",
      },
    ],
  },
  en: {
    label: "Testimonials",
    head: ["In our clients'", "own words."],
    view: "View the project",
    items: [
      {
        name: "Saud Al-Qahtani",
        role: "Director, Madar Waafaq",
        company: "Madar Waafaq Co. Ltd.",
        project: "madar-waafaq",
        quote:
          "As a young company we needed to face partners and government bodies with confidence from day one. RVIOS delivered our identity, a bilingual company profile and the website — every piece speaks the same language. Their punctuality and attention to detail went beyond what we expected.",
      },
      {
        name: "Ahmed Fayez Al-Shammari",
        role: "Director, Ahmed Fayez Al-Shammari Est.",
        company: "Ahmed Fayez Al-Shammari Contracting Est.",
        project: "afs",
        quote:
          "What impressed me is that the team understood our scope before designing: we are not just a contractor, we build the opportunity from the start. The website and the Arabic and English profiles explain that at first glance, and we now send them to every new partner with confidence.",
      },
    ],
  },
};
