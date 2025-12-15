import { getAllTags, getAllPosts } from "@/lib/mdx-utils";
import TaxonomyExplorerLayout from "@/components/layouts/taxonomy/TaxonomyExplorerLayout";

type Params = {
  locale: string;
};

export async function generateStaticParams() {
  return [];
}

export default async function TagsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const tags = await getAllTags(locale);
  const posts = await getAllPosts(locale);

  const taxonomyItems = tags.map((tag) => ({
    label: tag.name,
    count: tag.count,
    href: `/${locale}/tags/${tag.name}`,
  }));

  return (
    <TaxonomyExplorerLayout
      title="Tags"
      description="Browse all tags used in the articles."
      items={taxonomyItems}
      posts={posts}
      type="tag"
      locale={locale}
    />
  );
}
