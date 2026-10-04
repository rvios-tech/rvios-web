"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { withLang } from "@/lib/i18n/config";
import { useLang } from "./LangProvider";

/** رابط داخلي يضيف بادئة اللغة تلقائياً */
export function L({ href, ...rest }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const lang = useLang();
  return <Link href={withLang(lang, href)} {...rest} />;
}
