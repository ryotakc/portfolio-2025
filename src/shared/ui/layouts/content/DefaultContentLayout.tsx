import { DynamicBreadcrumb } from "@/features/breadcrumb/DynamicBreadcrumb";
import ReturnButton from "@/features/navigation/return-back";
import { getChangelogEntries } from "@/shared/lib/changelog-utils";
import ChangelogSection from "@/widgets/changelog/ChangelogSection";

interface DefaultContentLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title?: string;
    description?: string;
    isHome?: boolean;
    [key: string]: unknown;
  };
  locale: string;
}

export default async function DefaultContentLayout({
  children,
  frontmatter,
  locale,
}: DefaultContentLayoutProps) {
  // Homeページかどうかを判定
  const isHomePage = frontmatter.isHome === true;

  if (isHomePage) {
    // Changelogエントリーを取得
    const changelogEntries = await getChangelogEntries(locale);

    return (
      <>
        {/* メインコンテンツ - 白背景で画面上部寄りに配置 -> 中央配置に変更 */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
          <div className="w-full max-w-[680px] px-5">{children}</div>
        </div>

        {/* Changelogセクション - 淡い青灰色背景 */}
        <div className="w-full bg-[#F5F9FB] dark:bg-gray-900">
          <div className="w-full max-w-[680px] mx-auto px-5 py-16 pb-64">
            <ChangelogSection locale={locale} entries={changelogEntries} />
          </div>
        </div>
      </>
    );
  }

  // 通常のレイアウト
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
