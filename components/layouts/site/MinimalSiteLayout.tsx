import { HistoryTracker } from "@/components/history-tracker";

export function MinimalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14">
      <HistoryTracker />
      {children}
    </article>
  );
}
