import fs from "fs";
import matter from "gray-matter";
import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { components } from "@/mdx-components";
import { remarkLinkCard } from "./remark-link-card.mjs";
import { remarkNotePlugin } from "./remark-note-plugin.mjs";
import { remarkOEmbed } from "./remark-oembed";

// コンテンツディレクトリのパス
const contentDir = path.join(process.cwd(), "content");

// 特定のMDXファイルを取得
export interface MDXFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  theme?: "system" | "dark" | "light";
  draft?: boolean;
  layout?: "blog" | "portfolio" | "default";
  tags?: string[];
  categories?: string[];
  [key: string]: unknown;
}

export async function getMdxBySlug(locale: string, slug: string[]) {
  try {
    // localeが未定義の場合はデフォルトを使用
    if (!locale) {
      console.warn('Warning: locale is undefined, using default "en"');
      locale = "en";
    }

    console.log(`Loading MDX for locale: ${locale}, slug:`, slug);

    let filePath: string;

    // スラッグに基づいてファイルパスを構築
    if (slug.length === 0) {
      // インデックスページの場合
      filePath = path.join(contentDir, locale, "index.mdx");
    } else {
      // ネストされたパスの場合
      // slugが配列であることを確認
      if (!Array.isArray(slug)) {
        console.error("Error: slug is not an array:", slug);
        return null;
      }

      filePath = `${path.join(contentDir, locale, ...slug)}.mdx`;
    }

    console.log(`Looking for MDX file at: ${filePath}`);

    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }

    // MDXファイルを読み込む
    const source = fs.readFileSync(filePath, "utf8");

    // MDXをコンパイル
    const { content, frontmatter } = await compileMDX<MDXFrontmatter>({
      source,
      components: components as MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkDirective,
            remarkNotePlugin,
            remarkOEmbed,
            remarkLinkCard,
          ],
        },
      },
    });

    return {
      content,
      frontmatter,
    };
  } catch (error) {
    console.error("Error loading MDX file:", error);
    return null;
  }
}

// 特定の言語のすべてのMDXファイルパスを取得
export async function getAllContentPaths(locale: string) {
  const localeDir = path.join(contentDir, locale);

  // 言語ディレクトリが存在するか確認
  if (!fs.existsSync(localeDir)) {
    console.warn(`Locale directory not found: ${localeDir}`);
    return [];
  }

  const getAllFiles = (dir: string, baseSlug: string[] = []): string[][] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap((entry) => {
      const res: string[][] = [];
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // ディレクトリの場合は再帰的に探索
        res.push(...getAllFiles(entryPath, [...baseSlug, entry.name]));
      } else if (entry.name.endsWith(".mdx")) {
        // ファイル名からスラッグを抽出
        const slug =
          entry.name === "index.mdx" ? baseSlug : [...baseSlug, entry.name.replace(/\.mdx$/, "")];

        res.push(slug);
      }

      return res;
    });
  };

  return getAllFiles(localeDir);
}

export type MDXPost = {
  slug: string[];
  content: React.ReactElement;
  frontmatter: MDXFrontmatter;
};

export type MDXPostMeta = {
  slug: string[];
  frontmatter: MDXFrontmatter;
};

import { cache } from "react";

// In-memory cache for development mode to avoid frequent disk I/O
const globalPostsCache: Record<string, MDXPostMeta[]> = {};
const isDev = process.env.NODE_ENV === "development";

// ヘルパー関数: フロントマターのみを含むすべての投稿を取得 (高速)
export const getAllPostsMeta = cache(async (locale: string): Promise<MDXPostMeta[]> => {
  // Return cached data in development if available
  if (isDev && globalPostsCache[locale]) {
    console.log(`[Cache] Returning in-memory cached posts for ${locale}`);
    return globalPostsCache[locale];
  }

  const paths = await getAllContentPaths(locale);
  const posts = paths.map((slug) => {
    try {
      let filePath: string;
      if (slug.length === 0) {
        filePath = path.join(contentDir, locale, "index.mdx");
      } else {
        filePath = `${path.join(contentDir, locale, ...slug)}.mdx`;
      }

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);

      return {
        slug,
        frontmatter: data as MDXFrontmatter,
      };
    } catch (error) {
      console.error(`Error loading MDX meta for ${slug}:`, error);
      return null;
    }
  });

  const filteredPosts = posts.filter(
    (post): post is MDXPostMeta => post !== null && !post.frontmatter.draft,
  );

  // Store in cache for development
  if (isDev) {
    globalPostsCache[locale] = filteredPosts;
    console.log(`[Cache] Stored posts in memory for ${locale}`);
  }

  return filteredPosts;
});

// ヘルパー関数: フロントマターを含むすべての投稿を取得
export async function getAllPosts(locale: string): Promise<MDXPost[]> {
  const paths = await getAllContentPaths(locale);
  const posts = await Promise.all(
    paths.map(async (slug) => {
      const post = await getMdxBySlug(locale, slug);
      if (post) {
        return {
          slug,
          content: post.content,
          frontmatter: post.frontmatter,
        };
      }
      return null;
    }),
  );

  return posts.filter((post): post is MDXPost => post !== null && !post.frontmatter.draft);
}

// すべてのタグを取得 (カウント付き)
export async function getAllTags(locale: string): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPostsMeta(locale);
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (Array.isArray(post.frontmatter.tags)) {
      post.frontmatter.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// すべてのカテゴリーを取得 (カウント付き)
export async function getAllCategories(locale: string): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPostsMeta(locale);
  const categoryCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (Array.isArray(post.frontmatter.categories)) {
      post.frontmatter.categories.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// 特定のタグを持つ投稿を取得
export async function getPostsByTag(locale: string, tag: string): Promise<MDXPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((post) => {
    return Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.includes(tag);
  });
}

// 特定のカテゴリーを持つ投稿を取得
export async function getPostsByCategory(locale: string, category: string): Promise<MDXPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((post) => {
    return (
      Array.isArray(post.frontmatter.categories) && post.frontmatter.categories.includes(category)
    );
  });
}
