import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://titanvault.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://titanvault.dev/changelog/", changeFrequency: "weekly", priority: 0.5 },
  ];
}
