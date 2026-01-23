import ChangelogSection from "@/components/ChangelogSection";
import { getChangelogEntries } from "@/lib/changelog-utils";

type Params = {
  locale: string;
};

export const metadata = {
  title: "Note | Leo's Portfolio",
  description: "Recent updates and thoughts.",
};

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const changelogEntries = await getChangelogEntries(locale);

  return (
    // 白背景で画面上部寄りに配置
    <div className="min-h-screen flex flex-col items-center justify-start bg-white dark:bg-gray-950 pt-2 pb-32">
      <div className="w-full max-w-[680px] px-5">
        <ChangelogSection
          locale={locale}
          entries={changelogEntries}
          headerBg="bg-white dark:bg-gray-950"
        />
      </div>
    </div>
  );
}
