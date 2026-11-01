"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { DeviceScene } from "@/lib/content/services";

const HOLD_MS = 4500;

/** لقطات متراكبة تتبدّل بتلاشٍ — الحاسوب والجوال يبقيان على المشهد نفسه */
function Stack({ scenes, at, pick, sizes, className }: { scenes: DeviceScene[]; at: number; pick: "desk" | "mobile"; sizes: string; className?: string }) {
  return (
    <>
      {scenes.map((s, i) => (
        <Image key={s[pick]} src={s[pick]} alt="" fill sizes={sizes} className={`object-cover object-top transition-opacity duration-700 ${i === at ? "opacity-100" : "opacity-0"} ${className ?? ""}`} />
      ))}
    </>
  );
}

/** نظام أو متجر كما يراه عميله: صفحة ويب وبجانبها الجوال — وأكثر من مشهد يتناوب تلقائيًا */
export function Devices({ scenes, sizes = "(max-width:1024px) 80vw, 42vw" }: { scenes: DeviceScene[]; sizes?: string }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (scenes.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAt((i) => (i + 1) % scenes.length), HOLD_MS);
    return () => clearInterval(t);
  }, [scenes.length]);
  const now = scenes[at];
  return (
    <div className="relative pb-[7%]">
      <div className={`browser w-[88%] ${now.light ? "light" : ""}`}>
        <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{now.url}</span></div>
        <div className="relative aspect-[16/9] overflow-hidden"><Stack scenes={scenes} at={at} pick="desk" sizes={sizes} /></div>
      </div>
      <div className="absolute bottom-0 end-0 aspect-[390/844] w-[24%] min-w-[92px] rounded-[1.7rem] bg-[#0b0b0c] p-[1%] shadow-[0_40px_80px_-30px_rgba(0,0,0,.75),inset_0_0_0_1.5px_rgba(255,255,255,.12)]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-black">
          <Stack scenes={scenes} at={at} pick="mobile" sizes="(max-width:1024px) 24vw, 12vw" />
          <span aria-hidden="true" className="absolute left-1/2 top-[1.6%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
