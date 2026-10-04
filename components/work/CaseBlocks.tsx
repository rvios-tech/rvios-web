import Image from "next/image";
import { Browser } from "@/components/ui/Browser";
import { Curtain, Rise } from "@/components/ui/motion";
import type { Block } from "@/lib/content";

function Caption({ text, dark }: { text?: string; dark: boolean }) {
  if (!text) return null;
  return <p className={`mt-5 text-[14px] ${dark ? "text-ivory/55" : "text-ink/55"}`}>{text}</p>;
}

/** يرسم مواد المشروع الحقيقية بحسب نوع كل كتلة */
export function CaseBlock({ b, dark }: { b: Block; dark: boolean }) {
  switch (b.t) {
    case "browser":
      return (
        <figure className="mx-auto w-full max-w-[1240px]">
          <Curtain><Browser src={b.src} url={b.url} light={b.light} sizes="(max-width:1300px) 94vw, 1240px" /></Curtain>
          <figcaption><Caption text={b.caption} dark={dark} /></figcaption>
        </figure>
      );
    case "image":
      return (
        <figure className="mx-auto w-full max-w-[1240px]">
          <Curtain className="relative overflow-hidden rounded-[10px]" style={{ aspectRatio: b.ratio ?? "16/9", background: b.bg }}>
            <Image src={b.src} alt="" fill sizes="(max-width:1300px) 94vw, 1240px" className={b.contain ? "object-contain p-[4%]" : "object-cover"} />
          </Curtain>
          <figcaption><Caption text={b.caption} dark={dark} /></figcaption>
        </figure>
      );
    case "duo":
      return (
        <figure className="mx-auto w-full max-w-[1240px]">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {b.srcs.map((src, i) => (
              <Curtain key={src} className={`relative overflow-hidden rounded-[10px] ${i ? "md:mt-16" : ""}`} style={{ aspectRatio: b.ratio ?? "4/3", background: b.bg }}>
                <Image src={src} alt="" fill sizes="(max-width:900px) 94vw, 620px" className="object-contain p-[5%]" />
              </Curtain>
            ))}
          </div>
          <figcaption><Caption text={b.caption} dark={dark} /></figcaption>
        </figure>
      );
    case "pages":
      return (
        <figure className="mx-auto w-full max-w-[1400px]">
          <Rise className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" stagger={0.06}>
            {b.srcs.map((src, i) => (
              <div data-rise key={src} className={`relative aspect-[900/1273] overflow-hidden rounded-[4px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] ${i % 4 === 1 || i % 4 === 3 ? "md:translate-y-14" : ""}`}>
                <Image src={src} alt="" fill sizes="(max-width:900px) 46vw, 330px" className="object-cover" />
              </div>
            ))}
          </Rise>
          <figcaption className="md:mt-14"><Caption text={b.caption} dark={dark} /></figcaption>
        </figure>
      );
    case "logo":
      return (
        <figure className="mx-auto w-full max-w-[1240px]">
          <Curtain className="grid aspect-[16/8] place-items-center rounded-[10px]" style={{ background: b.bg }}>
            <div className="relative h-[46%] w-[46%]"><Image src={b.src} alt="Logo" fill sizes="560px" className="object-contain" /></div>
          </Curtain>
          <figcaption><Caption text={b.caption} dark={dark} /></figcaption>
        </figure>
      );
  }
}
