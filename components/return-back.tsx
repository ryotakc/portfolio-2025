"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

export default function ReturnButton() {
  const router = useRouter();
  const pathname = usePathname();
  // クライアントコンポーネント内でパラメータを取得
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "ja";
  const dictionary = getDictionary(locale);

  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors mb-8 group"
    >
      {dictionary.returnBack}
    </button>
  );
}
