import { getAllCategories, getAllPosts } from "@/lib/mdx-utils";
import TaxonomyExplorerLayout from "@/components/layouts/taxonomy/TaxonomyExplorerLayout";

type Params = {
  locale: string;
};

export default async function CategoriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const categories = await getAllCategories(locale);
  const posts = await getAllPosts(locale);

  const taxonomyItems = categories.map((cat) => ({
    label: cat.name,
    count: cat.count,
    href: `/${locale}/categories/${cat.name}`,
  }));

  return (
    <TaxonomyExplorerLayout
      title="Categories"
      description="Browse articles by category."
      items={taxonomyItems}
      posts={posts}
      type="category"
      locale={locale}
    />
  );
}
