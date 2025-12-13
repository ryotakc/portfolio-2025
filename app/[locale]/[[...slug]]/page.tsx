import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata";
import { getMdxBySlug, getAllContentPaths } from "@/lib/mdx-utils";
import { notFound } from "next/navigation";
import { languages } from "@/lib/i18n";
import type { Metadata } from "next";

// Content Layouts
import DefaultContentLayout from "@/components/layouts/content/DefaultContentLayout";
import BlogContentLayout from "@/components/layouts/content/BlogContentLayout";
import PortfolioContentLayout from "@/components/layouts/content/PortfolioContentLayout";

type Params = {
  locale: string;
  slug: string[];
};

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<{ slug: string[] }[]> {
  // If locale is undefined during build time, we might need to handle it or iterate over all languages
  // However, next.js calls generateStaticParams for each locale if we are inside [locale]
  // But strictly speaking, the upper generateStaticParams in layout.tsx defines the locales.
  // So here 'locale' *should* be passed down?
  // Actually, generateStaticParams in a nested segment receives params from parent.
  // But to be safe and standalone we can iterate languages if needed,
  // OR strictly obey the folder structure.

  // Let's rely on parent params or just generate for all locales if locale is not provided contextually yet?
  // Documentation: "params: An object designed to populate the dynamic segments of the route component..."
  // If we are in [locale]/[...slug], we need to generate params for this segment.

  // NOTE: getAllContentPaths requires a locale.
  // We should probably iterate over all supported languages to generate all paths
  // if we can't rely on the parent param being available during this specific generation call (Next.js quirks).
  // But commonly we can just map all combinations.

  const allParams: { locale: string; slug: string[] }[] = [];

  // For safety, generate for all languages since generateStaticParams in child
  // replaces the dynamic segments. If we want to return just { slug } we rely on parent params.
  // But for full static export, returning { locale, slug } for all combinations is safest.

  // Note: Since this is inside [locale], returning { slug } is usually enough IF [locale] is static.
    // But let's verify.
    // If I return [{slug: ['foo']}], it will generate /locale/foo for the current locale context?
    // Actually, it's safer to generate all combinations or handle it per locale.
    // Given the structure, let's try to infer if we can loop all languages.

  const paths: { slug: string[] }[] = [];

  // Let's assume we need to generate for ALL locales because build time might not pass locale context perfectly
  // or we want to be explicit.
  // WAIT: If I am in [locale], generateStaticParams is called with params from parent IF parent has generateStaticParams.
  // app/[locale]/layout.tsx HAS generateStaticParams. So `locale` SHOULD be available.
  // BUT the signature of generateStaticParams receives `params` as argument.

  const pathsByLocale = await Promise.all(
    languages.map(async (lang) => {
        const slugs = await getAllContentPaths(lang);
        return slugs
            // .filter(slug => slug.length > 0) // Allow index pages now (slug = [])
            .map(slug => ({ locale: lang, slug }));
    })
  );

  return pathsByLocale.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const post = await getMdxBySlug(locale, slug);

  if (!post) {
    return {
       title: 'Not Found'
    };
  }

  const { frontmatter } = post;

  return baseGenerateMetadata({
    title: frontmatter.title || "Leo's Portfolio",
    description: frontmatter.description || "Software Engineer with a passion for building web app",
    locale,
    theme: frontmatter.theme as "system" | "dark" | "light" | undefined,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug = [] } = await params;
  const post = await getMdxBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const { content, frontmatter } = post;

  // Select Layout based on frontmatter
  const LayoutComponent = (() => {
      switch (frontmatter.layout) {
          case 'blog':
              return BlogContentLayout;
          case 'portfolio':
              return PortfolioContentLayout;
          default:
              return DefaultContentLayout;
      }
  })();

  return (
    <LayoutComponent frontmatter={frontmatter}>
        {content}
    </LayoutComponent>
  );
}
