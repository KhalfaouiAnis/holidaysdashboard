import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { authMiddleware } from "./middleware/auth-middleware";
import { routing } from "@/i18n/routing";
import { getLocalForMainMiddleware } from "./lib/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = authMiddleware(request);

  if (response && response.status >= 300) {
    return response;
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard/home`, request.url));
  }

  const { locale, pathWithoutLocale } = getLocalForMainMiddleware(pathname);

  if (pathWithoutLocale === "/dashboard") {
    return NextResponse.redirect(new URL(`/${locale}/dashboard/home`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
