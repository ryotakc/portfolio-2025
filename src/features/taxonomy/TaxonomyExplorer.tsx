"use client";

import { useEffect, useMemo, useState } from "react";

import { DynamicBreadcrumb } from "@/features/breadcrumb/DynamicBreadcrumb";
import { FilteredPostList } from "@/features/taxonomy/FilteredPostList";
import { TaxonomyList } from "@/features/taxonomy/TaxonomyList";
import type { MDXPostMeta } from "@/shared/lib/mdx-utils";

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
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [mounted, setMounted] = useState(false);

  // Session Storageからフィルタのプリロードを読み取る
  useEffect(() => {
    setMounted(true);

    const storageKey = type === "tag" ? "tags_filter_preload" : "categories_filter_preload";
    const preloadValue = sessionStorage.getItem(storageKey);

    if (preloadValue) {
      setActiveFilter(preloadValue);
      sessionStorage.removeItem(storageKey);
    }
  }, [type]);

  // Filter posts logic
  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") {
      return posts;
    }
    return posts.filter((post) => {
      const list = type === "tag" ? post.frontmatter.tags : post.frontmatter.categories;
      return Array.isArray(list) && list.includes(activeFilter);
    });
  }, [posts, activeFilter, type]);

  // Transform items for TaxonomyList
  const taxonomyItems = useMemo(() => {
    const allItem = {
      label: "All",
      count: posts.length,
      onClick: () => setActiveFilter("All"),
    };

    const mappedItems = items.map((item) => ({
      label: item.name,
      count: item.count,
      onClick: () => setActiveFilter(item.name),
    }));

    return [allItem, ...mappedItems];
  }, [items, posts.length]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <DynamicBreadcrumb />
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
        <p className="text-muted-foreground text-xl">{description}</p>
      </div>

      <div className="mb-12">
        <TaxonomyList items={taxonomyItems} type={type} activeItem={activeFilter} />
      </div>

      <div className="mt-8">
        <FilteredPostList
          posts={filteredPosts}
          filterType={type}
          filterValue={activeFilter}
          locale={locale}
        />
      </div>
    </div>
  );
}
