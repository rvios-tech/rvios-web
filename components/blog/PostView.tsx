import Image from "next/image";
import { L as Link } from "@/components/i18n/L";
import { Scene } from "@/components/stage/Scene";
import { Lines, Rise, Curtain } from "@/components/ui/motion";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Closing } from "@/components/layout/Closing";
import { content, formatDate, readingTime, type Post, type PostBlock } from "@/lib/content";
import type { Lang } from "@/lib/i18n/config";

const T = {
  ar: { blog: "المدونة", min: "دقائق قراءة", toc: "محتويات المقال", inThis: "في هذا المقال", share: "شارك المقال", wa: "واتساب", more: "اقرأ أيضاً" },
  en: { blog: "Journal", min: "min read", toc: "Contents", inThis: "In this article", share: "Share", wa: "WhatsApp", more: "Read next" },
};
import { site } from "@/lib/content/site";

function Render({ b }: { b: PostBlock }) {
  switch (b.t) {
    case "p": return <p>{b.v}</p>;
    case "h2": return <h2 id={b.id}>{b.v}</h2>;
    case "quote": return <blockquote>{b.v}</blockquote>;
    case "list": return <ul>{b.v.map((x) => <li key={x}>{x}</li>)}</ul>;
  }
}

export function PostView({ p, lang }: { p: Post; lang: Lang }) {
  const t = T[lang];
  const { posts } = content(lang);
  const toc = p.body.filter((b): b is Extract<PostBlock, { t: "h2" }> => b.t === "h2");
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
  const url = `${site.url}/${lang}/blog/${p.slug}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt,
    datePublished: p.date, image: p.cover, author: { "@type": "Person", name: p.author },
    publisher: { "@type": "Organization", name: site.name }, mainEntityOfPage: url,
  };

  return (
    <>
      <ReadingProgress target="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Scene id="post-hero" theme="paper" className="px-[var(--pad)] pt-[clamp(150px,24vh,240px)] pb-14">
        <div className="mx-auto max-w-[1100px] text-center">
          <Rise immediate><p data-rise className="text-[14px] text-ink/50"><Link href="/blog" className="link-line">{t.blog}</Link><span className="mx-3 opacity-50">/</span>{p.category}</p></Rise>
          <Lines immediate as="h1" className="h1 mt-8" lines={[p.title]} delay={0.1} />
          <Rise immediate delay={0.4}><p data-rise className="mt-8 text-[14px] text-ink/50">{p.author} — {formatDate(lang, p.date)} — {readingTime(p)} {t.min}</p></Rise>
        </div>
      </Scene>

      <Scene id="article" theme="paper" className="px-[var(--pad)] pb-[clamp(90px,14vh,150px)]">
        <Curtain className="relative mx-auto aspect-[21/9] max-w-[1480px] overflow-hidden rounded-[4px] bg-ink/5">
          <Image src={p.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        </Curtain>
        <div className="mx-auto mt-20 grid max-w-[1480px] gap-14 lg:grid-cols-[1fr_minmax(0,720px)_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-32 text-[14px]" aria-label={t.toc}>
              <b className="mb-4 block font-medium text-gold">{t.inThis}</b>
              <ol className="grid gap-3 border-s border-hair-ink ps-5">
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-ink/55 transition-colors hover:text-ink">{h.v}</a></li>)}
              </ol>
            </nav>
          </aside>
          <article className="prose-ar">
            <p className="serif !text-[clamp(26px,2.2vw,32px)] !leading-[1.6] !text-ink">{p.excerpt}</p>
            {p.body.map((b, i) => <Render key={i} b={b} />)}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hair-ink pt-6 text-[14px]">
              <span className="text-ink/55">{t.share}</span>
              <span className="flex gap-6">
                <a className="link-line" target="_blank" rel="noopener" href={`https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}`}>{t.wa}</a>
                <a className="link-line latin" target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>LinkedIn</a>
                <a className="link-line latin" target="_blank" rel="noopener" href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}`}>X</a>
              </span>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-[14vh] max-w-[1480px]">
          <h2 className="h3 border-b border-hair-ink pb-6">{t.more}</h2>
          <div className="grid md:grid-cols-2">
            {related.map((r, i) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className={`group border-b border-hair-ink py-9 ${i ? "md:border-s md:ps-10" : "md:pe-10"}`}>
                <p className="text-[13px] text-ink/50">{r.category}</p>
                <h3 className="serif mt-3 text-[28px] leading-[1.3] transition-opacity group-hover:opacity-60">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </Scene>
      <Closing />
    </>
  );
}
