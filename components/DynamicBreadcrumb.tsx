"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  
  // segments[0] is usually the locale (e.g., "en", "ja")
  const locale = segments[0] || "en";
  const pathSegments = segments.slice(1);

  // If we are at the root (just /locale), we might want to show just home?
  // But usually this component is used in subpages.
  
  const homeLabel = locale === "ja" ? "ホーム" : "home";

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`}>{homeLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${locale}/${pathSegments.slice(0, index + 1).join("/")}`;
          
          // Decode generic URL encoded segments if necessary, though basic slugs are usually safe.
          // You might want a lookup for mapping "work" -> "Work" etc., but utilizing the segment id is fine for now
          // as per requirement "home/work/portfolio-2025".
          
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                     <Link href={href}>{decodeURIComponent(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
