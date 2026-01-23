import "server-only";
import { getAllPostsMeta } from "./mdx-utils";

export interface ChangelogEntry {
  title: string;
  date: string;
  category: string[];
  slug: string[];
  description?: string;
}

/**
 * categoryフィールドを持つMDXファイルのみを取得してChangelogエントリーとして返す
 */
export async function getChangelogEntries(locale: string): Promise<ChangelogEntry[]> {
  const allPosts = await getAllPostsMeta(locale);

  // categoryフィールドを持つもののみフィルター
  const changelogPosts = allPosts
    .filter(
      (post) =>
        post.frontmatter.category &&
        Array.isArray(post.frontmatter.category) &&
        post.frontmatter.category.length > 0,
    )
    .map((post) => ({
      title: post.frontmatter.title || "Untitled",
      date: post.frontmatter.date || new Date().toISOString(),
      category: post.frontmatter.category as string[],
      slug: post.slug,
      description: post.frontmatter.description,
    }));

  // 日付でソート（新しい順）
  return changelogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
