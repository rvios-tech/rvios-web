/**
 * Portfolio — English edition of lib/content/projects.ts.
 * Keep non-text fields (slugs, colors, image paths, block order) in sync with the Arabic source.
 */

import type { Project, Category } from "../projects";

export const categoryLabels: Record<Category | "all", string> = {
  all: "All work",
  web: "Websites",
  identity: "Identities & profiles",
  software: "Software",
};

const W = "/work";

export const projects: Project[] = [
  {
    slug: "madar-waafaq",
    name: "Madar Waafaq",
    latin: "Holding company",
    client: "Madar Waafaq Co. Ltd.",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Brand identity", "Company profile", "Website"],
    categories: ["identity", "web"],
    mat: "#2E2822",
    dark: true,
    accent: "#D9BC98",
    cover: `${W}/madar/home.webp`,
    coverUrl: "madarwaafaq.com",
    summary:
      "A complete corporate presence for a Saudi holding company: logo and identity, a 23-page bilingual company profile, business cards, and a five-page website.",
    challenge:
      "A newly founded holding company active in real estate, financial solutions, management consulting, business development, and infrastructure delivery. It needed a cohesive corporate presence that would introduce it to partners and government bodies with confidence from day one — one visual language, from the logo all the way to the inbox.",
    approach:
      "We built the identity on a quiet contrast between deep brown and sand beige, with a mark that unites an arc and a dot in a single gesture. We then carried the identity into a 23-page company profile in Arabic and English covering vision, values, services, sectors, and methodology, and into a five-page website whose navigation we mapped in an interactive prototype before development — a glass interface set against the Riyadh skyline.",
    deliverables: [
      "Logo and brand guidelines",
      "23-page bilingual company profile",
      "Business cards",
      "Interactive website prototype",
      "Five-page website",
      "Authenticated corporate email",
    ],
    url: "https://www.madarwaafaq.com",
    blocks: [
      { t: "browser", src: `${W}/madar/home.webp`, url: "madarwaafaq.com", caption: "Homepage" },
      { t: "browser", src: `${W}/madar/about.webp`, url: "madarwaafaq.com/about", caption: "About — a glass card over the Riyadh skyline" },
      { t: "image", src: `${W}/madar/prototype.webp`, ratio: "16/9", caption: "The prototype: five pages and the navigation flow between them, mapped before a single line of code" },
      {
        t: "pages",
        srcs: [1, 2, 3, 5, 7, 8, 9, 10, 13, 17, 19, 23].map((p) => `${W}/madar/profile-${String(p).padStart(2, "0")}.webp`),
        caption: "Company profile — 23 pages in Arabic and English",
      },
      { t: "duo", srcs: [`${W}/madar/card-front.webp`, `${W}/madar/card-back.webp`], ratio: "506/294", bg: "#E9E1D4", caption: "Business cards" },
      { t: "logo", src: `${W}/madar/logo.webp`, bg: "#F4EFE6", caption: "The logo" },
    ],
  },
  {
    slug: "afs",
    name: "AFS Establishment",
    latin: "Contracting & investment",
    client: "Ahmed Fayez Al-Shammari Contracting Establishment",
    location: "Dammam, Saudi Arabia",
    year: "2026",
    tags: ["Website", "Bilingual company profile"],
    categories: ["web", "identity"],
    mat: "#0B1A2E",
    dark: true,
    accent: "#F29A1F",
    cover: `${W}/afs/home.webp`,
    coverUrl: "afsksa.com",
    summary:
      "A bilingual Arabic–English website and company profile for a Saudi firm in contracting, project development, and investment, operating across six fields and serving nine sectors.",
    challenge:
      "A young Dammam-based firm whose role doesn't end at execution: it starts with studying and financing the opportunity and extends through delivery and operation. Partners needed to grasp that breadth at first glance — without the firm looking like just another contractor.",
    approach:
      "We built the message around three lines: We build opportunities. We deliver projects. We create value. On the website, the firm's name is set in bold, oversized type over a real industrial scene, with glass cards summarizing the six fields and nine sectors. The company profile runs to 23 pages in separate Arabic and English editions, in deep navy with orange accents drawn from the logo, explaining the fields of work, the opportunity-to-value operating model, and the strategic direction.",
    deliverables: [
      "Arabic and English website",
      "23-page Arabic company profile",
      "23-page English company profile",
      "Unified visual language across site and profile",
    ],
    url: "https://afsksa.com",
    blocks: [
      { t: "browser", src: `${W}/afs/home.webp`, url: "afsksa.com", caption: "Homepage — We build opportunities. We deliver projects. We create value." },
      { t: "browser", src: `${W}/afs/about.webp`, url: "afsksa.com/about", caption: "About — “We create opportunities”" },
      { t: "image", src: `${W}/afs/profile-overview.webp`, ratio: "1800/2208", bg: "#0B1A2E", caption: "The company profile in both Arabic and English — ten selected pages from each edition" },
      {
        t: "pages",
        srcs: [...[1, 3, 4, 6, 7, 15, 16, 17].map((p) => `${W}/afs/profile-ar-${String(p).padStart(2, "0")}.webp`), `${W}/afs/profile-en-01.webp`],
        caption: "Pages from the Arabic edition, and the cover of the English edition",
      },
      { t: "logo", src: `${W}/afs/logo.webp`, bg: "#F4F1EA", caption: "The firm’s logo" },
    ],
  },
  {
    slug: "tilal",
    name: "Tilal Contracting",
    latin: "General contracting",
    client: "Tilal General Contracting Establishment",
    location: "Dammam & Eastern Province, Saudi Arabia",
    year: "2026",
    tags: ["Website", "Project galleries"],
    categories: ["web"],
    mat: "#EFE8DA",
    dark: false,
    accent: "#F2A516",
    cover: `${W}/tilal/home.webp`,
    coverUrl: "tilal",
    coverLight: true,
    summary:
      "A website for a Dammam contracting firm specializing in hangars, warehouses, shade structures, fencing, and renovation work, presenting ten specialties through real photos of its projects.",
    challenge:
      "Contracting clients want to see real work before they pick up the phone. The firm had ten years of projects and many specialties, but no single place that presented them in an organized way and turned visitors into calls.",
    approach:
      "We organized the site around the ten specialties: each has its own section with a gallery of real project photos and a short description, and a side menu lets visitors jump between them in one click. We kept contact within reach on every screen — a direct call button, a persistent WhatsApp link, and experience and project figures right up front.",
    deliverables: [
      "Website design and development",
      "Ten specialty sections with photo galleries",
      "Direct contact by phone and WhatsApp",
      "Mobile-responsive interface",
    ],
    blocks: [
      { t: "browser", src: `${W}/tilal/home.webp`, url: "tilal", light: true, caption: "Homepage" },
      { t: "browser", src: `${W}/tilal/services.webp`, url: "tilal/services", caption: "Specialties: a side menu of ten specialties, each with a gallery of real project photos" },
    ],
  },
  {
    slug: "shield-guard",
    name: "Shield Guard",
    latin: "Ransomware Defender",
    client: "Graduation project — Department of Information Technology",
    location: "Saudi Arabia",
    year: "2025 – 2026",
    tags: ["Software", "Cybersecurity"],
    categories: ["software"],
    mat: "#101317",
    dark: true,
    accent: "#3B8FE0",
    cover: `${W}/shield/overview-light.webp`,
    coverUrl: "Shield Guard",
    coverLight: true,
    summary:
      "Software that protects Windows systems from ransomware: it detects mass-encryption behavior the moment it happens, stops the attacking process, and restores the affected files.",
    challenge:
      "Traditional antivirus tools rely on known malware signatures, so they lag behind every new ransomware variant. And once encryption actually begins, a user’s files can be lost within seconds.",
    approach:
      "Instead of hunting for signatures, Shield Guard watches behavior. A C++ engine flags any process that modifies a large number of files in an encryption-like pattern, stops it immediately, then restores the files from continuous backups and Windows shadow copies. The interface shows protection status, the threat log, and the list of trusted applications, in both light and dark modes.",
    deliverables: [
      "Behavioral detection engine in C++",
      "Instant termination of suspicious processes",
      "Recovery of affected files",
      "Threat log backed by SQLite",
      "Trusted applications list",
      "Light and dark mode interface",
    ],
    note: "A team graduation project by five students, built using an Agile methodology and tested in an isolated virtual environment.",
    blocks: [
      { t: "duo", srcs: [`${W}/shield/overview-dark.webp`, `${W}/shield/overview-light.webp`], ratio: "1100/664", bg: "#1A1E24", caption: "Status dashboard in dark and light modes" },
      { t: "image", src: `${W}/shield/threats-dark.webp`, ratio: "992/612", bg: "#0A0C0F", contain: true, caption: "Threat log: processes the engine stopped and files it restored" },
      { t: "duo", srcs: [`${W}/shield/whitelist-dark.webp`, `${W}/shield/whitelist-light.webp`], ratio: "440/500", bg: "#1A1E24", caption: "Trusted applications list" },
    ],
  },
];
