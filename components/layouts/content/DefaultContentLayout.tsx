import ReturnButton from "@/components/return-back";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

export default function DefaultContentLayout({ children }: { children: React.ReactNode }) {
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
