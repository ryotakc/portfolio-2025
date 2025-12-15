import { getAllTags, getPostsByTag } from "@/lib/mdx-utils";
import TaxonomyExplorerLayout from "@/components/layouts/taxonomy/TaxonomyExplorerLayout";

type Params = {
  locale: string;
  tag: string;
};

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { locale, tag } = await params;
  
  const decodedTag = decodeURIComponent(tag);
  
  const tags = await getAllTags(locale);
  const posts = await getPostsByTag(locale, decodedTag);

  const taxonomyItems = tags.map((t) => ({
    label: t.name,
    count: t.count,
    href: `/${locale}/tags/${t.name}`,
  }));

  return (
    <TaxonomyExplorerLayout
      title="Tags"
      description="Browse all tags used in the articles."
      items={taxonomyItems}
      activeItem={decodedTag}
      posts={posts}
      type="tag"
      locale={locale}
    />
  );
}
