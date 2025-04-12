"use client";

import { useRouter, useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

export default function ReturnButton() {
  const router = useRouter();
  // クライアントコンポーネント内でパラメータを取得
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "ja";
  const dictionary = getDictionary(locale);

  const handleClick = () => {
    const prev = sessionStorage.getItem("prevPath") || `/${locale}`;
    if (document.startViewTransition) {
      document.startViewTransition(() => router.push(prev));
    } else {
      router.push(prev);
    }
  };

  return (
    <button onClick={handleClick} className="block mr-auto text-left underline">
      {dictionary.returnBack}
    </button>
  );
}
