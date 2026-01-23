"use client";

import cn from "clsx";
import { differenceInMonths, format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";

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
  work: { emoji: "🧭", label: "Work" },
  misc: { emoji: "💬", label: "Misc" },
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
  headerBg?: string; // Stickyヘッダーの背景色
}

export default function ChangelogSection({
  locale,
  entries,
  headerBg = "bg-[#F5F9FB] dark:bg-gray-900", // デフォルト色
}: ChangelogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const preloadCategory = sessionStorage.getItem("note_category_preload");
    if (preloadCategory && Object.keys(CATEGORY_MAP).includes(preloadCategory)) {
      setActiveFilter(preloadCategory as CategoryKey);
      sessionStorage.removeItem("note_category_preload");
    }
  }, []);

  // エントリーをフィルター
  const filteredEntries =
    activeFilter === "all" ? entries : entries.filter((e) => e.category.includes(activeFilter));

  // 年ごとにグループ化
  const groupedByYear = groupEntriesByYear(filteredEntries);
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* 手書き風タイトル */}
      <div className="text-left">
        <h2
          className="text-4xl font-bold relative inline-block"
          style={{ fontFamily: "var(--font-karakaze)" }}
        >
          <Highlighter action="underline">Changelog</Highlighter>
        </h2>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex justify-start gap-4 flex-wrap">
        {(Object.entries(CATEGORY_MAP) as [CategoryKey, (typeof CATEGORY_MAP)[CategoryKey]][]).map(
          ([key, { emoji, label }]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                activeFilter === key ? "scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              type="button"
              aria-label={`Filter by ${label}`}
            >
              <div
                className={`w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl transition-all hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  activeFilter === key
                    ? "ring-2 ring-gray-300 dark:ring-gray-600 ring-offset-2 dark:ring-offset-gray-950"
                    : ""
                }`}
              >
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
              <div
                className={cn("text-lg font-bold text-foreground sticky top-4 py-2 z-10", headerBg)}
              >
                {year}
              </div>

              <div className="space-y-12 relative border-l-2 border-dotted border-gray-300 dark:border-gray-700 pl-6 ml-2">
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
  // カード下の表示用日付（年は表示しない）
  const formattedDate = date.toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
  });

  // バッジ用日付ロジック
  const now = new Date();
  const monthsDiff = differenceInMonths(now, date);
  const isWithin4Months = monthsDiff <= 4;

  // 4ヶ月以内なら相対表記、それ以外は日付（年なし）
  // 英語表記のスクリーンショットに合わせて英語で相対表記
  const relativeDate = isWithin4Months
    ? formatDistanceToNow(date, { addSuffix: true, locale: enUS })
    : format(date, "MMM d", { locale: enUS });

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
      {/* タイムラインアイコン */}
      <div className="absolute -left-[2.5rem] top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg z-10">
        {categoryEmoji}
      </div>

      {/* Published ... Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pt-2 text-sm text-muted-foreground pl-1">
        <span>Published a post on</span>
        <Link href="/" className="font-medium text-foreground hover:underline">
          ryotakc.com
        </Link>
        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
          {relativeDate}
        </div>
      </div>

      {/* エントリーカード */}
      <Link
        href={url}
        className="block p-5 rounded-3xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
      >
        {/* タイトル */}
        <h3 className="text-base font-medium text-foreground mb-3 leading-snug">{entry.title}</h3>

        {/* 日付とアイコン（カード下部） */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <span>{categoryEmoji}</span>
          <span>{formattedDate}</span>
        </div>
      </Link>
    </div>
  );
}
