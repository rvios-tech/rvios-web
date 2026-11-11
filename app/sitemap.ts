import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { content } from "@/lib/content";
import { locales } from "@/lib/i18n/config";
import { cmsPosts } from "@/lib/content/cms";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const cms = await cmsPosts("ar");
  return [
    ...cms.map((p) => ({ url: `${site.url}/ar/blog/${p.slug}`, lastModified: new Date(p.date) })),
    ...locales.flatMap((l) => [
    ...["", "/services", "/work", "/blog", "/contact"].map((p) => ({ url: `${site.url}/${l}${p}`, lastModified: now })),
    ...content(l).projects.map((p) => ({ url: `${site.url}/${l}/work/${p.slug}`, lastModified: now })),
    ...content(l).posts.map((p) => ({ url: `${site.url}/${l}/blog/${p.slug}`, lastModified: new Date(p.date) })),
    ]),
  ];
}
