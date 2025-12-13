import ReturnButton from "@/components/return-back";

export function PortfolioContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
      <div className="mt-12">
        <ReturnButton />
      </div>
    </div>
  );
}
