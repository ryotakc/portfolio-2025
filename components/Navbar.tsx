// 'use client'
// import Link from "next/link"

// export default function Navbar() {
//   return (
//     <div className="flex flex-col gap-4">
//       <Link href="/" className="hover:underline">Home</Link>
//       {/* <Link href="/about" className="hover:underline">About</Link> */}
//       <Link href="/work" className="hover:underline">Work</Link>
//         <Link href="/contact" className="hover:underline">Contact</Link>
//     </div>
//   )
// }


import React from "react";
import Link from "next/link";

// Navbar型を拡張し、orientation属性を追加
interface NavbarProps {
  orientation?: "horizontal" | "vertical";
}

export default function Navbar({ orientation = "vertical" }: NavbarProps) {
  // ナビゲーション項目
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  // 方向に基づいてコンテナとリストのスタイルを設定
  const containerClasses = orientation === "horizontal"
    ? "flex justify-center items-center gap-2"
    : "flex flex-col gap-4";

  const listItemClasses = orientation === "horizontal"
    // ? "mx-2 transition-colors hover:text-primary"
    // : "mb-2 transition-colors hover:text-primary";
    ? "mx-2 hover:underline"
    : "mb-2 hover:underline";

  return (
    <nav className={containerClasses}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={listItemClasses}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

