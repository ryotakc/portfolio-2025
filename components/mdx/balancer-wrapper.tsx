"use client";

import { usePathname } from "next/navigation";
import Balancer from "react-wrap-balancer";

export const BalancerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const isJapanese = locale === "ja";
  return <>{isJapanese ? children : <Balancer>{children}</Balancer>}</>;
};
