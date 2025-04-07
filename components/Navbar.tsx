'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Item(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const href = props.href

  if (typeof href !== 'string') {
    throw new Error('`href` must be a string')
  }

  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <li
      className={cn(
        isActive
          ? 'text-rurikon-800'
          : 'text-rurikon-300 hover:text-rurikon-600',
        'transition-colors hover:transform-none',
        '-mx-2 md:pb-4'
      )}
    >
      <Link {...props} className='inline-block w-full px-2' draggable={false} />
    </li>
  )
}

export default function Navbar() {
  return (
    <nav className='mobile:mr-6 sm:mr-10 md:mr-14 w-full mobile:w-16'>
      <ul className='lowercase text-right mobile:sticky top-6 sm:top-10 md:top-14 mb-6 mobile:mb-0 flex gap-2 justify-end mobile:block'>
        <Item href='/'>About</Item>
        <Item href='/work'>Work</Item>
        {/* <Item href='/visuals'>Visuals</Item> */}
        <Item href='/contact'>Contact</Item>
        {/* <Item href='/guestbook'>Guestbook</Item> */}
      </ul>
    </nav>
  )
}



// "use client"

// import type React from "react"
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

//   // 同じページリンクをクリックした場合のイベントハンドラを追加
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     if (pathname === href) {
//       e.preventDefault(); // 現在のページと同じリンクなら、ナビゲーションを防止
//     }
//   };

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
//             onClick={(e) => handleClick(e, item.href)} // クリックハンドラを追加
//           >
//             {item.label}
//           </Link>
//         )
//       })}
//     </nav>
//   )
// }
