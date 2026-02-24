import type { ReactNode } from "react";

interface TaxonomyIndexLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function TaxonomyIndexLayout({
  children,
  title,
  description,
}: TaxonomyIndexLayoutProps) {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
        <p className="text-muted-foreground text-xl">{description}</p>
      </div>
      {children}
    </div>
  );
}
