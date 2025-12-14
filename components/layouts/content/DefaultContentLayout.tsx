import ReturnButton from "@/components/return-back";

export default function DefaultContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3">
      {children}
      <div className="mt-14">
        <ReturnButton />
      </div>
    </div>
  );
}
