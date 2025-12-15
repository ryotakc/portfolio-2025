import { Suspense } from "react";
import { getAllTags, getAllPosts } from "@/lib/mdx-utils";
import { TaxonomyExplorer } from "@/components/features/taxonomy/TaxonomyExplorer";

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaxonomyExplorer
        title="Tags"
        description="Browse all tags used in the articles."
        items={tags}
        posts={posts}
        type="tag"
        locale={locale}
      />
    </Suspense>
  );
}
