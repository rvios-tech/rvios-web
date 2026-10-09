import { Scene } from "@/components/stage/Scene";
import { Lines, Rise } from "@/components/ui/motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq } from "@/components/ui/Faq";
import type { StageCfg } from "@/lib/stage/glass";
import { site, waLink } from "@/lib/content/site";
import type { Lang } from "@/lib/i18n/config";

// الشعار يتوهج خلف النموذج الزجاجي
const MAIN: StageCfg = { d: { x: -2.9, y: -0.9, s: 0.85 }, m: { x: 0, y: -8, s: 0.5 }, glow: 0.8 };

const T = {
  ar: {
    label: "تواصل معنا", head: ["لنبدأ", "الحديث."],
    lead: "أخبرنا عن مشروعك، وسنعود إليك خلال يوم عمل واحد بتصور أولي واضح.",
    email: "البريد الإلكتروني", wa: "واتساب",
    faqLabel: "قبل أن تراسلنا", faqHead: ["أسئلة", "شائعة."],
    faq: [
      { q: "ماذا يحدث بعد إرسال الطلب؟", a: "نراجع طلبك ونتواصل معك خلال يوم عمل لتحديد جلسة قصيرة نفهم فيها مشروعك، ثم نرسل تصوراً أولياً وعرضاً مفصلاً." },
      { q: "هل تعملون مع عملاء خارج المملكة؟", a: "نعم. نعمل عن بُعد مع عملاء في المملكة العربية السعودية ومختلف الدول، ونتواصل عبر الاجتماعات المرئية." },
      { q: "هل الجلسة الأولى مدفوعة؟", a: "جلسة فهم المشروع الأولى مجانية وبدون أي التزام." },
    ],
  },
  en: {
    label: "Contact", head: ["Let's start", "talking."],
    lead: "Tell us about your project and we'll get back to you within one business day with a clear initial outline.",
    email: "Email", wa: "WhatsApp",
    faqLabel: "Before you write", faqHead: ["Frequently", "asked."],
    faq: [
      { q: "What happens after I send a request?", a: "We review it and reach out within a business day to book a short session to understand your project, then send an initial outline and a detailed proposal." },
      { q: "Do you work with clients outside Saudi Arabia?", a: "Yes. We work remotely with clients across Saudi Arabia and beyond, meeting over video calls." },
      { q: "Is the first session paid?", a: "The first discovery session is free, with no commitment." },
    ],
  },
};

export function ContactView({ topic, lang }: { topic?: string; lang: Lang }) {
  const t = T[lang];
  const faq = t.faq;
  const channels = [
    { k: t.email, v: site.email, href: `mailto:${site.email}`, latin: true },
    { k: t.wa, v: site.whatsappDisplay, href: waLink(lang), latin: true },
  ];
  return (
    <>
      <Scene id="contact-main" cfg={MAIN} className="px-[var(--pad)] pt-[clamp(140px,22vh,220px)] pb-[clamp(90px,14vh,150px)]">
        <div className="mx-auto grid max-w-[1480px] items-start gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-[5vw]">
          <div className="lg:sticky lg:top-[20vh]">
            <span className="label">{t.label}</span>
            <Lines immediate as="h1" className="h1 mt-6" lines={[t.head[0], <span key="m" className="text-mist">{t.head[1]}</span>]} />
            <Rise immediate delay={0.5}>
              <p data-rise className="lead mt-8 max-w-[36ch] text-mist">{t.lead}</p>
              <dl data-rise className="mt-12 grid gap-6">
                {channels.map((c) => (
                  <div key={c.k} className="border-t border-hair pt-4">
                    <dt className="text-[13px] text-mist">{c.k}</dt>
                    <dd dir={c.latin ? "ltr" : undefined} className={`mt-1 text-[20px] ${c.latin ? "rtl:text-end" : ""}`}>
                      {c.href ? <a className="link-line" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener">{c.v}</a> : c.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>
          <ContactForm initial={topic} />
        </div>
      </Scene>
      <Scene id="contact-faq" theme="paper" className="px-[var(--pad)] py-[clamp(90px,14vh,150px)]">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div><span className="label">{t.faqLabel}</span><Lines className="h2 mt-6" lines={t.faqHead} /></div>
          <Faq items={faq} />
        </div>
      </Scene>
    </>
  );
}
