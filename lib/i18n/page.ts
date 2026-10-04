import { notFound } from "next/navigation";
import { hasLocale, type Lang } from "./config";

/** يستخرج اللغة من params أو يعيد 404 */
export async function langOf(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
export const alt = (lang: Lang, path: string) => ({ canonical: `/${lang}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } });
