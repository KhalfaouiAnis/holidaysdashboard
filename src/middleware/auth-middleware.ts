import { NextResponse, type NextRequest } from "next/server";
import { getLocalForAuthMiddleware } from "@/core/utils/routing";

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get("auth-token");

  const { locale, pathWithoutLocale } = getLocalForAuthMiddleware(pathname);

  if (!isLoggedIn && pathWithoutLocale.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  if (isLoggedIn && pathWithoutLocale === "/auth/login") {
    return NextResponse.redirect(new URL(`/${locale}/dashboard/home`, req.url));
  }

  return NextResponse.next();
}
