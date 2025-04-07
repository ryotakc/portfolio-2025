// "use client"

// import { useRouter } from "next/navigation"

// export default function ReturnButton() {
//   const router = useRouter()

//   return (
//     <button onClick={() => router.back()} className="block mr-auto text-left hover:underline">
//       Return
//     </button>
//   )
// }
"use client"

import { useRouter } from "next/navigation"

export default function ReturnButton() {
  const router = useRouter()

  const handleClick = () => {
    const prev = sessionStorage.getItem('prevPath') || '/'
    if (document.startViewTransition) {
      document.startViewTransition(() => router.push(prev))
    } else {
      router.push(prev)
    }
  }

  return (
    <button onClick={handleClick} className="block mr-auto text-left underline">
      Return
    </button>
  )
}
