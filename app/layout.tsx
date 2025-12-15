import type { Metadata, Viewport } from "next";
// import { unstable_ViewTransition as ViewTransition } from "react";
import cn from "clsx";
import "katex/dist/katex.min.css";
import "./globals.css";
// import { Provider } from "react-wrap-balancer";
// import { ModeToggle } from "@/components/mode-toggle";
// import { LanguageToggle } from "@/components/language-toggle";
import { ThemeProvider } from "@/components/theme-provider";
// import NavbarWrapper from "@/components/navbar-wrapper";
import { siteConfig as themeSiteConfig } from "@/config/theme";
import { siteConfig } from "@/config/site";
import MinimalSiteLayout from "@/components/layouts/site/MinimalSiteLayout";
import SidebarSiteLayout from "@/components/layouts/site/SidebarSiteLayout";
import MagazineSiteLayout from "@/components/layouts/site/MagazineSiteLayout";
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
  const SiteLayout = {
    minimal: MinimalSiteLayout,
    sidebar: SidebarSiteLayout,
    magazine: MagazineSiteLayout,
  }[themeSiteConfig.layout];

  return (
    <html lang="en" className="overflow-x-hidden touch-manipulation" suppressHydrationWarning>
      <body
        className={cn(
          "font-mono",
          "w-full p-6 sm:p-10 md:p-14",
          "text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7",
          "text-rurikon-500",
          "antialiased",
        )}
      >
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
