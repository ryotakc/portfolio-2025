"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 型定義とカテゴリマップ（サーバー側のchangelog-utilsから複製）
export interface ChangelogEntry {
  title: string;
  date: string;
  category: string[];
  slug: string[];
  description?: string;
}

export const CATEGORY_MAP = {
  all: { emoji: "✨", label: "All" },
  blog: { emoji: "✍️", label: "Blog" },
  work: { emoji: "🚀", label: "Work" },
  misc: { emoji: "📝", label: "Misc" },
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP;

// エントリーを年ごとにグループ化（クライアント側で実行）
function groupEntriesByYear(entries: ChangelogEntry[]): Record<string, ChangelogEntry[]> {
  const grouped: Record<string, ChangelogEntry[]> = {};

  entries.forEach((entry) => {
    const year = new Date(entry.date).getFullYear().toString();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(entry);
  });

  return grouped;
}

interface ChangelogSectionProps {
  locale: string;
  entries: ChangelogEntry[];
}

export default function ChangelogSection({ locale, entries }: ChangelogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // エントリーをフィルター
  const filteredEntries =
    activeFilter === "all"
      ? entries
      : entries.filter((e) => e.category.includes(activeFilter));

  // 年ごとにグループ化
  const groupedByYear = groupEntriesByYear(filteredEntries);
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-12 py-16">
      {/* 手書き風タイトル */}
      <div className="text-center">
        <h2 className="text-4xl font-bold relative inline-block">
          <span className="relative">
            Changelog
            {/* 手書き風下線 */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,7 Q50,3 100,7 T200,7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary opacity-30"
              />
            </svg>
          </span>
        </h2>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex justify-center gap-4 flex-wrap">
        {(Object.entries(CATEGORY_MAP) as [CategoryKey, (typeof CATEGORY_MAP)[CategoryKey]][]).map(
          ([key, { emoji, label }]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                activeFilter === key
                  ? "ring-2 ring-blue-400 dark:ring-blue-500 scale-105"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              type="button"
              aria-label={`Filter by ${label}`}
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                {emoji}
              </div>
              <span className="text-xs text-muted-foreground font-medium">{label}</span>
            </button>
          ),
        )}
      </div>

      {/* タイムライン */}
      {years.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>まだエントリーがありません</p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year} className="space-y-4">
              {/* 年ラベル */}
              <div className="text-lg font-bold text-foreground sticky top-4 bg-background/80 backdrop-blur-sm py-2 z-10">
                {year}
              </div>

              {/* エントリーリスト */}
              <div className="space-y-6 relative border-l-2 border-dotted border-gray-300 dark:border-gray-700 pl-6 ml-2">
                {groupedByYear[year].map((entry, idx) => (
                  <ChangelogEntryItem key={idx} entry={entry} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ChangelogEntryItemProps {
  entry: ChangelogEntry;
  locale: string;
}

function ChangelogEntryItem({ entry, locale }: ChangelogEntryItemProps) {
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
  });

  // カテゴリの絵文字を取得
  const categoryEmoji = entry.category
    .map((cat) => {
      const key = cat.toLowerCase() as CategoryKey;
      return CATEGORY_MAP[key]?.emoji || "📝";
    })
    .join(" ");

  // スラッグからURLを生成
  const url = `/${locale}/${entry.slug.join("/")}`;

  return (
    <div className="relative group">
      {/* タイムラインドット */}
      <div className="absolute -left-[1.6rem] top-2 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500 transition-colors" />

      {/* エントリーカード */}
      <Link
        href={url}
        className="block p-4 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      >
        {/* 日付 */}
        <div className="text-xs text-muted-foreground mb-1">{formattedDate}</div>

        {/* タイトル */}
        <div className="font-medium text-foreground mb-1 flex items-center gap-2">
          <span>{categoryEmoji}</span>
          <span>{entry.title}</span>
        </div>

        {/* 説明 */}
        {entry.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">{entry.description}</div>
        )}

        {/* カテゴリタグ */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {entry.category.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
