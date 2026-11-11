/* Articles the RVIOS team publishes from AzmSmart (platform → «الموقع والمدونة» → المدونة), read from
   the unified backend's public CMS (`GET /cms/public/posts`) and shown beside the articles written in
   code. Server-side only, cached 5 minutes. If the backend is unreachable the blog simply shows the
   in-code articles — a CMS outage never empties the journal.

   The editor is a plain textarea, so the body uses a light convention:
     ## heading · > quote · - list item · blank line between paragraphs. */
import type { Lang } from "@/lib/i18n/config";
import type { Post, PostBlock } from "./posts";
import { content } from "./index";

const API = (process.env.UNIFIED_API_URL || process.env.NEXT_PUBLIC_UNIFIED_API_URL || "").replace(/\/+$/, "");
const FALLBACK_COVER = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=75&auto=format&fit=crop";
/** hosts next/image may load (next.config remotePatterns) */
const IMAGE_HOSTS = [/^images\.unsplash\.com$/, /\.r2\.dev$/, /(^|\.)rvios\.com$/];

type CmsPost = {
  title: string; titleEn: string | null; slug: string; description: string; metaDescription: string;
  heroImageUrl: string | null; readingTime: number; featured: boolean; publishedAt: string; updatedAt: string;
  category: { name: string; nameEn: string; slug: string }; content?: string;
};

const cover = (u: string | null) => {
  try {
    if (u && IMAGE_HOSTS.some((h) => h.test(new URL(u).hostname))) return u;
  } catch { /* not a URL */ }
  return FALLBACK_COVER;
};

const slugId = (s: string, i: number) => `s${i + 1}-${s.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 40)}`;

/** the textarea convention → the journal's blocks */
export function toBlocks(text: string): PostBlock[] {
  const out: PostBlock[] = [];
  let h = 0;
  const chunks = text.replace(/\r/g, "").split(/\n\s*\n/);
  for (const chunk of chunks) {
    let para: string[] = [];
    let list: string[] = [];
    const flushPara = () => { if (para.length) out.push({ t: "p", v: para.join(" ") }); para = []; };
    const flushList = () => { if (list.length) out.push({ t: "list", v: list }); list = []; };
    for (const line of chunk.split("\n")) {
      const l = line.trim();
      if (!l) continue;
      if (/^#{1,3}\s+/.test(l)) {
        flushPara(); flushList();
        const v = l.replace(/^#{1,3}\s+/, "");
        out.push({ t: "h2", v, id: slugId(v, h++) });
      } else if (/^>\s?/.test(l)) {
        flushPara(); flushList();
        out.push({ t: "quote", v: l.replace(/^>\s?/, "") });
      } else if (/^[-*•]\s+/.test(l)) {
        flushPara();
        list.push(l.replace(/^[-*•]\s+/, ""));
      } else {
        flushList();
        para.push(l);
      }
    }
    flushPara();
    flushList();
  }
  return out;
}

const toPost = (p: CmsPost): Post => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.description || p.metaDescription,
  category: p.category?.name ?? "مقالات",
  date: p.publishedAt,
  author: "فريق RVIOS",
  cover: cover(p.heroImageUrl),
  featured: false,
  body: p.content ? toBlocks(p.content) : [],
});

async function fetchJson<T>(path: string): Promise<T | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 300, tags: ["cms-posts"] } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Published CMS articles (Arabic journal only — they're written in Arabic). */
export async function cmsPosts(lang: Lang): Promise<Post[]> {
  if (lang !== "ar") return [];
  const j = await fetchJson<{ posts: CmsPost[] }>("/cms/public/posts");
  return (j?.posts ?? []).map(toPost);
}

/** CMS first (newest), then the in-code articles; a CMS slug never shadows a coded one. */
export async function allPosts(lang: Lang): Promise<Post[]> {
  const coded = content(lang).posts;
  const taken = new Set(coded.map((p) => p.slug));
  const cms = (await cmsPosts(lang)).filter((p) => !taken.has(p.slug));
  return [...cms, ...coded];
}

export async function findPost(lang: Lang, slug: string): Promise<Post | undefined> {
  const coded = content(lang).posts.find((p) => p.slug === slug);
  if (coded || lang !== "ar") return coded;
  const p = await fetchJson<CmsPost>(`/cms/public/posts/${encodeURIComponent(slug)}`);
  return p ? toPost(p) : undefined;
}
