# RVIOS Technologies — الموقع الرسمي (v3)

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Three.js · GSAP · Lenis

## التشغيل
```bash
npm install
npm run dev      # http://localhost:3000  → يحوّل تلقائياً إلى /ar أو /en
npm run build && npm start
```

## الجديد في هذا الإصدار
- **لغتان**: عربية (RTL) وإنجليزية (LTR) عبر `app/[lang]/` و`proxy.ts` (يختار اللغة من الكوكي ثم لغة المتصفح، والافتراضي العربية). زر التبديل في الرأس بجانب «ابدأ مشروعك».
- **ثيمان**: داكن (افتراضي) وفاتح، زر التبديل بجانب زر اللغة، ويُحفظ الاختيار في `localStorage` بلا وميض عند التحميل. الألوان متغيرات دلالية في `app/globals.css` (`--bg`, `--fg`, `--mist`, `--hair`…).
- **مشهد البطل ثلاثي الأبعاد**: لابتوب إجرائي (`lib/stage/laptop.ts`) بلوحة مفاتيح مضاءة بالأحمر، وشعار RV زجاجي يطفو فوق لوحة المفاتيح، وشاشة حية (`lib/stage/screen.ts`) تتبدل تلقائياً بين موقع شركة ومتجر RVIOS StoreOS ولوحة AzmSmart، بحسب اللغة والثيم. التمرير مثبّت: يقترب المشهد وتتبدل الشاشات مع تعليقات، ثم يتحرر الشعار. النقر على المشهد يبدّل الشاشة.
- **الخطوط** (`app/fonts/` عبر `next/font/local`):
  - ZainMobileSwashes-VF: العناوين العربية الكبيرة (مع حركة محور الكشائد `long`)
  - ThmanyahSerifText: النصوص (عربي وإنجليزي)
  - YapariTrial-Bold: العناوين الإنجليزية الكبيرة — **نسخة تجريبية؛ يلزم شراء الترخيص قبل الاستخدام التجاري**
- **المحتوى**: خمس خدمات بصيغتيها الكاملة والمختصرة، صفحة جديدة `/storeos`، إعادة تسمية RVIOS Shop إلى RVIOS StoreOS، رقم التواصل ‎+966 551341301.

## أين أعدّل المحتوى
| المحتوى | العربية | الإنجليزية |
|---|---|---|
| الخدمات | `lib/content/services.ts` | `lib/content/en/services.ts` |
| المنتجات | `lib/content/products.ts` | `lib/content/en/products.ts` |
| الأعمال | `lib/content/projects.ts` | `lib/content/en/projects.ts` |
| المقالات | `lib/content/posts.ts` | `lib/content/en/posts.ts` |
| لوحة AzmSmart في الرئيسية | `lib/content/azm.ts` | `lib/content/en/azm.ts` |
| بيانات الشركة والروابط | `lib/content/site.ts` | (نفس الملف) |

نصوص الواجهة القصيرة موجودة داخل كل مكوّن/صفحة في كائن `T = { ar, en }`.

## صفحات المنتجات
AzmSmart وRVIOS StoreOS لكلٍّ منهما موقعه: روابطهما في الرأس والرئيسية وبطاقات المنتجات تفتح موقع المنتج، و`/ar/azmsmart` و`/ar/storeos` تحوّلان إليه (`next.config.ts`). العناوين في `lib/content/links.ts`:

| المتغيّر | الافتراض (تطوير) | ماذا |
|---|---|---|
| `NEXT_PUBLIC_AZMSMART_URL` | `http://azm.rvios.com` | AzmSmart — صفحته الترحيبية في النظام نفسه (نُقلت من هذا الموقع) |
| `NEXT_PUBLIC_STOREOS_URL` | `http://store.rvios.com` | واجهة منصة المتاجر RVIOS StoreOS |

## نموذج التواصل
يُرسَل من المتصفح إلى صندوق رسائل الموقع في AzmSmart عبر الباكند الموحّد حين يُضبط `NEXT_PUBLIC_UNIFIED_API_URL` (مثل `http://localhost:3002/api/v1`، وأصل الموقع في `CORS_ORIGINS` هناك)، ويبقى إشعار البريد أدناه اختياريًا بجانبه. بدون المتغيّر يعمل كما كان:
`app/api/contact/route.ts` — يرسل عبر Resend إذا أضفت `RESEND_API_KEY` (و`CONTACT_TO_EMAIL` اختيارياً)، وإلا يطبع الطلب في سجل الخادم.
