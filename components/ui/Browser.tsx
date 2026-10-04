import Image from "next/image";

/** إطار متصفح أنيق لعرض لقطات المواقع */
export function Browser({ src, url, alt = "", light = false, priority = false, sizes = "(max-width:900px) 100vw, 60vw", className = "" }: {
  src: string; url: string; alt?: string; light?: boolean; priority?: boolean; sizes?: string; className?: string;
}) {
  return (
    <div className={`browser ${light ? "light" : ""} ${className}`}>
      <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{url}</span></div>
      <div className="relative aspect-[16/9]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
