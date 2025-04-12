"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/");
  const locale =
    pathnameSegments.length > 1 && pathnameSegments[1]
      ? pathnameSegments[1]
      : "en";

  return <Navbar initialLocale={locale} />;
}
