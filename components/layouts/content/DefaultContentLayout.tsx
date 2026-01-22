import ChangelogSection from "@/components/ChangelogSection";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import ReturnButton from "@/components/return-back";
import { getChangelogEntries } from "@/lib/changelog-utils";

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
        {/* メインコンテンツ - 画面中央に配置 */}
        <div className="min-h-screen flex flex-col items-center justify-center px-5">
          <div className="w-full max-w-[680px]">{children}</div>
        </div>

        {/* Changelogセクション - スクロールで表示 */}
        <div className="w-full max-w-[680px] mx-auto px-5 pb-32">
          <ChangelogSection locale={locale} entries={changelogEntries} />
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
