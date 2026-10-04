import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseView } from "@/components/work/CaseView";
import { content, getProject } from "@/lib/content";
import { hasLocale, locales } from "@/lib/i18n/config";
import { alt } from "@/lib/i18n/page";

export function generateStaticParams() {
  return locales.flatMap((lang) => content(lang).projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const p = getProject(lang, slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, alternates: alt(lang, `/work/${p.slug}`), openGraph: { images: [p.cover] } };
}

export default async function CasePage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const p = getProject(lang, slug);
  if (!p) notFound();
  return <CaseView p={p} lang={lang} />;
}
