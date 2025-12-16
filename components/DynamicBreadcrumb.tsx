"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const baseUrl = "https://ryotakc.com"; // hardcoded or imported from siteConfig if it was public/client safe

  // Generate JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${baseUrl}/${locale}`,
      },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: decodeURIComponent(segment),
        item: `${baseUrl}/${locale}/${pathSegments.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
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
    </>
  );
}
