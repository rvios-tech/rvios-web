import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { content } from "@/lib/content";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((l) => [
    ...["", "/services", "/work", "/blog", "/contact"].map((p) => ({ url: `${site.url}/${l}${p}`, lastModified: now })),
    ...content(l).projects.map((p) => ({ url: `${site.url}/${l}/work/${p.slug}`, lastModified: now })),
    ...content(l).posts.map((p) => ({ url: `${site.url}/${l}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ]);
}
