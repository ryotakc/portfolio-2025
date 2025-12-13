import ReturnButton from "@/components/return-back";

export function BlogContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose dark:prose-invert">
        {children}
      </div>
      <div className="mt-12 pt-8 border-t">
        <ReturnButton />
      </div>
    </div>
  );
}
