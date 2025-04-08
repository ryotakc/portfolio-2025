import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
// サポートする言語リスト
export const locales = ['en', 'ja']
 
// デフォルト言語
export const defaultLocale = 'ja'
 
// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // ブラウザから送信された希望言語を取得
  const acceptLanguage = request.headers.get('accept-language')
  
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.substring(0, 2)))
    
    if (preferredLocale) {
      return preferredLocale.substring(0, 2)
    }
  }
  
  return defaultLocale
}
 
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 言語プレフィックスがすでにある場合はパススルー
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return
  
  // 一部のファイルや特殊なパスは無視する
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return
  }
  
  // ルートパス / へのアクセスはすでにnext.config.mjsのリダイレクトで処理されるため、
  // ここでは他のすべてのパスに対処
  
  // ブラウザの設定からユーザーの言語を取得
  const locale = getLocale(request)
  
  // 現在のパスに言語プレフィックスを追加してリダイレクト
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  )
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
