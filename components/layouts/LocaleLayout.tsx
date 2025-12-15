import { HistoryTracker } from "@/components/history-tracker";

// This component seems to be a wrapper that provides styling and HistoryTracker.
// In `app/[locale]/layout.tsx`, it was an async function receiving params, but here it just receives children.
// The layout.tsx handled the params to just return children inside structure.
// So this component doesn't need params, just children.

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14">
      <HistoryTracker />
      {children}
    </article>
  );
}
