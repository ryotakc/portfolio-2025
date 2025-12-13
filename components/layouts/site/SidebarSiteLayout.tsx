import { HistoryTracker } from "@/components/history-tracker";

export function SidebarSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
       <aside className="w-64 border-r hidden md:block p-6">
        {/* Placeholder sidebar content */}
        <div className="font-bold mb-4">Sidebar Menu</div>
        <nav className="flex flex-col gap-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
        </nav>
      </aside>
      <main className="flex-1">
        <article className="pl-6 pt-6 pr-6">
          <HistoryTracker />
          {children}
        </article>
      </main>
    </div>
  );
}
