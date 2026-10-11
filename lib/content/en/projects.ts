/**
 * Portfolio — English edition of lib/content/projects.ts.
 * Keep non-text fields (slugs, colors, image paths, block order) in sync with the Arabic source.
 */

import type { Project, Category } from "../projects";

export const categoryLabels: Record<Category | "all", string> = {
  all: "All work",
  web: "Websites",
  store: "Online stores",
  identity: "Identities & profiles",
  software: "Systems & platforms",
};

const W = "/work";

export const projects: Project[] = [
  {
    slug: "rvios-store",
    name: "RVIOS Store",
    latin: "E-commerce platform",
    client: "An RVIOS product",
    location: "Yemen, Saudi Arabia & the Gulf",
    year: "2026",
    tags: ["SaaS platform", "Online stores", "18 templates"],
    categories: ["software", "store"],
    mat: "#140B0C",
    dark: true,
    accent: "#E0303A",
    cover: `${W}/rvios-store/home.webp`,
    coverUrl: "store.rvios.com",
    summary:
      "A platform that gives a merchant a complete online store in minutes: pick a template that suits the products, share one link, and receive orders neatly in the AzmSmart dashboard.",
    challenge:
      "Most merchants in the region sell over WhatsApp and Instagram: scattered photos, prices retyped in every chat, and orders lost between messages. Global platforms are expensive and don't support local payment or Arabic properly.",
    approach:
      "We designed an Arabic-first platform with eighteen templates, each with its own structure, motion and feel, not just different colours. A store starts free on name.rvios.store and upgrades to a custom domain and premium templates. Orders are saved before the customer opens WhatsApp, payment is by local transfer (Kuraimi, Jaib) with a receipt the merchant reviews, and everything is run from a phone.",
    deliverables: [
      "18 store templates, each with its own identity",
      "Instant subdomain, custom domain on paid plans",
      "Cart and orders saved before WhatsApp",
      "Local transfer payment with receipt",
      "Real reviews from buyers",
      "Fully connected to the AzmSmart dashboard",
    ],
    url: "https://store.rvios.com",
    blocks: [
      { t: "devices", desk: `${W}/rvios-store/home.webp`, mobile: `${W}/rvios-store/mobile.webp`, url: "store.rvios.com", caption: "The home page on desktop and mobile" },
      { t: "browser", src: `${W}/rvios-store/home-2.webp`, url: "store.rvios.com", caption: "Every store works on desktop and mobile, and is run from a phone" },
      { t: "browser", src: `${W}/rvios-store/templates.webp`, url: "store.rvios.com/templates", caption: "The template gallery — a live preview of each template before choosing" },
      { t: "browser", src: `${W}/rvios-store/create.webp`, url: "store.rvios.com/create", caption: "Creating a store: template, then plan, then store details" },
    ],
  },
  {
    slug: "azmsmart",
    name: "AzmSmart",
    latin: "Business management system",
    client: "An RVIOS product",
    location: "Yemen, Saudi Arabia & the Gulf",
    year: "2026",
    tags: ["ERP system", "Dashboard", "Multi-tenant SaaS"],
    categories: ["software"],
    mat: "#120C0B",
    dark: true,
    accent: "#C1272D",
    cover: `${W}/azmsmart/dashboard.webp`,
    coverUrl: "azm.rvios.com",
    summary:
      "One system that runs the whole company: the online store, orders and stock, clients and invoices, projects and tasks, and the team and its permissions — in a refined Arabic interface on desktop and mobile.",
    challenge:
      "Small and mid-sized companies run their business across Excel sheets, WhatsApp groups and separate tools that don't talk to each other. The result: numbers that don't match and decisions made without the full picture.",
    approach:
      "We built a multi-company system on one unified backend: every company is isolated with its own data, and every member sees what their permissions allow. The online store on RVIOS Store connects to it directly, so an order placed in the store appears at once in orders, reports and stock. For anyone who wants to look before subscribing, a full demo with realistic data opens in one click.",
    deliverables: [
      "Dashboard with live indicators",
      "Store, orders, stock and reviews",
      "Clients and invoices in every state",
      "Projects, tasks and meetings",
      "Team, roles and permissions",
      "Reports exportable to Excel",
    ],
    note: "Try the full demo without signing up at azm.rvios.com/demo",
    url: "https://azm.rvios.com/demo",
    blocks: [
      { t: "devices", desk: `${W}/azmsmart/dashboard.webp`, mobile: `${W}/azmsmart/mobile.webp`, url: "azm.rvios.com/dashboard", caption: "Store overview — desktop and mobile" },
      { t: "browser", src: `${W}/azmsmart/orders.webp`, url: "azm.rvios.com/orders", caption: "Orders: status, payment and customer in one table" },
      { t: "browser", src: `${W}/azmsmart/products.webp`, url: "azm.rvios.com/products", caption: "Products, stock and prices" },
      { t: "browser", src: `${W}/azmsmart/reports.webp`, url: "azm.rvios.com/reports", caption: "Reports: sales and visits day by day, exportable" },
      { t: "browser", src: `${W}/azmsmart/invoices.webp`, url: "azm.rvios.com/invoices", caption: "Invoices in every state: paid, partial, overdue" },
      { t: "browser", src: `${W}/azmsmart/projects.webp`, url: "azm.rvios.com/projects", caption: "Projects, tasks and delivery milestones" },
    ],
  },
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
    slug: "dar-alshal",
    name: "Dar Al-Shal",
    latin: "Menswear",
    client: "A store on RVIOS Store",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Online store", "Maison template", "Menswear"],
    categories: ["store", "web"],
    mat: "#ECE8E1",
    dark: false,
    accent: "#141312",
    cover: `${W}/dar-alshal/home.webp`,
    coverUrl: "dar-alshal.rvios.store",
    coverLight: true,
    summary:
      "A luxury menswear store — coats and cashmere shawls tailored and embroidered by hand — with a calm storefront that presents each piece as a fashion house would.",
    challenge:
      "The store needs a storefront that looks like its products and works on mobile first, with orders arriving organised instead of scattered messages — without the cost of building a store from scratch.",
    approach:
      "The store is built on the Maison template on RVIOS Store: the page structure and motion are designed for this kind of product, products, sections and prices come from the dashboard, and each order is saved before the customer gets in touch on WhatsApp.",
    deliverables: ["Store on the Maison template", "Sections: coats, shirts, shoes, accessories", "Size options per piece", "Ordering via WhatsApp"],
    note: "A showcase store presenting the Maison template as the store's customers see it.",
    url: "https://store.rvios.com/s/dar-alshal",
    blocks: [
      { t: "devices", desk: `${W}/dar-alshal/home.webp`, mobile: `${W}/dar-alshal/mobile.webp`, url: "dar-alshal.rvios.store", caption: "The storefront on desktop and mobile", light: true },
      { t: "browser", src: `${W}/dar-alshal/products.webp`, url: "dar-alshal.rvios.store", caption: "Products and sections", light: true },
    ],
  },
  {
    slug: "nabd-sports",
    name: "Nabd Sports",
    latin: "Sportswear",
    client: "A store on RVIOS Store",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Online store", "Nabd template", "Sports gear"],
    categories: ["store", "web"],
    mat: "#0C0C0C",
    dark: true,
    accent: "#FF2D3D",
    cover: `${W}/nabd-sports/home.webp`,
    coverUrl: "nabd-sports.rvios.store",
    summary:
      "A store for genuine sports shoes, apparel and gear, with a bold storefront and fast motion that matches a workout's rhythm.",
    challenge:
      "The store needs a storefront that looks like its products and works on mobile first, with orders arriving organised instead of scattered messages — without the cost of building a store from scratch.",
    approach:
      "The store is built on the Nabd template on RVIOS Store: the page structure and motion are designed for this kind of product, products, sections and prices come from the dashboard, and each order is saved before the customer gets in touch on WhatsApp.",
    deliverables: ["Store on the Nabd template", "Sections: shoes, apparel, gear", "Sale and best-seller badges", "Mobile-first storefront"],
    note: "A showcase store presenting the Nabd template as the store's customers see it.",
    url: "https://store.rvios.com/s/nabd-sports",
    blocks: [
      { t: "devices", desk: `${W}/nabd-sports/home.webp`, mobile: `${W}/nabd-sports/mobile.webp`, url: "nabd-sports.rvios.store", caption: "The storefront on desktop and mobile" },
      { t: "browser", src: `${W}/nabd-sports/products.webp`, url: "nabd-sports.rvios.store", caption: "Products and sections" },
    ],
  },
  {
    slug: "al-reef",
    name: "Al-Reef Kitchen",
    latin: "Restaurant",
    client: "A store on RVIOS Store",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Online store", "Maida template", "Restaurants & food"],
    categories: ["store", "web"],
    mat: "#1A1310",
    dark: true,
    accent: "#F2A33A",
    cover: `${W}/al-reef/home.webp`,
    coverUrl: "al-reef.rvios.store",
    summary:
      "A store for a wood-fire kitchen: a menu with appetising photos, options and add-ons, and orders that reach the kitchen organised.",
    challenge:
      "The store needs a storefront that looks like its products and works on mobile first, with orders arriving organised instead of scattered messages — without the cost of building a store from scratch.",
    approach:
      "The store is built on the Maida template on RVIOS Store: the page structure and motion are designed for this kind of product, products, sections and prices come from the dashboard, and each order is saved before the customer gets in touch on WhatsApp.",
    deliverables: ["Store on the Maida template", "Menu with sections", "Options and add-ons per dish", "Quick ordering from mobile"],
    note: "A showcase store presenting the Maida template as the store's customers see it.",
    url: "https://store.rvios.com/s/al-reef",
    blocks: [
      { t: "devices", desk: `${W}/al-reef/home.webp`, mobile: `${W}/al-reef/mobile.webp`, url: "al-reef.rvios.store", caption: "The storefront on desktop and mobile" },
      { t: "browser", src: `${W}/al-reef/products.webp`, url: "al-reef.rvios.store", caption: "Products and sections" },
    ],
  },
  {
    slug: "reem-sweets",
    name: "Reem Sweets",
    latin: "Home bakery",
    client: "A store on RVIOS Store",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Online store", "Sukkar template", "Home-made sweets"],
    categories: ["store", "web"],
    mat: "#FDEFEF",
    dark: false,
    accent: "#E0284F",
    cover: `${W}/reem-sweets/home.webp`,
    coverUrl: "reem-sweets.rvios.store",
    coverLight: true,
    summary:
      "A store for a home kitchen that bakes to order every day: cakes, cookies and doughnuts in a playful storefront in candy colours.",
    challenge:
      "The store needs a storefront that looks like its products and works on mobile first, with orders arriving organised instead of scattered messages — without the cost of building a store from scratch.",
    approach:
      "The store is built on the Sukkar template on RVIOS Store: the page structure and motion are designed for this kind of product, products, sections and prices come from the dashboard, and each order is saved before the customer gets in touch on WhatsApp.",
    deliverables: ["Store on the Sukkar template", "Sections: cakes, cookies, doughnuts", "Prices before and after discount", "Same-day delivery orders"],
    note: "A showcase store presenting the Sukkar template as the store's customers see it.",
    url: "https://store.rvios.com/s/reem-sweets",
    blocks: [
      { t: "devices", desk: `${W}/reem-sweets/home.webp`, mobile: `${W}/reem-sweets/mobile.webp`, url: "reem-sweets.rvios.store", caption: "The storefront on desktop and mobile", light: true },
      { t: "browser", src: `${W}/reem-sweets/products.webp`, url: "reem-sweets.rvios.store", caption: "Products and sections", light: true },
    ],
  },
  {
    slug: "tech-plus",
    name: "Tech Plus",
    latin: "Electronics",
    client: "A store on RVIOS Store",
    location: "Saudi Arabia",
    year: "2026",
    tags: ["Online store", "Volt template", "Electronics"],
    categories: ["store", "web"],
    mat: "#05070B",
    dark: true,
    accent: "#C6FF3D",
    cover: `${W}/tech-plus/home.webp`,
    coverUrl: "tech-plus.rvios.store",
    summary:
      "A store for headphones and smartwatches with a real warranty, with a dark tech storefront that puts the product and its specs first.",
    challenge:
      "The store needs a storefront that looks like its products and works on mobile first, with orders arriving organised instead of scattered messages — without the cost of building a store from scratch.",
    approach:
      "The store is built on the Volt template on RVIOS Store: the page structure and motion are designed for this kind of product, products, sections and prices come from the dashboard, and each order is saved before the customer gets in touch on WhatsApp.",
    deliverables: ["Store on the Volt template", "Sections: audio, watches, accessories", "Details and specs per product", "New and best-seller badges"],
    note: "A showcase store presenting the Volt template as the store's customers see it.",
    url: "https://store.rvios.com/s/tech-plus",
    blocks: [
      { t: "devices", desk: `${W}/tech-plus/home.webp`, mobile: `${W}/tech-plus/mobile.webp`, url: "tech-plus.rvios.store", caption: "The storefront on desktop and mobile" },
      { t: "browser", src: `${W}/tech-plus/products.webp`, url: "tech-plus.rvios.store", caption: "Products and sections" },
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
