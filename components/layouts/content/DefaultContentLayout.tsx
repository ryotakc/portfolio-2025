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

export default function DefaultContentLayout({ children, frontmatter }: DefaultContentLayoutProps) {
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
