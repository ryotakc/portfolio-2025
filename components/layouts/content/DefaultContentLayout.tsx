import ReturnButton from "@/components/return-back";

export default function DefaultContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      {children}
      <div className="mt-8">
        <ReturnButton />
      </div>
    </div>
  );
}
