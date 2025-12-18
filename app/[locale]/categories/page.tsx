import { Suspense } from "react";
import { TaxonomyExplorer } from "@/components/features/taxonomy/TaxonomyExplorer";
import { getAllCategories, getAllPostsMeta } from "@/lib/mdx-utils";

type Params = {
  locale: string;
};

export default async function CategoriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const categories = await getAllCategories(locale);
  const posts = await getAllPostsMeta(locale);
  const postsWithCategories = posts.filter(
    (post) => Array.isArray(post.frontmatter.categories) && post.frontmatter.categories.length > 0,
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaxonomyExplorer
        title="Categories"
        description="Browse articles by category."
        items={categories}
        posts={postsWithCategories}
        type="category"
        locale={locale}
      />
    </Suspense>
  );
}
