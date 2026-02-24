// lib/metadata.ts
import type { Metadata } from "next";

export type MetadataTheme = "light" | "dark" | "system";

export type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  theme?: MetadataTheme;
  locale?: string;
};

// サイトのベースURL（デプロイ環境に合わせて変更）
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://ryotakc.com";

export function generateMetadata({
  title = "Leo's Portfolio",
  description = "Software Engineer & Computer Science Student",
  path = "",
  theme = "light",
  locale = "ja",
}: MetadataProps): Metadata {
  // OG画像のURLを生成
  const ogImageUrl = new URL(`${baseUrl}/api/og`);

  // クエリパラメータの設定
  ogImageUrl.searchParams.set("title", title);
  ogImageUrl.searchParams.set("description", description);
  ogImageUrl.searchParams.set("theme", theme);
  ogImageUrl.searchParams.set("locale", locale);
  ogImageUrl.searchParams.set("t", Date.now().toString());

  const canonical = path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;

  const ogImageUrlString = ogImageUrl.toString();

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en${path ? `/${path}` : ""}`,
        ja: `${baseUrl}/ja${path ? `/${path}` : ""}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Leo's Portfolio",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrlString,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrlString],
      creator: "@yourusername", // あなたのTwitterユーザー名を設定（オプション）
      site: "@yourusername", // あなたのTwitterユーザー名を設定（オプション）
    },
  };
}
