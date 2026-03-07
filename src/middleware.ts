import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// サポートする言語リスト
export const locales = ["en", "ja"];

// デフォルト言語
export const defaultLocale = "en";

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // Vercel, Cloudflare, CloudFront等のヘッダーから国コードを取得
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country");

  if (country) {
    return country.toUpperCase() === "JP" ? "ja" : "en";
  }

  // ローカル開発等で取得できない場合のフォールバック
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const prefersJapanese = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase())
      .some((lang) => lang === "ja" || lang.startsWith("ja-"));

    if (prefersJapanese) {
      return "ja";
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsOneOfLocales = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Filter specific paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return;
  }

  // 1. If path has locale
  if (pathnameIsOneOfLocales) {
    return NextResponse.next();
  }

  // 2. If path MISSING locale (e.g. root "/")
  const targetLocale = getLocale(request);

  // Redirect to target locale
  return NextResponse.redirect(
    new URL(`/${targetLocale}${pathname === "/" ? "" : pathname}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
