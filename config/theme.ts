export type SiteLayoutType = "Minimal" | "Sidebar" | "Magazine";
export type ContentLayoutType = "Default" | "Blog" | "Portfolio";

export interface SiteThemeConfig {
  siteLayout: SiteLayoutType;
  defaultContentLayout: ContentLayoutType;
  // Future: colorTheme?: string;
}

export const themeConfig: SiteThemeConfig = {
  siteLayout: "Minimal", // Default
  defaultContentLayout: "Default",
};
