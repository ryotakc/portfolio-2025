import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllContentPaths } from "@/lib/mdx-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ja/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic Content Pages (for both languages)
  const enSlugs = await getAllContentPaths("en");
  const jaSlugs = await getAllContentPaths("ja");

  const enUrls = enSlugs.map((slugArray) => {
    const slug = slugArray.join("/");
    // index.mdx results in empty slug array, handle it
    const path = slug ? `/${slug}` : "";
    return {
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const jaUrls = jaSlugs.map((slugArray) => {
    const slug = slugArray.join("/");
    const path = slug ? `/${slug}` : "";
    return {
      url: `${baseUrl}/ja${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...enUrls, ...jaUrls];
}
