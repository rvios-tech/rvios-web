import { Browser } from "@/components/ui/Browser";
import type { Service } from "@/lib/content";
import { Devices } from "./Devices";
import { MaintenanceConsole } from "./MaintenanceConsole";

/** مشهد الخدمة بجانب وصفها — في صفحة الخدمات وفي عرض الرئيسية */
export function ServiceVisual({ s, sizes, compact }: { s: Service; sizes: string; compact?: boolean }) {
  const v = s.visual;
  if (v.kind === "devices") return <Devices scenes={v.scenes} sizes={sizes} />;
  if (v.kind === "maintenance") return <MaintenanceConsole compact={compact} />;
  return <Browser src={v.src} url={v.url} light={v.light} sizes={sizes} />;
}
