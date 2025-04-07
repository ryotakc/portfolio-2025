"use client"

import type React from "react"
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

  // 同じページリンクをクリックした場合のイベントハンドラを追加
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault(); // 現在のページと同じリンクなら、ナビゲーションを防止
    }
  };

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
            onClick={(e) => handleClick(e, item.href)} // クリックハンドラを追加
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}


// "use client"

// import React from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// interface NavbarProps {
//   orientation?: "horizontal" | "vertical";
// }

// export default function Navbar({ orientation = "vertical" }: NavbarProps) {
//   const pathname = usePathname()

//   const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/work", label: "Work" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const containerClasses = orientation === "horizontal"
//     ? "flex justify-center items-center gap-2"
//     : "flex flex-col gap-4";

//   return (
//     <nav className={containerClasses}>
//       {navItems.map((item) => {
//         const isActive = pathname === item.href

//         const baseClass = orientation === "horizontal"
//           ? "mx-2 hover:underline"
//           : "mb-2 hover:underline"

//         const activeClass = isActive ? "underline" : ""

//         return (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`${baseClass} ${activeClass}`}
//           >
//             {item.label}
//           </Link>
//         )
//       })}
//     </nav>
//   )
// }


