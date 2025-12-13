import { HistoryTracker } from "@/components/history-tracker";

export function MagazineSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <header className="border-b p-4 mb-8 text-center">
         <h1 className="text-4xl font-serif font-bold">Magazine Title</h1>
      </header>
      <article className="px-4">
        <HistoryTracker />
        {children}
      </article>
    </div>
  );
}
