"use client";

import Link from "next/link";
import { DynamicBreadcrumb } from "@/features/breadcrumb/DynamicBreadcrumb";
import { Badge } from "@/shared/ui/badge";

interface BlogContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    categories?: string[];
    [key: string]: unknown;
  };
  locale: string;
}

export default function BlogContentLayout({
  children,
  frontmatter,
  locale,
}: BlogContentLayoutProps) {
  const handleTagClick = (tag: string) => {
    sessionStorage.setItem("tags_filter_preload", tag);
  };

  const handleCategoryClick = (category: string) => {
    sessionStorage.setItem("categories_filter_preload", category);
  };

  return (
    <div className="mt-0">
      <DynamicBreadcrumb />
      <header className="mb-10">
        {frontmatter.title && (
          <h1 className="text-[1.3rem] md:text-[1.5rem] font-medium text-rurikon-700 dark:text-rurikon-100 mb-8 mt-10">
            {frontmatter.title}
          </h1>
        )}

        {/* Published と Tag を横並びに */}
        <div className="flex gap-12 mb-2">
          {frontmatter.date && (
            <div>
              <div className="text-sm text-rurikon-400 mb-1">Published</div>
              <div className="text-rurikon-700 dark:text-rurikon-100 font-medium">
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          )}

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div>
              <div className="text-sm text-rurikon-400 mb-1">Tags</div>
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/tags`}
                    onClick={() => handleTagClick(tag)}
                    className="no-underline"
                  >
                    <Badge variant="secondary" className="hover:opacity-80 transition-opacity">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {frontmatter.categories && frontmatter.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/categories`}
                onClick={() => handleCategoryClick(category)}
                className="no-underline"
              >
                <Badge variant="default" className="hover:opacity-80 transition-opacity">
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        <hr className="mt-4 border-rurikon-border dark:border-rurikon-border-dark opacity-50" />
      </header>
      <div className="blog-content">{children}</div>
    </div>
  );
}
