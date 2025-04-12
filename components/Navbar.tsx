"use client";

import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigation } from "@/lib/i18n";

function NavItem(
  props: React.ComponentProps<typeof Link> & { locale: string }
) {
  const pathname = usePathname();
  const { href, locale, children, ...rest } = props;

  if (typeof href !== "string") {
    throw new Error("`href` must be a string");
  }

  // locale付きの完全なパスを生成
  const fullPath = `/${locale}${href === "/" ? "" : href}`;

  // 現在のパスと一致するか確認（より厳格な比較）
  // 例: /ja と /ja が完全一致または
  // /ja/work と /ja/work が完全一致、または
  // /ja/work/project1 と /ja/work が前方一致（かつproject1の部分がない）
  const isActive =
    pathname === fullPath ||
    (pathname.startsWith(fullPath + "/") && fullPath !== `/${locale}`);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === fullPath) {
      e.preventDefault(); // 現在と同じページなら遷移防止
    }
  };

  return (
    <li
      className={cn(
        isActive
          ? "text-rurikon-800 underline"
          : "text-rurikon-300 hover:underline",
        "hover:underline",
        "-mx-2 md:pb-4"
      )}
    >
      <Link
        {...rest}
        href={fullPath}
        onClick={handleClick}
        className="inline-block w-full px-2"
        draggable={false}
      >
        {children}
      </Link>
    </li>
  );
}

// initialLocaleをpropsとして受け取り、クライアントサイドではuseparamsを使用
export default function Navbar({ initialLocale }: { initialLocale?: string }) {
  // クライアントコンポーネント内ではuseParamsを使用してlocaleを取得
  const pathname = usePathname();
  const pathnameLocale = pathname.split("/")[1];
  const locale = pathnameLocale || initialLocale || "en";

  // 現在の言語のナビゲーション項目を取得
  const navItems =
    navigation[locale as keyof typeof navigation] || navigation.en;

  // For debugging
  console.log("Current pathname:", pathname);

  return (
    <nav className="mobile:mr-6 sm:mr-10 md:mr-14 w-full mobile:w-16">
      <ul className="lowercase text-right mobile:sticky top-6 sm:top-10 md:top-14 mb-6 mobile:mb-0 flex gap-4 justify-end mobile:block">
        <NavItem href="/" locale={locale}>
          {navItems.about}
        </NavItem>
        <NavItem href="/work" locale={locale}>
          {navItems.work}
        </NavItem>
        <NavItem href="/contact" locale={locale}>
          {navItems.contact}
        </NavItem>
      </ul>
    </nav>
  );
}
