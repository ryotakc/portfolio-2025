export type SiteLayoutType = "minimal" | "sidebar" | "magazine" | "catnose";
export type DefaultColorMode = "system" | "dark" | "light";

export interface ThemeConfig {
  layout: SiteLayoutType;
  defaultColor: DefaultColorMode;
}

export const siteConfig: ThemeConfig = {
  layout: "catnose", // Updated to new catnose layout
  defaultColor: "system",
};
