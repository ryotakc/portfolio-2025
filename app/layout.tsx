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
import { siteConfig } from "@/config/theme";
import MinimalSiteLayout from "@/components/layouts/site/MinimalSiteLayout";
import SidebarSiteLayout from "@/components/layouts/site/SidebarSiteLayout";
import MagazineSiteLayout from "@/components/layouts/site/MagazineSiteLayout";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    template: "%s | Leo",
    default: "Leo",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: "only light",
  themeColor: "#fcfcfc",
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
  }[siteConfig.layout];

  return (
    <html
      lang="en"
      className="overflow-x-hidden touch-manipulation"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "font-mono",
          "w-full p-6 sm:p-10 md:p-14",
          "text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7",
          "text-rurikon-500",
          "antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig.defaultColor}
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
