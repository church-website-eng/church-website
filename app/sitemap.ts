import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || "https://goshencathedral.ca";

  const routes = [
    "",
    "/about",
    "/contact",
    "/prayer",
    "/testimonies",
    "/visit",
    "/give",
    "/events",
    "/sermons",
    "/blog",
    "/gallery",
    "/rentals",
    "/live",
    "/hymnal",
    "/ministries",
    "/sacraments",
    "/announcements",
    "/privacy",
    "/portal/login",
    "/portal/register",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
