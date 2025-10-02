import { routing } from "@/i18n/routing";

const { locales, defaultLocale } = routing;

function isValidLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

export function getLocalForAuthMiddleware(pathname: string) {
  let locale: string;
  let pathWithoutLocale: string;

  if (pathname === "/") {
    locale = defaultLocale;
    pathWithoutLocale = "/";
  } else {
    const segments = pathname.split("/");
    const potentialLocale = segments[1];

    if (potentialLocale && isValidLocale(potentialLocale)) {
      locale = potentialLocale;
      pathWithoutLocale = "/" + segments.slice(2).join("/");
    } else {
      locale = defaultLocale;
      pathWithoutLocale = pathname;
    }
  }

  return { locale, pathWithoutLocale };
}

export function getLocalForMainMiddleware(pathname: string) {
  const segments = pathname.split("/");
  let locale = defaultLocale;
  let pathWithoutLocale = pathname;

  if (segments[1] && isValidLocale(segments[1])) {
    locale = segments[1];
    pathWithoutLocale = "/" + segments.slice(2).join("/");
  }

  return { locale, pathWithoutLocale };
}
