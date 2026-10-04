import type { Lang } from "@/lib/i18n/config";

const processes = {
  ar: [
    { title: "نفهم", desc: "نحلل عملك وجمهورك ومنافسيك قبل أي تصميم." },
    { title: "نصمّم", desc: "هوية وتجربة استخدام ونموذج تفاعلي توافق عليه." },
    { title: "نبني", desc: "تطوير على مراحل قصيرة ترى تقدّمها بنفسك." },
    { title: "نُطلق", desc: "نشر واختبار وتهيئة لمحركات البحث." },
    { title: "نعتني", desc: "صيانة ومراقبة وتطوير مستمر بعد الإطلاق." },
  ],
  en: [
    { title: "Understand", desc: "We study your business, audience and competitors before any design." },
    { title: "Design", desc: "Identity, user experience and an interactive prototype you approve." },
    { title: "Build", desc: "Development in short sprints, with progress you can see." },
    { title: "Launch", desc: "Deployment, testing and search-engine readiness." },
    { title: "Care", desc: "Maintenance, monitoring and continuous growth after launch." },
  ],
};
export const processOf = (lang: Lang) => processes[lang];
