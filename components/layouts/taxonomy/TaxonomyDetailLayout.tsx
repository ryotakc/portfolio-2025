import type { ReactNode } from "react";

interface TaxonomyDetailLayoutProps {
  children: ReactNode;
}

export default function TaxonomyDetailLayout({ children }: TaxonomyDetailLayoutProps) {
  return <div className="container py-10 max-w-4xl mx-auto">{children}</div>;
}
