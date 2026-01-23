import ChangelogSection from "@/components/ChangelogSection";
import { getChangelogEntries } from "@/lib/changelog-utils";

type Params = {
  locale: string;
};

import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

export const metadata = {
  title: "Note | Leo's Portfolio",
  description: "Recent updates and thoughts.",
};

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const changelogEntries = await getChangelogEntries(locale);

  return (
    // 白背景で画面上部寄りに配置
    <div className="min-h-screen flex flex-col items-center justify-start pb-32">
      <div className="w-full max-w-[680px]">
        <DynamicBreadcrumb />
        <ChangelogSection locale={locale} entries={changelogEntries} headerBg="bg-background" />
      </div>
    </div>
  );
}
