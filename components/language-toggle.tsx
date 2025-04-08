'use client'

import { usePathname, useRouter } from 'next/navigation'
import { languages, languageNames } from '@/lib/i18n'

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()
  
  // 現在の言語を取得
  const currentLocale = pathname.split('/')[1]
  
  // パスから言語部分を除いた残りのパスを取得
  const pathnameWithoutLocale = pathname.substring(3) || ''
  
  // 言語切り替え処理
  const toggleLanguage = () => {
    // 現在の言語に基づいて次の言語を決定
    const newLocale = currentLocale === 'ja' ? 'en' : 'ja'
    
    // ビュートランジションAPIが使用可能ならアニメーション付きで遷移
    if (document.startViewTransition) {
      document.startViewTransition(() => 
        router.push(`/${newLocale}${pathnameWithoutLocale}`)
      )
    } else {
      router.push(`/${newLocale}${pathnameWithoutLocale}`)
    }
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={toggleLanguage}
      className="relative w-12 h-12 cursor-pointer flex items-center justify-center group"
    >
      {/* アイコン - Menloフォントで2言語を表示 */}
      <span 
        className="h-[1.2rem] w-[1.2rem] flex items-center justify-center text-[1rem] font-mono rotate-0 scale-100 transition-all dark:text-white"
        style={{ fontFamily: 'Menlo, Monaco, Consolas, monospace' }}
      >
        {currentLocale === 'ja' ? 'EN' : 'JA'}
      </span>

      {/* Corners - mode-toggleと同じスタイル */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} w-2 h-2 border-neutral-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
            i < 2 ? "border-t" : "border-b"
          } ${i % 2 === 0 ? "border-l" : "border-r"}`}
        />
      ))}
    </div>
  )
}
