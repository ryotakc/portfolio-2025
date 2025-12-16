import { Balancer } from "react-wrap-balancer";

import { Badge } from "@/components/ui/badge";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

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
  return (
    <div className="mt-0">
      <DynamicBreadcrumb />
      <header className="mb-10">
        {frontmatter.date && (
          <div className="text-rurikon-400 text-sm mb-3 font-mono">
            {frontmatter.date.split("T")[0]}
          </div>
        )}
        {frontmatter.title && (
          <h1 className="text-2xl sm:text-3xl font-bold text-rurikon-700 dark:text-rurikon-100 mb-4">
            <Balancer>{frontmatter.title}</Balancer>
          </h1>
        )}
        {frontmatter.description && (
          <p className="text-rurikon-500 italic mb-4">
            <Balancer>{frontmatter.description}</Balancer>
          </p>
        )}
        {frontmatter.categories && frontmatter.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {frontmatter.categories.map((category) => (
              <a
                key={category}
                href={`/${locale}/categories?c=${category}`}
                className="no-underline"
              >
                <Badge variant="default" className="hover:opacity-80 transition-opacity">
                  {category}
                </Badge>
              </a>
            ))}
          </div>
        )}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <a key={tag} href={`/${locale}/tags?t=${tag}`} className="no-underline">
                <Badge variant="secondary" className="hover:opacity-80 transition-opacity">
                  #{tag}
                </Badge>
              </a>
            ))}
          </div>
        )}
        <hr className="mt-8 border-rurikon-border dark:border-rurikon-border-dark opacity-50" />
      </header>
      <div className="blog-content">{children}</div>
    </div>
  );
}
