import type { MetadataTheme } from "@/lib/metadata";
import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata";
import { getMdxBySlug, getAllContentPaths } from "@/lib/mdx-utils";
import { languages, getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { themeConfig, ContentLayoutType } from "@/config/theme";
import { DefaultContentLayout } from "@/components/layouts/content/DefaultContentLayout";
import { BlogContentLayout } from "@/components/layouts/content/BlogContentLayout";
import { PortfolioContentLayout } from "@/components/layouts/content/PortfolioContentLayout";

type Params = {
  locale: string;
  slug: string[];
};

// 静的生成のためのパスを取得
export async function generateStaticParams(): Promise<Params[]> {
  const paths = [];

  for (const locale of languages) {
    const slugs = await getAllContentPaths(locale);

    // インデックスページ以外のものを追加
    for (const slug of slugs) {
      if (slug.length > 0) {
        paths.push({
          locale,
          slug,
        });
      }
    }
  }

  return paths;
}

// メタデータを生成
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  // paramsを非同期で解決
  const { locale, slug } = await params;

  // MDXデータを取得
  const post = await getMdxBySlug(locale, slug);

  if (!post) {
    return {};
  }

  const { frontmatter } = post;

  // themeの型安全な処理
  let theme: MetadataTheme = "light";
  if (frontmatter.theme === "dark" || frontmatter.theme === "light") {
    theme = frontmatter.theme;
  }

  return baseGenerateMetadata({
    title: frontmatter.title || slug[slug.length - 1],
    description: frontmatter.description || "",
    path: slug.join("/"),
    locale,
    theme,
  });
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // paramsを非同期で解決
  const { locale, slug } = await params;

  // MDXコンテンツを取得
  const post = await getMdxBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  
  const layoutName = (frontmatter.layout as ContentLayoutType) || themeConfig.defaultContentLayout;

  const Layout = {
    Default: DefaultContentLayout,
    Blog: BlogContentLayout,
    Portfolio: PortfolioContentLayout,
  }[layoutName] || DefaultContentLayout;

  return (
    <Layout>
      {content}
    </Layout>
  );
}
