import { Balancer } from "react-wrap-balancer";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

interface PortfolioContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    description?: string;
    stack?: string[];
    demoUrl?: string;
    repoUrl?: string;
    [key: string]: unknown;
  };
}

export default function PortfolioContentLayout({
  children,
  frontmatter,
}: PortfolioContentLayoutProps) {
  return (
    <div className="mt-0">
      <div className="mb-6 flex justify-center">
        <DynamicBreadcrumb />
      </div>
      <header className="mb-12 text-center">
        {frontmatter.title && (
          <h1 className="text-3xl sm:text-4xl font-bold text-rurikon-700 dark:text-rurikon-100 mb-4">
            <Balancer>{frontmatter.title}</Balancer>
          </h1>
        )}
        {frontmatter.description && (
          <p className="text-lg text-rurikon-500 max-w-2xl mx-auto">
            <Balancer>{frontmatter.description}</Balancer>
          </p>
        )}
        {frontmatter.stack && (
          <div className="flex gap-2 justify-center mt-4">
            {frontmatter.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-rurikon-100 dark:bg-rurikon-800 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="portfolio-content max-w-none">{children}</div>
    </div>
  );
}
