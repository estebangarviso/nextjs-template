import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isLocale } from '@modules/i18n';

/**
 * Locale-detection middleware.
 *
 * On every request, checks if the pathname already has a supported locale
 * prefix (e.g. `/en/dashboard`). If not, negotiates the best locale from
 * the `NEXT_LOCALE` cookie and the `Accept-Language` header, then redirects
 * to the locale-prefixed URL.
 *
 * Cookie `NEXT_LOCALE` takes precedence over the header so users can
 * persist a locale preference.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Skip if locale is already present in the path
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Negotiate locale
  const locale = negotiateLocale(request);

  // Redirect: /path → /{locale}/path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function negotiateLocale(request: NextRequest): string {
  // 1. Explicit cookie (user preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  // 2. Accept-Language header negotiation
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.trim().split(';')[0].trim().toLowerCase())
    .find((lang) => isLocale(lang));

  return preferred ?? (DEFAULT_LOCALE as unknown as string);
}

export const config = {
  // Match all paths EXCEPT Next.js internals and static files.
  matcher: [String.raw`/((?!_next|api|.*\..*)(.*)`],
};
