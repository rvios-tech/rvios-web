import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";
import { alt, langOf } from "@/lib/i18n/page";

const T = {
  ar: { title: "تواصل معنا", desc: "أخبرنا عن مشروعك: موقع، نظام ويب، متجر إلكتروني، صفحة هبوط، أو أحد منتجات RVIOS. نرد خلال يوم عمل واحد." },
  en: { title: "Contact", desc: "Tell us about your project: a website, web system, online store, landing page, or one of RVIOS's products. We reply within one business day." },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: T[lang].title, description: T[lang].desc, alternates: alt(lang, "/contact") };
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[lang]/contact">) {
  const lang = await langOf(params);
  const { topic } = await searchParams;
  return <ContactView topic={typeof topic === "string" ? topic : undefined} lang={lang} />;
}
