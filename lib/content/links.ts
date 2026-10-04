/**
 * مواقع منتجات RVIOS — كل منتج على موقعه:
 *   RVIOS StoreOS → واجهة منصة المتاجر (إنشاء المتجر وتصفّح المتاجر)
 *   AzmSmart      → النظام نفسه، وصفحته الترحيبية فيه
 *
 * تُضبط بالبيئة للإنتاج، والافتراض لخوادم التطوير المحلية.
 */
const trim = (u: string) => u.replace(/\/+$/, "");

export const STOREOS_URL = trim(process.env.NEXT_PUBLIC_STOREOS_URL ?? "http://localhost:3011");
export const AZMSMART_URL = trim(process.env.NEXT_PUBLIC_AZMSMART_URL ?? "http://localhost:3001");
