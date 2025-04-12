"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default function NotFound({ params }: { params: { locale: string } }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] === "en" ? "en" : "ja";
  const dictionary = getDictionary(locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-semibold mb-7 text-rurikon-600 text-2xl">
        {dictionary.notFound}
      </h1>
      <Link href={`/${locale}`} className="underline">
        {dictionary.returnHome}
      </Link>
    </div>
  );
}
