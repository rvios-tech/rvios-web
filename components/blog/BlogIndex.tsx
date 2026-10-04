"use client";
import Image from "next/image";
import { L as Link } from "@/components/i18n/L";
import { useLang } from "@/components/i18n/LangProvider";
import { useMemo, useState } from "react";
import { content, formatDate, readingTime } from "@/lib/content";
import { Curtain } from "@/components/ui/motion";

const T = {
  ar: { all: "الكل", featured: "مقال مختار", min: "دقائق قراءة", allPosts: "كل المقالات", filter: "تصفية حسب التصنيف", empty: "لا مقالات في هذا التصنيف بعد." },
  en: { all: "All", featured: "Featured", min: "min read", allPosts: "All articles", filter: "Filter by category", empty: "No articles in this category yet." },
};

export function BlogIndex() {
  const lang = useLang();
  const t = T[lang];
  const { posts } = content(lang);
  const cats = [t.all, ...Array.from(new Set(posts.map((p) => p.category)))];
  const [cat, setCat] = useState(t.all);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const list = useMemo(() => posts.filter((p) => p !== featured && (cat === t.all || p.category === cat)), [cat, featured, posts, t.all]);

  return (
    <>
      <Link href={`/blog/${featured.slug}`} className="group grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-[5vw]">
        <Curtain className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-ink/5">
          <Image src={featured.cover} alt="" fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]" />
        </Curtain>
        <div>
          <p className="text-[13px] text-ink/50">{t.featured} — {featured.category}</p>
          <h2 className="h2 mt-4 transition-opacity group-hover:opacity-70">{featured.title}</h2>
          <p className="mt-5 max-w-[48ch] text-ink/65">{featured.excerpt}</p>
          <p className="mt-6 text-[13px] text-ink/45">{featured.author} — {formatDate(lang, featured.date)} — {readingTime(featured)} {t.min}</p>
        </div>
      </Link>

      <div className="mt-[14vh] flex flex-wrap items-end justify-between gap-6 border-b border-hair-ink pb-5">
        <h2 className="h3">{t.allPosts}</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-2" role="group" aria-label={t.filter}>
          {cats.map((c) => <button key={c} className="tab" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </div>

      <ol key={cat}>
        {list.map((p, i) => (
          <li key={p.slug} className="border-b border-hair-ink [animation:rise_.8s_var(--ease-out)_both]" style={{ animationDelay: `${i * 70}ms` }}>
            <Link href={`/blog/${p.slug}`} className="group grid items-center gap-6 py-9 md:grid-cols-[160px_1fr_200px]">
              <span className="text-[13px] text-ink/45">{formatDate(lang, p.date)}</span>
              <span>
                <span className="serif block text-[clamp(24px,2.2vw,34px)] leading-[1.3] transition-opacity group-hover:opacity-60">{p.title}</span>
                <span className="mt-2 block max-w-[62ch] text-[15px] text-ink/55">{p.excerpt}</span>
              </span>
              <span className="relative hidden aspect-[4/3] overflow-hidden rounded-[3px] bg-ink/5 md:block">
                <Image src={p.cover} alt="" fill sizes="200px" className="object-cover opacity-90 grayscale-[40%] transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </span>
            </Link>
          </li>
        ))}
        {!list.length && <li className="py-10 text-ink/55">{t.empty}</li>}
      </ol>
    </>
  );
}
