'use client'
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="hover:underline">Home</Link>
      {/* <Link href="/about" className="hover:underline">About</Link> */}
      <Link href="/work" className="hover:underline">Work</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
    </div>
  )
}


