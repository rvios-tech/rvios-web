import type { Lang } from "@/lib/i18n/config";
import * as arServices from "./services";
import * as enServices from "./en/services";
import * as arProducts from "./products";
import * as enProducts from "./en/products";
import * as arProjects from "./projects";
import * as enProjects from "./en/projects";
import * as arPosts from "./posts";
import * as enPosts from "./en/posts";
import * as arAzm from "./azm";
import * as enAzm from "./en/azm";

export type { Service } from "./services";
export type { Product } from "./products";
export type { Project, Block, Category } from "./projects";
export type { Post, PostBlock } from "./posts";

const packs = {
  ar: { services: arServices.services, products: arProducts.products, projects: arProjects.projects, categoryLabels: arProjects.categoryLabels, posts: arPosts.posts, azm: arAzm },
  en: { services: enServices.services, products: enProducts.products, projects: enProjects.projects, categoryLabels: enProjects.categoryLabels, posts: enPosts.posts, azm: enAzm },
};

export const content = (lang: Lang) => packs[lang];
export const getProject = (lang: Lang, slug: string) => packs[lang].projects.find((p) => p.slug === slug);
export const getPost = (lang: Lang, slug: string) => packs[lang].posts.find((p) => p.slug === slug);
export const formatDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
export { readingTime } from "./posts";
