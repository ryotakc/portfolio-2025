"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarProps {
  orientation?: "horizontal" | "vertical";
}

export default function Navbar({ orientation = "vertical" }: NavbarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  const containerClasses = orientation === "horizontal"
    ? "flex justify-center items-center gap-2"
    : "flex flex-col gap-4";

  return (
    <nav className={containerClasses}>
      {navItems.map((item) => {
        const isActive = pathname === item.href

        const baseClass = orientation === "horizontal"
          ? "mx-2 hover:underline"
          : "mb-2 hover:underline"

        const activeClass = isActive ? "underline" : ""

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseClass} ${activeClass}`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}



// import React from "react";
// import Link from "next/link";

// // Navbar型を拡張し、orientation属性を追加
// interface NavbarProps {
//   orientation?: "horizontal" | "vertical";
// }

// export default function Navbar({ orientation = "vertical" }: NavbarProps) {
//   const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/work", label: "Work" },
//     { href: "/contact", label: "Contact" },
//   ];

//   // 方向に基づいてコンテナとリストのスタイルを設定
//   const containerClasses = orientation === "horizontal"
//     ? "flex justify-center items-center gap-2"
//     : "flex flex-col gap-4 ";

//   const listItemClasses = orientation === "horizontal"
//     // ? "mx-2 transition-colors hover:text-primary"
//     // : "mb-2 transition-colors hover:text-primary";
//     ? "mx-2 hover:underline"
//     : "mb-2 hover:underline";

//   return (
//     <nav className={containerClasses}>
//       {navItems.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           className={listItemClasses}
//         >
//           {item.label}
//         </Link>
//       ))}
//     </nav>
//   );
// }

