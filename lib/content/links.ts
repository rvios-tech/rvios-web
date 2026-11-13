/**
 * مواقع منتجات RVIOS — كل منتج على موقعه:
 *   RVIOS StoreOS → واجهة منصة المتاجر (إنشاء المتجر وتصفّح المتاجر)
 *   لوحة التحكم   → إدارة المتجر على الويب (azm.rvios.com) — لا صفحة ترحيبية مستقلة
 *
 * تُضبط بالبيئة للإنتاج، والافتراض لخوادم التطوير المحلية.
 */
const trim = (u: string) => u.replace(/\/+$/, "");

export const STOREOS_URL = trim(process.env.NEXT_PUBLIC_STOREOS_URL ?? "https://store.rvios.com");
/** نسخة أندرويد من تطبيق RVIOS — تُستضاف على منصة المتاجر وتُنزَّل مباشرة (Content-Disposition: attachment) */
export const APK_URL = trim(process.env.NEXT_PUBLIC_APP_APK_URL ?? `${STOREOS_URL}/download/rvios.apk`);
export const AZMSMART_URL = trim(process.env.NEXT_PUBLIC_AZMSMART_URL ?? "http://azm.rvios.com");

/**
 * الباكند الموحّد — رسائل نموذج التواصل تصل صندوق رسائل الموقع في RVIOS OS.
 * فارغ = يبقى النموذج على مساره القديم (`/api/contact` والبريد وحده).
 */
export const UNIFIED_API_URL = trim(process.env.NEXT_PUBLIC_UNIFIED_API_URL ?? "");
