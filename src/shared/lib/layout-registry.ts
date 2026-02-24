import type { ComponentType, ReactNode } from "react";
import CatnoseSiteLayout from "@/shared/ui/layouts/site/CatnoseSiteLayout";
import MagazineSiteLayout from "@/shared/ui/layouts/site/MagazineSiteLayout";
import MinimalSiteLayout from "@/shared/ui/layouts/site/MinimalSiteLayout";
import SidebarSiteLayout from "@/shared/ui/layouts/site/SidebarSiteLayout";

export type SiteLayoutType = "minimal" | "sidebar" | "magazine" | "catnose";

// Layout Component Props Interface
// All site layouts should accept children.
export interface SiteLayoutProps {
  children: ReactNode;
}

export const LayoutRegistry: Record<SiteLayoutType, ComponentType<SiteLayoutProps>> = {
  minimal: MinimalSiteLayout,
  sidebar: SidebarSiteLayout,
  magazine: MagazineSiteLayout,
  catnose: CatnoseSiteLayout,
};

export function getSiteLayout(layoutType: SiteLayoutType): ComponentType<SiteLayoutProps> {
  return LayoutRegistry[layoutType] || MinimalSiteLayout;
}
