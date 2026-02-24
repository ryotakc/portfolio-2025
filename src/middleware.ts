import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// サポートする言語リスト
export const locales = ["en", "ja"];

// デフォルト言語
export const defaultLocale = "ja";

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // ブラウザから送信された希望言語を取得
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => locales.includes(lang.substring(0, 2)));

    if (preferredLocale) {
      return preferredLocale.substring(0, 2);
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

  // Get locale from cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  // 1. If path has locale
  if (pathnameIsOneOfLocales) {
    const localeInPath = pathname.split("/")[1];

    // If cookie exists and is different from path locale -> Redirect to cookie locale
    // effectively "sticky locale" preventing history traversal across languages
    if (cookieLocale && locales.includes(cookieLocale) && localeInPath !== cookieLocale) {
      const newPath = pathname.replace(`/${localeInPath}`, `/${cookieLocale}`);
      const response = NextResponse.redirect(new URL(newPath, request.url));
      return response;
    }

    // If matches or no cookie, allow but ensure cookie is set for future
    const response = NextResponse.next();
    if (localeInPath !== cookieLocale) {
      response.cookies.set("NEXT_LOCALE", localeInPath);
    }
    return response;
  }

  // 2. If path MISSING locale (e.g. root "/")

  // Use cookie preference if available, otherwise negotiate
  const targetLocale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : getLocale(request);

  // Redirect to target locale
  const response = NextResponse.redirect(
    new URL(`/${targetLocale}${pathname === "/" ? "" : pathname}`, request.url),
  );

  // Set cookie if missing
  if (cookieLocale !== targetLocale) {
    response.cookies.set("NEXT_LOCALE", targetLocale);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
