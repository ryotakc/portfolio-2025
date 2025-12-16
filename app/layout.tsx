import type { Metadata, Viewport } from "next";
import cn from "clsx";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig as themeSiteConfig } from "@/config/theme";
import { siteConfig } from "@/config/site";
import { getSiteLayout } from "@/lib/layout-registry";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Ryota Kato - Leo",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.authors[0].name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ryotakc",
  },
  alternates: {
    canonical: "./",
    languages: {
      "en-US": "/en",
      "ja-JP": "/ja",
    },
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SiteLayout = getSiteLayout(themeSiteConfig.layout);

  return (
    <html lang="en" className="overflow-x-hidden touch-manipulation" suppressHydrationWarning>
      <body className={cn("antialiased", "w-full h-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme={themeSiteConfig.defaultColor}
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayout>{children}</SiteLayout>
          <Analytics />
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
