import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/industries", "/why-optiflow", "/case-studies", "/how-it-works", "/pricing", "/about", "/careers", "/contact", "/privacy", "/terms", "/data-security", "/blog"];
  const now = new Date();
  return routes.map((r) => ({ url: `${SITE.url}${r}`, lastModified: now, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
