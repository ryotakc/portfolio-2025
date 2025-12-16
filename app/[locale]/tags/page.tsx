import { Suspense } from "react";
import { TaxonomyExplorer } from "@/components/features/taxonomy/TaxonomyExplorer";
import { getAllPosts, getAllTags } from "@/lib/mdx-utils";

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
  const postsWithTags = posts.filter(
    (post) => Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.length > 0,
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaxonomyExplorer
        title="Tags"
        description="Browse all tags used in the articles."
        items={tags}
        posts={postsWithTags}
        type="tag"
        locale={locale}
      />
    </Suspense>
  );
}
