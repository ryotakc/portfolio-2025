import { FilteredPostList } from "@/components/features/taxonomy/FilteredPostList";
import { TaxonomyList } from "@/components/features/taxonomy/TaxonomyList";
import type { MDXPost } from "@/lib/mdx-utils";

interface TaxonomyExplorerLayoutProps {
  title: string;
  description: string;
  items: { label: string; count?: number; href: string }[];
  activeItem?: string;
  posts: MDXPost[];
  type: "tag" | "category";
  locale: string;
}

export default function TaxonomyExplorerLayout({
  title,
  description,
  items,
  activeItem,
  posts,
  type,
  locale,
}: TaxonomyExplorerLayoutProps) {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
        <p className="text-muted-foreground text-xl">{description}</p>
      </div>

      <div className="mb-12">
        <TaxonomyList items={items} type={type} activeItem={activeItem} />
      </div>

      <div className="mt-8">
        {/* If an active item is selected, we show the filtered list.
            If NO item is selected (e.g. root page), we can show all posts or a message.
            The user request implies "sorting", so maybe list all posts if none selected.
            FilteredPostList handles the display. We can reuse it. 
        */}
        {activeItem ? (
          <FilteredPostList
            posts={posts}
            filterType={type}
            filterValue={activeItem}
            locale={locale}
          />
        ) : (
          <div>
            {/* Fallback for "All" view. We can reuse FilteredPostList with a generic title or just map posts. 
                    Let's reuse FilteredPostList but maybe tweak the title logic if needed.
                    For now, I'll pass "All" as filterValue if none selected.
                */}
            <FilteredPostList posts={posts} filterType={type} filterValue="All" locale={locale} />
          </div>
        )}
      </div>
    </div>
  );
}
