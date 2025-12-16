import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import ReturnButton from "@/components/return-back";

interface DefaultContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
  locale: string;
}

export default function DefaultContentLayout({
  children,
  frontmatter,
  locale,
}: DefaultContentLayoutProps) {
  return (
    <div className="mt-0">
      <DynamicBreadcrumb />

      {children}
      <div className="mt-14">
        <ReturnButton />
      </div>
    </div>
  );
}
