import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import { components } from "@/mdx-components";
import remarkDirective from "remark-directive";
import { remarkNotePlugin } from "./remark-note-plugin.mjs";

// コンテンツディレクトリのパス
const contentDir = path.join(process.cwd(), "content");

// 特定のMDXファイルを取得
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
    const { content, frontmatter } = await compileMDX<{
      title?: string;
      description?: string;
      date?: string;
      theme?: string;
      draft?: boolean;
      [key: string]: string | number | boolean | null | undefined;
    }>({
      source,
      components: components as MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkDirective, remarkNotePlugin],
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
