import RSS from "rss";
import { siteConfig } from "@/config/site";
import { languages } from "@/lib/i18n";
import { getAllContentPaths, getMdxBySlug } from "@/lib/mdx-utils";

export const runtime = "nodejs";

export async function GET() {
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    language: "en",
    pubDate: new Date(),
  });

  for (const locale of languages) {
    const slugArrays = await getAllContentPaths(locale);

    for (const slugArray of slugArrays) {
      const slugString = slugArray.join("/");
      // Skip empty slugs if any (though getAllContentPaths usually handles them)
      if (!slugString && slugArray.length > 0) continue;

      const post = await getMdxBySlug(locale, slugArray);
      if (!post || post.frontmatter.draft) continue;

      const { frontmatter } = post;
      const url = `${siteConfig.url}/${locale}/${slugString}`;

      feed.item({
        title: frontmatter.title || "No Title",
        description: frontmatter.description || "",
        url,
        guid: url,
        date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
        author: siteConfig.authors[0].name,
        categories: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
      });
    }
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=18000, stale-while-revalidate=86400",
    },
  });
}
