import { Suspense } from "react";
import { getAllCategories, getAllPosts } from "@/lib/mdx-utils";
import { TaxonomyExplorer } from "@/components/features/taxonomy/TaxonomyExplorer";

type Params = {
  locale: string;
};

export default async function CategoriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const categories = await getAllCategories(locale);
  const posts = await getAllPosts(locale);
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
