export type SiteLayoutType = 'minimal' | 'sidebar' | 'magazine';
export type DefaultColorMode = 'system' | 'dark' | 'light';

export interface ThemeConfig {
  layout: SiteLayoutType;
  defaultColor: DefaultColorMode;
}

export const siteConfig: ThemeConfig = {
  layout: 'minimal', // Current design
  defaultColor: 'system',
};
