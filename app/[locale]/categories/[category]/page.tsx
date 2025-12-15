import { getAllCategories, getPostsByCategory } from "@/lib/mdx-utils";
import TaxonomyExplorerLayout from "@/components/layouts/taxonomy/TaxonomyExplorerLayout";

type Params = {
  locale: string;
  category: string;
};

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params;
  
  const decodedCategory = decodeURIComponent(category);
  
  const categories = await getAllCategories(locale);
  const posts = await getPostsByCategory(locale, decodedCategory);

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
      activeItem={decodedCategory}
      posts={posts}
      type="category"
      locale={locale}
    />
  );
}
