import { HistoryTracker } from "@/components/history-tracker";
import { languages } from "@/lib/i18n";
import { themeConfig } from "@/config/theme";
import { MinimalSiteLayout } from "@/components/layouts/site/MinimalSiteLayout";
import { SidebarSiteLayout } from "@/components/layouts/site/SidebarSiteLayout";
import { MagazineSiteLayout } from "@/components/layouts/site/MagazineSiteLayout";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const Layout = {
    Minimal: MinimalSiteLayout,
    Sidebar: SidebarSiteLayout,
    Magazine: MagazineSiteLayout,
  }[themeConfig.siteLayout];

  return <Layout>{children}</Layout>;
}
