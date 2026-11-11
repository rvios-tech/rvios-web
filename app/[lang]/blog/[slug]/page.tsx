import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView } from "@/components/blog/PostView";
import { content } from "@/lib/content";
import { findPost } from "@/lib/content/cms";
import { hasLocale, locales } from "@/lib/i18n/config";
import { alt } from "@/lib/i18n/page";

/** coded articles are prebuilt; ones published from AzmSmart render on first visit and refresh every 5 min */
export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return locales.flatMap((lang) => content(lang).posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const p = await findPost(lang, slug);
  if (!p) return {};
  return {
    title: p.title, description: p.excerpt, alternates: alt(lang, `/blog/${p.slug}`),
    openGraph: { type: "article", title: p.title, description: p.excerpt, images: [p.cover], publishedTime: p.date, authors: [p.author] },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const p = await findPost(lang, slug);
  if (!p) notFound();
  return <PostView p={p} lang={lang} />;
}
