import { HistoryTracker } from "@/components/history-tracker";
import { languages } from "@/lib/i18n";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <article className="pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14">
      <HistoryTracker />
      {children}
    </article>
  );
}
