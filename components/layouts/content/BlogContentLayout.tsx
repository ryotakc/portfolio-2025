import { Balancer } from "react-wrap-balancer";

interface BlogContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    [key: string]: unknown;
  };
}

export default function BlogContentLayout({
  children,
  frontmatter,
}: BlogContentLayoutProps) {
  return (
    <div className="mt-6">
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
          <p className="text-rurikon-500 italic">
            <Balancer>{frontmatter.description}</Balancer>
          </p>
        )}
        <hr className="mt-8 border-rurikon-border dark:border-rurikon-border-dark opacity-50" />
      </header>
      <div className="blog-content">
          {children}
      </div>
    </div>
  );
}
