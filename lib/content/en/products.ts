import { STOREOS_URL } from "../links";

import type { Product } from "../products";

export const products: Product[] = [
  {
    slug: "storeos",
    name: "RVIOS Store",
    role: "The online store platform",
    desc: "Open your store free with one of 18 professional templates, your own link or domain, and organised orders on WhatsApp — no commission on your sales.",
    href: STOREOS_URL,
    cta: "Open your store free",
    tone: "#D8373D",
  },
  {
    slug: "app",
    name: "RVIOS App",
    role: "Your whole store in your pocket",
    desc: "Create your store from your phone, pick its template with a live preview, design it, add products with photos, and get an alert for every order.",
    href: `${STOREOS_URL}/app`,
    cta: "Get the app",
    tone: "#E0B062",
  },
  {
    slug: "custom",
    name: "Custom-designed store",
    role: "Made for your brand only",
    desc: "A store designed for your brand from scratch — identity, shopping experience and integrations — run from the same app and dashboard.",
    href: `${STOREOS_URL}/custom`,
    cta: "Request your design",
    tone: "#C8A45D",
  },
];
