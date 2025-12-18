"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useMemo } from "react";
import type { MDXPostMeta } from "@/lib/mdx-utils";
import { FilteredPostList } from "./FilteredPostList";
import { TaxonomyList } from "./TaxonomyList";

interface TaxonomyExplorerProps {
  title: string;
  description: string;
  items: { name: string; count: number }[];
  posts: MDXPostMeta[];
  type: "tag" | "category";
  locale: string;
}

export function TaxonomyExplorer({
  title,
  description,
  items,
  posts,
  type,
  locale,
}: TaxonomyExplorerProps) {
  // const router = useRouter(); removed unused
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get active filter from URL, default to "All" (which is represented by null or empty param)
  const paramKey = type === "tag" ? "t" : "c";
  const activeParam = searchParams.get(paramKey);
  const activeFilter = activeParam || "All";

  // _handleSelect removed

  // Filter posts logic
  const filteredPosts = useMemo(() => {
    if (!activeParam || activeFilter === "All") {
      return posts;
    }
    return posts.filter((post) => {
      const list = type === "tag" ? post.frontmatter.tags : post.frontmatter.categories;
      return Array.isArray(list) && list.includes(activeParam);
    });
  }, [posts, activeParam, activeFilter, type]);

  // Transform items for TaxonomyList
  const taxonomyItems = useMemo(() => {
    // "All" item
    const allItem = {
      label: "All",
      href: "#", // Handled by onClick mostly, but href is good for SEO/Link.
      // Actually TaxonomyList uses Link. We intercept or modify TaxonomyList?
      // Wait, TaxonomyList renders `Link`.
      // We should probably MODIFY TaxonomyList to accept `onClick` and optionally disable real navigation if we want pure client side.
      // BUT, using Link with query params is also valid for client-side navigation in Next.js.
      // E.g. href="/tags?t=Next.js"
      count: posts.length,
    };

    const mappedItems = items.map((item) => {
      const isSelected = item.name === activeParam;

      // Determine target href for Link
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, item.name);
      }
      const href = `${pathname}?${params.toString()}`;

      return {
        label: item.name,
        count: item.count,
        href,
      };
    });

    // Special href for All
    const allParams = new URLSearchParams(searchParams);
    allParams.delete(paramKey);
    allItem.href = `${pathname}?${allParams.toString()}`;

    return [allItem, ...mappedItems];
  }, [items, posts.length, activeParam, searchParams, pathname, paramKey]);

  // Note: TaxonomyList uses Link, which is fine. Next.js Link performs client-side transition.
  // We don't necessarily strictly need `onClick` handler if we construct correct `href`s.
  // The state `activeFilter` will update via `useSearchParams`.

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
        <p className="text-muted-foreground text-xl">{description}</p>
      </div>

      <div className="mb-12">
        {/* We reuse TaxonomyList. It expects items with { label, count?, href }. 
            It also expects activeItem to style it. */}
        <TaxonomyList items={taxonomyItems} type={type} activeItem={activeFilter} />
      </div>

      <div className="mt-8">
        <FilteredPostList
          posts={filteredPosts}
          filterType={type}
          // Display "All" if no filter, otherwise the filter name
          filterValue={activeFilter === "All" ? "All" : activeFilter}
          locale={locale}
        />
      </div>
    </div>
  );
}
