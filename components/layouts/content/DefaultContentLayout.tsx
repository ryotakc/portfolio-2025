import ReturnButton from "@/components/return-back";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

interface DefaultContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
}

export default function DefaultContentLayout({
  children,
  frontmatter,
}: DefaultContentLayoutProps) {
  return (
    <div className="mt-0">
      <DynamicBreadcrumb />
      {frontmatter.title && (
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-rurikon-700 dark:text-rurikon-100 mb-4">
            {frontmatter.title}
          </h1>
        </header>
      )}
      {children}
      <div className="mt-14">
        <ReturnButton />
      </div>
    </div>
  );
}
