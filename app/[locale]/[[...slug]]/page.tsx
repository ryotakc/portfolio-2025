import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContentLayout from "@/components/layouts/content/BlogContentLayout";
// Content Layouts
import DefaultContentLayout from "@/components/layouts/content/DefaultContentLayout";
import PortfolioContentLayout from "@/components/layouts/content/PortfolioContentLayout";
import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata";
import { generateStaticRoutes, getPublicPost } from "@/lib/post-service";

type Params = {
  locale: string;
  slug: string[];
};

export async function generateStaticParams() {
  return generateStaticRoutes();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const post = await getPublicPost(locale, slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const { frontmatter } = post;

  return baseGenerateMetadata({
    title: frontmatter.title || "Leo's Portfolio",
    description: frontmatter.description || "Software Engineer with a passion for building web app",
    locale,
    theme: frontmatter.theme,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug = [] } = await params;
  const post = await getPublicPost(locale, slug);

  if (!post) {
    notFound();
  }

  const { content, frontmatter } = post;

  // Select Layout based on frontmatter
  const LayoutComponent = (() => {
    switch (frontmatter.layout) {
      case "blog":
        return BlogContentLayout;
      case "portfolio":
        return PortfolioContentLayout;
      default:
        return DefaultContentLayout;
    }
  })();

  return (
    <LayoutComponent frontmatter={frontmatter} locale={locale}>
      {content}
    </LayoutComponent>
  );
}
