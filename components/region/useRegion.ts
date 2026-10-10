"use client";
import { useSyncExternalStore } from "react";
import { DEFAULT_REGION, isRegion, type Region } from "@/lib/content/contact";

const read = (): Region => {
  const r = document.documentElement.dataset.region;
  return isRegion(r) ? r : DEFAULT_REGION;
};

/**
 * منطقة الزائر لما لا يُرسم نسختين (سمة كـ placeholder). الخادم يرسم الافتراضية،
 * ثم تُقرأ من <html> بعد الترطيب. المنطقة لا تتغيّر خلال الزيارة، فلا اشتراك.
 */
export function useRegion(): Region {
  return useSyncExternalStore(() => () => {}, read, () => DEFAULT_REGION);
}
