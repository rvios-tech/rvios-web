import Image from "next/image";

/** إطار جوال أنيق لعرض لقطة واجهة على الهاتف (لقطة 390×844) */
export function Phone({ src, alt = "", sizes = "(max-width:900px) 40vw, 300px", className = "" }: {
  src: string; alt?: string; sizes?: string; className?: string;
}) {
  return (
    <div className={`relative aspect-[390/844] rounded-[2.4rem] bg-[#0b0b0c] p-[3.2%] shadow-[0_40px_80px_-30px_rgba(0,0,0,.75),inset_0_0_0_1.5px_rgba(255,255,255,.12)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        <span aria-hidden="true" className="absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
