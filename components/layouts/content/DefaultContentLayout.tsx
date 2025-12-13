import ReturnButton from "@/components/return-back";

export function DefaultContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mt-8">
        <ReturnButton />
      </div>
    </>
  );
}
