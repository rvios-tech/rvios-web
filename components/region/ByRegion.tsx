import type { ReactNode } from "react";
import { CONTACTS, REGIONS, type Region, type RegionContact } from "@/lib/content/contact";

/**
 * يرسم الكتلة لكل منطقة، وCSS يُظهر نسخة منطقة الزائر وحدها (انظر lib/content/contact.ts).
 * بلا hooks: يعمل في مكوّنات الخادم والعميل، والـHTML واحد لكل الزوّار.
 */
export function ByRegion({ children }: { children: (c: RegionContact, region: Region) => ReactNode }) {
  return (
    <>
      {REGIONS.map((r) => (
        <span key={r} data-only={r}>
          {children(CONTACTS[r], r)}
        </span>
      ))}
    </>
  );
}
