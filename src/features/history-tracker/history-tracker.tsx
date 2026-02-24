// app/layout.tsx などに追加
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const prev = sessionStorage.getItem("currentPath");
    if (pathname !== prev) {
      sessionStorage.setItem("prevPath", prev || "/");
      sessionStorage.setItem("currentPath", pathname);
    }
  }, [pathname]);

  return null;
}
